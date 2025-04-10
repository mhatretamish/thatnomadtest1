"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { X, Minimize2, Maximize2 } from "lucide-react"

interface InteractiveTerminalProps {
  initialContent?: string[]
  title?: string
  onClose?: () => void
}

export default function InteractiveTerminal({
  initialContent = ["Welcome to Terminal", "Type 'help' for available commands"],
  title = "tamish@portfolio:~",
  onClose,
}: InteractiveTerminalProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [content, setContent] = useState<string[]>(initialContent)
  const [input, setInput] = useState("")
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Available commands
  const commands = {
    help: () => {
      setContent([
        ...content,
        "Available commands:",
        "  help - Show this help message",
        "  clear - Clear the terminal",
        "  echo [text] - Display text",
        "  date - Show current date and time",
        "  whoami - Display current user",
        "  projects - List portfolio projects",
        "  contact - Show contact information",
        "  social - Show social media links",
      ])
    },
    clear: () => {
      setContent([])
    },
    echo: (args: string[]) => {
      setContent([...content, args.join(" ")])
    },
    date: () => {
      setContent([...content, new Date().toString()])
    },
    whoami: () => {
      setContent([...content, "Tamish Mhatre - Full-Stack & Mobile Developer"])
    },
    projects: () => {
      setContent([
        ...content,
        "Portfolio Projects:",
        "1. MemePay - iOS Cryptocurrency Payment App",
        "2. Fanbase - iOS Social Media Platform",
        "3. Dffrntera - Professional Website",
        "4. ChainGPT - Blockchain & AI Website",
        "5. Zentry.com Clone - Pixel-perfect Recreation",
        "",
        "Type 'project [number]' for more details",
      ])
    },
    project: (args: string[]) => {
      const projectNum = Number.parseInt(args[0])
      if (isNaN(projectNum) || projectNum < 1 || projectNum > 5) {
        setContent([...content, "Invalid project number. Use 'projects' to see available projects."])
        return
      }

      const projectDetails = [
        "MemePay - iOS Cryptocurrency Payment App\nA cryptocurrency payment app with digital and physical cards, seamless card management, and secure transactions.\nTechnologies: Swift, iOS, Blockchain, Digital Payments, UI/UX Design\nAvailable on App Store: https://apps.apple.com/in/app/memepay/id6505071831",
        "Fanbase - iOS Social Media Platform\nA social media platform for content creators with features for video, audio chat, pictures, and live streaming.\nTechnologies: Swift, iOS, Media Streaming, Social Networking, Real-time Communication\nAvailable on App Store: https://apps.apple.com/in/app/fanbase/id1439232869",
        "Dffrntera - Professional Website\nA professional website built as a freelance developer, featuring modern design and interactive elements.\nTechnologies: Next.js, React, Tailwind CSS, Responsive Design\nWebsite: https://dffrntera.com/en/",
        "ChainGPT - Blockchain & AI Website\nA blockchain and AI-focused website developed as a freelance project, showcasing advanced web technologies.\nTechnologies: React, Web3, Animation Libraries, API Integration\nWebsite: https://www.chaingpt.org/",
        "Zentry.com Clone - Pixel-perfect Recreation\nA pixel-perfect recreation of Zentry.com, built from scratch with attention to detail and smooth animations.\nTechnologies: React, Tailwind CSS, GSAP, Responsive Design\nWebsite: https://zentry-com-clone.vercel.app/",
      ]

      setContent([...content, projectDetails[projectNum - 1].split("\n").join("\n")])
    },
    contact: () => {
      setContent([
        ...content,
        "Contact Information:",
        "Email: tamish@example.com",
        "GitHub: github.com/tamish",
        "",
        "Social Media:",
        "LinkedIn: linkedin.com/in/tamish-mhatre-885317243",
        "Instagram: instagram.com/tamishmhatre",
        "X (Twitter): x.com/TamishMhatre",
        "",
        "Type 'social' for direct links to social profiles",
      ])
    },
    social: () => {
      setContent([
        ...content,
        "Social Media Links:",
        "LinkedIn: https://www.linkedin.com/in/tamish-mhatre-885317243/",
        "Instagram: https://www.instagram.com/tamishmhatre/",
        "X (Twitter): https://x.com/TamishMhatre",
      ])
    },
  }

  // Handle command execution
  const executeCommand = (cmd: string) => {
    if (!cmd.trim()) return

    // Add command to history
    setHistory([cmd, ...history])
    setHistoryIndex(-1)

    // Display command in terminal
    setContent([...content, `$ ${cmd}`])

    // Parse command and arguments
    const args = cmd.trim().split(" ")
    const command = args[0].toLowerCase()
    const commandArgs = args.slice(1)

    // Execute command
    if (command in commands) {
      ;(commands as any)[command](commandArgs)
    } else {
      setContent([...content, `Command not found: ${command}. Type 'help' for available commands.`])
    }

    // Clear input
    setInput("")
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    executeCommand(input)
  }

  // Handle key navigation through history
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  // Make terminal draggable
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return
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

  // Handle window events
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

  // Scroll to bottom when content changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight
    }
  }, [content])

  // Focus input when terminal is visible and not minimized
  useEffect(() => {
    if (!isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isMinimized])

  // Toggle maximize state
  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
    if (isMinimized) setIsMinimized(false)
  }

  // Toggle minimize state
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  // Handle close
  const handleClose = () => {
    if (onClose) onClose()
  }

  return (
    <motion.div
      className="fixed z-50"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: isMaximized ? "100%" : isMinimized ? "auto" : "600px",
        height: isMaximized ? "100%" : "auto",
        top: isMaximized ? 0 : "auto",
        left: isMaximized ? 0 : "auto",
        right: isMaximized ? 0 : "auto",
        bottom: isMaximized ? 0 : "auto",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`bg-black/80 backdrop-blur-md border border-zinc-800/50 rounded-lg overflow-hidden shadow-2xl shadow-black/30 ring-1 ring-white/10 ${
          isMaximized ? "w-full h-full rounded-none" : "w-full"
        }`}
      >
        {/* Terminal header */}
        <div
          className="bg-zinc-900/90 backdrop-blur-md px-4 py-2 flex items-center justify-between cursor-move border-b border-zinc-800/50"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center">
            <div className="flex space-x-2 mr-3">
              <button
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                onClick={handleClose}
                aria-label="Close"
              ></button>
              <button
                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"
                onClick={toggleMinimize}
                aria-label="Minimize"
              ></button>
              <button
                className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"
                onClick={toggleMaximize}
                aria-label="Maximize"
              ></button>
            </div>
            <span className="text-xs text-gray-400 ml-2 font-mono">{title}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMinimize}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Minimize"
            >
              <Minimize2 size={14} />
            </button>
            <button
              onClick={toggleMaximize}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Maximize"
            >
              {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Terminal content */}
        {!isMinimized && (
          <div
            className={`p-3 sm:p-4 font-mono text-xs sm:text-sm text-green-500 bg-black/60 backdrop-blur-md overflow-y-auto ${
              isMaximized ? "h-[calc(100vh-40px)]" : "h-[400px]"
            }`}
            ref={contentRef}
          >
            {/* Terminal output */}
            {content.map((line, index) => (
              <div key={index} className="mb-1 whitespace-pre-wrap">
                {line}
              </div>
            ))}

            {/* Command input */}
            <form onSubmit={handleSubmit} className="flex items-center mt-2">
              <span className="text-green-500 mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none outline-none text-green-500 font-mono text-sm"
                autoFocus
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          </div>
        )}
      </div>

      {isMinimized && (
        <div className="absolute bottom-0 right-0 bg-green-500 text-black text-xs px-2 py-1 rounded-bl-md rounded-tr-md">
          Terminal
        </div>
      )}
    </motion.div>
  )
}
