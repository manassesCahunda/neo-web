"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ToggleSwitchProps {
  defaultValue?: boolean
  onChange?: (checked: boolean) => void
  className?: string
  disabled?: boolean
}

export function ToggleSwitch({ defaultValue , onChange, className}: ToggleSwitchProps) {
  const [isChecked, setIsChecked] = useState(defaultValue)

  useEffect(() => {
    setIsChecked(defaultValue)
  }, [defaultValue])

  const handleToggle = () => {
    if (disabled) return

    const newValue = !isChecked
    setIsChecked(newValue)
    onChange?.(newValue)
  }

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isChecked ? "bg-black" : "bg-slate-300",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      aria-checked={isChecked}
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
          marginLeft: isChecked ? "auto" : "2px",
          marginRight: isChecked ? "2px" : "auto",
        }}
      />
    </motion.button>
  )
}
