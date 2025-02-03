"use client";
import { useEffect, useRef } from "react";

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    let stars = Array.from({ length: 200 }, () => ({
      x: centerX, // Start from the center
      y: centerY,
      angle: Math.random() * Math.PI * 2, // Random direction outward
      speed: Math.random() * 2 + 1, // Random speed
      size: Math.random() * 2,
    }));

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";

      for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Move outward in the calculated angle
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        // Reset when out of bounds
        if (
          star.x < 0 || star.x > canvas.width ||
          star.y < 0 || star.y > canvas.height
        ) {
          star.x = centerX;
          star.y = centerY;
          star.angle = Math.random() * Math.PI * 2;
          star.speed = Math.random() * 2 + 1;
        }
      }

      requestAnimationFrame(drawStars);
    }

    drawStars();
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />;
}
