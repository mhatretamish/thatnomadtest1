"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Cpu, Zap, Code, Terminal, Music, Lock, Unlock, Eye, EyeOff, Rocket } from "lucide-react"
import Image from "next/image"

export default function DigitalIdentity() {
  const [isVisible, setIsVisible] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)
  const [isLocked, setIsLocked] = useState(true)
  const [accessLevel, setAccessLevel] = useState(0)
  const [securityBreach, setSecurityBreach] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Skills with proficiency levels
  const skills = [
    { name: "Excuse Making", level: 98 },
    { name: "Procrastination", level: 95 },
    { name: "Music Production", level: 82 },
    { name: "Starting Projects", level: 90 },
    { name: "Finishing Projects", level: 12 },
  ]

  // Personal data that gets "revealed" when unlocked
  const personalData = [
    { label: "Real Name", value: "Tony Stark" },
    { label: "Occupation", value: "Secret Multi-Trillionaire" },
    { label: "Location", value: "Stark Tower" },
    { label: "Status", value: "Building AIs While Avoiding Responsibilities" },
    { label: "Weakness", value: "Finishing Things" },
  ]

  useEffect(() => {
    // Show after a delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    // Simulate occasional glitches
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        triggerGlitch()
      }
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearInterval(glitchInterval)
    }
  }, [])

  // Trigger a visual glitch effect
  const triggerGlitch = () => {
    setIsGlitching(true)
    setTimeout(() => setIsGlitching(false), 500)
  }

  // Handle card flip
  const flipCard = () => {
    setIsFlipped(!isFlipped)
    triggerGlitch()
  }

  // Handle security access attempt
  const attemptAccess = () => {
    triggerGlitch()

    if (isLocked) {
      // Simulate access level increasing
      const interval = setInterval(() => {
        setAccessLevel((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsLocked(false)
            return 100
          }
          return prev + Math.floor(Math.random() * 10) + 5
        })
      }, 100)

      // Random chance of security breach
      if (Math.random() > 0.7) {
        setTimeout(() => {
          setSecurityBreach(true)
          // Trigger system breach event
          window.dispatchEvent(new CustomEvent("systemBreach"))
          clearInterval(interval)
        }, 1500)
      }
    } else {
      setIsLocked(true)
      setAccessLevel(0)
    }
  }

  // Open Cooked AI in a new tab
  const openCookedAI = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open("https://cookedai.netlify.app", "_blank")
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          className="absolute top-4 sm:top-8 right-4 sm:right-8 z-20 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={flipCard}
        >
          <div
            className={`relative w-[250px] sm:w-[300px] h-[350px] sm:h-[400px] transition-all duration-700 transform-gpu preserve-3d ${isFlipped ? "rotate-y-180" : ""} ${isGlitching ? "glitch-effect" : ""}`}
          >
            {/* Front of card */}
            <div
              className={`absolute inset-0 backface-hidden rounded-lg overflow-hidden glass-morphism border border-zinc-800/50 shadow-xl ${isGlitching ? "glitch-horizontal" : ""}`}
            >
              {/* Card header */}
              <div className="bg-black/60 p-4 border-b border-zinc-800/50 flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-xs text-green-500 font-mono">SECURITY CLEARANCE</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 font-mono mr-2">ID-0427</span>
                  <div
                    className={`w-2 h-2 rounded-full ${isLocked ? "bg-red-500" : "bg-green-500"} animate-pulse`}
                  ></div>
                </div>
              </div>

              {/* Card content */}
              <div className="p-4 relative">
                {/* Scan line effect */}
                <div className="absolute inset-0 scan-line pointer-events-none"></div>

                {/* Profile image */}
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-green-500/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 animate-pulse"></div>
                  <Image
                    src="https://avatars.githubusercontent.com/u/89688277?v=4"
                    alt="Profile"
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>

                {/* Identity info */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-white mb-1">TAMISH MHATRE</h3>
                  <p className="text-xs text-gray-400 font-mono">PROFESSIONAL EXCUSE-MAKER</p>

                  <div className="flex items-center justify-center mt-2 space-x-2">
                    <span className="px-2 py-1 bg-zinc-800/50 rounded text-xs text-green-400 font-mono">LVL 27</span>
                    <span className="px-2 py-1 bg-zinc-800/50 rounded text-xs text-yellow-400 font-mono">VERIFIED</span>
                  </div>
                </div>

                {/* Skills visualization */}
                <div className="space-y-2 mb-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="text-xs">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-400 font-mono">{skill.name}</span>
                        <span className="text-green-500 font-mono">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${skill.level > 90 ? "bg-green-500" : skill.level > 70 ? "bg-blue-500" : skill.level > 40 ? "bg-yellow-500" : "bg-red-500"}`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Access control */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Cpu className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-xs text-gray-500 font-mono">SYSTEM</span>
                  </div>

                  <button
                    className={`flex items-center px-3 py-1 rounded text-xs font-mono ${isLocked ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      attemptAccess()
                    }}
                  >
                    {isLocked ? (
                      <>
                        <Lock className="w-3 h-3 mr-1" />
                        LOCKED
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3 h-3 mr-1" />
                        UNLOCKED
                      </>
                    )}
                  </button>
                </div>

                {/* Access level progress */}
                {isLocked && accessLevel > 0 && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500 font-mono">ACCESS LEVEL</span>
                      <span className="text-green-500 font-mono">{accessLevel}%</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${accessLevel}%` }}></div>
                    </div>
                  </div>
                )}

                {/* Security breach warning */}
                {securityBreach && (
                  <div className="mt-2 px-3 py-2 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400 font-mono animate-pulse">
                    WARNING: SECURITY BREACH DETECTED
                  </div>
                )}
              </div>

              {/* Card footer */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 border-t border-zinc-800/50 flex items-center justify-between">
                <div className="flex items-center">
                  <Zap className="w-3 h-3 text-yellow-500 mr-1" />
                  <span className="text-xs text-gray-500 font-mono">ACTIVE</span>
                </div>
                <span className="text-xs text-gray-500 font-mono">TAP TO FLIP</span>
              </div>
            </div>

            {/* Back of card */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-lg overflow-hidden glass-morphism border border-zinc-800/50 shadow-xl">
              {/* Card header */}
              <div className="bg-black/60 p-4 border-b border-zinc-800/50 flex items-center justify-between">
                <div className="flex items-center">
                  <Terminal className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-xs text-green-500 font-mono">PERSONAL DATA</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 font-mono mr-2">CLASSIFIED</span>
                  <div
                    className={`w-2 h-2 rounded-full ${isLocked ? "bg-red-500" : "bg-green-500"} animate-pulse`}
                  ></div>
                </div>
              </div>

              {/* Card content */}
              <div className="p-4 relative">
                {/* Scan line effect */}
                <div className="absolute inset-0 scan-line pointer-events-none"></div>

                {/* Personal data */}
                <div className="space-y-3 mb-4">
                  {personalData.map((data, index) => (
                    <div key={index} className="border border-zinc-800/50 rounded p-2">
                      <div className="text-xs text-gray-500 font-mono mb-1">{data.label}</div>
                      <div className="text-sm font-mono">
                        {isLocked ? (
                          <span className="text-red-400">● ● ● ● ● ● ● ●</span>
                        ) : (
                          <span className="text-green-400">{data.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Projects */}
                <div className="mb-4">
                  <div className="text-xs text-gray-500 font-mono mb-2">PROJECTS</div>
                  <div className="space-y-2">
                    <button
                      className="w-full flex items-center justify-between px-3 py-2 bg-zinc-800/50 rounded text-xs font-mono text-green-400 hover:bg-zinc-700/50 transition-colors"
                      onClick={openCookedAI}
                    >
                      <div className="flex items-center">
                        <Rocket className="w-3 h-3 mr-2" />
                        <span>Cooked AI</span>
                      </div>
                      <span className="text-gray-500">2025</span>
                    </button>
                  </div>
                </div>

                {/* Access control */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Code className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-xs text-gray-500 font-mono">DATA</span>
                  </div>

                  <button
                    className={`flex items-center px-3 py-1 rounded text-xs font-mono ${isLocked ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      attemptAccess()
                    }}
                  >
                    {isLocked ? (
                      <>
                        <EyeOff className="w-3 h-3 mr-1" />
                        HIDDEN
                      </>
                    ) : (
                      <>
                        <Eye className="w-3 h-3 mr-1" />
                        VISIBLE
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Card footer */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 border-t border-zinc-800/50 flex items-center justify-between">
                <div className="flex items-center">
                  <Music className="w-3 h-3 text-green-500 mr-1" />
                  <span className="text-xs text-gray-500 font-mono">VERIFIED ARTIST</span>
                </div>
                <span className="text-xs text-gray-500 font-mono">TAP TO FLIP</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
