"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function MatrixRain({ onComplete }: { onComplete?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isActive, setIsActive] = useState(true)
  const [glitchEffect, setGlitchEffect] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Matrix rain characters - mix of Japanese katakana, numbers, and hacker symbols
    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789!@#$%^&*()_+-=[]{}|;:,./<>?\\~`"
    const charArray = chars.split("")

    // Create drops
    const fontSize = isMobile ? 10 : 14 // Slightly smaller font size for better performance
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = []
    const speeds: number[] = []
    const colors: string[] = []
    const opacities: number[] = [] // Add opacity variation for more depth

    // Initialize drops with random positions and speeds
    const initDrops = () => {
      // Adjust density to ensure full coverage while maintaining performance
      const dropDensity = isMobile ? 0.7 : 1.0 // Increased density for better coverage

      // Calculate columns to ensure we cover the entire width with no gaps
      const actualColumns = Math.ceil(canvas.width / (window.devicePixelRatio || 1) / fontSize) + 1

      // Clear existing arrays
      drops.length = 0
      speeds.length = 0
      colors.length = 0
      opacities.length = 0

      // Create drops with better distribution
      for (let i = 0; i < actualColumns; i++) {
        // Stagger the initial positions to create a more natural rain effect
        drops[i] = ((Math.random() * -canvas.height) / fontSize) * 2

        // Vary speeds more for visual interest
        speeds[i] = Math.random() * 1.5 + 0.3

        // More varied green shades with occasional blue tint for depth
        const greenIntensity = Math.floor(Math.random() * 155) + 100
        const blueTint = Math.floor(Math.random() * 30)
        colors[i] = `rgba(0, ${greenIntensity}, ${blueTint}, 1)`

        // Random opacity for depth effect
        opacities[i] = Math.random() * 0.5 + 0.5
      }

      // Add extra drops for wider screens to ensure coverage
      if (canvas.width > 1200 * (window.devicePixelRatio || 1)) {
        const extraColumns = Math.floor(actualColumns * 0.2) // Add 20% more for wide screens
        for (let i = 0; i < extraColumns; i++) {
          const randomPos = Math.floor(Math.random() * actualColumns)
          drops.push((Math.random() * -canvas.height) / fontSize)
          speeds.push(Math.random() * 1.5 + 0.3)

          const greenIntensity = Math.floor(Math.random() * 155) + 100
          const blueTint = Math.floor(Math.random() * 30)
          colors.push(`rgba(0, ${greenIntensity}, ${blueTint}, 1)`)

          opacities.push(Math.random() * 0.5 + 0.5)
        }
      }
    }

    // Set canvas dimensions
    const resizeCanvas = () => {
      // Use device pixel ratio for sharper rendering
      const dpr = window.devicePixelRatio || 1

      // Add a small buffer to ensure we cover any potential gaps at edges
      canvas.width = Math.ceil(window.innerWidth * dpr) + fontSize * dpr
      canvas.height = Math.ceil(window.innerHeight * dpr) + fontSize * dpr

      // Scale the canvas back down with CSS
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`

      // Position the canvas to cover any potential gaps
      canvas.style.position = "fixed"
      canvas.style.top = "0"
      canvas.style.left = "0"

      // Scale the context to match the device pixel ratio
      ctx.scale(dpr, dpr)

      // Reset drops when resizing
      initDrops()
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Glitch effect timers
    let glitchTimer: NodeJS.Timeout
    const triggerGlitch = () => {
      setGlitchEffect(true)
      setTimeout(() => setGlitchEffect(false), 200)

      glitchTimer = setTimeout(triggerGlitch, Math.random() * 2000 + 1000) // Random interval between 1-3 seconds
    }

    // Start glitch effect after a delay
    const initialGlitchTimer = setTimeout(triggerGlitch, 1000)

    // Drawing function
    const draw = () => {
      // Black BG with opacity for fade effect - adjusted for better trail
      ctx.fillStyle = isMobile ? "rgba(0, 0, 0, 0.15)" : "rgba(0, 0, 0, 0.08)"
      ctx.fillRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1))

      // Loop through drops
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)]

        // Set color with varying opacity
        const color = colors[i].replace("1)", `${opacities[i]})`)
        ctx.fillStyle = color
        ctx.font = `${fontSize}px monospace`

        // Draw character
        const xPos = (i * fontSize) % (canvas.width / (window.devicePixelRatio || 1))
        const yPos = drops[i] * fontSize

        // Expanded drawing bounds to ensure coverage of edges
        if (yPos > -fontSize * 2 && yPos < canvas.height / (window.devicePixelRatio || 1) + fontSize * 2) {
          ctx.fillText(char, xPos, yPos)

          // Add a leading brighter character for a "head" effect
          if (Math.random() > 0.8) {
            // Increased probability for more visible heads
            ctx.fillStyle = "rgba(180, 255, 180, 0.95)"
            ctx.fillText(char, xPos, yPos)
          }
        }

        // Move drop down based on its speed
        if (drops[i] * fontSize > canvas.height / (window.devicePixelRatio || 1)) {
          // Reset to just above the top of the screen for continuous flow
          drops[i] = -2 - Math.random() * 5 // Staggered re-entry
        }
        drops[i] += speeds[i]
      }

      // Add occasional bright flashes for visual interest
      if (Math.random() > 0.97) {
        const randomColumn = Math.floor(Math.random() * drops.length)
        if (drops[randomColumn] !== undefined) {
          const randomRow = Math.floor(drops[randomColumn])
          const xPos = (randomColumn * fontSize) % (canvas.width / (window.devicePixelRatio || 1))
          const yPos = randomRow * fontSize

          if (yPos > 0 && yPos < canvas.height / (window.devicePixelRatio || 1)) {
            ctx.fillStyle = "rgba(255, 255, 255, 1)"
            ctx.fillText(charArray[Math.floor(Math.random() * charArray.length)], xPos, yPos)
          }
        }
      }
    }

    // Animation loop with throttling for better performance
    let animationId: number
    let lastTime = 0

    const animate = (timestamp: number) => {
      animationId = requestAnimationFrame(animate)

      // Throttle the frame rate
      const elapsed = timestamp - lastTime

      // Adaptive frame rate based on device performance
      const currentFpsInterval = isMobile ? 1000 / 30 : 1000 / 60

      if (elapsed < currentFpsInterval) return

      lastTime = timestamp - (elapsed % currentFpsInterval)
      draw()
    }

    animationId = requestAnimationFrame(animate)

    // After 5 seconds, fade out and call onComplete
    const timer = setTimeout(() => {
      setIsActive(false)
      if (onComplete) {
        setTimeout(onComplete, 1000) // Call onComplete after fade animation
      }
    }, 5000)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
      clearTimeout(timer)
      clearTimeout(initialGlitchTimer)
      clearTimeout(glitchTimer)
    }
  }, [onComplete, isMobile])

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <canvas ref={canvasRef} className="w-full h-full" />

          {/* Glitch overlay */}
          {glitchEffect && <div className="absolute inset-0 bg-green-500 opacity-10 z-10"></div>}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
