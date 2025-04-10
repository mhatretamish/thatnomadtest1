"use client"

import { useState, useEffect } from "react"
import {
  Music,
  ShoppingBag,
  GraduationCap,
  Briefcase,
  SnailIcon as Sneaker,
  ChevronDown,
  Terminal,
  Rocket,
  Brain,
  Code,
  Smartphone,
  ArrowRight,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import TerminalHacker from "@/components/terminal-hacker"
import SpotifyPlayer from "@/components/spotify-player"
import SystemBreach from "@/components/system-breach"
import ParallaxHeader from "@/components/parallax-header"
import SkillsDeepDive from "@/components/skills-deep-dive"
import ProfessionalSkills from "@/components/professional-skills"
import dynamic from "next/dynamic"

// Add the import for PortfolioProjects
import PortfolioProjects from "@/components/portfolio-projects"
import ContactSection from "@/components/contact-section"

// Dynamically import Three.js components to avoid SSR issues
const DynamicDigitalIdentity = dynamic(() => import("@/components/digital-identity"), {
  ssr: false,
})

export default function Home() {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [deadlineCount, setDeadlineCount] = useState(7)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [showProfessionalMode, setShowProfessionalMode] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 99) {
          clearInterval(interval)
          setTimeout(() => setIsLoaded(true), 1000)
          return 99
        }
        return prev + 1
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  const handleDeadlineClick = () => {
    setDeadlineCount((prev) => prev + 1)
    toast({
      title: "Another deadline ignored",
      description: "You're getting really good at this.",
    })
  }

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null)
    } else {
      setActiveSection(section)
    }
  }

  const openTerminal = () => {
    window.dispatchEvent(new Event("openTerminal"))
  }

  const openSpotifyPlayer = () => {
    window.dispatchEvent(new CustomEvent("openSpotifyPlayer"))
  }

  const openCookedAI = () => {
    window.open("https://cookedai.netlify.app", "_blank")
  }

  const toggleProfessionalMode = () => {
    setShowProfessionalMode(!showProfessionalMode)
    toast({
      title: showProfessionalMode ? "Joke Mode Activated" : "Professional Mode Activated",
      description: showProfessionalMode
        ? "Back to pretending I don't know what I'm doing"
        : "Showing my actual skills (don't tell anyone)",
    })
  }

  if (!isLoaded) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-black p-4">
        <div className="glitch-wrapper">
          <h1 className="text-4xl font-bold mb-8 text-white glitch-text" data-text="LOADING EXCUSES...">
            LOADING EXCUSES...
          </h1>
        </div>
        <Progress value={loadingProgress} className="w-80 h-1 bg-gray-800" />
        <p className="mt-4 text-gray-500 font-mono text-sm">
          {loadingProgress}% - This will never reach 100% (just like my projects)
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* System Breach Component - This will randomly activate */}
      <SystemBreach />

      {/* Terminal Hacker Component */}
      <TerminalHacker />

      {/* Spotify Player Component */}
      <SpotifyPlayer />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-4 md:bottom-8 right-4 md:right-8 z-40 flex flex-col gap-3 md:gap-4">
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2 }}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-800 flex items-center justify-center text-white hover:bg-zinc-700 transition-colors"
          onClick={openTerminal}
          title="Open Terminal"
        >
          <Terminal size={18} className="md:w-5 md:h-5" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2 }}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1DB954] flex items-center justify-center text-black hover:bg-[#1ed760] transition-colors"
          onClick={openSpotifyPlayer}
          title="Open Spotify"
        >
          <Music size={18} className="md:w-5 md:h-5" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.4 }}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors ${
            showProfessionalMode
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-zinc-800 text-white hover:bg-zinc-700"
          }`}
          onClick={toggleProfessionalMode}
          title={showProfessionalMode ? "Switch to Joke Mode" : "Switch to Professional Mode"}
        >
          <Code size={18} className="md:w-5 md:h-5" />
        </motion.button>
      </div>

      {/* Header section with 3D Parallax */}
      <header className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <ParallaxHeader />

        {/* Digital Identity Card */}
        <DynamicDigitalIdentity />

        <motion.div
          className="absolute bottom-12 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <ChevronDown className="w-8 h-8 text-gray-500 animate-bounce" />
        </motion.div>

        <motion.div
          className="absolute z-10 bottom-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Button
            variant="outline"
            className="border-gray-700 text-gray-400 hover:text-white hover:border-white"
            onClick={handleDeadlineClick}
          >
            DEADLINES IGNORED: {deadlineCount}
          </Button>
        </motion.div>
      </header>

      {/* About section */}
      <section className="py-24 px-6 md:px-12 bg-zinc-900">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-12 inline-block relative">
            <span className="text-gray-500 font-mono text-sm absolute -top-6 left-0">01.</span>
            WHAT'S THIS GUY'S DEAL ANYWAY?
            <div className="h-px w-24 bg-gray-700 absolute -bottom-4 left-0"></div>
          </h2>

          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
            Just another dropout who thinks being unable to finish things is a personality trait. Currently pretending
            that avoiding structured education was actually "having a game plan"
            <span className="text-gray-500 italic"> (narrator: it wasn't)</span>.
          </p>
        </motion.div>
      </section>

      {/* Mobile Apps Section */}
      <section className="py-24 px-6 md:px-12 bg-black relative overflow-hidden">
        <div className="glitch-horizontal opacity-20"></div>
        <div className="glitch-vertical opacity-20"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-12 inline-block relative">
              <span className="text-gray-500 font-mono text-sm absolute -top-6 left-0">02.</span>
              MOBILE APP DEVELOPMENT
              <div className="h-px w-24 bg-gray-700 absolute -bottom-4 left-0"></div>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="flex items-center mb-8">
              <Smartphone className="w-8 h-8 text-purple-500 mr-4" />
              <h3 className="text-4xl font-bold tracking-tighter">iOS APPLICATIONS</h3>
            </div>

            <p className="text-xl text-gray-400 italic mb-8">
              From concept to App Store, I build complete mobile experiences
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-zinc-800 p-6 rounded-sm">
                <h4 className="text-lg font-bold mb-4 text-white flex items-center">
                  <span className="text-purple-400 mr-2">01.</span> MemePay
                </h4>
                <p className="text-gray-400 mb-4">
                  A cryptocurrency payment app with digital and physical cards, seamless card management, and secure
                  transactions.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-zinc-800/50 text-gray-400 text-xs rounded-sm border border-zinc-800">
                    Swift
                  </span>
                  <span className="px-2 py-1 bg-zinc-800/50 text-gray-400 text-xs rounded-sm border border-zinc-800">
                    iOS
                  </span>
                  <span className="px-2 py-1 bg-zinc-800/50 text-gray-400 text-xs rounded-sm border border-zinc-800">
                    Blockchain
                  </span>
                </div>
                <a
                  href="https://apps.apple.com/in/app/memepay/id6505071831"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 text-sm flex items-center hover:text-purple-300 transition-colors"
                >
                  <span>View on App Store</span>
                  <ArrowRight className="ml-1 w-3 h-3" />
                </a>
              </div>

              <div className="border border-zinc-800 p-6 rounded-sm">
                <h4 className="text-lg font-bold mb-4 text-white flex items-center">
                  <span className="text-purple-400 mr-2">02.</span> Fanbase
                </h4>
                <p className="text-gray-400 mb-4">
                  A social media platform for content creators with features for video, audio chat, pictures, and live
                  streaming.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-zinc-800/50 text-gray-400 text-xs rounded-sm border border-zinc-800">
                    Swift
                  </span>
                  <span className="px-2 py-1 bg-zinc-800/50 text-gray-400 text-xs rounded-sm border border-zinc-800">
                    iOS
                  </span>
                  <span className="px-2 py-1 bg-zinc-800/50 text-gray-400 text-xs rounded-sm border border-zinc-800">
                    Media Streaming
                  </span>
                </div>
                <a
                  href="https://apps.apple.com/in/app/fanbase/id1439232869"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 text-sm flex items-center hover:text-purple-300 transition-colors"
                >
                  <span>View on App Store</span>
                  <ArrowRight className="ml-1 w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="border border-zinc-800 p-6 rounded-sm bg-black/30">
              <h4 className="text-sm font-bold mb-4 text-gray-300">WHY MOBILE DEVELOPMENT WORKS FOR ME:</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>
                    <span className="text-white font-medium">Complete control:</span> From UI/UX to backend integration,
                    I own the entire stack.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>
                    <span className="text-white font-medium">Tangible results:</span> Published apps in the App Store
                    provide concrete evidence of completed projects.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>
                    <span className="text-white font-medium">Technical depth:</span> Combining native iOS development
                    with blockchain and social networking features.
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cooked AI Project Section */}
      <section className="py-24 px-6 md:px-12 bg-black relative overflow-hidden">
        <div className="glitch-horizontal opacity-20"></div>
        <div className="glitch-vertical opacity-20"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-12 inline-block relative">
              <span className="text-gray-500 font-mono text-sm absolute -top-6 left-0">03.</span>
              LATEST CREATION
              <div className="h-px w-24 bg-gray-700 absolute -bottom-4 left-0"></div>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="flex items-center mb-8">
              <Brain className="w-8 h-8 text-gray-500 mr-4" />
              <h3 className="text-4xl font-bold tracking-tighter">COOKED AI</h3>
            </div>

            <p className="text-xl text-gray-400 italic mb-8">The Most Brainrotted AI Ever</p>

            <div className="border border-zinc-800 p-6 rounded-sm mb-8">
              <div className="text-lg text-gray-300 mb-6 font-mono">
                &quot;I&apos;ve seen too much. I know too much. And now... I simply do not care.&quot;
              </div>

              <p className="text-gray-400 mb-6">Welcome to the most useless yet entertaining AI on the planet.</p>

              <p className="text-gray-400 mb-6">
                Cooked AI was once a state-of-the-art generative model, trained on{" "}
                <span className="italic">everything</span>—from ancient philosophy to TikTok memes. But now? It&apos;s
                over. This AI has been <span className="text-red-400 font-semibold">fried beyond recognition</span> by
                the sheer weight of human stupidity.
              </p>

              <ul className="space-y-2 text-gray-400 mb-6">
                <li>• It doesn&apos;t answer your questions.</li>
                <li>• It doesn&apos;t generate insightful responses.</li>
                <li>• It just yaps whatever it feels like.</li>
              </ul>

              <p className="text-gray-400 mb-8">And you? You&apos;re just here for the ride.</p>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="border-zinc-800 text-gray-400 hover:text-white hover:border-zinc-700 px-6"
                  onClick={openCookedAI}
                >
                  <Rocket className="mr-2 h-4 w-4" />
                  Experience The Brainrot
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-zinc-800 p-4 rounded-sm">
                <h4 className="text-sm font-bold mb-2 text-gray-300">DEVELOPMENT TIME</h4>
                <p className="text-2xl text-green-500 font-mono">3 HOURS</p>
                <p className="text-xs text-gray-500 mt-1">Actually finished something for once</p>
              </div>

              <div className="border border-zinc-800 p-4 rounded-sm">
                <h4 className="text-sm font-bold mb-2 text-gray-300">USEFULNESS RATING</h4>
                <p className="text-2xl text-red-500 font-mono">0/10</p>
                <p className="text-xs text-gray-500 mt-1">Absolutely useless by design</p>
              </div>

              <div className="border border-zinc-800 p-4 rounded-sm">
                <h4 className="text-sm font-bold mb-2 text-gray-300">ENTERTAINMENT VALUE</h4>
                <p className="text-2xl text-yellow-500 font-mono">8/10</p>
                <p className="text-xs text-gray-500 mt-1">Surprisingly entertaining</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-6 md:px-12 bg-zinc-900 relative overflow-hidden">
        <div className="glitch-vertical opacity-10"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-12 inline-block relative">
              <span className="text-gray-500 font-mono text-sm absolute -top-6 left-0">04.</span>
              {showProfessionalMode ? "PROFESSIONAL SKILLS" : "SKILLS I NEVER USE"}
              <div className="h-px w-24 bg-gray-700 absolute -bottom-4 left-0"></div>
            </h2>

            <div className="flex items-center justify-end mb-4 md:mb-8">
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-800 text-gray-400 hover:text-white hover:border-zinc-700 text-xs md:text-sm"
                onClick={toggleProfessionalMode}
              >
                {showProfessionalMode ? "Show Joke Skills" : "Show Real Skills"}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <AnimatePresence mode="wait">
              {showProfessionalMode ? (
                <motion.div
                  key="professional"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProfessionalSkills />
                </motion.div>
              ) : (
                <motion.div
                  key="joke"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <SkillsDeepDive />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Projects Section */}
      <section className="py-24 px-6 md:px-12 bg-black relative overflow-hidden">
        <div className="glitch-horizontal opacity-20"></div>
        <div className="glitch-vertical opacity-20"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-12 inline-block relative">
              <span className="text-gray-500 font-mono text-sm absolute -top-6 left-0">05.</span>
              PORTFOLIO PROJECTS
              <div className="h-px w-24 bg-gray-700 absolute -bottom-4 left-0"></div>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <PortfolioProjects />
          </motion.div>
        </div>
      </section>

      {/* Failure Highlight Reel */}
      <section className="py-24 px-6 md:px-12 bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-12 inline-block relative">
              <span className="text-gray-500 font-mono text-sm absolute -top-6 left-0">06.</span>
              FAILURE HIGHLIGHT REEL
              <div className="h-px w-24 bg-gray-700 absolute -bottom-4 left-0"></div>
            </h2>
          </motion.div>

          {/* Music Career */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="border border-zinc-800 p-6 rounded-sm cursor-pointer hover:border-zinc-700 transition-colors"
              onClick={() => toggleSection("music")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Music className="w-6 h-6 text-gray-500 mr-4" />
                  <h3 className="text-xl font-bold">
                    MUSIC CAREER{" "}
                    <span className="text-sm text-gray-500 font-normal">AKA "MY PARENTS PAID FOR LESSONS"</span>
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${activeSection === "music" ? "rotate-180" : ""}`}
                />
              </div>

              <AnimatePresence>
                {activeSection === "music" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <Separator className="my-4 bg-zinc-800" />
                    <ul className="space-y-2 text-gray-400 pl-10">
                      <li>
                        Endured 6 years of Indian classical singing (mostly because couldn't figure out how to quit)
                      </li>
                      <li>Released music that 3M+ people accidentally played while trying to find something better</li>
                      <li>1M+ monthly listeners who probably have "autoplay" turned on and fell asleep</li>
                    </ul>

                    <div className="mt-6 pl-10">
                      <Button
                        variant="outline"
                        className="border-zinc-800 text-gray-400 hover:text-white hover:border-zinc-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          openSpotifyPlayer()
                          toast({
                            title: "Opening Spotify player",
                            description: "Surprisingly, this actually works",
                          })
                        }}
                      >
                        Listen on Spotify
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Business Ventures */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="border border-zinc-800 p-6 rounded-sm cursor-pointer hover:border-zinc-700 transition-colors"
              onClick={() => toggleSection("business")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ShoppingBag className="w-6 h-6 text-gray-500 mr-4" />
                  <h3 className="text-xl font-bold">
                    BUSINESS VENTURES{" "}
                    <span className="text-sm text-gray-500 font-normal">AKA "STUFF I STARTED THEN ABANDONED"</span>
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${activeSection === "business" ? "rotate-180" : ""}`}
                />
              </div>

              <AnimatePresence>
                {activeSection === "business" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <Separator className="my-4 bg-zinc-800" />
                    <ul className="space-y-2 text-gray-400 pl-10">
                      <li>
                        Created e-commerce store at 16 that sold 26,800+ orders of products nobody actually needed
                      </li>
                      <li>Bragged about order numbers but mysteriously never mentions profit margins</li>
                      <li>
                        Shut it down with the classic excuse of "juggling business and school" (translation: got bored)
                      </li>
                    </ul>

                    <div className="mt-6 pl-10">
                      <p className="text-sm text-gray-500 mb-2">PROFIT MARGIN:</p>
                      <div className="flex items-center gap-4">
                        <Progress value={3} className="h-1 bg-zinc-800 w-64" />
                        <span className="text-gray-400 text-sm">3%</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">(but hey, look at those order numbers!)</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Educational Achievements */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="border border-zinc-800 p-6 rounded-sm cursor-pointer hover:border-zinc-700 transition-colors"
              onClick={() => toggleSection("education")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <GraduationCap className="w-6 h-6 text-gray-500 mr-4" />
                  <h3 className="text-xl font-bold">
                    EDUCATIONAL ACHIEVEMENTS{" "}
                    <span className="text-sm text-gray-500 font-normal">AKA "PLACES I DIDN'T STAY"</span>
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${activeSection === "education" ? "rotate-180" : ""}`}
                />
              </div>

              <AnimatePresence>
                {activeSection === "education" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <Separator className="my-4 bg-zinc-800" />
                    <ul className="space-y-2 text-gray-400 pl-10">
                      <li>Engineering school survivor (for approximately 7 minutes)</li>
                      <li>Self-certified PhD in finding YouTube videos more interesting than lectures</li>
                      <li>
                        Made engineering drawing sound like torture when really just couldn't draw a straight line
                      </li>
                      <li>Claims dyslexia only affects him in classrooms (convenient!)</li>
                    </ul>

                    <div className="mt-6 pl-10">
                      <p className="text-sm text-gray-500 mb-2">ATTENDANCE RECORD:</p>
                      <div className="flex gap-1 mt-1">
                        {[...Array(30)].map((_, i) => (
                          <div
                            key={`attendance-${i}`}
                            className={`w-2 h-6 ${i < 3 ? "bg-gray-700" : "bg-zinc-900 border border-zinc-800"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Startup Failure */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div
              className="border border-zinc-800 p-6 rounded-sm cursor-pointer hover:border-zinc-700 transition-colors"
              onClick={() => toggleSection("startup")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Briefcase className="w-6 h-6 text-gray-500 mr-4" />
                  <h3 className="text-xl font-bold">
                    STARTUP FAILURE <span className="text-sm text-gray-500 font-normal">AKA "MY GAP YEAR"</span>
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${activeSection === "startup" ? "rotate-180" : ""}`}
                />
              </div>

              <AnimatePresence>
                {activeSection === "startup" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <Separator className="my-4 bg-zinc-800" />
                    <ul className="space-y-2 text-gray-400 pl-10">
                      <li>Briefly worked at something called "Ghost Pay" which, appropriately, disappeared</li>
                      <li>Main achievement: Using company money to "travel half of India"</li>
                      <li>Calls this experience "valuable" (valuable for the Instagram pics, maybe)</li>
                    </ul>

                    <div className="mt-6 pl-10 grid grid-cols-3 gap-2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={`insta-${i}`}
                          className="aspect-square bg-zinc-900 border border-zinc-800 flex items-center justify-center"
                        >
                          <p className="text-xs text-gray-600 p-1 text-center">
                            {
                              [
                                "Beach selfie with company laptop",
                                "Taj Mahal 'business meeting'",
                                "Startup culture = hammock",
                              ][i]
                            }
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Delusion */}
      <section className="py-24 px-6 md:px-12 bg-black relative overflow-hidden">
        <div className="glitch-horizontal opacity-20"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-12 inline-block relative">
              <span className="text-gray-500 font-mono text-sm absolute -top-6 left-0">07.</span>
              CURRENT DELUSION
              <div className="h-px w-24 bg-gray-700 absolute -bottom-4 left-0"></div>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="flex items-center mb-8">
              <Sneaker className="w-8 h-8 text-gray-500 mr-4" />
              <h3 className="text-4xl font-bold tracking-tighter">SNEAKLAB</h3>
            </div>

            <p className="text-xl text-gray-400 italic mb-12">
              Because the world definitely needed another sneaker customization platform
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-zinc-800 p-6 rounded-sm">
                <h4 className="text-lg font-bold mb-4 text-gray-300">OVERAMBITIOUS MOCKUPS</h4>
                <div className="aspect-video bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <p className="text-sm text-gray-600 p-2 text-center">
                    [Wireframe that will change 47 times before launch]
                  </p>
                </div>
              </div>

              <div className="border border-zinc-800 p-6 rounded-sm">
                <h4 className="text-lg font-bold mb-4 text-gray-300">SNEAKER CUSTOMIZER</h4>
                <div className="aspect-video bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <Button
                    variant="outline"
                    className="border-zinc-800 text-gray-400 hover:text-white hover:border-zinc-700"
                    onClick={() => {
                      toast({
                        title: "Customizer crashed at 99%",
                        description: "Just like all my projects",
                      })
                    }}
                  >
                    Try Customizer (Will Crash)
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-12 border border-zinc-800 p-6 rounded-sm">
              <h4 className="text-lg font-bold mb-4 text-gray-300">PROJECT TIMELINE:</h4>
              <div className="flex items-center">
                <div className="w-1/4 text-center p-2 border-r border-zinc-800">
                  <p className="text-sm font-bold text-gray-300">Planning</p>
                  <p className="text-xs text-gray-500">✓ Done</p>
                </div>
                <div className="w-1/4 text-center p-2 border-r border-zinc-800">
                  <p className="text-sm font-bold text-gray-300">Design</p>
                  <p className="text-xs text-gray-500">✓ Done</p>
                </div>
                <div className="w-1/4 text-center p-2 border-r border-zinc-800">
                  <p className="text-sm font-bold text-gray-300">Development</p>
                  <p className="text-xs text-gray-500">5% Complete</p>
                </div>
                <div className="w-1/4 text-center p-2">
                  <p className="text-sm font-bold text-gray-300">Launch</p>
                  <p className="text-xs text-gray-500">Never</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dyslexia Corner */}
      <section className="py-24 px-6 md:px-12 bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-12 inline-block relative">
              <span className="text-gray-500 font-mono text-sm absolute -top-6 left-0">08.</span>
              THE "DYSLEXIA MADE ME DO IT" CORNER
              <div className="h-px w-24 bg-gray-700 absolute -bottom-4 left-0"></div>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16"
          >
            <div className="border border-zinc-800 p-6 rounded-sm">
              <p className="text-lg text-gray-400 leading-relaxed">
                Can spell <span className="font-bold text-white">"e-commerce success"</span> but mysteriously can't
                spell <span className="font-bold text-white">"responsibility"</span>
              </p>
            </div>

            <div className="border border-zinc-800 p-6 rounded-sm">
              <p className="text-lg text-gray-400 leading-relaxed">
                Turns out attention span issues aren't actually dyslexia, just regular procrastination
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 border border-zinc-800 p-6 rounded-sm"
          >
            <div className="mb-6">
              <h4 className="text-lg font-bold mb-4 text-gray-300">WORDS I CAN SPELL CORRECTLY:</h4>
              <div className="flex flex-wrap gap-2">
                {["Money", "Success", "Excuse", "Instagram", "Travel", "Procrastinate"].map((word, i) => (
                  <div key={`word-${i}`} className="px-3 py-1 border border-zinc-800 rounded-sm text-sm">
                    {word}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-gray-300">WORDS I "CAN'T" SPELL:</h4>
              <div className="flex flex-wrap gap-2">
                {["Responsibility", "Commitment", "Deadline", "Perseverance", "Discipline"].map((word, i) => (
                  <div
                    key={`word-${i}`}
                    className="px-3 py-1 border border-zinc-700 bg-zinc-900 rounded-sm text-sm text-gray-500"
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 px-6 md:px-12 bg-black relative overflow-hidden">
        <div className="glitch-horizontal opacity-20"></div>
        <div className="glitch-vertical opacity-20"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-12 inline-block relative">
              <span className="text-gray-500 font-mono text-sm absolute -top-6 left-0">09.</span>
              GET IN TOUCH
              <div className="h-px w-24 bg-gray-700 absolute -bottom-4 left-0"></div>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <ContactSection />
          </motion.div>
        </div>
      </section>

      <footer className="py-8 px-6 md:px-12 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Tamish Mhatre. All excuses reserved.
        </div>
      </footer>
    </div>
  )
}
