'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState('hero')
  const [activeTab, setActiveTab] = useState('bracelet')

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      // Detect current section
      const sections = ['hero', 'home', 'about', 'history', 'product', 'features', 'contact']
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
            {['Home', 'About', 'Product', 'Features', 'History', 'Contact'].map((item, index) => (
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
            {['Home', 'About', 'Product', 'Features', 'History', 'Contact'].map((item) => (
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
        
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent transform -skew-y-12 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-blue-500/5 to-transparent transform skew-y-12 animate-pulse delay-1000" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
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
              The World
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Redefining exploration through innovation, design, and the pursuit of extraordinary experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
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
              Roam Out. Roam Safe. Roam Connected.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-16"
            >
              Roam exists to make going out and taking risks feel safer without the hassle —a consent-first bracelet that turns trusted friends into a quiet, always-there support system. With simple, opt-in signals—heart-rate trends, BAC cues, quick check-ins—it keeps your crew in sync without the noise of social media. We design for the moments that matter: the nudge to pause, the ping to regroup, the confidence to explore. Share only what you choose, for as long as you choose—so the journey stays fun without the need for accountability.
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Social Connection",
                description: "Connect with friends and family in real time. Share your status, location, and more.",
                icon: "👥"
              },
              {
                title: "Safety First",
                description: "Advanced health monitoring, BAC sensing, and emergency alerts—keeping you and your friends safe.",
                icon: "🛡️"
              },
              {
                title: "You&apos;re in Control",
                description: "Check and Share your status on your terms. Only to people you choose, Only when you want.",
                icon: "🏔️"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                onClick={() => {
                  if (feature.title === 'Roam') scrollToSection('roam-consumer')
                }}
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



      {/* Product Section */}
      <section id="product" className="py-32 px-6 relative bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">

          {/* Product Features Introduction */}
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
              className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent"
            >
              Introducing Roam Beta
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed"
            >
              Designed for the moments that matter—sleek, protective, and always ready to keep you safe.
            </motion.p>
          </motion.div>

          {/* Interactive Image Slider */}
          <div id="roam-consumer" className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative flex items-center justify-center group"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="relative inline-block border border-white/10 rounded-3xl p-4 overflow-hidden"
                whileHover={{ 
                  borderColor: "rgba(59, 130, 246, 0.5)",
                  boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.4, 0.0, 0.2, 1],
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  className="relative"
                >
                  <Image
                    src={activeTab === 'bracelet' ? '/images/bracelet.png' : '/images/IntClasp.png'}
                    alt={activeTab === 'bracelet' ? 'Bracelet Design' : 'Interior Clasp Sensors'}
                    width={400}
                    height={300}
                    className="object-contain"
                    priority
                  />
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl pointer-events-none" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Feature Descriptions with Tabs */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-6"
            >
              {/* Unified Pill Slider */}
              <div className="flex justify-center mb-6">
                <div className="relative bg-gray-900/50 rounded-full p-1 border border-white/10">
                  <motion.div
                    className="absolute inset-1 bg-blue-600 rounded-full"
                    animate={{
                      x: activeTab === 'bracelet' ? 0 : 'calc(100% - 2px)',
                      width: '50%'
                    }}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.4, 0.0, 0.2, 1],
                      type: "spring",
                      stiffness: 300,
                      damping: 25
                    }}
                  />
                  <div className="flex relative z-10">
                    <motion.div
                      onHoverStart={() => setActiveTab('bracelet')}
                      className="px-6 py-3 rounded-full text-sm font-medium text-white cursor-pointer transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      Bracelet
                    </motion.div>
                    <motion.div
                      onHoverStart={() => setActiveTab('sensors')}
                      className="px-6 py-3 rounded-full text-sm font-medium text-white cursor-pointer transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      Sensors
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Dynamic Feature List */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.4, 0.0, 0.2, 1],
                  staggerChildren: 0.1
                }}
                className="space-y-6"
              >
                {activeTab === 'bracelet' ? (
                  // Bracelet Features
                  <>
                    {[
                      { icon: '🔗', title: 'ECG and BAC Sensor in Clasp', description: 'Advanced sensors seamlessly integrated into the clasp design for maximum functionality without compromising style.' },
                      { icon: '✨', title: 'Sleek, Slim Design', description: 'No screen for times that count and passively keep you protected. Minimalist design that goes unnoticed.' },
                      { icon: '🛡️', title: 'Nylon/Kevlar Threading', description: 'Premium materials for the best protection. Durable, lightweight, and built to withstand any adventure.' },
                      { icon: '⚡', title: 'Wireless Charging', description: 'Just place it and go. No cables, no hassle—effortless charging that keeps you always ready.' }
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                        className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-900/30 transition-all duration-300 cursor-pointer"
                      >
                        <motion.div 
                          className="text-2xl"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {feature.icon}
                        </motion.div>
                        <div>
                          <h4 className="text-xl font-semibold text-white mb-1">{feature.title}</h4>
                          <p className="text-gray-400">{feature.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </>
                ) : (
                  // Sensor Features
                  <>
                    {[
                      { icon: '❤️', title: 'ECG Heart Rate Monitoring', description: 'Continuous monitoring with medical-grade accuracy, providing real-time insights into your cardiovascular health.' },
                      { icon: '🍷', title: 'BAC Alcohol Detection', description: 'Advanced transdermal sensing technology that detects alcohol through your skin for accurate safety monitoring.' },
                      { icon: '🧠', title: 'AI Signal Processing', description: 'Intelligent algorithms that analyze sensor data in real-time, providing accurate readings and predictive insights.' },
                      { icon: '📡', title: 'Bluetooth Connectivity', description: 'Seamless data transmission to your phone, keeping you connected and informed at all times.' }
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                        className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-900/30 transition-all duration-300 cursor-pointer"
                      >
                        <motion.div 
                          className="text-2xl"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {feature.icon}
                        </motion.div>
                        <div>
                          <h4 className="text-xl font-semibold text-white mb-1">{feature.title}</h4>
                          <p className="text-gray-400">{feature.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </>
                )}
              </motion.div>
            </motion.div>
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
              Dive deep into each feature and discover how Roam enhances your safety, connectivity, and peace of mind.
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Heart Rate Monitoring',
                description: 'Continuous ECG monitoring with emergency alerts',
                icon: '❤️',
                color: 'red',
                href: '/features/heart-rate'
              },
              {
                title: 'BAC Sensing',
                description: 'Transdermal alcohol detection for safety',
                icon: '🍷',
                color: 'amber',
                href: '/features/bac-sensing'
              },
              {
                title: 'AI Features',
                description: 'Learn your patterns and provide intelligent safety feedback',
                icon: '🤖',
                color: 'purple',
                href: '/features/ai-features'
              },
              {
                title: 'Accountability Mode',
                description: 'Controlled sharing with trusted friends',
                icon: '👥',
                color: 'purple',
                href: '/features/accountability-mode'
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
                    feature.color === 'red' ? 'to-red-900/20 border-red-500/20 group-hover:border-red-400/40 group-hover:from-gray-800/50 group-hover:to-red-800/30' :
                    feature.color === 'amber' ? 'to-amber-900/20 border-amber-500/20 group-hover:border-amber-400/40 group-hover:from-gray-800/50 group-hover:to-amber-800/30' :
                    feature.color === 'green' ? 'to-green-900/20 border-green-500/20 group-hover:border-green-400/40 group-hover:from-gray-800/50 group-hover:to-green-800/30' :
                    'to-purple-900/20 border-purple-500/20 group-hover:border-purple-400/40 group-hover:from-gray-800/50 group-hover:to-purple-800/30'
                  }`}>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 mb-4">{feature.description}</p>
                                      <div className={`font-medium transition-colors duration-300 ${
                      feature.color === 'red' ? 'text-red-400 group-hover:text-red-300' :
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
      
      {/* Heart Rate Monitoring Detail Section */}
      <section id="heart-rate-monitoring" className="min-h-screen py-48 px-6 relative bg-gradient-to-b from-black to-gray-900 flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Real-Time Health Monitoring
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📊</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Continuous Tracking</h3>
                    <p className="text-gray-400">Monitor your heart rate 24/7 with medical-grade accuracy, providing insights into your cardiovascular health patterns.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">ECG Technology</h3>
                    <p className="text-gray-400">Advanced ECG sensors detect irregular heart rhythms and potential cardiac events, offering early warning capabilities.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🚨</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Emergency Alerts</h3>
                    <p className="text-gray-400">Automatic detection of concerning heart rate patterns triggers immediate alerts to your emergency contacts.</p>
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
              <div className="w-full h-96 rounded-3xl border border-red-500/20 overflow-hidden bg-gradient-to-br from-red-900/20 to-red-800/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">❤️</div>
                    <div className="text-2xl font-bold text-red-400">Heart Rate Monitor</div>
                    <div className="text-gray-400 mt-2">Real-time ECG display</div>
                  </div>
                </div>
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
              className="px-8 py-4 border border-red-500/30 hover:border-red-400/60 text-red-400 font-semibold rounded-full transition-all duration-300 backdrop-blur-sm hover:bg-red-400/10"
            >
              ← Back to Features
            </button>
          </motion.div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-16 bg-black"></div>

      {/* BAC Sensing Detail Section */}
      <section id="bac-sensing" className="min-h-screen py-48 px-6 relative flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Smart Alcohol Monitoring
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🔬</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Transdermal Detection</h3>
                    <p className="text-gray-400">Advanced sensors detect alcohol through your skin, providing continuous monitoring without invasive methods.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📱</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Real-Time Alerts</h3>
                    <p className="text-gray-400">Get instant notifications when your BAC reaches concerning levels, helping you make informed decisions.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">👥</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Friend Notifications</h3>
                    <p className="text-gray-400">Automatically alert trusted friends when it&apos;s time to pause, ensuring your safety in social situations.</p>
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
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">🍷</div>
                    <div className="text-2xl font-bold text-amber-400">BAC Monitor</div>
                    <div className="text-gray-400 mt-2">Transdermal alcohol detection</div>
                  </div>
                </div>
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

      {/* AI Features Detail Section */}
      <section id="ai-features" className="min-h-screen py-48 px-6 relative bg-gradient-to-b from-black to-gray-900 flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Your Personal AI Guardian
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🧠</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Pattern Learning</h3>
                    <p className="text-gray-400">AI analyzes your ECG, BAC, and motion data to understand your unique physiological patterns and habits.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Predictive Alerts</h3>
                    <p className="text-gray-400">Detect potential problems before they occur and receive subtle, context-aware feedback to break harmful habits.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📳</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Haptic Feedback</h3>
                    <p className="text-gray-400">Gentle vibrations provide discreet cues during social situations, enhancing awareness without demanding attention.</p>
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
                    <div className="text-8xl mb-4">🤖</div>
                    <div className="text-2xl font-bold text-purple-400">AI Features</div>
                    <div className="text-gray-400 mt-2">Intelligent safety companion</div>
                  </div>
                </div>
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

      {/* Accountability Mode Detail Section */}
      <section id="accountability-mode" className="min-h-screen py-48 px-6 relative flex items-center">
        <div className="max-w-6xl mx-auto w-full">
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
                each one teaching us something new about form, function, and user experience. 
                Every prototype brought us closer to the ideal balance of comfort, style, and technology.
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
                  <span className="text-gray-300">Minimal Size optimization</span>
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
                This was the moment everything came together. The first working bracelet that proved our concept was possible. 
                It wasn&apos;t perfect, but it was real—a tangible proof that the vision of a social safety bracelet could become reality.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">All sensors functional</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">MQ303B Gas Sensor (Not Transdermal)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Data Optimization using AI</span>
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
                    alt="First Working Bracelet"
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

          {/* MQ303B Sensor Testing Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mt-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                MQ303B Gas Sensor Testing
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Before developing the transdermal sensor, we extensively tested the MQ303B gas sensor to understand alcohol detection capabilities. This phase was crucial for validating our approach and gathering data to train our AI models for accurate readings.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-300">Gas-phase alcohol detection testing</span>
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
                  <span className="text-gray-300">Proof of concept for alcohol sensing</span>
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
                    alt="MQ303B Gas Sensor Testing"
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

      {/* First Transdermal Ethanol Sensor Prototype */}
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
                The First Transdermal Ethanol Sensor Prototype
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                This was the step that moved our bracelet from detecting alcohol in the air to sensing it directly through the skin. By integrating a MicruX ceramic screen-printed electrode (Carbon WE / Ag/AgCl RE) coated with Alcohol Oxidase (AOx) and a Prussian Blue mediator, we created a sensor that measures ethanol molecules diffusing through sweat vapor in real time.
              </p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                A gas-permeable ePTFE membrane shields the chemistry from sweat and oils while allowing ethanol to pass. The signal is amplified by an LMP91000 potentiostat and processed on the Seeed XIAO nRF52840 for Bluetooth streaming.
              </p>
              
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-white mb-4">Key Achievements</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span className="text-gray-300">Embedded MicruX ceramic SPE with AOx enzyme & Prussian Blue catalyst</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span className="text-gray-300">ePTFE membrane for selective ethanol diffusion and fouling protection</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span className="text-gray-300">On-board temperature & humidity compensation (SHTC3 sensor)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span className="text-gray-300">BLE data transmission with real-time AI calibration models</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span className="text-gray-300">Proof-of-concept wearable transdermal alcohol trend detection validated</span>
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
                    src="/images/Screenshot 2025-08-16 004649.png"
                    alt="Transdermal Ethanol Sensor Screenshot"
                    width={400}
                    height={300}
                    className="object-contain"
                    priority
                    onError={(e) => {
                      console.error('Failed to load Screenshot 2025-08-16 004649.png');
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
              Connect With Us
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-400 mb-12 leading-relaxed"
            >
              Ready to embark on your next adventure? Let&apos;s create something extraordinary together.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-amber-400 mb-12 leading-relaxed"
            >
              Currently in prototype development - Join us on this journey!
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
                Get In Touch
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
              {['Twitter', 'LinkedIn', 'Instagram'].map((social, index) => (
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
            © 2025 roamthewrld. Crafted for the extraordinary.
          </motion.p>
        </div>
      </footer>
    </div>
  )
}