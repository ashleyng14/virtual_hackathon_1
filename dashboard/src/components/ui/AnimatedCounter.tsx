"use client";

import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  duration = 1200,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0);
  const prevValue = useRef(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const start = prevValue.current;
    const diff = value - start;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + diff * eased;
      setDisplay(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        prevValue.current = value;
      }
    }

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [value, duration]);

  const formatted = Math.abs(display) >= 1000000
    ? `${(display / 1000000).toFixed(decimals > 0 ? decimals : 2)}M`
    : Math.abs(display) >= 1000
      ? `${(display / 1000).toFixed(decimals > 0 ? decimals : 1)}K`
      : display.toFixed(decimals);

  return (
    <span className={className}>
      {prefix}{display < 0 && !formatted.startsWith("-") ? "-" : ""}{formatted.replace(/^-/, "")}{suffix}
    </span>
  );
}
