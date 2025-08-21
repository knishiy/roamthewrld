'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
// Image import removed as it's not used
import Link from 'next/link'

export default function HeartRatePage() {
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
          className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-red-800/10"
        />
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent transform -skew-y-12 animate-pulse" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-6xl mb-6"
          >
            ❤️
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Heart Rate
            </span>
            <br />
            <span className="text-white">Monitoring</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Continuous heart rate monitoring with ECG capabilities for real-time health insights and emergency response.
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
        </div>
      </section>

      {/* Technical Specifications */}
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
              Technical Excellence
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Accuracy",
                value: "99.9%",
                description: "Medical-grade heart rate monitoring with clinical accuracy"
              },
              {
                title: "Response Time",
                value: "< 2s",
                description: "Ultra-fast detection and alert system"
              },
              {
                title: "Battery Life",
                value: "7 days",
                description: "Continuous monitoring without daily charging"
              }
            ].map((spec, index) => (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center p-8 bg-gradient-to-br from-gray-900/50 to-red-900/20 rounded-2xl border border-red-500/20"
              >
                <div className="text-4xl font-bold text-red-400 mb-2">{spec.value}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{spec.title}</h3>
                <p className="text-gray-400">{spec.description}</p>
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

