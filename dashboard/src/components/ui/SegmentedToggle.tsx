"use client";

interface SegmentedToggleProps {
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
}

export default function SegmentedToggle({ options, selected, onChange }: SegmentedToggleProps) {
  return (
    <div className="inline-flex bg-[#f1f3f5] rounded-lg p-1 gap-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
            selected === opt.value
              ? "bg-white text-[#1a1a2e] shadow-sm"
              : "text-[#5f6368] hover:text-[#1a1a2e]"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
