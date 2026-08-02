import Lenis from "lenis";
import "lenis/dist/lenis.css";

let lenis = null;
let rafId = null;

const rafLoop = (time) => {
  lenis?.raf(time);
  rafId = requestAnimationFrame(rafLoop);
};

export const initSmoothScroll = () => {
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
    infinite: false
  });

  rafId = requestAnimationFrame(rafLoop);
  return lenis;
};

export const destroySmoothScroll = () => {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
  lenis?.destroy();
  lenis = null;
};

export const stopSmoothScroll = () => lenis?.stop();

export const startSmoothScroll = () => lenis?.start();

export const scrollToTarget = (target) => {
  if (lenis) {
    lenis.scrollTo(target, { offset: -110, duration: 1.2 });
    return true;
  }
  return false;
};
