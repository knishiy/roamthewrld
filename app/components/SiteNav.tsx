'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { NAV_ITEMS } from '../lib/site'
import { IconClose, IconMenu, RoamMark } from './icons'

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')

  // Only a boolean is stored on scroll, so the page no longer re-renders on every scroll event.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active-section highlighting via IntersectionObserver (a band across the upper middle of the viewport).
  useEffect(() => {
    const ids = [...NAV_ITEMS.map((n) => n.id), 'contact']
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    const hero = document.getElementById('top')
    const heroIo = new IntersectionObserver(([e]) => e.isIntersecting && setActive(''), { rootMargin: '-35% 0px -55% 0px' })
    if (hero) heroIo.observe(hero)
    return () => {
      io.disconnect()
      heroIo.disconnect()
    }
  }, [])

  // Close the mobile menu on Escape or when resizing up to desktop.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const mq = window.matchMedia('(min-width: 768px)')
    const onMq = () => mq.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'border-b border-white/10 bg-background/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white" onClick={() => setOpen(false)}>
          <RoamMark />
          roamthewrld
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${
                  active === item.id ? 'text-white' : 'text-muted hover:text-white'
                }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-lg bg-white/[0.07]"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
                {item.label}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <a
              href="#contact"
              className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-[#6aa0ff]"
            >
              Get involved
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="-mr-2 rounded-lg p-2 text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <IconClose size={24} /> : <IconMenu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden md:hidden"
          >
            <ul className="space-y-1 px-4 pb-6 pt-2">
              {[...NAV_ITEMS, { id: 'contact', label: 'Get involved' }].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={`block rounded-lg px-3 py-3 text-base ${
                      active === item.id ? 'bg-white/[0.07] text-white' : 'text-muted hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
