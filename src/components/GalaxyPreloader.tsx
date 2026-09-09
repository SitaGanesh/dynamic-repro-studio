import { useEffect, useRef, useCallback } from "react";

// ── Particle model ──────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  angle: number;
  angularVel: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  depth: number;
  birthDist: number;
}

// ── Tuning constants ────────────────────────────────────────
const PHASE_SINGULARITY_END = 500;
const PHASE_BANG_END = 1500;
const PHASE_DISPERSION_END = 2800;
const MIN_CINEMATIC_MS = 2800;
const FAILSAFE_MS = 8000;
const EXIT_DURATION_MS = 800;

const COLORS: [number, number, number][] = [
  [255, 255, 255],
  [230, 240, 255],
  [200, 210, 255],
  [190, 180, 255],
  [200, 245, 255],
];

function randomColor(): [number, number, number] {
  const r = Math.random();
  if (r < 0.45) return COLORS[0]!;
  if (r < 0.70) return COLORS[1]!;
  if (r < 0.82) return COLORS[2]!;
  if (r < 0.93) return COLORS[3]!;
  return COLORS[4]!;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, lo: number, hi: number) {
  return v < lo ? lo : v > hi ? hi : v;
}

// ── Component ───────────────────────────────────────────────
interface GalaxyPreloaderProps {
  onFinished: () => void;
}

export function GalaxyPreloader({ onFinished }: GalaxyPreloaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanedUp = useRef(false);

  const onFinishedRef = useRef(onFinished);
  onFinishedRef.current = onFinished;

  const initAndRun = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reset cleanup flag (Strict Mode safety: effect may re-run)
    cleanedUp.current = false;

    // ── Detect reduced-motion ────────────────────────────
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Particle count ───────────────────────────────────
    const isMobile = window.innerWidth < 768;
    const particleCount = prefersReducedMotion
      ? (isMobile ? 40 : 80)
      : (isMobile ? 120 : 220);

    // ── Canvas sizing ────────────────────────────────────
    let W = 0;
    let H = 0;
    let dpr = 1;
    let cx = 0;
    let cy = 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      cx = W / 2;
      cy = H / 2;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // ── Create particles ─────────────────────────────────
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const depth = Math.random();
      const velocityMag = prefersReducedMotion
        ? 20 + Math.random() * 60
        : 80 + Math.random() * 320 * (0.3 + depth * 0.7);
      const isLargeStar = Math.random() < 0.06;
      const size = isLargeStar
        ? 1.8 + Math.random() * 1.2
        : 0.4 + Math.random() * 1.2;
      const baseAlpha = 0.3 + depth * 0.7;

      particles.push({
        x: cx + (Math.random() - 0.5) * 6,
        y: cy + (Math.random() - 0.5) * 6,
        vx: Math.cos(angle) * velocityMag,
        vy: Math.sin(angle) * velocityMag,
        size,
        alpha: 0,
        baseAlpha,
        angle,
        angularVel: (Math.random() - 0.5) * 0.15,
        twinkleSpeed: 1.5 + Math.random() * 3,
        twinkleOffset: Math.random() * Math.PI * 2,
        depth,
        birthDist: 0,
      });
    }

    // ── Particle color cache ─────────────────────────────
    const pColors: [number, number, number][] = particles.map(() => randomColor());

    // ── Animation state ──────────────────────────────────
    let animFrameId = 0;
    let startTime = 0;
    let previousTimestamp = 0;
    let pageReady = false;
    let exitStartTime = 0;
    let exiting = false;
    let finished = false;

    // ── Page-ready detection ─────────────────────────────
    function markPageReady() {
      pageReady = true;
    }

    if (document.readyState === "complete") {
      pageReady = true;
    } else {
      window.addEventListener("load", markPageReady, { once: true });
    }

    // ── Failsafe ─────────────────────────────────────────
    const failsafeTimer = window.setTimeout(() => {
      pageReady = true;
    }, FAILSAFE_MS);

    // ── Central glow helper ──────────────────────────────
    function drawCentralGlow(intensity: number) {
      if (intensity < 0.001) return;
      const maxRadius = Math.max(W, H) * 0.35;
      const grad = ctx!.createRadialGradient(cx, cy, 0, cx, cy, maxRadius * Math.max(intensity, 0.1));
      grad.addColorStop(0, `rgba(200, 220, 255, ${0.25 * intensity})`);
      grad.addColorStop(0.3, `rgba(160, 180, 255, ${0.08 * intensity})`);
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx!.fillStyle = grad;
      ctx!.fillRect(0, 0, W, H);
    }

    // ── Main loop ────────────────────────────────────────
    function frame(timestamp: number) {
      if (finished || cleanedUp.current) return;

      if (!startTime) {
        startTime = timestamp;
        previousTimestamp = timestamp;
      }

      const elapsed = timestamp - startTime;
      const dt = Math.min(0.05, (timestamp - previousTimestamp) / 1000);
      previousTimestamp = timestamp;

      // ── Should we start exiting? ─────────────────────
      if (!exiting && pageReady && elapsed >= MIN_CINEMATIC_MS) {
        exiting = true;
        exitStartTime = timestamp;
        container?.classList.add("galaxy-preloader-exiting");
      }

      // ── Exit progress ────────────────────────────────
      let exitProgress = 0;
      if (exiting) {
        exitProgress = clamp((timestamp - exitStartTime) / EXIT_DURATION_MS, 0, 1);
        if (exitProgress >= 1 && !finished) {
          finished = true;
          cleanup();
          onFinishedRef.current();
          return;
        }
      }

      // ── Clear ────────────────────────────────────────
      ctx!.clearRect(0, 0, W, H);

      // ── Background ───────────────────────────────────
      // Solid opaque dark background during main animation;
      // fades to transparent only during exit phase
      const bgAlpha = exiting ? 1 - exitProgress : 1;
      ctx!.fillStyle = `rgba(7, 17, 28, ${bgAlpha})`;
      ctx!.fillRect(0, 0, W, H);

      // ── Phase calculations ───────────────────────────
      const singularityT = clamp(elapsed / PHASE_SINGULARITY_END, 0, 1);
      const bangT = clamp((elapsed - PHASE_SINGULARITY_END) / (PHASE_BANG_END - PHASE_SINGULARITY_END), 0, 1);
      const dispersionT = clamp((elapsed - PHASE_BANG_END) / (PHASE_DISPERSION_END - PHASE_BANG_END), 0, 1);
      const isBangPhase = elapsed >= PHASE_SINGULARITY_END && elapsed < PHASE_BANG_END;

      // ── Central glow ─────────────────────────────────
      if (!exiting) {
        let glowIntensity = 0;
        if (elapsed < PHASE_SINGULARITY_END) {
          glowIntensity = singularityT * 0.5;
        } else if (isBangPhase) {
          glowIntensity = lerp(1, 0.3, bangT);
        } else {
          glowIntensity = lerp(0.3, 0.12, dispersionT);
        }
        drawCentralGlow(glowIntensity);
      } else {
        drawCentralGlow(0.12 * (1 - exitProgress));
      }

      // ── Update & draw particles ──────────────────────
      const actualDt = prefersReducedMotion ? dt * 0.3 : dt;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;
        const c = pColors[i]!;

        if (elapsed < PHASE_SINGULARITY_END) {
          p.alpha = lerp(0, p.baseAlpha * 0.4, singularityT);
          p.x = cx + (Math.random() - 0.5) * 8 * singularityT;
          p.y = cy + (Math.random() - 0.5) * 8 * singularityT;
        } else if (elapsed < PHASE_BANG_END) {
          const drag = prefersReducedMotion ? 0.985 : 0.975;
          p.vx *= drag;
          p.vy *= drag;
          p.x += p.vx * actualDt;
          p.y += p.vy * actualDt;
          p.alpha = p.baseAlpha * lerp(0.6, 1, bangT);
          p.birthDist = Math.hypot(p.x - cx, p.y - cy);
        } else {
          const drag = lerp(0.98, 0.997, dispersionT);
          p.vx *= drag;
          p.vy *= drag;

          if (i % 5 < 2) {
            const dx = p.x - cx;
            const dy = p.y - cy;
            const dist = Math.hypot(dx, dy) || 1;
            const tangentX = -dy / dist;
            const tangentY = dx / dist;
            const spiralStrength = prefersReducedMotion ? 1 : 4;
            p.vx += tangentX * spiralStrength * p.angularVel * actualDt;
            p.vy += tangentY * spiralStrength * p.angularVel * actualDt;
          }

          p.x += p.vx * actualDt;
          p.y += p.vy * actualDt;

          const twinkle = 0.7 + 0.3 * Math.sin(elapsed * 0.001 * p.twinkleSpeed + p.twinkleOffset);
          p.alpha = p.baseAlpha * twinkle;
        }

        // During exit: accelerate outward and fade
        if (exiting) {
          const dx = p.x - cx;
          const dy = p.y - cy;
          const dist = Math.hypot(dx, dy) || 1;
          const push = prefersReducedMotion ? 50 : 200;
          p.vx += (dx / dist) * push * actualDt;
          p.vy += (dy / dist) * push * actualDt;
          p.x += p.vx * actualDt;
          p.y += p.vy * actualDt;
          p.alpha *= (1 - exitProgress);
        }

        // -- Draw --
        if (p.alpha < 0.01) continue;

        ctx!.globalAlpha = p.alpha;
        ctx!.fillStyle = `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();

        // Short trail during bang phase
        if (isBangPhase && !prefersReducedMotion) {
          const trailLen = Math.hypot(p.vx, p.vy) * 0.015;
          if (trailLen > 1) {
            const trailAngle = Math.atan2(p.vy, p.vx);
            const tx = p.x - Math.cos(trailAngle) * trailLen;
            const ty = p.y - Math.sin(trailAngle) * trailLen;
            ctx!.globalAlpha = p.alpha * 0.3;
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(tx, ty);
            ctx!.strokeStyle = `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
            ctx!.lineWidth = p.size * 0.5;
            ctx!.stroke();
          }
        }
      }

      ctx!.globalAlpha = 1;
      animFrameId = requestAnimationFrame(frame);
    }

    animFrameId = requestAnimationFrame(frame);

    // ── Cleanup ──────────────────────────────────────────
    function cleanup() {
      if (cleanedUp.current) return;
      cleanedUp.current = true;
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("load", markPageReady);
      clearTimeout(failsafeTimer);
    }

    return cleanup;
  }, []);

  useEffect(() => {
    const cleanup = initAndRun();
    return () => {
      cleanup?.();
    };
  }, [initAndRun]);

  return (
    <div
      ref={containerRef}
      className="galaxy-preloader"
      aria-live="polite"
      role="status"
    >
      <canvas ref={canvasRef} className="galaxy-preloader-canvas" />
      <div className="galaxy-preloader-text">
        <span className="galaxy-preloader-title">PORTFOLIO</span>
        <span className="galaxy-preloader-subtitle">LOADING...</span>
      </div>
    </div>
  );
}
