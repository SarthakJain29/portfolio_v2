"use client";

import { useRef, useState } from "react";
import type { ProjectVideo } from "@/data/types";

/**
 * Lazy demo video: nothing downloads until you interact (preload="none" + poster).
 * Hover = muted preview (fine pointers, motion allowed). Click / tap = play with sound
 * (or play/pause for captions-only videos). Real buttons for keyboard users.
 */
export function DemoVideo({ v, width, height }: { v: ProjectVideo; width: number; height: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const canHoverPreview = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const play = async (withSound: boolean) => {
    const el = ref.current;
    if (!el) return;
    el.muted = !withSound;
    setMuted(!withSound);
    try {
      await el.play();
    } catch {
      /* autoplay blocked or interrupted: the visible button still works */
    }
  };

  const onClick = () => {
    const el = ref.current;
    if (!el) return;
    if (v.hasAudio) {
      if (el.paused || el.muted) void play(true);
      else el.pause();
    } else if (el.paused) void play(false);
    else el.pause();
  };

  return (
    <figure className="m-0">
      <div className="group relative overflow-hidden rounded-xl bg-[#17171a]">
        <video
          ref={ref}
          src={v.src}
          poster={v.poster}
          width={width}
          height={height}
          preload="none"
          playsInline
          muted
          loop
          onPointerEnter={() => canHoverPreview() && ref.current?.paused && void play(false)}
          onPointerLeave={() => canHoverPreview() && ref.current?.muted && ref.current.pause()}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onClick={onClick}
          className="block aspect-video h-auto w-full cursor-pointer"
          aria-label={v.title}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-3">
          <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-wider text-white/90">
            {playing ? (muted ? (v.hasAudio ? "Preview · muted" : "Playing") : "Playing with sound") : "Hover to preview"}
          </span>
          <span className="pointer-events-auto flex gap-2">
            <button type="button" onClick={onClick} className="key key-yellow !min-h-9 !px-3 !py-1 text-xs">
              {playing && !(v.hasAudio && muted) ? "Pause" : v.hasAudio ? "▶ Play with sound" : "▶ Play"}
            </button>
            {v.hasAudio && playing && !muted && (
              <button
                type="button"
                onClick={() => {
                  if (ref.current) ref.current.muted = true;
                  setMuted(true);
                }}
                className="key !min-h-9 !px-3 !py-1 text-xs"
              >
                Mute
              </button>
            )}
          </span>
        </div>
      </div>
      <figcaption className="mt-2 text-xs leading-snug text-ink-3">
        <strong className="font-semibold text-ink-2">{v.title}.</strong> {v.caption}
      </figcaption>
    </figure>
  );
}
