'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const NeuralBandViewer = dynamic(() => import('./components/NeuralBandViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900/50 to-blue-900/20 flex items-center justify-center">
      <div className="text-gray-500">Loading 3D model...</div>
    </div>
  ),
})

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Detect current section
      const sections = ['hero', 'home', 'about', 'history', 'features', 'contact']
      const sectionElements = sections.map(id => document.getElementById(id))

      let current = 'hero'
      sectionElements.forEach((element, index) => {
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = sections[index]
          }
        }
      })

      setCurrentSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      setIsMenuOpen(false) // Close mobile menu after click
    }
  }

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
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('hero')}
            className="text-2xl font-bold tracking-tight cursor-pointer"
          >
            roamthewrld
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 relative">
            {['Home', 'About', 'Features', 'History', 'Contact'].map((item, index) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item === 'Home' ? 'hero' : item.toLowerCase())}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                whileHover={{ y: -2 }}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 relative px-3 py-2 rounded-lg ${
                  currentSection === (item === 'Home' ? 'hero' : item.toLowerCase())
                    ? 'text-blue-400'
                    : 'text-white hover:text-blue-400'
                }`}
              >
                {item}
                {currentSection === (item === 'Home' ? 'hero' : item.toLowerCase()) && (
                  <motion.div
                    layoutId="nav-bubble"
                    className="absolute inset-0 bg-blue-400/10 border border-blue-400/30 rounded-lg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-6 h-6 flex flex-col justify-center items-center space-y-1"
          >
            <motion.span
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 6 : 0,
              }}
              className="w-6 h-0.5 bg-white transition-all duration-300"
            />
            <motion.span
              animate={{
                opacity: isMenuOpen ? 0 : 1,
              }}
              className="w-6 h-0.5 bg-white transition-all duration-300"
            />
            <motion.span
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -6 : 0,
              }}
              className="w-6 h-0.5 bg-white transition-all duration-300"
            />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? 'auto' : 0,
          }}
          className="md:hidden overflow-hidden bg-black/95 backdrop-blur-md"
        >
          <div className="px-6 py-4 space-y-4">
            {['Home', 'About', 'Features', 'History', 'Contact'].map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item === 'Home' ? 'hero' : item.toLowerCase())}
                whileHover={{ x: 10 }}
                className={`block text-lg font-medium tracking-wide transition-colors duration-300 text-left w-full px-3 py-2 rounded-lg ${
                  currentSection === (item === 'Home' ? 'hero' : item.toLowerCase())
                    ? 'text-blue-400 bg-blue-400/10 border border-blue-400/30'
                    : 'text-white hover:text-blue-400'
                }`}
              >
                {item}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center">
        {/* Background with Parallax Effect */}
        <motion.div
          style={{
            y: scrollY * 0.5,
          }}
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-900"
        />

        {/* 3D Model Background */}
        <div className="absolute inset-0 z-0">
          <NeuralBandViewer />
        </div>

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/30 to-black/70 pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto pointer-events-none">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
            >
              Roam
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="block text-blue-400"
            >
              Neural Band
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            An open-source neural interface that reads your body, learns your patterns, and gives you precise control over any device—even under pressure.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pointer-events-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('about')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            >
              Explore More
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>



      {/* About Section */}
      <section id="about" className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            >
              Your Body. Your Interface. Your Control.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-16"
            >
              Roam is an open-source neural band that measures heart rate, muscle contractions, and electric signals—then uses AI to learn your unique patterns. It adapts to your stress and fatigue in real time, giving you reliable device control when it matters most. Built open, so every user can configure it to their needs.
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Neural Control",
                description: "EMG and electric signal sensing translates your muscle intent into precise device commands—no buttons, no screens, just you.",
                icon: "🧠"
              },
              {
                title: "Adaptive Intelligence",
                description: "AI/ML learns your specific patterns and adapts to fatigue and stress. When you're under pressure, the band dampens controls to prevent mistakes.",
                icon: "⚡"
              },
              {
                title: "Open Source",
                description: "Fully open hardware and software. Configure sensor thresholds, control mappings, and AI models to fit your exact use case. Run AI on-device to minimize costs.",
                icon: "🔓"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-gray-900/50 to-blue-900/20 p-8 rounded-2xl border border-white/10 backdrop-blur-sm"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>




      {/* Features Section */}
      <section id="features" className="py-32 px-6 relative mb-32">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            >
              Explore Our Features
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed"
            >
              Dive deep into each capability and discover how Roam gives you an edge in high-stress environments.
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Neural Device Control',
                description: 'Translate muscle signals into precise device commands',
                icon: '🧠',
                color: 'blue',
                href: '#neural-device-control'
              },
              {
                title: 'Adaptive Dampening',
                description: 'Stress-aware control adjustment to prevent errors',
                icon: '🎯',
                color: 'green',
                href: '#adaptive-dampening'
              },
              {
                title: 'AI Pattern Learning',
                description: 'ML models that learn your unique physiological patterns',
                icon: '🤖',
                color: 'purple',
                href: '#ai-pattern-learning'
              },
              {
                title: 'Habit Breaking',
                description: 'Muscle tracking to identify and correct unwanted habits',
                icon: '💪',
                color: 'amber',
                href: '#habit-breaking'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <button
                  onClick={() => scrollToSection(feature.title.toLowerCase().replace(/\s+/g, '-'))}
                  className={`bg-gradient-to-br from-gray-900/50 p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 group-hover:scale-105 ${
                    feature.color === 'blue' ? 'to-blue-900/20 border-blue-500/20 group-hover:border-blue-400/40 group-hover:from-gray-800/50 group-hover:to-blue-800/30' :
                    feature.color === 'amber' ? 'to-amber-900/20 border-amber-500/20 group-hover:border-amber-400/40 group-hover:from-gray-800/50 group-hover:to-amber-800/30' :
                    feature.color === 'green' ? 'to-green-900/20 border-green-500/20 group-hover:border-green-400/40 group-hover:from-gray-800/50 group-hover:to-green-800/30' :
                    'to-purple-900/20 border-purple-500/20 group-hover:border-purple-400/40 group-hover:from-gray-800/50 group-hover:to-purple-800/30'
                  }`}>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 mb-4">{feature.description}</p>
                                      <div className={`font-medium transition-colors duration-300 ${
                      feature.color === 'blue' ? 'text-blue-400 group-hover:text-blue-300' :
                      feature.color === 'amber' ? 'text-amber-400 group-hover:text-amber-300' :
                      feature.color === 'green' ? 'text-green-400 group-hover:text-green-300' :
                      'text-purple-400 group-hover:text-purple-300'
                    }`}>
                      Learn More →
                    </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Feature Sections */}

      {/* Neural Device Control Detail Section */}
      <section id="neural-device-control" className="min-h-screen py-48 px-6 relative bg-gradient-to-b from-black to-gray-900 flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Control Devices With Your Body
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">💪</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">EMG Signal Translation</h3>
                    <p className="text-gray-400">Electromyography sensors capture the electrical activity in your muscles and translate micro-contractions into precise digital commands for connected devices.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🎮</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Universal Device Control</h3>
                    <p className="text-gray-400">Drones, robotic arms, industrial tools, surgical instruments—any Bluetooth-enabled device can be mapped to your muscle signals for hands-free operation.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Low-Latency Response</h3>
                    <p className="text-gray-400">Sub-millisecond signal processing ensures your intent becomes action instantly—critical in high-stress, time-sensitive environments.</p>
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
              <div className="w-full h-96 rounded-3xl border border-blue-500/20 overflow-hidden bg-gradient-to-br from-blue-900/20 to-blue-800/10">
                <NeuralBandViewer
                  cameraPosition={[0, 30, 80]}
                  cameraTarget={[0, 0, 0]}
                  modelRotation={[Math.PI / 2, 0, 0]}
                  autoRotate={false}
                  accentColor="#3b82f6"
                />
              </div>
            </motion.div>
          </div>

          {/* Back to Features Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-16"
          >
            <button
              onClick={() => scrollToSection('features')}
              className="px-8 py-4 border border-blue-500/30 hover:border-blue-400/60 text-blue-400 font-semibold rounded-full transition-all duration-300 backdrop-blur-sm hover:bg-blue-400/10"
            >
              ← Back to Features
            </button>
          </motion.div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-16 bg-black"></div>

      {/* Adaptive Dampening Detail Section */}
      <section id="adaptive-dampening" className="min-h-screen py-48 px-6 relative flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Stress-Aware Control Adjustment
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📊</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Real-Time Fatigue Detection</h3>
                    <p className="text-gray-400">The band continuously monitors muscle fatigue and stress biomarkers through EMG and heart rate variability, detecting when your performance may be compromised.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Adaptive Control Dampening</h3>
                    <p className="text-gray-400">When stress or nervousness is detected, the band automatically adjusts control sensitivity—dampening inputs to prevent overcorrection and costly mistakes.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🛡️</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Safety Envelope</h3>
                    <p className="text-gray-400">Configurable safety boundaries prevent extreme actions when the system detects you&apos;re operating outside your normal physiological range.</p>
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
              <div className="w-full h-96 rounded-3xl border border-green-500/20 overflow-hidden bg-gradient-to-br from-green-900/20 to-green-800/10">
                <NeuralBandViewer
                  cameraPosition={[100, 60, 100]}
                  cameraTarget={[0, 0, 0]}
                  modelRotation={[0.3, 0.5, 0]}
                  autoRotate={true}
                  rotateSpeed={0.15}
                  accentColor="#22c55e"
                />
              </div>
            </motion.div>
          </div>

          {/* Back to Features Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-16"
          >
            <button
              onClick={() => scrollToSection('features')}
              className="px-8 py-4 border border-green-500/30 hover:border-green-400/60 text-green-400 font-semibold rounded-full transition-all duration-300 backdrop-blur-sm hover:bg-green-400/10"
            >
              ← Back to Features
            </button>
          </motion.div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-16 bg-black"></div>

      {/* AI Pattern Learning Detail Section */}
      <section id="ai-pattern-learning" className="min-h-screen py-48 px-6 relative bg-gradient-to-b from-black to-gray-900 flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                AI That Learns You
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🧠</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Personal Pattern Recognition</h3>
                    <p className="text-gray-400">ML models train on your unique EMG signatures, heart rate patterns, and muscle responses—building a profile that gets more accurate over time.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📱</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">On-Device Processing Option</h3>
                    <p className="text-gray-400">Choose to run AI inference on your phone or computer&apos;s hardware instead of cloud APIs. Your data stays local, and your costs stay low.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🔄</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Continuous Adaptation</h3>
                    <p className="text-gray-400">The AI continuously refines its model as your patterns evolve—whether you&apos;re recovering from injury, building strength, or adapting to new equipment.</p>
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
                <NeuralBandViewer
                  cameraPosition={[0, 120, 80]}
                  cameraTarget={[0, 0, 0]}
                  modelRotation={[0, 0, 0]}
                  autoRotate={true}
                  rotateSpeed={0.2}
                  accentColor="#a855f7"
                />
              </div>
            </motion.div>
          </div>

          {/* Back to Features Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-16"
          >
            <button
              onClick={() => scrollToSection('features')}
              className="px-8 py-4 border border-purple-500/30 hover:border-purple-400/60 text-purple-400 font-semibold rounded-full transition-all duration-300 backdrop-blur-sm hover:bg-purple-400/10"
            >
              ← Back to Features
            </button>
          </motion.div>
        </div>
      </section>

      {/* Habit Breaking Detail Section */}
      <section id="habit-breaking" className="min-h-screen py-48 px-6 relative flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Break the Pattern
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📳</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Habit Detection</h3>
                    <p className="text-gray-400">The same EMG and muscle tracking sensors that enable device control can identify repetitive unwanted movements and behavioral patterns.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Real-Time Intervention</h3>
                    <p className="text-gray-400">Gentle haptic feedback alerts you the moment a habit pattern is detected, creating awareness before the action completes.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📊</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Progress Tracking</h3>
                    <p className="text-gray-400">Track your habit frequency over time. The AI learns which interventions work best for you and adapts its approach accordingly.</p>
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
              <div className="w-full h-96 rounded-3xl border border-amber-500/20 overflow-hidden bg-gradient-to-br from-amber-900/20 to-amber-800/10">
                <NeuralBandViewer
                  cameraPosition={[-30, 20, 90]}
                  cameraTarget={[0, 0, 0]}
                  modelRotation={[Math.PI / 3, 0, 0.5]}
                  autoRotate={false}
                  accentColor="#f59e0b"
                />
              </div>
            </motion.div>
          </div>

          {/* Back to Features Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-16"
          >
            <button
              onClick={() => scrollToSection('features')}
              className="px-8 py-4 border border-amber-500/30 hover:border-amber-400/60 text-amber-400 font-semibold rounded-full transition-all duration-300 backdrop-blur-sm hover:bg-amber-400/10"
            >
              ← Back to Features
            </button>
          </motion.div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-16 bg-black"></div>

      {/* History Section */}
      <section id="history" className="py-32 px-6 relative bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            >
              The Journey
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed"
            >
              From concept to reality—explore the evolution of Roam through our development milestones.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Prototype Iterations */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                16 Iterations to Perfection
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                The path to the perfect prototype wasn&apos;t straightforward. It took 16 different iterations,
                each one teaching us something new about form, function, and sensor placement.
                Every prototype brought us closer to the ideal balance of comfort, wearability, and signal fidelity.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Form factor optimization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Sensor placement refinement</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Adjusting fits around wrist</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Minimal size optimization</span>
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
              <div className="flex items-center justify-center">
                <div className="relative inline-block border border-blue-500/20 rounded-3xl bg-gradient-to-br from-blue-900/20 to-blue-800/10 p-4">
                  <Image
                    src="/images/IMG_2860.png"
                    alt="16 Prototype Iterations"
                    width={400}
                    height={300}
                    className="object-contain"
                    priority
                    onError={(e) => {
                      console.error('Failed to load IMG_2860.png');
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>



          <div className="grid lg:grid-cols-2 gap-16 items-center mt-32">
            {/* First Working Bracelet */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                The First Working Prototype
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                This was the moment everything came together. The first working band that proved our concept was possible.
                It wasn&apos;t perfect, but it was real—a tangible proof that a neural control band could become reality.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">All sensors functional</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">EMG signal capture validated</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Data optimization using AI</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Proof of concept validated</span>
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
              <div className="flex items-center justify-center">
                <div className="relative inline-block border border-green-500/20 rounded-3xl bg-gradient-to-br from-green-900/20 to-green-800/10 p-4">
                  <Image
                    src="/images/IMG_3182.png"
                    alt="First Working Prototype"
                    width={400}
                    height={300}
                    className="object-contain"
                    priority
                    onError={(e) => {
                      console.error('Failed to load IMG_3182.png');
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sensor Testing Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mt-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Sensor Calibration & Testing
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Extensive testing of various sensor configurations to understand signal quality, noise isolation, and optimal electrode placement. This phase was crucial for validating our approach and gathering training data for the AI models.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-300">EMG signal quality benchmarking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-300">Sensor calibration and validation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-300">Data collection for AI training</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-300">Noise isolation and filtering</span>
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
              <div className="flex items-center justify-center">
                <div className="relative inline-block border border-orange-500/20 rounded-3xl bg-gradient-to-br from-orange-900/20 to-orange-800/10 p-4">
                  <Image
                    src="/images/IMG_3184.png"
                    alt="Sensor Testing"
                    width={400}
                    height={300}
                    className="object-contain"
                    priority
                    onError={(e) => {
                      console.error('Failed to load IMG_3184.png');
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>


        </div>
      </section>

      {/* Spacer */}
      <div className="h-16 bg-black"></div>

      {/* Transdermal Sensor Section - kept as it shows technical depth */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Dry Electrode EMG Sensing
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Each link in the band contains a solid dry electrode that conforms to your wrist shape—no gels, no prep, no consumables. The chain-link design ensures consistent skin contact as you move, adapting to your unique anatomy for reliable signal capture.
              </p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                These electrodes measure electrical signals from hand gestures, wrist movements, and muscle contractions. The array captures both surface EMG for gesture recognition and deeper muscle tension for fatigue monitoring, amplified by an LMP91000 analog front-end and streamed via the Seeed XIAO nRF52840 over Bluetooth.
              </p>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-white mb-4">What the Electrodes Measure</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span className="text-gray-300">Surface EMG from forearm muscles—detecting finger and hand gestures</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span className="text-gray-300">Muscle tension levels for real-time fatigue and stress detection</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span className="text-gray-300">Electrical signal patterns unique to each user for personalized AI training</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span className="text-gray-300">Continuous muscle contraction data for adaptive control dampening</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span className="text-gray-300">On-device signal filtering and BLE streaming via nRF52840</span>
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
              <div className="flex items-center justify-center">
                <div className="relative inline-block border border-amber-500/20 rounded-3xl bg-gradient-to-br from-amber-900/20 to-amber-800/10 p-4">
                  <Image
                    src="/images/dry-electrode-prototype.png"
                    alt="Dry Electrode Chain-Link Design"
                    width={400}
                    height={300}
                    className="object-contain"
                    priority
                    onError={(e) => {
                      console.error('Failed to load dry-electrode-prototype.png');
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            >
              Join the Build
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-400 mb-12 leading-relaxed"
            >
              Roam is open source. Whether you&apos;re a hardware hacker, ML engineer, or someone who needs better device control—there&apos;s a place for you.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-amber-400 mb-12 leading-relaxed"
            >
              Currently in prototype development - Contribute or follow our progress!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center items-center mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              >
                Get Involved
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex justify-center space-x-8"
            >
              {['Twitter', 'LinkedIn', 'GitHub'].map((social, index) => (
                <motion.button
                  key={social}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:border-blue-400/50 hover:bg-blue-400/10 transition-all duration-300"
                >
                  <span className="text-sm font-medium">{social[0]}</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-500"
          >
            © 2025 roamthewrld. Open source neural interface.
          </motion.p>
        </div>
      </footer>
    </div>
  )
}
