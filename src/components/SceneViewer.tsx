// src/components/SceneViewer.tsx
import React from 'react'
import { motion } from 'framer-motion'

interface SceneViewerProps {
  scene: {
    id: string
    location: string
    narrative: string
    backgroundImage: string
  }
}

export const SceneViewer: React.FC<SceneViewerProps> = ({ scene }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background */}
      <img
        src={scene.backgroundImage}
        alt={scene.location}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />

      {/* Text */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black to-transparent"
      >
        <h3 className="ff8-title text-2xl mb-4">{scene.location}</h3>
        <p className="text-white text-lg leading-relaxed">{scene.narrative}</p>
      </motion.div>
    </motion.div>
  )
}