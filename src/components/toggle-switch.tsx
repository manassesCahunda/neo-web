"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ToggleSwitchProps {
  value: boolean
  onChange?: (checked: boolean) => void
  className?: string
}

export function ToggleSwitch({
  value,
  onChange,
  className,
}: ToggleSwitchProps) {
  const handleToggle = () => {
    onChange?.(!value)
  }

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        value ? "bg-black" : "bg-slate-300",
        className,
      )}
      aria-checked={value}
    >
      <motion.span
        className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg"
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        style={{
          marginLeft: value ? "auto" : "2px",
          marginRight: value ? "2px" : "auto",
        }}
      />
    </motion.button>
  )
}
