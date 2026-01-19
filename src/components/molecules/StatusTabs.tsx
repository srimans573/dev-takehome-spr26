import React from "react";
import { RequestStatus } from "@/lib/types/request";

export type StatusTab = "all" | RequestStatus;

interface StatusTabsProps {
  activeTab: StatusTab;
  onTabChange: (tab: StatusTab) => void;
}

const tabs: { value: StatusTab; label: string }[] = [
  { value: "all", label: "All" },
  { value: RequestStatus.PENDING, label: "Pending" },
  { value: RequestStatus.APPROVED, label: "Approved" },
  { value: RequestStatus.COMPLETED, label: "Completed" },
  { value: RequestStatus.REJECTED, label: "Rejected" },
];

export default function StatusTabs({ activeTab, onTabChange }: StatusTabsProps) {
  return (
    <div className="flex ml-4 flex-wrap gap-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={`
              px-5 py-2 text-sm font-medium transition-colors
              ${isActive
                ? "bg-primary text-white"
                : "bg-gray-fill text-gray-text-dark hover:bg-[#EFF6FF]"
              }
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
