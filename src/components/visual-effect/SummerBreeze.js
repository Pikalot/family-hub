"use client";
import { useEffect, useRef } from "react";

export default function SummerBreeze() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 6 + 3, // Smaller particles for heat shimmer
      speed: Math.random() * 0.5 + 0.2,
      angle: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.5 + 0.3, // Semi-transparent shimmer
    }));

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let p of particles) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 204, 102, ${p.opacity})`; // Warm yellow-orange
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Move particles in a subtle wavy motion
        p.y -= p.speed;
        p.x += Math.sin(p.angle) * 0.5;
        p.angle += Math.random() * 0.1 - 0.05; // Slight direction shift

        // Loop particles when they go out of bounds
        if (p.y < 0) p.y = canvas.height;
        if (p.x > canvas.width) p.x = 0;
      }

      requestAnimationFrame(drawParticles);
    }

    drawParticles();
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />;
}
