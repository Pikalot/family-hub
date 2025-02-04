"use client";
import { useEffect, useRef } from "react";

export default function FloatingClouds() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate clouds with random properties
    let clouds = Array.from({ length: 10 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.6, // Keep clouds in upper part
      size: Math.random() * 80 + 50, // Cloud size
      speed: Math.random() * 2 + 0.5, // Floating speed
    }));

    function drawCloud(ctx, x, y, size) {
      ctx.beginPath();
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.arc(x, y, size * 0.4, 0, Math.PI * 2);
      ctx.arc(x + size * 0.3, y - size * 0.2, size * 0.5, 0, Math.PI * 2);
      ctx.arc(x + size * 0.6, y, size * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }

    function animateClouds() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let cloud of clouds) {
        drawCloud(ctx, cloud.x, cloud.y, cloud.size);

        cloud.x += cloud.speed;
        if (cloud.x - cloud.size > canvas.width) {
          cloud.x = -cloud.size;
          cloud.y = Math.random() * canvas.height * 0.6;
        }
      }

      requestAnimationFrame(animateClouds);
    }

    animateClouds();
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />;
}
