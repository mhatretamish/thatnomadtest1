"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import ProjectCoverImages from "@/components/project-cover-images"
import ProjectCoverShowcase from "@/components/project-cover-showcase"
import InteractiveTerminal from "@/components/interactive-terminal"
import SocialLinks from "@/components/social-links"

export default function ShowcasePage() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Project Showcase</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A collection of my best work showcasing mobile app development, web development, and creative skills
          </p>
        </motion.div>

        <Tabs defaultValue="showcase" className="mb-16">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-zinc-900/50 border border-zinc-800">
              <TabsTrigger value="showcase" className="data-[state=active]:bg-zinc-800">
                Showcase
              </TabsTrigger>
              <TabsTrigger value="grid" className="data-[state=active]:bg-zinc-800">
                Grid View
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="showcase" className="mt-0">
            <ProjectCoverShowcase />
          </TabsContent>

          <TabsContent value="grid" className="mt-0">
            <ProjectCoverImages />
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <Button
            variant="outline"
            className="border-zinc-800 text-gray-400 hover:text-white hover:border-zinc-700"
            onClick={() => setIsTerminalOpen(true)}
          >
            Open Interactive Terminal
          </Button>
        </div>
      </div>

      {isTerminalOpen && <InteractiveTerminal onClose={() => setIsTerminalOpen(false)} />}
      <SocialLinks />
    </div>
  )
}
