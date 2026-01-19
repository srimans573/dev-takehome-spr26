import React, { useState, useRef, useEffect } from "react";

export type StatusType = "pending" | "approved" | "completed" | "rejected";

interface DropdownProps {
  status?: StatusType;
  onChange?: (status: StatusType) => void;
}

const options: { value: StatusType; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "completed", label: "Completed" },
  { value: "rejected", label: "Rejected" },
];

const statusStyles: Record<
  StatusType,
  { bg: string; text: string; dot: string }
> = {
  pending: {
    bg: "bg-negative-fill",
    text: "text-negative-text",
    dot: "bg-negative-indicator",
  },
  approved: {
    bg: "bg-warning-fill",
    text: "text-warning-text",
    dot: "bg-warning-indicator",
  },
  completed: {
    bg: "bg-success-fill",
    text: "text-success-text",
    dot: "bg-success-indicator",
  },
  rejected: {
    bg: "bg-danger-fill",
    text: "text-danger-text",
    dot: "bg-danger-indicator",
  },
};

export default function Dropdown({
  status = "pending",
  onChange,
}: DropdownProps) {
  const [selected, setSelected] = useState<StatusType>(status);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentStyles = statusStyles[selected];

  const handleSelect = (value: StatusType) => {
    setSelected(value);
    setIsOpen(false);
    onChange?.(value);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* selected value button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-1.5 py-1 rounded-md border border-gray-stroke bg-white cursor-pointer"
      >
        {/* inside  badge*/}
        <span
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${currentStyles.bg} ${currentStyles.text}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${currentStyles.dot}`} />
          <span>{options.find((o) => o.value === selected)?.label}</span>
        </span>
        {/* outside badge */}
        <svg
          className={`w-4 h-4 text-gray-text transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed right-30 z-50 mt-0 min-w-[140px] bg-white border border-gray-stroke rounded-lg shadow-lg overflow-hidden">
          {options.map((option) => {
            const optStyles = statusStyles[option.value];
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`
                  w-full flex items-center gap-2 px-2 py-1.5 text-left
                  hover:bg-gray-fill transition-colors
                  ${option.value === selected ? "bg-gray-fill-light" : ""}
                `}
              >
                <span
                  className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${optStyles.bg} ${optStyles.text}`}
                >
                    <span
                    className={`w-1.5 h-1.5 rounded-full ${optStyles.dot}`}
                  />
                          <span>{option.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
