"use client";

interface SegmentedToggleProps {
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
}

export default function SegmentedToggle({ options, selected, onChange }: SegmentedToggleProps) {
  return (
    <div className="inline-flex flex-wrap bg-[#F3F4F6] rounded-lg p-1 gap-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
            selected === opt.value
              ? "bg-white text-[#2251FF] shadow-sm"
              : "text-[#6B7280] hover:text-[#111]"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
