"use client"

import type React from "react"

import { useState } from "react"
import { Instagram, Github, Linkedin, Twitter, Send, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [isGlitching, setIsGlitching] = useState(false)

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://instagram.com/tamishmhatre",
      icon: <Instagram className="w-5 h-5" />,
      color: "#E1306C",
      hoverClass: "hover:bg-[#E1306C]/20 hover:border-[#E1306C]/30 hover:text-[#E1306C]",
    },
    {
      name: "GitHub",
      url: "https://github.com/mhatretamish",
      icon: <Github className="w-5 h-5" />,
      color: "#6e5494",
      hoverClass: "hover:bg-[#6e5494]/20 hover:border-[#6e5494]/30 hover:text-[#6e5494]",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/tamish-mhatre-885317243/",
      icon: <Linkedin className="w-5 h-5" />,
      color: "#0077B5",
      hoverClass: "hover:bg-[#0077B5]/20 hover:border-[#0077B5]/30 hover:text-[#0077B5]",
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/TamishMhatre",
      icon: <Twitter className="w-5 h-5" />,
      color: "#1DA1F2",
      hoverClass: "hover:bg-[#1DA1F2]/20 hover:border-[#1DA1F2]/30 hover:text-[#1DA1F2]",
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const triggerGlitch = () => {
    setIsGlitching(true)
    setTimeout(() => setIsGlitching(false), 300)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    triggerGlitch()
    setIsSubmitting(true)

    // Simulate form submission
    try {
      // In a real implementation, you would send the form data to your backend or a form service
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitStatus("success")
      // Reset form after successful submission
      setFormState({ name: "", email: "", message: "" })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }
  }

  return (
    <div className={`w-full ${isGlitching ? "glitch-effect" : ""}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Contact Form */}
        <div className="border border-zinc-800 p-6 rounded-sm bg-black/30 relative overflow-hidden">
          <div className="absolute inset-0 scan-line pointer-events-none"></div>

          <h3 className="text-xl font-bold mb-6 text-white flex items-center">
            <Send className="w-5 h-5 text-green-500 mr-2" />
            SEND ME A MESSAGE
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                NAME
              </label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                placeholder="Your name"
                required
                className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-gray-500 focus:border-green-500/50 focus:ring-green-500/20"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                EMAIL
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
                className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-gray-500 focus:border-green-500/50 focus:ring-green-500/20"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                MESSAGE
              </label>
              <Textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleInputChange}
                placeholder="Your message here..."
                required
                className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-gray-500 focus:border-green-500/50 focus:ring-green-500/20 min-h-[120px]"
              />
            </div>

            <div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-colors"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="animate-pulse mr-2">SENDING</span>
                    <span className="inline-block w-2 h-4 bg-green-500 animate-pulse"></span>
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="w-4 h-4 mr-2" />
                    SEND MESSAGE
                  </span>
                )}
              </Button>
            </div>

            {submitStatus === "success" && (
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-sm text-green-400 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Message sent successfully! I'll get back to you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-sm text-red-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                Something went wrong. Please try again later.
              </div>
            )}
          </form>
        </div>

        {/* Social Links */}
        <div className="border border-zinc-800 p-6 rounded-sm bg-black/30 relative overflow-hidden">
          <div className="absolute inset-0 scan-line pointer-events-none"></div>

          <h3 className="text-xl font-bold mb-6 text-white">CONNECT WITH ME</h3>

          <p className="text-gray-400 mb-6">
            Feel free to reach out through any of these platforms. I'm always open to discussing new projects, creative
            ideas, or opportunities to be part of your vision.
          </p>

          <div className="space-y-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center p-4 border border-zinc-800 rounded-sm bg-zinc-900/30 ${link.hoverClass} transition-colors`}
              >
                <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center mr-4">
                  {link.icon}
                </div>
                <div>
                  <h4 className="text-white font-medium">{link.name}</h4>
                  <p className="text-gray-500 text-sm">{link.url.replace(/(https?:\/\/)?(www\.)?/, "")}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-6 p-4 border border-zinc-800 rounded-sm bg-zinc-900/30">
            <h4 className="text-sm font-bold text-gray-300 mb-2">PREFERRED CONTACT METHOD:</h4>
            <p className="text-gray-400 text-sm">
              For professional inquiries, LinkedIn or email is best. For quick questions, reach out on X or Instagram.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
