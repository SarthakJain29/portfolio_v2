#!/usr/bin/env python3
"""
Import real screenshots and demo videos from the project repos into public/.

Usage (run from the repo root; needs Pillow and ffmpeg):
    python3 scripts/import-assets.py --repos /path/to/clones [--scoreboard /path/to/scoreboard.png]

`--repos` must contain checkouts named like the GitHub repos (lower-case), on the branches
listed in developer.md ("Data sources"). Writes:
  public/projects/<slug>/<name>.webp   resized, aspect ratio preserved
  public/video/<slug>.mp4 + -poster.webp
  src/data/media.json                  {"/projects/...webp": {"w":..,"h":..}} used by site.ts
"""
import argparse
import json
import os
import subprocess
import sys

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# slug -> list of (source path relative to --repos, output name, kind)
# kind: "desktop" (wide, max 1600 px) | "mobile" (phone capture, max 720 px) | "mockup" (tall chat mockup)
IMAGES = {
    "mf-xray": [
        ("mf-x-ray/docs/screenshots/desktop-dashboard.png", "dashboard", "desktop"),
        ("mf-x-ray/docs/screenshots/desktop-overlap.png", "overlap", "desktop"),
        ("mf-x-ray/docs/screenshots/mobile-costs.png", "costs-mobile", "mobile"),
        ("mf-x-ray/docs/screenshots/mobile-ask.png", "ask-mobile", "mobile"),
    ],
    "news-shorts": [
        ("news-shorts/docs/screenshots/02-feed.png", "feed", "mobile"),
        ("news-shorts/docs/screenshots/03-visual.png", "visual", "mobile"),
        ("news-shorts/docs/screenshots/05-catchup.png", "catchup", "mobile"),
        ("news-shorts/docs/screenshots/01-onboarding.png", "onboarding", "mobile"),
    ],
    "diffwise": [
        ("demo-videos-diffwise-video/diffwise/out/thumbnail.png", "demo-frame", "desktop"),
    ],
    "scribeai": [
        ("ai-blog-generator/docs/screenshots/studio-preview.png", "studio", "desktop"),
        ("ai-blog-generator/docs/screenshots/landing.png", "landing", "desktop"),
    ],
    "folio": [
        ("pdf_chatbot/docs/screenshots/viewer.png", "viewer", "desktop"),
        ("pdf_chatbot/docs/screenshots/chat.png", "chat", "desktop"),
    ],
    "meetnote": [
        ("meetnote/docs/transcript.png", "transcript", "desktop"),
        ("meetnote/docs/home.png", "home", "desktop"),
        ("meetnote/docs/tasks.png", "tasks", "desktop"),
    ],
    "quickchat": [
        ("quick-chat/docs/screenshots/chat-ai.png", "chat-ai", "desktop"),
        ("quick-chat/docs/screenshots/mobile-chat.png", "chat-mobile", "mobile"),
    ],
    "dragshift": [
        ("dragshift/docs/screenshots/radial-menu.png", "radial-menu", "desktop"),
        ("dragshift/docs/screenshots/drag-drop.png", "drag-drop", "desktop"),
    ],
    "similar-song-ai": [
        ("similar-song-ai/docs/screenshots/results.jpg", "results", "desktop"),
        ("similar-song-ai/docs/screenshots/journey.jpg", "journey", "desktop"),
    ],
    "notes-inbox": [
        ("notes-inbox-app/docs/img/capture.png", "capture", "mockup"),
        ("notes-inbox-app/docs/img/search.png", "search", "mockup"),
    ],
}

# slug -> (video, poster, keep_audio). The Diffwise cut is captions-only (its narration was never
# generated, see Demo-Videos/diffwise/developer.md), so its silent audio track is dropped.
VIDEOS = {
    "diffwise": (
        "demo-videos-diffwise-video/diffwise/out/diffwise-1080p.mp4",
        "demo-videos-diffwise-video/diffwise/out/thumbnail.png",
        False,
    ),
    "mf-xray": (
        "demo-videos-mf-xray-video/mf-xray/out/mf-xray-demo-1920x1080.mp4",
        "demo-videos-mf-xray-video/mf-xray/docs/thumbnail.jpg",
        True,
    ),
}

MAX_W = {"desktop": 1600, "mobile": 720, "mockup": 720}


def save_webp(src, dest, max_w, quality=78):
    im = Image.open(src).convert("RGB")
    if im.width > max_w:
        im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    im.save(dest, "WEBP", quality=quality, method=6)
    return im.width, im.height


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--repos", required=True)
    ap.add_argument("--scoreboard", help="PNG render of ai-code-review-bot/evals/reports/scoreboard.html")
    a = ap.parse_args()
    media = {}

    for slug, items in IMAGES.items():
        for rel, name, kind in items:
            public = f"/projects/{slug}/{name}.webp"
            w, h = save_webp(os.path.join(a.repos, rel), os.path.join(ROOT, "public", public[1:]), MAX_W[kind])
            media[public] = {"w": w, "h": h}
            print(f"{public:48} {w}x{h}")

    if a.scoreboard:
        public = "/projects/diffwise/scoreboard.webp"
        w, h = save_webp(a.scoreboard, os.path.join(ROOT, "public", public[1:]), 1600)
        media[public] = {"w": w, "h": h}
        print(f"{public:48} {w}x{h}")

    for slug, (video, poster, keep_audio) in VIDEOS.items():
        out = os.path.join(ROOT, "public", "video", f"{slug}.mp4")
        os.makedirs(os.path.dirname(out), exist_ok=True)
        # 720p H.264 + AAC 96k, moov atom first so playback starts before the download finishes.
        subprocess.run(
            [
                "ffmpeg", "-y", "-loglevel", "error", "-i", os.path.join(a.repos, video),
                "-vf", "scale=1280:-2", "-c:v", "libx264", "-preset", "slow", "-crf", "27",
                "-profile:v", "high", "-pix_fmt", "yuv420p",
                *(["-c:a", "aac", "-b:a", "96k"] if keep_audio else ["-an"]),
                "-movflags", "+faststart", out,
            ],
            check=True,
        )
        public_poster = f"/video/{slug}-poster.webp"
        w, h = save_webp(os.path.join(a.repos, poster), os.path.join(ROOT, "public", public_poster[1:]), 1280)
        media[public_poster] = {"w": w, "h": h}
        print(f"/video/{slug}.mp4  {os.path.getsize(out) // 1024} KB")

    with open(os.path.join(ROOT, "src", "data", "media.json"), "w") as f:
        json.dump(dict(sorted(media.items())), f, indent=2)
        f.write("\n")


if __name__ == "__main__":
    sys.exit(main())
