"use client";
import { useEffect, useRef } from "react";

export default function AutumnLeaves() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const leafColors = ["#D2691E", "#FF4500", "#FFA500", "#8B4513", "#FFD700"]; // Autumn colors

    let leaves = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 12 + 8, 
      speed: Math.random() * 3 + 1, 
      angle: Math.random() * Math.PI * 2,
      wobble: Math.random() * 0.05 + 0.02, 
      color: leafColors[Math.floor(Math.random() * leafColors.length)], // Random autumn color
    }));

    function drawLeaf(x, y, size, angle, color) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(
        size * 0.4, -size * 0.7, // Left control point
        size * 0.7, -size * 0.3, // Right control point
        size * 0.7, 0 // End point
      );
      ctx.bezierCurveTo(
        size * 0.7, size * 0.3,
        size * 0.4, size * 0.7,
        0, 0
      );
      ctx.fill();

      ctx.restore();
    }

    function drawLeaves() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let leaf of leaves) {
        drawLeaf(leaf.x, leaf.y, leaf.size, leaf.angle, leaf.color);

        leaf.y += leaf.speed;
        leaf.x += Math.sin(leaf.angle) * 1.5; // Side-to-side wobble
        leaf.angle += leaf.wobble; // Small rotation effect

        if (leaf.y > canvas.height) leaf.y = 0;
        if (leaf.x > canvas.width) leaf.x = 0;
      }

      requestAnimationFrame(drawLeaves);
    }

    drawLeaves();
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />;
}
