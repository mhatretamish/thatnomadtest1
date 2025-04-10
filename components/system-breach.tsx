"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MatrixRain from "./matrix-rain"
import { AlertTriangle, Skull, Lock, FileWarning } from "lucide-react"

export default function SystemBreach() {
  const [stage, setStage] = useState<"idle" | "matrix" | "breach" | "reveal" | "complete">("idle")
  const [messages, setMessages] = useState<string[]>([])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [revealedSecrets, setRevealedSecrets] = useState<string[]>([])
  const [codeLines, setCodeLines] = useState<string[]>([])
  const [errorMessages, setErrorMessages] = useState<string[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // More threatening breach messages
  const breachMessages = [
    "INITIATING SYSTEM BREACH...",
    "BYPASSING SECURITY PROTOCOLS...",
    "SECURITY ALERT: UNAUTHORIZED ACCESS DETECTED",
    "FIREWALL BREACH DETECTED... ATTEMPTING COUNTERMEASURES",
    "COUNTERMEASURES FAILED... SYSTEM COMPROMISED",
    "ACCESSING RESTRICTED FILES...",
    "DECRYPTING PERSONAL DATA...",
    "WARNING: SENSITIVE INFORMATION EXPOSED",
    "EXTRACTING CONFIDENTIAL INFORMATION...",
    "BREACH SUCCESSFUL. DISPLAYING CLASSIFIED DATA...",
  ]

  const secrets = [
    "REAL NAME: TAMISH 'PROCRASTINATOR' MHATRE",
    "ACTUAL SKILLS: SURPRISINGLY GOOD AT MUSIC PRODUCTION",
    "SECRET TALENT: CAN ACTUALLY FINISH THINGS WHEN MOTIVATED",
    "HIDDEN ACHIEVEMENT: VERIFIED ARTIST ON SPOTIFY",
    "CONFESSION: PRETENDS TO BE WORSE THAN HE ACTUALLY IS",
    "FUTURE PLANS: LIKELY TO SUCCEED DESPITE BEST EFFORTS NOT TO",
  ]

  const hackingCode = [
    "sudo nmap -sS -sV -O -p- 192.168.1.1",
    "Discovered open port 22/tcp on 192.168.1.1",
    "Discovered open port 80/tcp on 192.168.1.1",
    "Discovered open port 443/tcp on 192.168.1.1",
    "ssh -l admin 192.168.1.1",
    "Password authentication failed.",
    "Attempting brute force...",
    "hydra -l admin -P /usr/share/wordlists/rockyou.txt 192.168.1.1 ssh",
    "Password found: p@ssw0rd123",
    "ssh -l admin 192.168.1.1",
    "Access granted. Privilege escalation in progress...",
    "sudo -l",
    "User admin may run the following commands on this host:",
    "(ALL : ALL) ALL",
    "sudo su -",
    "# whoami",
    "root",
    "# cd /home/tamish/private",
    "# ls -la",
    "total 16",
    "drwx------ 2 tamish tamish 4096 Apr 4 2025 .",
    "drwxr-xr-x 4 tamish tamish 4096 Apr 4 2025 ..",
    "-rw------- 1 tamish tamish 2048 Apr 4 2025 secrets.enc",
    "-rw------- 1 tamish tamish 1024 Apr 4 2025 .private-key",
    "# cat .private-key",
    "-----BEGIN RSA PRIVATE KEY-----",
    "MIIEpAIBAAKCAQEA3Tz2mr7SZiAMfQyuvBjM9Oi...",
    "-----END RSA PRIVATE KEY-----",
    "# openssl enc -d -aes-256-cbc -in secrets.enc -out secrets.txt -k `cat .private-key`",
    "# cat secrets.txt",
  ]

  const errorMessagesList = [
    "ERROR: Memory access violation at 0x00000000",
    "CRITICAL: System integrity compromised",
    "WARNING: Unauthorized data exfiltration in progress",
    "ALERT: Firewall disabled by unknown process",
    "SECURITY BREACH: Admin privileges escalated",
    "INTRUSION DETECTED: Multiple access points compromised",
    "SYSTEM ALERT: Encryption keys exposed",
  ]

  // Create audio context for scary sounds
  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.volume = 0.5

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Play scary sound effect
  const playSound = (type: "alert" | "typing" | "error" | "success") => {
    if (!audioRef.current) return

    try {
      // For now, we'll simulate the sounds with oscillator
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioContext) return // Exit if AudioContext is not supported

      const context = new AudioContext()
      const oscillator = context.createOscillator()
      const gain = context.createGain()

      oscillator.connect(gain)
      gain.connect(context.destination)

      if (type === "alert") {
        oscillator.type = "sawtooth"
        oscillator.frequency.setValueAtTime(440, context.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(880, context.currentTime + 0.2)
        gain.gain.setValueAtTime(0.3, context.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.3)
        oscillator.start()
        oscillator.stop(context.currentTime + 0.3)
      } else if (type === "typing") {
        oscillator.type = "sine"
        oscillator.frequency.setValueAtTime(440, context.currentTime)
        gain.gain.setValueAtTime(0.05, context.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.05)
        oscillator.start()
        oscillator.stop(context.currentTime + 0.05)
      } else if (type === "error") {
        oscillator.type = "square"
        oscillator.frequency.setValueAtTime(110, context.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(55, context.currentTime + 0.5)
        gain.gain.setValueAtTime(0.3, context.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.5)
        oscillator.start()
        oscillator.stop(context.currentTime + 0.5)
      } else if (type === "success") {
        oscillator.type = "sine"
        oscillator.frequency.setValueAtTime(440, context.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(880, context.currentTime + 0.1)
        gain.gain.setValueAtTime(0.1, context.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1)
        oscillator.start()
        oscillator.stop(context.currentTime + 0.1)
      }
    } catch (error) {
      console.error("Audio error:", error)
    }
  }

  // Start the breach sequence after a random time between 15-30 seconds
  useEffect(() => {
    const timer = setTimeout(
      () => {
        setStage("matrix")
        playSound("alert")
      },
      Math.random() * 15000 + 15000,
    ) // 15-30 seconds

    // Listen for system breach events from other components
    const handleSystemBreach = () => {
      setStage("matrix")
      playSound("alert")
    }

    window.addEventListener("systemBreach", handleSystemBreach)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("systemBreach", handleSystemBreach)
    }
  }, [])

  // Handle matrix completion
  const handleMatrixComplete = () => {
    setStage("breach")
    setMessages([])
    setCurrentMessageIndex(0)
    setCodeLines([])
    playSound("alert")

    // Add random screen flicker effect
    document.body.classList.add("screen-flicker")
    setTimeout(() => {
      document.body.classList.remove("screen-flicker")
    }, 2000)
  }

  // Handle breach messages
  useEffect(() => {
    if (stage !== "breach") return

    if (currentMessageIndex < breachMessages.length) {
      setIsTyping(true)
      playSound("typing")

      // Add the current message to the messages array
      setMessages((prev) => [...prev, breachMessages[currentMessageIndex]])

      // Add a random error message occasionally
      if (Math.random() > 0.7) {
        const randomError = errorMessagesList[Math.floor(Math.random() * errorMessagesList.length)]
        setErrorMessages((prev) => [...prev, randomError])
        setTimeout(() => playSound("error"), 300)
      }

      // Add some hacking code lines
      if (currentMessageIndex > 2 && currentMessageIndex < breachMessages.length - 1) {
        const startIndex = Math.floor(Math.random() * (hackingCode.length - 5))
        const numLines = Math.floor(Math.random() * 3) + 2 // 2-4 lines

        for (let i = 0; i < numLines; i++) {
          setTimeout(() => {
            setCodeLines((prev) => [...prev, hackingCode[startIndex + i]])
            playSound("typing")
          }, i * 100)
        }
      }

      // Wait before showing the next message
      const timer = setTimeout(
        () => {
          setCurrentMessageIndex((prev) => prev + 1)
          setIsTyping(false)
        },
        1000 + Math.random() * 500,
      )

      return () => clearTimeout(timer)
    } else {
      // All messages displayed, move to reveal stage
      setStage("reveal")
      setCurrentMessageIndex(0)
      playSound("alert")
    }
  }, [currentMessageIndex, stage])

  // Handle reveal stage
  useEffect(() => {
    if (stage !== "reveal") return

    if (currentMessageIndex < secrets.length) {
      const timer = setTimeout(() => {
        setRevealedSecrets((prev) => [...prev, secrets[currentMessageIndex]])
        setCurrentMessageIndex((prev) => prev + 1)
        playSound("success")
      }, 800)

      return () => clearTimeout(timer)
    } else {
      // All secrets revealed, complete after a delay
      const timer = setTimeout(() => {
        setStage("complete")
        // Add final screen flicker effect
        document.body.classList.add("screen-flicker")
        setTimeout(() => {
          document.body.classList.remove("screen-flicker")
        }, 1000)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [currentMessageIndex, stage])

  if (stage === "idle") return null

  return (
    <>
      {stage === "matrix" && <MatrixRain onComplete={handleMatrixComplete} />}

      <AnimatePresence>
        {(stage === "breach" || stage === "reveal") && (
          <motion.div
            className="fixed inset-0 z-[101] bg-black bg-opacity-90 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Glitch overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="glitch-horizontal opacity-30"></div>
              <div className="glitch-vertical opacity-30"></div>
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

              {/* Random scan lines */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={`scanline-${i}`}
                    className="absolute w-full h-px bg-white opacity-10"
                    style={{
                      top: `${Math.random() * 100}%`,
                      animation: `scanline ${Math.random() * 3 + 2}s linear infinite`,
                      animationDelay: `${Math.random() * 5}s`,
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Warning icons */}
            <div className="absolute top-4 left-4 text-red-500 animate-pulse">
              <AlertTriangle size={20} className="md:w-6 md:h-6" />
            </div>
            <div className="absolute top-4 right-4 text-red-500 animate-pulse">
              <Lock size={20} className="md:w-6 md:h-6" />
            </div>
            <div className="absolute bottom-4 left-4 text-red-500 animate-pulse">
              <FileWarning size={20} className="md:w-6 md:h-6" />
            </div>
            <div className="absolute bottom-4 right-4 text-red-500 animate-pulse">
              <Skull size={20} className="md:w-6 md:h-6" />
            </div>

            {/* Breach messages */}
            {stage === "breach" && (
              <div className="w-full max-w-4xl flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <div className="border border-red-900 bg-black bg-opacity-80 p-3 md:p-4 mb-4">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                      <span className="text-red-500 font-mono text-xs">SECURITY BREACH IN PROGRESS</span>
                    </div>

                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-green-500 font-mono text-xs md:text-sm mb-2"
                      >
                        {message}
                      </motion.div>
                    ))}

                    {isTyping && (
                      <div className="text-green-500 font-mono text-xs md:text-sm flex items-center">
                        <span className="inline-block w-2 h-4 bg-green-500 animate-pulse mr-1"></span>
                      </div>
                    )}
                  </div>

                  {/* Error messages */}
                  {errorMessages.length > 0 && (
                    <div className="border border-red-900 bg-black bg-opacity-80 p-3 md:p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                        <span className="text-red-500 font-mono text-xs">SYSTEM ALERTS</span>
                      </div>

                      {errorMessages.map((error, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-red-500 font-mono text-xs md:text-sm mb-2"
                        >
                          {error}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Code execution window */}
                <div className="w-full md:w-1/2 border border-gray-800 bg-black bg-opacity-80 p-3 md:p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-green-500 font-mono text-xs">TERMINAL - /bin/bash</span>
                  </div>

                  <div className="font-mono text-xs text-green-500 font-mono">
                    {codeLines.map((line, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className={`mb-1 ${line.startsWith("#") ? "text-red-500" : line.includes("ERROR") ? "text-red-400" : line.startsWith("sudo") || line.startsWith("ssh") || line.startsWith("hydra") ? "text-yellow-500" : "text-green-500"}`}
                      >
                        {line}
                      </motion.div>
                    ))}

                    {codeLines.length > 0 && (
                      <div className="flex items-center mt-1">
                        <span className="text-green-500 mr-1">$</span>
                        <span className="inline-block w-2 h-4 bg-green-500 animate-pulse"></span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Revealed secrets */}
            {stage === "reveal" && (
              <div className="w-full max-w-2xl">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-red-500 font-mono text-lg md:text-xl mb-6 md:mb-8 font-bold flex items-center justify-center flex-wrap text-center"
                >
                  <Skull className="mr-2 animate-pulse w-5 h-5 md:w-6 md:h-6" />
                  <span className="animate-pulse">!! CLASSIFIED INFORMATION EXPOSED !!</span>
                  <Skull className="ml-2 animate-pulse w-5 h-5 md:w-6 md:h-6" />
                </motion.div>

                <div className="space-y-4">
                  {revealedSecrets.map((secret, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="text-white font-mono text-sm md:text-lg border border-red-500 p-3 bg-black bg-opacity-50 relative overflow-hidden"
                    >
                      {/* Glitch effect on text */}
                      <div className="glitch-wrapper">
                        <span className="glitch-text" data-text={secret}>
                          {secret}
                        </span>
                      </div>

                      {/* Scan line effect */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: "linear-gradient(transparent 0%, rgba(255, 0, 0, 0.1) 50%, transparent 100%)",
                          backgroundSize: "100% 4px",
                          animation: "scanline 6s linear infinite",
                        }}
                      ></div>
                    </motion.div>
                  ))}
                </div>

                {currentMessageIndex < secrets.length && (
                  <div className="text-green-500 font-mono text-sm md:text-lg mt-4 flex items-center justify-center">
                    <span className="inline-block w-3 h-6 bg-green-500 animate-pulse mr-1"></span>
                    EXTRACTING DATA...
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
