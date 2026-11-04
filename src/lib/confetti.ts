/** Tiny DOM confetti. No-ops under prefers-reduced-motion. */
export function burstConfetti(count = 48) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#6366f1", "#a5b4fc", "#22c55e", "#f59e0b", "#ef4444", "#0ea5e9"];
  const frag = document.createDocumentFragment();
  const bits: HTMLElement[] = [];
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "confetti-bit";
    el.setAttribute("aria-hidden", "true");
    el.style.left = `${Math.random() * 100}vw`;
    el.style.background = colors[i % colors.length]!;
    el.style.setProperty("--dx", `${(Math.random() - 0.5) * 240}px`);
    el.style.setProperty("--rot", `${360 + Math.random() * 720}deg`);
    el.style.setProperty("--dur", `${1.8 + Math.random() * 1.4}s`);
    el.style.animationDelay = `${Math.random() * 300}ms`;
    bits.push(el);
    frag.appendChild(el);
  }
  document.body.appendChild(frag);
  setTimeout(() => bits.forEach((b) => b.remove()), 4000);
}
