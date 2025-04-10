"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function ParallaxHeader() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // Check if mobile
    setIsMobile(window.innerWidth < 768)

    // Update mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    // Update window size on resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Calculate parallax values
  const calcParallax = (depth: number) => {
    const centerX = windowSize.width / 2
    const centerY = windowSize.height / 2

    const moveX = (mousePosition.x - centerX) / centerX
    const moveY = (mousePosition.y - centerY) / centerY

    // Reduce parallax effect on mobile
    const mobileFactor = isMobile ? 0.3 : 1

    return {
      x: moveX * depth * mobileFactor,
      y: moveY * depth * mobileFactor,
    }
  }

  // Different parallax depths for different elements
  const nameParallax = calcParallax(40)
  const subtitleParallax = calcParallax(20)
  const bgParallax = calcParallax(-15)
  const glitchHorizontalParallax = calcParallax(10)
  const glitchVerticalParallax = calcParallax(15)

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background grid with parallax */}
      <motion.div
        className="absolute inset-0 bg-grid-pattern opacity-10"
        animate={{
          x: bgParallax.x,
          y: bgParallax.y,
        }}
        transition={{ type: "spring", stiffness: 75, damping: 30, mass: 0.5 }}
      />

      {/* Glitch effects with parallax */}
      <motion.div
        className="glitch-horizontal"
        animate={{
          y: glitchHorizontalParallax.y,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30, mass: 0.8 }}
      />

      <motion.div
        className="glitch-vertical"
        animate={{
          x: glitchVerticalParallax.x,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30, mass: 0.8 }}
      />

      {/* Content with parallax */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <motion.div
          animate={{
            x: nameParallax.x,
            y: nameParallax.y,
          }}
          transition={{ type: "spring", stiffness: 75, damping: 30, mass: 0.5 }}
          className="mb-4"
        >
          <div className="glitch-wrapper">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold glitch-text" data-text="TAMISH MHATRE">
              TAMISH MHATRE
            </h1>
          </div>
        </motion.div>

        <motion.h2
          className="text-base sm:text-xl md:text-2xl text-gray-400 font-light tracking-wider mb-8 text-center"
          animate={{
            x: subtitleParallax.x,
            y: subtitleParallax.y,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30, mass: 0.8 }}
        >
          PROFESSIONAL EXCUSE-MAKER WITH A WIFI CONNECTION
        </motion.h2>
      </div>
    </div>
  )
}
