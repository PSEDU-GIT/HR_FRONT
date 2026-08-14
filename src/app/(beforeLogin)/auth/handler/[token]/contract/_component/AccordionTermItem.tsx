'use client';

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionTermItemProps {
  id: number;
  label: string;
  checked: boolean;
  isOpen: boolean;
  onToggleCheck: (checked: boolean) => void;
  onToggleOpen: () => void;
  content: React.ReactNode;
}

export default function AccordionTermItem({
  label,
  checked,
  isOpen,
  onToggleCheck,
  onToggleOpen,
  content,
}: AccordionTermItemProps) {
  return (
    <div className="py-2">
      <div className="flex items-center justify-between">
        <label className="flex cursor-pointer items-center space-x-2">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onToggleCheck(e.target.checked)}
            className="text-custom-indigo focus:ring-custom-indigo h-4 w-4 rounded border-slate-300"
          />
          <span className="text-text-main text-xs font-medium">{label}</span>
        </label>
        <button
          type="button"
          onClick={onToggleOpen}
          className="text-text-side hover:text-text-main p-1 dark:hover:text-slate-200"
        >
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>
      {isOpen && (
        <div className="bg-custom-slate-bg text-text-sub mt-2 rounded p-2.5 text-11 font-normal leading-relaxed">
          {content}
        </div>
      )}
    </div>
  );
}
