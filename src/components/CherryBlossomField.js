"use client";
import { useEffect, useRef } from "react";

export default function CherryBlossomField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let blossoms = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 8 + 5, // Petal size
      speed: Math.random() * 2 + 0.5,
      angle: Math.random() * Math.PI * 2, // Random rotation
    }));

    function drawPetal(x, y, size, angle) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      ctx.beginPath();
      ctx.fillStyle = "rgba(255, 182, 193, 0.8)"; // Light pink
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(
        size * 0.3, -size * 0.5, // Left control point
        size * 0.6, -size * 0.3, // Right control point
        size * 0.6, 0 // End point
      );
      ctx.bezierCurveTo(
        size * 0.6, size * 0.3,
        size * 0.3, size * 0.5,
        0, 0
      );
      ctx.fill();

      ctx.restore();
    }

    function drawBlossoms() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let petal of blossoms) {
        drawPetal(petal.x, petal.y, petal.size, petal.angle);

        petal.y += petal.speed;
        petal.x += petal.speed * 0.3; // Slight diagonal fall
        petal.angle += 0.02; // Rotate slowly

        if (petal.y > canvas.height) petal.y = 0;
        if (petal.x > canvas.width) petal.x = 0;
      }

      requestAnimationFrame(drawBlossoms);
    }

    drawBlossoms();
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />;
}
