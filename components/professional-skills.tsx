"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Code, CuboidIcon as Cube, LinkIcon, Play, Server, Database, Bot, Briefcase, Smartphone } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function ProfessionalSkills() {
  const [activeTab, setActiveTab] = useState<number>(0)
  const [isGlitching, setIsGlitching] = useState(false)

  // Trigger random glitch effects
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 200)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleTabChange = (index: number) => {
    setIsGlitching(true)
    setActiveTab(index)
    setTimeout(() => setIsGlitching(false), 200)
  }

  // Core competencies data
  const competencies = [
    {
      domain: "Mobile Development",
      icon: <Smartphone className="w-5 h-5 text-purple-500" />,
      technologies: "Swift · iOS · React Native · Mobile UI/UX",
      mastery: "App Store deployment, payment integrations, social networking, media streaming",
    },
    {
      domain: "Frontend",
      icon: <Code className="w-5 h-5 text-green-500" />,
      technologies: "Next.js · TypeScript · React · Tailwind",
      mastery: "Server‑side rendering, incremental static regeneration, typed API routes, design tokens",
    },
    {
      domain: "3D Web",
      icon: <Cube className="w-5 h-5 text-blue-500" />,
      technologies: "Three.js · React Three Fiber · WebGL",
      mastery: "Custom GLSL shaders, real‑time lighting, glTF asset pipelines",
    },
    {
      domain: "Blockchain",
      icon: <LinkIcon className="w-5 h-5 text-purple-500" />,
      technologies: "Ethereum · Solana · Solidity · Rust · Hardhat",
      mastery: "ERC‑20/721 & SPL tokens, Anchor PDAs, gas and fee‑payer optimization",
    },
    {
      domain: "Animations",
      icon: <Play className="w-5 h-5 text-yellow-500" />,
      technologies: "GSAP (ScrollTrigger, MotionPath, Draggable)",
      mastery: "Nested timelines, custom eases, CSS/SVG/WebGL integration",
    },
    {
      domain: "Backend",
      icon: <Server className="w-5 h-5 text-red-500" />,
      technologies: "Node.js (Express, Fastify) · Python (FastAPI)",
      mastery: "JWT/OAuth2 authentication, WebSockets, microservices, job queues",
    },
    {
      domain: "DevOps",
      icon: <Server className="w-5 h-5 text-cyan-500" />,
      technologies: "Docker · Terraform · GitHub Actions · AWS",
      mastery: "Infrastructure as code, auto‑scaling Lambdas, multi‑environment CI/CD",
    },
    {
      domain: "Databases",
      icon: <Database className="w-5 h-5 text-green-500" />,
      technologies: "PostgreSQL · MongoDB · Redis · Prisma",
      mastery: "Partitioning, sharding, indexing strategies, cache‑aside patterns",
    },
    {
      domain: "AI & Automation",
      icon: <Bot className="w-5 h-5 text-pink-500" />,
      technologies: "OpenAI · LangChain · Pinecone · HuggingFace",
      mastery: "Prompt chaining, vector search, serverless model hosting",
    },
    {
      domain: "Freelance",
      icon: <Briefcase className="w-5 h-5 text-amber-500" />,
      technologies: "Client Management · Project Planning · Web3",
      mastery: "Blockchain websites, metaverse platforms, responsive design systems",
    },
  ]

  // Deep dive content
  const deepDiveContent = [
    {
      title: "Mobile Development",
      content: [
        "iOS native development with Swift, UIKit, and SwiftUI for seamless user experiences.",
        "Integration of payment systems, blockchain wallets, and cryptocurrency transactions in mobile apps.",
        "Social networking features including real-time chat, media streaming, and user engagement analytics.",
        "App Store optimization, deployment pipelines, and version management for iOS applications.",
      ],
    },
    {
      title: "Frontend & 3D Web",
      content: [
        "Server‑side rendering and incremental static regeneration with custom `_app` and `_document`.",
        "Typed data flows using Zod schemas from API routes through `getServerSideProps`.",
        "3D performance optimizations: level of detail, frustum culling, texture atlas packing.",
      ],
    },
    {
      title: "Blockchain & Web3",
      content: [
        "Solana (Anchor): PDA derivations, cross‑program invocations, on‑chain data packing.",
        "Solana core concepts: Jito MEV integration, shred streaming internals, transaction pipelining, Turbine protocol.",
        "Ethereum: upgradeable proxy patterns, gas‑efficient loops, multicall batching.",
        "Cross‑chain patterns: off‑chain relayers, event listeners, wallet adapter integrations.",
      ],
    },
    {
      title: "GSAP Animations",
      content: [
        "Hierarchical timelines with labels and callback hooks.",
        "ScrollTrigger pinning and scrub controls, MotionPath SVG tracing, Draggable interfaces.",
        "Integration with React lifecycle and render loop in React Three Fiber.",
      ],
    },
    {
      title: "Backend & DevOps",
      content: [
        "Versioned REST and GraphQL API schemas with cursor‑based pagination.",
        "OAuth2 authorization code flows, role‑based access control, rate‑limit middleware.",
        "Terraform modules, Docker multi‑stage builds, GitHub Actions matrix builds, blue/green deployments.",
      ],
    },
  ]

  return (
    <div className={`w-full ${isGlitching ? "glitch-effect" : ""}`}>
      {/* Quick Take */}
      <div className="mb-8 md:mb-10 border border-zinc-800 p-4 md:p-6 rounded-sm bg-black/30 relative overflow-hidden">
        <div className="absolute inset-0 scan-line pointer-events-none"></div>
        <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-white">Quick Take</h3>
        <p className="text-sm md:text-base text-gray-300 leading-relaxed">
          Started from zero in 2020. Through focused learning and hands‑on problem solving, I became a Full‑Stack,
          Mobile & Web3 Specialist. Deep in iOS development, frontend and blockchain, I build mobile applications, 3D
          web experiences, master GSAP animations, and ship serverless systems—no wasted cycles.
        </p>
      </div>

      {/* Core Competencies */}
      <div className="mb-10">
        <h3 className="text-xl font-bold mb-6 text-white">1. Core Competencies</h3>

        <div className="border border-zinc-800 rounded-sm overflow-hidden">
          <div className="hidden md:grid md:grid-cols-12 bg-zinc-900/50 p-4 text-sm font-bold text-gray-400">
            <div className="col-span-3">Domain</div>
            <div className="col-span-5">Primary Technologies</div>
            <div className="col-span-4">Mastery Signals</div>
          </div>

          <Separator className="hidden md:block bg-zinc-800" />

          {competencies.map((comp, index) => (
            <div key={index}>
              <div className="flex flex-col md:grid md:grid-cols-12 p-4 text-sm hover:bg-zinc-900/30 transition-colors">
                <div className="flex items-center mb-2 md:mb-0 md:col-span-3">
                  {comp.icon}
                  <span className="ml-2 text-white">{comp.domain}</span>
                </div>
                <div className="md:col-span-5 text-gray-400 mb-2 md:mb-0">
                  <span className="md:hidden text-xs text-gray-600 block mb-1">Technologies:</span>
                  {comp.technologies}
                </div>
                <div className="md:col-span-4 text-gray-500">
                  <span className="md:hidden text-xs text-gray-600 block mb-1">Mastery:</span>
                  {comp.mastery}
                </div>
              </div>
              {index < competencies.length - 1 && <Separator className="bg-zinc-900/50" />}
            </div>
          ))}
        </div>
      </div>

      {/* Deep-Dive Highlights */}
      <div className="mb-10">
        <h3 className="text-xl font-bold mb-6 text-white">2. Deep‑Dive Highlights</h3>

        <div className="border border-zinc-800 rounded-sm overflow-hidden">
          {/* Tabs */}
          <div className="flex flex-wrap border-b border-zinc-800">
            {deepDiveContent.map((section, index) => (
              <button
                key={index}
                className={`px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium transition-colors ${
                  activeTab === index
                    ? "bg-zinc-800 text-white border-b-2 border-green-500"
                    : "text-gray-500 hover:text-gray-300 hover:bg-zinc-900/50"
                }`}
                onClick={() => handleTabChange(index)}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6 bg-black/30 relative min-h-[200px]">
            <div className="absolute inset-0 scan-line pointer-events-none"></div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-lg font-bold mb-4 text-white">{deepDiveContent[activeTab].title}</h4>
              <ul className="space-y-3">
                {deepDiveContent[activeTab].content.map((item, i) => (
                  <li key={i} className="text-gray-400 flex">
                    <span className="text-green-500 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Philosophy & Growth */}
      <div>
        <h3 className="text-xl font-bold mb-6 text-white">3. Philosophy & Growth</h3>

        <div className="border border-zinc-800 p-4 md:p-6 rounded-sm bg-black/30 relative overflow-hidden">
          <div className="absolute inset-0 scan-line pointer-events-none"></div>

          <p className="text-sm md:text-base text-gray-400 mb-4">
            I started from nothing in 2020. Every challenge taught me a new tool or pattern. Knowledge isn't hours
            logged—it's solving problems fast, staying current, and owning the stack end to end.
          </p>

          <p className="text-sm md:text-base text-gray-300 font-bold">
            If it breaks, I fix it. If it's new, I learn it. If it needs to scale, I architect it.
          </p>
        </div>
      </div>
    </div>
  )
}
