"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, Code, Smartphone } from "lucide-react"

interface ProjectCover {
  id: string
  title: string
  description: string
  image: string
  url: string
  type: "web" | "mobile" | "clone"
  technologies: string[]
}

export default function ProjectCoverImages() {
  const [activeProject, setActiveProject] = useState<string | null>(null)

  const projects: ProjectCover[] = [
    {
      id: "zentry",
      title: "Zentry.com Clone",
      description: "A pixel-perfect recreation of Zentry.com with smooth animations and responsive design",
      image: "https://iili.io/3anjJql.webp",
      url: "https://zentry-com-clone.vercel.app/",
      type: "clone",
      technologies: ["React", "Tailwind CSS", "GSAP", "Framer Motion"],
    },
    {
      id: "dffrntera",
      title: "Dffrntera",
      description: "Professional website with modern design and interactive elements",
      image: "https://iili.io/3aBp1ZG.jpg",
      url: "https://dffrntera.com/en/",
      type: "web",
      technologies: ["Next.js", "React", "Tailwind CSS", "Responsive Design"],
    },
    {
      id: "chaingpt",
      title: "ChainGPT",
      description: "Blockchain and AI-focused website with advanced web technologies",
      image: "https://iili.io/3anj9s4.webp",
      url: "https://www.chaingpt.org/",
      type: "web",
      technologies: ["React", "Web3", "Animation Libraries", "API Integration"],
    },
    {
      id: "memepay",
      title: "MemePay",
      description: "Cryptocurrency payment app with digital and physical cards",
      image: "https://iili.io/3anjqmu.webp",
      url: "https://apps.apple.com/in/app/memepay/id6505071831",
      type: "mobile",
      technologies: ["Swift", "iOS", "Blockchain", "Digital Payments"],
    },
    {
      id: "fanbase",
      title: "Fanbase",
      description: "Social media platform for content creators with video, audio chat, and live streaming",
      image: "https://iili.io/3anjfee.webp",
      url: "https://apps.apple.com/in/app/fanbase/id1439232869",
      type: "mobile",
      technologies: ["Swift", "iOS", "Media Streaming", "Social Networking"],
    },
  ]

  const handleMouseEnter = (id: string) => {
    setActiveProject(id)
  }

  const handleMouseLeave = () => {
    setActiveProject(null)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <motion.div
          key={project.id}
          className="relative group rounded-lg overflow-hidden border border-zinc-800 bg-black/30 hover:border-zinc-700 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onMouseEnter={() => handleMouseEnter(project.id)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Project Cover Image */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={800}
              height={600}
              className="object-cover w-full h-full transition-transform duration-700"
              style={{
                transform: activeProject === project.id ? "scale(1.05)" : "scale(1)",
              }}
            />

            {/* Type badge */}
            <div
              className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded-sm flex items-center ${
                project.type === "mobile"
                  ? "bg-purple-500/80"
                  : project.type === "clone"
                    ? "bg-blue-500/80"
                    : "bg-green-500/80"
              }`}
            >
              {project.type === "mobile" ? (
                <>
                  <Smartphone className="w-3 h-3 mr-1" />
                  iOS App
                </>
              ) : project.type === "clone" ? (
                <>
                  <Code className="w-3 h-3 mr-1" />
                  Clone
                </>
              ) : (
                <>
                  <Code className="w-3 h-3 mr-1" />
                  Website
                </>
              )}
            </div>

            {/* Overlay with link */}
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 rounded-sm flex items-center transition-colors ${
                  project.type === "mobile"
                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30"
                    : project.type === "clone"
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30"
                      : "bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30"
                }`}
              >
                <span>{project.type === "mobile" ? "View on App Store" : "Visit Website"}</span>
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Project Info */}
          <div className="p-4">
            <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{project.description}</p>

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
          </div>

          {/* Glowing effect on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              boxShadow:
                activeProject === project.id
                  ? project.type === "mobile"
                    ? "0 0 20px 0 rgba(168, 85, 247, 0.3)"
                    : project.type === "clone"
                      ? "0 0 20px 0 rgba(59, 130, 246, 0.3)"
                      : "0 0 20px 0 rgba(34, 197, 94, 0.3)"
                  : "0 0 0px 0 rgba(0, 0, 0, 0)",
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ))}
    </div>
  )
}
