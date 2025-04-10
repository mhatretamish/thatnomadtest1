"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Minimize2,
  Maximize2,
  ChevronRight,
  Wifi,
  Clock,
  Battery,
  Disc,
  Zap,
  Folder,
  File,
  FileText,
} from "lucide-react"

export default function TerminalHacker() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [currentLine, setCurrentLine] = useState(0)
  const [cursorPosition, setCursorPosition] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [terminalLines, setTerminalLines] = useState<
    {
      text: string
      isCommand?: boolean
      isResponse?: boolean
      timestamp?: string
    }[]
  >([])
  const [currentCommand, setCurrentCommand] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const [systemStatus, setSystemStatus] = useState({
    battery: Math.floor(Math.random() * 100),
    wifi: Math.random() > 0.2,
    cpu: Math.floor(Math.random() * 30) + 10,
    memory: Math.floor(Math.random() * 40) + 30,
  })
  const [currentDirectory, setCurrentDirectory] = useState("/home/tamish")
  const [fileSystem, setFileSystem] = useState({
    "/home/tamish": {
      type: "directory",
      children: ["documents", "music", "projects", ".config", ".ssh", "secrets.txt", "README.md"],
    },
    "/home/tamish/documents": {
      type: "directory",
      children: ["resume.pdf", "ideas.txt", "never_finished.md"],
    },
    "/home/tamish/music": {
      type: "directory",
      children: ["spotify_tracks.txt", "unreleased.mp3"],
    },
    "/home/tamish/projects": {
      type: "directory",
      children: ["abandoned", "half_finished", "sneaklab"],
    },
    "/home/tamish/projects/abandoned": {
      type: "directory",
      children: ["project1.txt", "project2.txt", "project3.txt"],
    },
    "/home/tamish/projects/half_finished": {
      type: "directory",
      children: ["todo.md", "ideas.js"],
    },
    "/home/tamish/projects/sneaklab": {
      type: "directory",
      children: ["README.md", "mockup.png", "never_launched.txt"],
    },
  })

  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const hackerLines = [
    "$ ssh tamish@portfolio.com",
    "Password: ********",
    "Access granted. Initializing system...",
    "$ cd /secrets",
    "$ ls -la",
    "total 4",
    "drwxr-xr-x  2 tamish tamish 4096 Apr 4 2025 .",
    "drwxr-xr-x 22 tamish tamish 4096 Apr 4 2025 ..",
    "-rw-r--r--  1 tamish tamish    0 Apr 4 2025 real_achievements.txt",
    "-rw-r--r--  1 tamish tamish   10 Apr 4 2025 bank_account.txt",
    "-rw-r--r--  1 tamish tamish  120 Apr 4 2025 future_plans.txt",
    "-rw-r--r--  1 tamish tamish  156 Apr 4 2025 skills.txt",
    "$ _",
  ]

  // Available commands for autocomplete
  const availableCommands = [
    "help",
    "clear",
    "ls",
    "cd",
    "cat",
    "spotify",
    "exit",
    "pwd",
    "echo",
    "whoami",
    "date",
    "history",
    "tree",
  ]

  useEffect(() => {
    // Show terminal after a delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isVisible || isMinimized) return

    if (currentLine < hackerLines.length) {
      setIsTyping(true)
      const line = hackerLines[currentLine]

      const typingInterval = setInterval(() => {
        if (cursorPosition < line.length) {
          setCursorPosition((prev) => prev + 1)
        } else {
          clearInterval(typingInterval)
          setIsTyping(false)

          // Move to next line after a pause
          setTimeout(() => {
            setCurrentLine((prev) => prev + 1)
            setCursorPosition(0)

            // Add the line to terminal lines
            if (currentLine < hackerLines.length - 1) {
              setTerminalLines((prev) => [
                ...prev,
                {
                  text: line,
                  isCommand: line.startsWith("$"),
                  isResponse: !line.startsWith("$"),
                  timestamp: getCurrentTime(),
                },
              ])
            }
          }, 500)
        }
      }, 30)

      return () => clearInterval(typingInterval)
    }
  }, [isVisible, isMinimized, currentLine, cursorPosition])

  // Scroll to bottom when terminal lines change
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalLines])

  // Focus input when terminal is visible and not minimized
  useEffect(() => {
    if (isVisible && !isMinimized && currentLine >= hackerLines.length && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isVisible, isMinimized, currentLine])

  // Update system status periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus((prev) => ({
        battery: Math.max(0, prev.battery + (Math.random() > 0.7 ? -1 : 0)),
        wifi: Math.random() > 0.05 ? prev.wifi : !prev.wifi,
        cpu: Math.min(100, Math.max(5, prev.cpu + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5))),
        memory: Math.min(
          100,
          Math.max(20, prev.memory + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3)),
        ),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Make terminal draggable
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

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

  // Get current time for command timestamp
  const getCurrentTime = () => {
    const now = new Date()
    return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`
  }

  // Handle command execution
  const executeCommand = (command: string) => {
    // Add command to history
    setCommandHistory((prev) => [...prev, command])
    setHistoryIndex(-1)

    // Add command to terminal lines with timestamp
    setTerminalLines((prev) => [
      ...prev,
      {
        text: `$ ${command}`,
        isCommand: true,
        timestamp: getCurrentTime(),
      },
    ])

    // Process command
    let response: string[] = []

    const commandLower = command.toLowerCase().trim()
    const args = commandLower.split(" ")
    const mainCommand = args[0]

    if (commandLower === "help") {
      response = [
        "Available commands:",
        "  help - Show this help message",
        "  clear - Clear the terminal",
        "  ls [directory] - List files in directory",
        "  cd [directory] - Change directory",
        "  pwd - Print working directory",
        "  cat [filename] - Show file contents",
        "  spotify - Show Spotify information",
        "  whoami - Display current user",
        "  date - Show current date and time",
        "  history - Show command history",
        "  tree - Display file system tree",
        "  exit - Close the terminal",
      ]
    } else if (commandLower === "clear") {
      setTerminalLines([])
      return
    } else if (mainCommand === "ls") {
      const targetDir = args[1]
        ? args[1].startsWith("/")
          ? args[1]
          : `${currentDirectory}/${args[1]}`
        : currentDirectory

      if (fileSystem[targetDir]) {
        response = [
          `Contents of ${targetDir}:`,
          ...fileSystem[targetDir].children.map((item) => {
            const path = `${targetDir}/${item}`
            const isDir = fileSystem[path] && fileSystem[path].type === "directory"
            return `${isDir ? "d" : "-"}rwxr-xr-x  1 tamish tamish  ${Math.floor(Math.random() * 1000) + 100} Apr 4 2025 ${isDir ? item + "/" : item}`
          }),
        ]
      } else {
        response = [`ls: cannot access '${args[1]}': No such file or directory`]
      }
    } else if (mainCommand === "cd") {
      if (args.length === 1 || args[1] === "~") {
        setCurrentDirectory("/home/tamish")
        response = []
      } else {
        const targetDir = args[1].startsWith("/")
          ? args[1]
          : args[1] === ".."
            ? currentDirectory.split("/").slice(0, -1).join("/") || "/"
            : `${currentDirectory}/${args[1]}`

        if (fileSystem[targetDir] && fileSystem[targetDir].type === "directory") {
          setCurrentDirectory(targetDir)
          response = []
        } else {
          response = [`cd: ${args[1]}: No such directory`]
        }
      }
    } else if (mainCommand === "pwd") {
      response = [currentDirectory]
    } else if (mainCommand === "cat") {
      if (args.length < 2) {
        response = ["cat: missing file operand"]
      } else {
        const filename = args[1]
        const filePath = filename.startsWith("/") ? filename : `${currentDirectory}/${filename}`

        // Check if file exists in current directory
        const dirContents = fileSystem[currentDirectory]?.children || []
        if (dirContents.includes(filename)) {
          if (filename === "real_achievements.txt") {
            response = ["File empty. No real achievements found."]
          } else if (filename === "bank_account.txt") {
            response = ["Account balance: $0.37"]
          } else if (filename === "future_plans.txt") {
            response = [
              "1. Start another project",
              "2. Abandon it at 5% completion",
              "3. Repeat steps 1-2 indefinitely",
              "4. Somehow become successful anyway",
            ]
          } else if (filename === "skills.txt") {
            response = [
              "- Professional excuse making",
              "- Advanced procrastination",
              "- Expert at starting things",
              "- PhD in quitting",
              "- Music production (actually legitimate)",
            ]
          } else if (filename === "spotify_info.txt" || filename.includes("spotify")) {
            response = [
              "Artist: Sahil Arun",
              "Verified: Yes",
              "Monthly Listeners: 3,542",
              "Latest Release: Aao Na (2024)",
              "",
              'Type "spotify" to open player',
            ]
          } else if (filename.includes("README.md")) {
            response = [
              "# Project README",
              "",
              "This is yet another project that will probably never be finished.",
              "",
              "## Features",
              "- Great ideas",
              "- Ambitious scope",
              "- Zero chance of completion",
              "",
              "## Timeline",
              "1. Initial excitement: 100%",
              "2. Actual work: 5%",
              "3. Abandonment: Pending",
            ]
          } else if (filename.includes("never_finished") || filename.includes("never_launched")) {
            response = ["This file intentionally left blank, just like my ambitions."]
          } else if (filename.includes("ideas")) {
            response = [
              "1. App that reminds you to finish projects (ironic)",
              "2. Service that finishes projects for procrastinators",
              "3. AI that generates excuses for missed deadlines",
              "4. Time management tool (never got around to finishing this one)",
            ]
          } else {
            response = [`${filename}: Generic unfinished content`]
          }
        } else {
          response = [`cat: ${filename}: No such file or directory`]
        }
      }
    } else if (commandLower === "spotify") {
      // This will trigger the Spotify player to open
      window.dispatchEvent(new CustomEvent("openSpotifyPlayer"))
      response = ["Opening Spotify player..."]
    } else if (commandLower === "whoami") {
      response = ["tamish - Professional Procrastinator"]
    } else if (commandLower === "date") {
      response = [new Date().toString()]
    } else if (commandLower === "history") {
      response = commandHistory.map((cmd, i) => `${i + 1}  ${cmd}`)
    } else if (commandLower === "tree") {
      // Simple tree implementation
      const buildTree = (path: string, indent = "") => {
        const result: string[] = []
        result.push(`${indent}${path.split("/").pop() || "/"}`)

        if (fileSystem[path] && fileSystem[path].type === "directory") {
          fileSystem[path].children.forEach((child, i, arr) => {
            const isLast = i === arr.length - 1
            const childPath = `${path}/${child}`
            const childIndent = indent + (isLast ? "└── " : "├── ")
            const nextIndent = indent + (isLast ? "    " : "│   ")

            if (fileSystem[childPath] && fileSystem[childPath].type === "directory") {
              result.push(...buildTree(childPath, childIndent))
            } else {
              result.push(`${childIndent}${child}`)
            }
          })
        }

        return result
      }

      response = buildTree("/home/tamish")
    } else if (commandLower === "exit") {
      setIsVisible(false)
      return
    } else if (commandLower === "") {
      response = []
    } else if (mainCommand === "echo") {
      response = [args.slice(1).join(" ")]
    } else {
      response = [`Command not found: ${command}. Type 'help' for available commands.`]
    }

    // Add response to terminal lines
    response.forEach((line) => {
      setTerminalLines((prev) => [...prev, { text: line, isResponse: true }])
    })
  }

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentCommand.trim()) {
      executeCommand(currentCommand)
      setCurrentCommand("")
      setSuggestions([])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (suggestions.length > 0) {
        setActiveSuggestion((prev) => Math.max(0, prev - 1))
      } else if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (suggestions.length > 0) {
        setActiveSuggestion((prev) => Math.min(suggestions.length - 1, prev + 1))
      } else if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCurrentCommand("")
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      if (suggestions.length > 0 && activeSuggestion >= 0) {
        setCurrentCommand(suggestions[activeSuggestion])
        setSuggestions([])
        setActiveSuggestion(-1)
      } else if (currentCommand.trim()) {
        // Generate suggestions based on current input
        const input = currentCommand.trim().toLowerCase()
        const newSuggestions = availableCommands.filter((cmd) => cmd.startsWith(input))

        if (newSuggestions.length === 1) {
          setCurrentCommand(newSuggestions[0])
          setSuggestions([])
        } else if (newSuggestions.length > 1) {
          setSuggestions(newSuggestions)
          setActiveSuggestion(0)
        }
      }
    } else if (e.key === "Escape") {
      setSuggestions([])
      setActiveSuggestion(-1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCommand(e.target.value)

    // Update suggestions as user types
    if (e.target.value.trim()) {
      const input = e.target.value.trim().toLowerCase()
      const newSuggestions = availableCommands.filter((cmd) => cmd.startsWith(input))

      if (newSuggestions.length > 0) {
        setSuggestions(newSuggestions)
        setActiveSuggestion(0)
      } else {
        setSuggestions([])
      }
    } else {
      setSuggestions([])
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            maxWidth: isMinimized ? "200px" : "600px",
            width: isMinimized ? "auto" : "calc(100vw - 32px)",
          }}
        >
          <div className="bg-black/80 backdrop-blur-md border border-zinc-800/50 rounded-lg overflow-hidden shadow-2xl shadow-black/30 ring-1 ring-white/10">
            {/* Terminal header */}
            <div
              className="bg-zinc-900/90 backdrop-blur-md px-4 py-2 flex items-center justify-between cursor-move border-b border-zinc-800/50"
              onMouseDown={handleMouseDown}
            >
              <div className="flex items-center">
                <div className="flex space-x-2 mr-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"></div>
                </div>
                <span className="text-xs text-gray-400 ml-2 font-mono">tamish@portfolio:~</span>
              </div>

              {/* System status indicators */}
              <div className="hidden sm:flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <Zap size={12} className={`mr-1 ${systemStatus.cpu > 50 ? "text-yellow-500" : "text-gray-500"}`} />
                  <span>{systemStatus.cpu}%</span>
                </div>
                <div className="flex items-center">
                  <Disc
                    size={12}
                    className={`mr-1 ${systemStatus.memory > 70 ? "text-yellow-500" : "text-gray-500"}`}
                  />
                  <span>{systemStatus.memory}%</span>
                </div>
                <div className="flex items-center">
                  <Wifi size={12} className={`mr-1 ${systemStatus.wifi ? "text-green-500" : "text-red-500"}`} />
                </div>
                <div className="flex items-center">
                  <Battery
                    size={12}
                    className={`mr-1 ${systemStatus.battery < 20 ? "text-red-500" : "text-gray-500"}`}
                  />
                  <span>{systemStatus.battery}%</span>
                </div>
                <div className="flex items-center">
                  <Clock size={12} className="mr-1" />
                  <span>{getCurrentTime()}</span>
                </div>
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

            {/* Terminal content */}
            {!isMinimized && (
              <div
                className="p-3 sm:p-4 font-mono text-xs sm:text-sm text-green-500 bg-black/60 backdrop-blur-md h-[300px] sm:h-[400px] overflow-y-auto"
                ref={terminalRef}
              >
                {/* Initial hacker lines */}
                {terminalLines.map((line, index) => (
                  <div
                    key={index}
                    className={`mb-1 flex ${line.isResponse ? "text-green-500" : line.isCommand ? "text-cyan-500" : "text-yellow-500"}`}
                  >
                    {line.timestamp && (
                      <span className="text-gray-600 text-xs mr-2 mt-0.5 font-mono">[{line.timestamp}]</span>
                    )}
                    <div className="flex-1">{line.text}</div>
                  </div>
                ))}

                {/* Current typing line */}
                {currentLine < hackerLines.length && (
                  <div className="text-cyan-500 flex">
                    <span className="text-gray-600 text-xs mr-2 mt-0.5 font-mono">[{getCurrentTime()}]</span>
                    <div>
                      {hackerLines[currentLine].substring(0, cursorPosition)}
                      {isTyping && <span className="inline-block w-2 h-4 bg-green-500 ml-px animate-pulse"></span>}
                    </div>
                  </div>
                )}

                {/* Command input */}
                {currentLine >= hackerLines.length && (
                  <div className="flex items-start">
                    <span className="text-gray-600 text-xs mr-2 mt-0.5 font-mono">[{getCurrentTime()}]</span>
                    <div className="flex-1">
                      <div className="flex items-center text-cyan-500">
                        <span className="text-green-400 mr-1">{currentDirectory}</span>
                        <ChevronRight size={14} className="text-pink-500 mr-1" />
                      </div>
                      <form onSubmit={handleCommandSubmit} className="flex items-center">
                        <span className="text-cyan-500 mr-2">$</span>
                        <div className="relative flex-1">
                          <input
                            ref={inputRef}
                            type="text"
                            value={currentCommand}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-transparent border-none outline-none text-green-500 font-mono text-sm"
                            autoFocus
                            autoComplete="off"
                            spellCheck="false"
                          />
                          {/* Typing cursor */}
                          {document.activeElement === inputRef.current && (
                            <span className="absolute right-0 top-0 h-full w-[2px] bg-green-500 animate-pulse"></span>
                          )}

                          {/* Command suggestions */}
                          {suggestions.length > 0 && (
                            <div className="absolute top-full left-0 mt-1 bg-zinc-900/90 backdrop-blur-md border border-zinc-800/50 rounded-md overflow-hidden z-10 w-48">
                              {suggestions.map((suggestion, index) => (
                                <div
                                  key={index}
                                  className={`px-3 py-1 text-sm cursor-pointer ${index === activeSuggestion ? "bg-zinc-800 text-white" : "text-gray-400 hover:bg-zinc-800/50"}`}
                                  onClick={() => {
                                    setCurrentCommand(suggestion)
                                    setSuggestions([])
                                    inputRef.current?.focus()
                                  }}
                                >
                                  {suggestion}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* File browser visualization (shown when using ls command) */}
                {terminalLines.length > 0 && terminalLines[terminalLines.length - 1].text.startsWith("Contents of") && (
                  <div className="mt-2 border border-zinc-800/50 rounded-md p-2 bg-black/30 grid grid-cols-4 gap-2">
                    {fileSystem[currentDirectory]?.children.map((item, index) => {
                      const path = `${currentDirectory}/${item}`
                      const isDir = fileSystem[path] && fileSystem[path].type === "directory"
                      return (
                        <div
                          key={index}
                          className="flex items-center p-1 rounded hover:bg-zinc-800/30 cursor-pointer"
                          onClick={() => {
                            if (isDir) {
                              executeCommand(`cd ${item}`)
                            } else {
                              executeCommand(`cat ${item}`)
                            }
                          }}
                        >
                          {isDir ? (
                            <Folder size={14} className="text-blue-400 mr-2" />
                          ) : item.endsWith(".md") ? (
                            <FileText size={14} className="text-yellow-400 mr-2" />
                          ) : (
                            <File size={14} className="text-gray-400 mr-2" />
                          )}
                          <span className={`text-xs ${isDir ? "text-blue-400" : "text-gray-400"}`}>{item}</span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {isMinimized && (
            <div className="absolute bottom-0 right-0 bg-green-500 text-black text-xs px-2 py-1 rounded-bl-md rounded-tr-md">
              Terminal
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
