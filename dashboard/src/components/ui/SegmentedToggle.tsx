"use client";

interface SegmentedToggleProps {
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
}

export default function SegmentedToggle({ options, selected, onChange }: SegmentedToggleProps) {
  return (
    <div className="glass-subtle inline-flex p-1 gap-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
            selected === opt.value
              ? "bg-[rgba(0,209,178,0.2)] text-[#00D1B2] shadow-[0_0_20px_rgba(0,209,178,0.15)]"
              : "text-[#9ca3af] hover:text-[#f0f0f5] hover:bg-[rgba(255,255,255,0.05)]"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
