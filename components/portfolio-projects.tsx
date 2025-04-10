"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, ArrowRight, Smartphone } from "lucide-react"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"

type Project = {
  title: string
  description: string
  image: string
  url: string
  technologies: string[]
  category: "animation" | "clone" | "creative" | "other" | "professional" | "mobile"
}

export default function PortfolioProjects() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [isHovering, setIsHovering] = useState<number | null>(null)

  const projects: Project[] = [
    {
      title: "MemePay",
      description:
        "A cryptocurrency payment app with digital and physical cards, seamless card management, and secure transactions.",
      image: "https://iili.io/3anjqmu.webp",
      url: "https://apps.apple.com/in/app/memepay/id6505071831",
      technologies: ["Swift", "iOS", "Blockchain", "Digital Payments", "UI/UX Design"],
      category: "mobile",
    },
    {
      title: "Fanbase",
      description:
        "A social media platform for content creators with features for video, audio chat, pictures, and live streaming.",
      image: "https://iili.io/3anjfee.webp",
      url: "https://apps.apple.com/in/app/fanbase/id1439232869",
      technologies: ["Swift", "iOS", "Media Streaming", "Social Networking", "Real-time Communication"],
      category: "mobile",
    },
    {
      title: "Dffrntera",
      description:
        "A professional website built as a freelance developer, featuring modern design and interactive elements.",
      image: "https://iili.io/3aBp1ZG.jpg",
      url: "https://dffrntera.com/en/",
      technologies: ["Next.js", "React", "Tailwind CSS", "Responsive Design"],
      category: "professional",
    },
    {
      title: "ChainGPT",
      description:
        "A blockchain and AI-focused website developed as a freelance project, showcasing advanced web technologies.",
      image: "https://iili.io/3anj9s4.webp",
      url: "https://www.chaingpt.org/",
      technologies: ["React", "Web3", "Animation Libraries", "API Integration"],
      category: "professional",
    },
    {
      title: "Zentry.com Clone",
      description:
        "A pixel-perfect recreation of Zentry.com, built from scratch with attention to detail and smooth animations.",
      image: "https://iili.io/3anjJql.webp",
      url: "https://zentry-com-clone.vercel.app/",
      technologies: ["React", "Tailwind CSS", "GSAP", "Responsive Design"],
      category: "clone",
    },
    {
      title: "Scrolling Animation",
      description:
        "An immersive scrolling experience built with GSAP and ScrollTrigger, featuring smooth animations and parallax effects.",
      image: "https://iili.io/3anj2gS.webp",
      url: "https://scrolling-animation-tau.vercel.app/",
      technologies: ["GSAP", "ScrollTrigger", "React", "Framer Motion"],
      category: "animation",
    },
    {
      title: "React GSAP Ramos Clone",
      description: "A clone of a creative agency website with advanced animations and interactive elements.",
      image: "https://iili.io/3anjFd7.png",
      url: "https://react-gsap-ramos-colne.vercel.app/",
      technologies: ["React", "GSAP", "Locomotive Scroll", "WebGL"],
      category: "clone",
    },
    {
      title: "Exoape Clone",
      description:
        "Recreation of the award-winning Exoape creative studio website with complex animations and transitions.",
      image: "https://cdn.discordapp.com/attachments/1359147455035216025/1359521106658332925/image.png?ex=67f7c832&is=67f676b2&hm=70a23b0cc85bc77365288b28b1f9e997acd6b83c2317e0f70b1340665d532b97&",
      url: "https://exoape-clone-chi.vercel.app/",
      technologies: ["Next.js", "Three.js", "GSAP", "Canvas"],
      category: "clone",
    },
    {
      title: "Lazarev Project",
      description: "A creative portfolio website with unique interactions and visual effects.",
      image: "https://iili.io/3anjd12.webp",
      url: "https://balamiayush.github.io/Lazarev/",
      technologies: ["JavaScript", "HTML5", "CSS3", "WebGL"],
      category: "creative",
    },
  ]

  const filteredProjects = activeFilter ? projects.filter((project) => project.category === activeFilter) : projects

  const filters = [
    { value: null, label: "All Projects" },
    { value: "mobile", label: "Mobile Apps" },
    { value: "professional", label: "Professional Work" },
    { value: "animation", label: "Animations" },
    { value: "clone", label: "Website Clones" },
    { value: "creative", label: "Creative" },
  ]

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-white">🚀 My Portfolio Projects</h2>
        <p className="text-xs sm:text-sm text-gray-400">
          A collection of my best work showcasing mobile app development, web development, and creative skills
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((filter) => (
          <button
            key={filter.value || "all"}
            className={`px-3 py-2 text-xs font-medium rounded-sm transition-colors ${
              activeFilter === filter.value
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-zinc-800/50 text-gray-400 border border-zinc-800 hover:bg-zinc-800 hover:text-gray-300"
            }`}
            onClick={() => setActiveFilter(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {filteredProjects.map((project, index) => (
    <motion.div
      key={index}
      className="border border-zinc-800 rounded-sm overflow-hidden bg-black/30 hover:border-zinc-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovering(index)}
      onMouseLeave={() => setIsHovering(null)}
    >
      
        
            {/* Project Image */}
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={600}
                height={400}
                className="object-cover w-full h-full transition-transform duration-700"
                style={{
                  transform: isHovering === index ? "scale(1.05)" : "scale(1)",
                }}
              />

              {/* Category badge */}
              {project.category === "mobile" && (
                <div className="absolute top-2 left-2 bg-purple-500/80 text-white text-xs px-2 py-1 rounded-sm flex items-center">
                  <Smartphone className="w-3 h-3 mr-1" />
                  iOS App
                </div>
              )}

              {/* Overlay with link */}
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-sm flex items-center hover:bg-green-500/30 transition-colors"
                >
                  <span>{project.category === "mobile" ? "View on App Store" : "View Project"}</span>
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Project Info */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{project.description}</p>

              <Separator className="bg-zinc-800 mb-4" />

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-zinc-800/50 text-gray-400 text-xs rounded-sm border border-zinc-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Visit Link */}
              <div className="mt-4">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 text-sm flex items-center hover:text-green-300 transition-colors"
                >
                  <span>{project.category === "mobile" ? "View on App Store" : "Visit Website"}</span>
                  <ArrowRight className="ml-1 w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
