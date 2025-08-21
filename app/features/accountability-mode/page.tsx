'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
// Image import removed as it's not used
import Link from 'next/link'

export default function AccountabilityModePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
          scrollY > 50 ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight cursor-pointer">
            roamthewrld
          </Link>
          <Link 
            href="/#features"
            className="text-sm font-medium tracking-wide hover:text-blue-400 transition-colors duration-300"
          >
            ← Back to Features
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <motion.div
          style={{ y: scrollY * 0.5 }}
          className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-purple-800/10"
        />
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent transform -skew-y-12 animate-pulse" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-6xl mb-6"
          >
            👥
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Accountability
            </span>
            <br />
            <span className="text-white">Mode</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Share your status with trusted friends. Control what you share, when you share it.
          </motion.p>
        </div>
      </section>

      {/* Features Detail Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Controlled Sharing
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🔒</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Privacy First</h3>
                    <p className="text-gray-400">You control exactly what information is shared and with whom. No data is transmitted without your explicit consent.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">👥</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Trusted Circle</h3>
                    <p className="text-gray-400">Build your network of trusted friends and family who can receive your status updates and location when needed.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">⚙️</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Customizable Settings</h3>
                    <p className="text-gray-400">Set different sharing levels for different situations - from full transparency to minimal updates.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="w-full h-96 rounded-3xl border border-purple-500/20 overflow-hidden bg-gradient-to-br from-purple-900/20 to-purple-800/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">👥</div>
                    <div className="text-2xl font-bold text-purple-400">Accountability Mode</div>
                    <div className="text-gray-400 mt-2">Share what you want</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sharing Levels */}
      <section className="py-32 px-6 relative bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Choose Your Sharing Level
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🟢",
                title: "Safe Mode",
                description: "Share location and basic status with trusted contacts. Perfect for everyday use and peace of mind.",
                features: ["Location sharing", "Basic status updates", "Emergency alerts"]
              },
              {
                icon: "🟡",
                title: "Social Mode",
                description: "Enhanced sharing for social situations. Let friends know your plans and current status.",
                features: ["Detailed status", "Activity updates", "Group coordination"]
              },
              {
                icon: "🔴",
                title: "Emergency Mode",
                description: "Full transparency for critical situations. Share all available data with emergency contacts.",
                features: ["Full data access", "Real-time tracking", "Emergency response"]
              }
            ].map((level, index) => (
              <motion.div
                key={level.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="p-8 bg-gradient-to-br from-gray-900/50 to-purple-900/20 rounded-2xl border border-purple-500/20"
              >
                <div className="text-4xl mb-4">{level.icon}</div>
                <h3 className="text-2xl font-semibold text-white mb-4">{level.title}</h3>
                <p className="text-gray-400 mb-6">{level.description}</p>
                <ul className="space-y-2">
                  {level.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <span className="text-purple-400 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Features */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Your Privacy, Your Control
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🔐",
                title: "End-to-End Encryption",
                description: "All shared data is encrypted and secure"
              },
              {
                icon: "⏰",
                title: "Time-Limited Sharing",
                description: "Set expiration times for shared information"
              },
              {
                icon: "👤",
                title: "Granular Permissions",
                description: "Control exactly who sees what information"
              },
              {
                icon: "🔄",
                title: "Instant Revocation",
                description: "Stop sharing at any time with one tap"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center p-6 bg-gradient-to-br from-gray-900/50 to-purple-900/20 rounded-2xl border border-purple-500/20"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500">
            © 2025 roamthewrld. Crafted for the extraordinary.
          </p>
        </div>
      </footer>
    </div>
  )
}

