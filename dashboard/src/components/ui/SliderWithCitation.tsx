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
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-[#374151]">{label}</span>
          <button
            onClick={() => setShowCitation(!showCitation)}
            className="w-3.5 h-3.5 rounded-full border border-[#D1D5DB] text-[9px] text-[#6B7280] hover:text-[#051C2C] hover:border-[#051C2C] transition-colors flex items-center justify-center cursor-pointer"
          >
            i
          </button>
        </div>
        <span className="text-xs font-semibold text-[#111]">{displayValue}</span>
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
        <div className="mt-1.5 p-2.5 card-subtle text-[11px] text-[#374151] space-y-1">
          <p className="font-medium text-[#111]">Source</p>
          <p>{citation}</p>
          <div className="flex gap-3 mt-1 text-[10px] text-[#6B7280]">
            <span>Base: {unit === "%" ? `${(scenarioValues.base * 100).toFixed(1)}%` : `${scenarioValues.base}${unit}`}</span>
            <span>Best: {unit === "%" ? `${(scenarioValues.best * 100).toFixed(1)}%` : `${scenarioValues.best}${unit}`}</span>
            <span>Surge: {unit === "%" ? `${(scenarioValues.surge * 100).toFixed(1)}%` : `${scenarioValues.surge}${unit}`}</span>
          </div>
        </div>
      )}
    </div>
  );
}
