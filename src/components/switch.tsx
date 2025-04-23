"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CustomSwitchProps {
  id?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  thumbClassName?: string;
  disabled?: boolean;
}
export const CustomSwitch = ({
  id,
  checked: controlledChecked,
  onCheckedChange,
  className,
  thumbClassName,
  disabled = false,
}: CustomSwitchProps) => {
  const [internalChecked, setInternalChecked] = useState<boolean>(() => controlledChecked ?? false);

  const handleToggle = () => {
    if (disabled) return;

    const newValue = !internalChecked;
    setInternalChecked(newValue);
    onCheckedChange?.(newValue);
  };

  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={internalChecked}
      disabled={disabled}
      onClick={handleToggle}
      className={cn(
        "relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        internalChecked ? "bg-black" : "bg-gray-200",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <span className="sr-only">Toggle switch</span>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full shadow-lg ring-0 transition-transform duration-300 ease-in-out",
          internalChecked ? "translate-x-6 bg-white" : "translate-x-0 bg-black",
          thumbClassName
        )}
      />
    </button>
  );
};
