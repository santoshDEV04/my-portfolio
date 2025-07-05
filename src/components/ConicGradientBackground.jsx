import { useRef, useEffect } from "react";

const ConicGradientBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);

    let angleOffset = 0;

    const colors = [
      "#1a1a2e", "#16213e", "#0f3460", "#533483",
      "#3a0ca3", "#4361ee", "#2b2d42", "#1c1c1c"
    ];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.sqrt(width * width + height * height);

      const steps = 200;
      const angleStep = (2 * Math.PI) / steps;

      for (let i = 0; i < steps; i++) {
        const startAngle = i * angleStep + angleOffset;
        const endAngle = startAngle + angleStep;

        const t = i / steps;
        const colorIndex = Math.floor(t * (colors.length - 1));
        const nextIndex = (colorIndex + 1) % colors.length;

        const lerp = (a, b, amt) => a + (b - a) * amt;

        const interpolateColor = (c1, c2, t) => {
          const hex = (color) =>
            color.length === 4
              ? color
                  .slice(1)
                  .split("")
                  .map((c) => c + c)
                  .join("")
              : color.slice(1);

          const num1 = parseInt(hex(c1), 16);
          const num2 = parseInt(hex(c2), 16);

          const r = Math.round(lerp((num1 >> 16) & 255, (num2 >> 16) & 255, t));
          const g = Math.round(lerp((num1 >> 8) & 255, (num2 >> 8) & 255, t));
          const b = Math.round(lerp(num1 & 255, num2 & 255, t));

          return `rgb(${r}, ${g}, ${b})`;
        };

        const color = interpolateColor(colors[colorIndex], colors[nextIndex], t * colors.length % 1);

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
      }

      angleOffset += 0.002; // subtle animation
      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        opacity: 0.25, // Soft feel
      }}
      className="z-50"
    />
  );
};

export default ConicGradientBackground;
