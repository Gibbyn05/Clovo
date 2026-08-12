"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./animated-area-chart.module.css";

const points = [
  { x: 0, y: 108, value: 142 },
  { x: 70, y: 92, value: 158 },
  { x: 130, y: 84, value: 166 },
  { x: 195, y: 94, value: 151 },
  { x: 250, y: 60, value: 184 },
  { x: 315, y: 75, value: 172 },
  { x: 380, y: 46, value: 205 },
  { x: 445, y: 59, value: 191 },
  { x: 520, y: 28, value: 226 },
  { x: 600, y: 10, value: 245 },
];

const linePath = "M0 108 C60 102 62 76 120 83 S205 98 250 60 S330 82 380 46 S460 66 520 28 S570 22 600 10";
const areaPath = `${linePath} L600 130H0Z`;

export function AnimatedAreaChart() {
  const root = useRef<HTMLDivElement>(null);
  const gradientId = useId().replace(/:/g, "");
  const clipId = useId().replace(/:/g, "");
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (!root.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  const selectPoint = (clientX: number) => {
    const bounds = root.current?.getBoundingClientRect();
    if (!bounds) return;
    const chartX = Math.max(0, Math.min(600, ((clientX - bounds.left) / bounds.width) * 600));
    const index = points.reduce(
      (best, point, index) => Math.abs(point.x - chartX) < Math.abs(points[best].x - chartX) ? index : best,
      0,
    );
    setActive(index);
  };

  const point = active === null ? null : points[active];

  return (
    <div
      ref={root}
      className={`${styles.chart} ${visible ? styles.visible : ""}`}
      onPointerMove={(event) => selectPoint(event.clientX)}
      onPointerLeave={() => setActive(null)}
      role="img"
      aria-label="Utvikling i vunnet salg gjennom perioden"
    >
      <svg viewBox="0 0 600 130" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff5b35" stopOpacity=".3" />
            <stop offset="100%" stopColor="#ff5b35" stopOpacity=".02" />
          </linearGradient>
          <clipPath id={clipId}>
            <rect className={styles.reveal} x="0" y="0" width="600" height="130" />
          </clipPath>
        </defs>
        {[26, 60, 94, 128].map((y) => <line className={styles.grid} x1="0" x2="600" y1={y} y2={y} key={y} />)}
        <g clipPath={`url(#${clipId})`}>
          <path className={styles.area} d={areaPath} fill={`url(#${gradientId})`} />
          <path className={styles.line} d={linePath} pathLength="1" />
        </g>
        {point ? (
          <g className={styles.focus}>
            <line x1={point.x} x2={point.x} y1="0" y2="130" />
            <circle cx={point.x} cy={point.y} r="5" />
          </g>
        ) : null}
      </svg>
      {point ? (
        <div className={styles.tooltip} style={{ left: `${(point.x / 600) * 100}%` }}>
          <span>Vunnet salg</span>
          <strong>{point.value} 000 kr</strong>
        </div>
      ) : null}
    </div>
  );
}
