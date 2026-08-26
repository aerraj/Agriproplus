import { useEffect, useRef } from "react";

export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { alpha: true });
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame;
    let width = 0;
    let height = 0;
    let particles = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.max(18, Math.min(44, Math.round(width / 26)));
      particles = Array.from({ length: count }, (_, index) => ({
        x: (index * 83) % Math.max(width, 1), y: (index * 47) % Math.max(height, 1),
        vx: ((index % 5) - 2) * 0.035, vy: (((index * 3) % 5) - 2) * 0.028,
        radius: index % 4 === 0 ? 1.8 : 1,
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (let index = 0; index < particles.length; index += 1) {
        const point = particles[index];
        if (!reduceMotion) {
          point.x = (point.x + point.vx + width) % width;
          point.y = (point.y + point.vy + height) % height;
        }
        for (let next = index + 1; next < particles.length; next += 1) {
          const other = particles[next];
          const distance = Math.hypot(point.x - other.x, point.y - other.y);
          if (distance < 100) {
            context.strokeStyle = `rgba(201, 246, 74, ${0.11 * (1 - distance / 100)})`;
            context.beginPath(); context.moveTo(point.x, point.y); context.lineTo(other.x, other.y); context.stroke();
          }
        }
        context.fillStyle = "rgba(220, 255, 130, .6)";
        context.beginPath(); context.arc(point.x, point.y, point.radius, 0, Math.PI * 2); context.fill();
      }
      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(() => { resize(); draw(); });
    observer.observe(canvas); resize(); draw();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  return <canvas className="particle-field" ref={canvasRef} aria-hidden="true" />;
}
