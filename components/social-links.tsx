"use client"

import { motion } from "framer-motion"
import { Linkedin, Instagram, Twitter, Github, Mail } from "lucide-react"

export default function SocialLinks() {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/tamish-mhatre-885317243/",
      icon: <Linkedin className="w-5 h-5" />,
      color: "#0077B5",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/tamishmhatre/",
      icon: <Instagram className="w-5 h-5" />,
      color: "#E1306C",
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/TamishMhatre",
      icon: <Twitter className="w-5 h-5" />,
      color: "#1DA1F2",
    },
    {
      name: "GitHub",
      url: "https://github.com/mhatretamish",
      icon: <Github className="w-5 h-5" />,
      color: "#333",
    },
    {
      name: "Email",
      url: "mailto:contact@tamish.dev",
      icon: <Mail className="w-5 h-5" />,
      color: "#EA4335",
    },
  ]

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800 flex items-center justify-center text-white hover:scale-110 transition-all"
          style={{ boxShadow: `0 0 10px rgba(${link.color}, 0.3)` }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{
            backgroundColor: link.color,
            borderColor: link.color,
          }}
        >
          {link.icon}
        </motion.a>
      ))}
    </div>
  )
}
