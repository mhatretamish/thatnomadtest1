"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import Image from "next/image"

interface Project {
  id: string
  title: string
  description: string
  image: string
  url: string
  color: string
  technologies: string[]
}

export default function ProjectCoverShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Update the projects array to include more accurate descriptions and links
  const projects: Project[] = [
    {
      id: "zentry",
      title: "Zentry.com Clone",
      description: "A pixel-perfect recreation with smooth animations and responsive design",
      image: "https://iili.io/3anjJql.webp",
      url: "https://zentry-com-clone.vercel.app/",
      color: "#5046e5",
      technologies: ["React", "Tailwind CSS", "GSAP", "Framer Motion"],
    },
    {
      id: "dffrntera",
      title: "Dffrntera",
      description: "Professional website with modern design and interactive elements",
      image: "https://iili.io/3aBp1ZG.jpg",
      url: "https://dffrntera.com/en/",
      color: "#22c55e",
      technologies: ["Next.js", "React", "Tailwind CSS", "Responsive Design"],
    },
    {
      id: "chaingpt",
      title: "ChainGPT",
      description: "Blockchain and AI-focused website with advanced web technologies",
      image: "https://iili.io/3anj9s4.webp",
      url: "https://www.chaingpt.org/",
      color: "#3b82f6",
      technologies: ["React", "Web3", "Animation Libraries", "API Integration"],
    },
    {
      id: "memepay",
      title: "MemePay",
      description: "Cryptocurrency payment app with digital and physical cards",
      image: "https://iili.io/3anjqmu.webp",
      url: "https://apps.apple.com/in/app/memepay/id6505071831",
      color: "#f59e0b",
      technologies: ["Swift", "iOS", "Blockchain", "Digital Payments"],
    },
    {
      id: "fanbase",
      title: "Fanbase",
      description: "Social media platform for content creators with video, audio chat, and live streaming",
      image: "https://iili.io/3anjfee.webp",
      url: "https://apps.apple.com/in/app/fanbase/id1439232869",
      color: "#a855f7",
      technologies: ["Swift", "iOS", "Media Streaming", "Social Networking"],
    },
  ]

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, projects.length])

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false)
  }

  const handleMouseLeave = () => {
    setIsAutoPlaying(true)
  }

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }

  const currentProject = projects[currentIndex]

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg border border-zinc-800 bg-black/30"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main showcase */}
      <div className="relative aspect-[16/9] w-full">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentProject.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* Project image */}
            <div className="relative w-full h-full">
              <Image
                src={currentProject.image || "/placeholder.svg"}
                alt={currentProject.title}
                fill
                className="object-cover"
                priority
              />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `linear-gradient(to right, ${currentProject.color}00, ${currentProject.color})`,
                }}
              ></div>
            </div>

            {/* Project info overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4" style={{ color: currentProject.color }}>
                  {currentProject.title}
                </h2>
                <p className="text-white text-sm md:text-lg mb-4 md:mb-6">{currentProject.description}</p>

                <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                  {currentProject.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-sm">
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={currentProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-sm text-sm transition-colors"
                  style={{
                    backgroundColor: `${currentProject.color}20`,
                    borderColor: `${currentProject.color}50`,
                    color: currentProject.color,
                    borderWidth: "1px",
                  }}
                >
                  <span>Visit Project</span>
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
          onClick={handlePrevious}
          aria-label="Previous project"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
          onClick={handleNext}
          aria-label="Next project"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex
                ? `bg-${currentProject.color.replace("#", "")} opacity-100`
                : "bg-white/50 opacity-50"
            }`}
            style={{ backgroundColor: index === currentIndex ? currentProject.color : undefined }}
            onClick={() => {
              setIsAutoPlaying(false)
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            aria-label={`Go to project ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  )
}
