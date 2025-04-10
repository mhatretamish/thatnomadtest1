"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Code, Server, Smartphone, Database, Link, Bot } from "lucide-react"
import { Separator } from "@/components/ui/separator"

type SkillCategory = {
  icon: React.ReactNode
  title: string
  subtitle: string
  skills: {
    text: string
    keywords: string[]
  }[]
}

export default function SkillsDeepDive() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isGlitching, setIsGlitching] = useState(false)

  const skillCategories: SkillCategory[] = [
    {
      icon: <Code className="w-5 h-5 text-green-500" />,
      title: "Frontend",
      subtitle: "Next.js · TS · React",
      skills: [
        {
          text: "SSR & SSG Mastery",
          keywords: ["Custom _app", "_document", "ISR/SSG strategies for performance"],
        },
        {
          text: "Type‑Safe Data Flows",
          keywords: ["API Routes", "Typed getServerSideProps", "Zod schemas"],
        },
        {
          text: "UI Systems",
          keywords: ["Tailwind + ShadCN/UI", "Design tokens", "utility‑first scaling"],
        },
        {
          text: "UX Animations",
          keywords: ["Framer Motion", "micro‑interactions", "page‑transition choreography"],
        },
      ],
    },
    {
      icon: <Server className="w-5 h-5 text-blue-500" />,
      title: "Backend & DevOps",
      subtitle: "",
      skills: [
        {
          text: "API Design",
          keywords: ["REST (Express/Fastify) & GraphQL (Apollo)", "versioning", "pagination"],
        },
        {
          text: "Auth & Security",
          keywords: ["JWT", "OAuth2", "RBAC", "rate‑limiting", "helmet/CORS hardening"],
        },
        {
          text: "Infra as Code",
          keywords: ["Terraform + Docker", "reproducible stacks", "immutable infra"],
        },
        {
          text: "CI/CD Pipelines",
          keywords: ["GitHub Actions", "multi‑env deploy (staging/prod)", "automated tests"],
        },
      ],
    },
    {
      icon: <Smartphone className="w-5 h-5 text-purple-500" />,
      title: "Mobile & Serverless",
      subtitle: "",
      skills: [
        {
          text: "Flutter/Dart",
          keywords: ["Custom widgets", "state‑mgmt (Riverpod)", "adaptive layouts"],
        },
        {
          text: "Serverless Logic",
          keywords: ["Firebase Functions / AWS Lambda", "event‑driven flows", "cold start tuning"],
        },
        {
          text: "Mobile Auth",
          keywords: ["Firebase Auth + OAuth SSO", "secure token storage", "refresh flows"],
        },
      ],
    },
    {
      icon: <Database className="w-5 h-5 text-yellow-500" />,
      title: "Databases & Caching",
      subtitle: "",
      skills: [
        {
          text: "Relational",
          keywords: ["PostgreSQL", "complex joins", "window functions", "partitioning"],
        },
        {
          text: "NoSQL",
          keywords: ["MongoDB", "schema design", "aggregation pipelines", "replica sets"],
        },
        {
          text: "Cache Layers",
          keywords: ["Redis", "pub/sub", "TTL strategies", "cache‑aside patterns"],
        },
      ],
    },
    {
      icon: <Link className="w-5 h-5 text-cyan-500" />,
      title: "Web3 & Blockchain",
      subtitle: "",
      skills: [
        {
          text: "Smart Contracts",
          keywords: ["Solidity", "ERC‑20/721 patterns", "upgradeable proxies"],
        },
        {
          text: "Dev Tooling",
          keywords: ["Hardhat + Wagmi", "local forks", "gas reporting", "on‑chain testing"],
        },
        {
          text: "Wallet Integrations",
          keywords: ["MetaMask", "WalletConnect", "secure tx signing flows"],
        },
      ],
    },
    {
      icon: <Bot className="w-5 h-5 text-red-500" />,
      title: "AI & Automation",
      subtitle: "",
      skills: [
        {
          text: "LLM Orchestration",
          keywords: ["LangChain", "prompt chains", "memory buffers", "custom agents"],
        },
        {
          text: "Vector Search",
          keywords: ["Pinecone", "embedding pipelines", "similarity thresholds"],
        },
        {
          text: "Model Hosting",
          keywords: ["HuggingFace Inference API", "endpoint tuning", "cost optimization"],
        },
      ],
    },
  ]

  const toggleCategory = (title: string) => {
    // Trigger glitch effect
    setIsGlitching(true)
    setTimeout(() => setIsGlitching(false), 300)

    if (activeCategory === title) {
      setActiveCategory(null)
    } else {
      setActiveCategory(title)
    }
  }

  return (
    <div className={`w-full ${isGlitching ? "glitch-effect" : ""}`}>
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-white">🔍 Skill Deep‑Dive</h2>
        <p className="text-xs sm:text-sm text-gray-400">
          Skills I've acquired but rarely use (because finishing projects is overrated)
        </p>
      </div>

      <div className="space-y-4">
        {skillCategories.map((category) => (
          <div key={category.title} className="border border-zinc-800 rounded-sm overflow-hidden">
            <div
              className="p-3 md:p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-900/50 transition-colors"
              onClick={() => toggleCategory(category.title)}
            >
              <div className="flex items-center">
                {category.icon}
                <div className="ml-3">
                  <h3 className="text-base md:text-lg font-bold text-white">
                    {category.title}
                    {category.subtitle && (
                      <span className="hidden sm:inline text-sm font-normal text-gray-500 ml-2">
                        {category.subtitle}
                      </span>
                    )}
                  </h3>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${activeCategory === category.title ? "rotate-180" : ""}`}
              />
            </div>

            <AnimatePresence>
              {activeCategory === category.title && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <Separator className="bg-zinc-800" />
                  <div className="p-3 md:p-4 bg-black/30">
                    <ul className="space-y-4">
                      {category.skills.map((skill, index) => (
                        <li key={index} className="relative pl-6 md:pl-8">
                          <div className="absolute left-0 top-0 w-4 h-4 flex items-center justify-center">
                            <span className="text-green-500 text-xs">✅</span>
                          </div>
                          <div>
                            <span className="text-white font-bold text-sm md:text-base">{skill.text}:</span>
                            <span className="text-gray-400 ml-2 text-xs md:text-sm">{skill.keywords.join(", ")}.</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="mt-6 md:mt-8 p-3 md:p-4 border border-zinc-800 rounded-sm bg-black/30">
        <h4 className="text-xs md:text-sm font-bold text-gray-300 mb-2">WHY THIS WORKS:</h4>
        <ul className="space-y-2 text-gray-400 text-xs md:text-sm">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <span>
              <span className="text-white font-medium">Bullet‑precision:</span> Each line is a standalone "I own this."
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <span>
              <span className="text-white font-medium">Depth signals:</span> Keywords like "partitioning," "cold start
              tuning," "upgradeable proxies."
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <span>
              <span className="text-white font-medium">No fluff:</span> Pure capabilities, no project filler.
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
