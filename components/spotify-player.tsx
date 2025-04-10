"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Minimize2, Maximize2, Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react"
import Image from "next/image"

export default function SpotifyPlayer() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(80)

  // Position for dragging
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Sample track data
  const tracks = [
    {
      id: 1,
      title: "Aao Na",
      duration: 144, // 2:24 in seconds
      image: "https://i.scdn.co/image/ab67616d0000b2738666795b486e518d80fb1907",
      year: "2024",
    },
  ]

  const [currentTrack, setCurrentTrack] = useState(tracks[0])

  useEffect(() => {
    // Listen for the custom event to open the player
    const handleOpenPlayer = () => {
      setIsVisible(true)
      setIsMinimized(false)
    }

    window.addEventListener("openSpotifyPlayer", handleOpenPlayer)

    return () => {
      window.removeEventListener("openSpotifyPlayer", handleOpenPlayer)
    }
  }, [])

  // Simulate playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying && currentTime < currentTrack.duration) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentTrack.duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, currentTime, currentTrack.duration])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const clickPosition = e.clientX - rect.left
    const percentage = clickPosition / rect.width
    const newTime = percentage * currentTrack.duration

    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number.parseInt(e.target.value))
  }

  // Make player draggable
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      const handleMouseMoveEvent = (e: MouseEvent) => handleMouseMove(e as unknown as React.MouseEvent)
      const handleMouseUpEvent = () => handleMouseUp()

      document.addEventListener("mousemove", handleMouseMoveEvent)
      document.addEventListener("mouseup", handleMouseUpEvent)

      return () => {
        document.removeEventListener("mousemove", handleMouseMoveEvent)
        document.removeEventListener("mouseup", handleMouseUpEvent)
      }
    }

    return undefined
  }, [isDragging])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 sm:bottom-8 left-4 sm:left-8 z-50"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            width: isMinimized ? "auto" : "280px",
            maxWidth: "calc(100vw - 32px)",
          }}
        >
          <div className="bg-[#121212] border border-zinc-800 rounded-md overflow-hidden shadow-xl">
            {/* Player header */}
            <div
              className="bg-black px-3 py-2 flex items-center justify-between cursor-move"
              onMouseDown={handleMouseDown}
            >
              <div className="flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#1DB954] mr-1 sm:mr-2"></div>
                <span className="text-xs text-gray-400 ml-1 sm:ml-2 truncate">Sahil Arun - Spotify</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Player content */}
            {!isMinimized && (
              <div className="p-3 sm:p-4">
                {/* Artist info */}
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 mr-3 sm:mr-4 overflow-hidden rounded-full">
                    <Image
                      src="https://i.scdn.co/image/ab67616d0000b2738666795b486e518d80fb1907"
                      alt="Sahil Arun"
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm sm:text-base">Sahil Arun</h3>
                    <p className="text-gray-400 text-xs">Verified Artist</p>
                    <p className="text-gray-400 text-xs">3,542 monthly listeners</p>
                  </div>
                </div>

                {/* Track info */}
                <div className="flex items-center mb-4">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 mr-2 sm:mr-3 overflow-hidden rounded">
                    <Image
                      src={currentTrack.image || "https://i.scdn.co/image/ab67616d0000b2738666795b486e518d80fb1907"}
                      alt={currentTrack.title}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white text-xs sm:text-sm font-medium">{currentTrack.title}</h4>
                    <p className="text-gray-400 text-xs">{currentTrack.year} • Single</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1 bg-gray-800 rounded-full mb-2 cursor-pointer" onClick={handleProgressClick}>
                  <div
                    className="h-full bg-[#1DB954] rounded-full"
                    style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-xs text-gray-400 mb-4">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(currentTrack.duration)}</span>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center mb-4">
                  <button className="text-gray-400 hover:text-white mx-1 sm:mx-2">
                    <SkipBack size={18} className="sm:w-5 sm:h-5" />
                  </button>
                  <button
                    className="bg-white text-black rounded-full p-1.5 sm:p-2 mx-1 sm:mx-2 hover:scale-105 transition-transform"
                    onClick={handlePlayPause}
                  >
                    {isPlaying ? (
                      <Pause size={18} className="sm:w-5 sm:h-5" />
                    ) : (
                      <Play size={18} className="sm:w-5 sm:h-5" />
                    )}
                  </button>
                  <button className="text-gray-400 hover:text-white mx-1 sm:mx-2">
                    <SkipForward size={18} className="sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Volume control */}
                <div className="flex items-center">
                  <Volume2 size={14} className="text-gray-400 mr-2 sm:w-4 sm:h-4" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1 bg-gray-800 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 sm:[&::-webkit-slider-thumb]:h-3 sm:[&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                  />
                </div>
              </div>
            )}
          </div>

          {isMinimized && (
            <div className="absolute bottom-0 left-0 bg-[#1DB954] text-black text-xs px-2 py-1 rounded-br-md rounded-tl-md">
              Spotify
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
