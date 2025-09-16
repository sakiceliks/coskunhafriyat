"use client"

import React from "react"

import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

interface AnimatedButtonProps extends ButtonProps {
  hoverScale?: number
  tapScale?: number
  hoverEffect?: "scale" | "lift" | "glow" | "pulse" | "bounce" | "shine" | "none"
  iconAnimation?: boolean
  iconRotate?: boolean
}

export function AnimatedButton({
  children,
  className,
  hoverScale = 1.05,
  tapScale = 0.95,
  hoverEffect = "scale",
  iconAnimation = false,
  iconRotate = false,
  ...props
}: AnimatedButtonProps) {
  const prefersReducedMotion = useReducedMotion()

  // If user prefers reduced motion, disable animations
  if (prefersReducedMotion) {
    return (
      <Button className={cn("text-white", className)} {...props}>
        {children}
      </Button>
    )
  }

  // Get hover animation based on selected effect
  const getHoverAnimation = () => {
    switch (hoverEffect) {
      case "scale":
        return { scale: hoverScale, transition: { duration: 0.2 } }
      case "lift":
        return { y: -5 }
      case "glow":
        return { filter: "drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))" }
      case "pulse":
        return {
          scale: [1, 1.05, 1],
          transition: { duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" as const },
        }
      case "bounce":
        return {
          y: [0, -6, 0],
          transition: { duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" as const },
        }
      case "shine":
        return { scale: 1.02 }
      case "none":
      default:
        return {}
    }
  }

  // Process children to add icon animation if needed
  const processChildren = () => {
    if (!iconAnimation && !iconRotate) return children

    return React.Children.map(children, (child, index) => {
      // Check if the child is the last element and likely an icon
      if (index === React.Children.count(children) - 1 && React.isValidElement(child)) {
        // Apply animation to icon (assumed to be the last child)
        return (
          <motion.div
            animate={iconRotate ? { rotate: 360 } : { x: [0, 4, 0] }}
            transition={{
              repeat: iconRotate ? 1 : 3,
              repeatType: "loop" as const,
              duration: 0.6,
              ease: "easeInOut",
              repeatDelay: 0.2,
            }}
          >
            {child}
          </motion.div>
        )
      }
      return child
    })
  }

  return (
    <motion.div whileHover={getHoverAnimation()} whileTap={{ scale: tapScale }} className="inline-block">
      <Button className={cn("text-white", className)} {...props}>
        {processChildren()}
      </Button>
    </motion.div>
  )
}
