"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"

export default function FloatingHead() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    // Create scene
    const scene = new THREE.Scene()

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.z = 5

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(300, 300)
    containerRef.current.appendChild(renderer.domElement)

    // Create a sphere for the head
    const geometry = new THREE.SphereGeometry(2, 32, 32)

    // Create wireframe material
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    })

    // Create mesh
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Add some random smaller spheres for a more complex look
    for (let i = 0; i < 20; i++) {
      const smallGeometry = new THREE.SphereGeometry(0.1, 16, 16)
      const smallMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
      })
      const smallSphere = new THREE.Mesh(smallGeometry, smallMaterial)

      // Position randomly around the main sphere
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const radius = 2 + Math.random() * 0.5

      smallSphere.position.x = radius * Math.sin(phi) * Math.cos(theta)
      smallSphere.position.y = radius * Math.sin(phi) * Math.sin(theta)
      smallSphere.position.z = radius * Math.cos(phi)

      scene.add(smallSphere)
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate the sphere
      sphere.rotation.x += 0.005
      sphere.rotation.y += 0.01

      renderer.render(scene, camera)
    }

    animate()

    // Show after a delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => {
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      clearTimeout(timer)
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="absolute top-0 right-0 w-[300px] h-[300px] z-20 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1 }}
    />
  )
}
