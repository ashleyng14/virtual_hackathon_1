"use client";

import { useState } from "react";

interface SliderWithCitationProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  citation: string;
  scenarioValues: { base: number; best: number; surge: number };
  onChange: (value: number) => void;
}

export default function SliderWithCitation({
  label,
  value,
  min,
  max,
  step,
  unit,
  citation,
  scenarioValues,
  onChange,
}: SliderWithCitationProps) {
  const [showCitation, setShowCitation] = useState(false);

  const displayValue = unit === "%"
    ? `${(value * 100).toFixed(1)}%`
    : unit === "x"
      ? `${value.toFixed(2)}x`
      : `${value}`;

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#9ca3af]">{label}</span>
          <button
            onClick={() => setShowCitation(!showCitation)}
            className="w-4 h-4 rounded-full border border-[rgba(255,255,255,0.2)] text-[10px] text-[#9ca3af] hover:text-[#00D1B2] hover:border-[#00D1B2] transition-colors flex items-center justify-center cursor-pointer"
          >
            i
          </button>
        </div>
        <span className="text-sm font-semibold text-[#f0f0f5]">{displayValue}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
      {showCitation && (
        <div className="mt-2 p-3 glass-subtle text-xs text-[#9ca3af] space-y-1">
          <p className="text-[#f0f0f5] font-medium">Source</p>
          <p>{citation}</p>
          <div className="flex gap-4 mt-1 text-[10px]">
            <span>Base: {unit === "%" ? `${(scenarioValues.base * 100).toFixed(1)}%` : `${scenarioValues.base}${unit}`}</span>
            <span>Best: {unit === "%" ? `${(scenarioValues.best * 100).toFixed(1)}%` : `${scenarioValues.best}${unit}`}</span>
            <span>Surge: {unit === "%" ? `${(scenarioValues.surge * 100).toFixed(1)}%` : `${scenarioValues.surge}${unit}`}</span>
          </div>
        </div>
      )}
    </div>
  );
}
