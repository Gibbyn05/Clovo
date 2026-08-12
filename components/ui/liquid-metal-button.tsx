"use client";

import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type LiquidMetalButtonProps = {
  label?: string;
  href: string;
};

export function LiquidMetalButton({ label = "Bestill demo", href }: LiquidMetalButtonProps) {
  const shaderRef = useRef<HTMLDivElement>(null);
  const shaderMount = useRef<ShaderMount | null>(null);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduceMotion(reduced);
    if (reduced || !shaderRef.current) return;

    shaderMount.current = new ShaderMount(
      shaderRef.current,
      liquidMetalFragmentShader,
      {
        u_repetition: 3,
        u_softness: 0.58,
        u_shiftRed: 0.72,
        u_shiftBlue: 0.06,
        u_distortion: 0.08,
        u_contour: 0.2,
        u_angle: 32,
        u_scale: 6,
        u_shape: 1,
        u_offsetX: 0.08,
        u_offsetY: -0.08,
      },
      undefined,
      0.32,
    );

    return () => {
      shaderMount.current?.dispose();
      shaderMount.current = null;
    };
  }, []);

  const setSpeed = (speed: number) => shaderMount.current?.setSpeed?.(speed);

  return (
    <a
      href={href}
      className="group relative inline-flex h-[46px] min-w-[154px] items-center justify-center overflow-hidden rounded-full px-6 outline-none transition-[transform,box-shadow] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-[#ff5b35]/45 focus-visible:ring-offset-2"
      style={{
        transform: pressed ? "scale(.97) translateY(1px)" : hovered ? "translateY(-2px)" : "none",
        boxShadow: pressed
          ? "inset 0 2px 5px rgba(104,31,12,.22), 0 2px 6px rgba(255,91,53,.18)"
          : hovered
            ? "0 14px 30px rgba(255,91,53,.32)"
            : "0 9px 22px rgba(255,91,53,.24)",
      }}
      onPointerEnter={() => { setHovered(true); setSpeed(.8); }}
      onPointerLeave={() => { setHovered(false); setPressed(false); setSpeed(.32); }}
      onPointerDown={() => { setPressed(true); setSpeed(1.25); }}
      onPointerUp={() => { setPressed(false); setSpeed(hovered ? .8 : .32); }}
    >
      <span className="absolute inset-0 bg-[#ff5b35]" />
      {!reduceMotion ? <span ref={shaderRef} className="absolute inset-0 overflow-hidden rounded-full opacity-75 mix-blend-soft-light [&_canvas]:absolute [&_canvas]:inset-0 [&_canvas]:h-full! [&_canvas]:w-full!" /> : null}
      <span className="absolute inset-[2px] rounded-full border border-white/30 bg-gradient-to-b from-[#ff7958]/55 to-[#e74725]/35" />
      <span className="relative z-10 flex items-center gap-2 text-[12px] font-bold text-white drop-shadow-[0_1px_1px_rgba(113,25,7,.45)]">
        {label}
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  );
}
