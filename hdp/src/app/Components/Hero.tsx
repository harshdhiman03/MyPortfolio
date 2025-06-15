// File: components/Hero.tsx
"use client";

import { useEffect, useRef } from "react";
import "./hero.css";

export default function Hero() {
  const snowRef = useRef<HTMLDivElement>(null);
  const snowLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const offset = e.clientY * -0.05;
      if (snowRef.current) {
        snowRef.current.style.transform = `translateY(${offset}px)`;
      }
      if (snowLayerRef.current) {
        snowLayerRef.current.style.transform = `translateY(${offset * 0.8}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    // <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a1a2e] to-[#16213e] overflow-hidden">
    <section className="hero-section flex items-center justify-center">
    <div className="snow-wrapper">
      <div className="snow-layer snow-3"></div>
      <div className="snow-layer snow-2"></div>
      <div className="snow-layer snow-1"></div>
    </div>
  
    <div className="z-10 text-center text-white px-6">
      <h1 className="text-5xl md:text-6xl font-bold mb-4">
        Welcome to the Magical World
      </h1>
      <p className="text-xl md:text-2xl mb-6 text-indigo-200">
        Explore the wonders of code and enchantment
      </p>
      <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold text-white shadow-lg">
        Begin Your Journey
      </button>
    </div>
  </section>
  
  
  
  );
}
