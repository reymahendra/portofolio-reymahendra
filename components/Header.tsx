'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { HiSun, HiMoon } from 'react-icons/hi'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      if (window.scrollY < 100) setActiveSection('')
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.slice(1))
    const observers = sections.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.3 }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  // Smooth scroll + close menu — prevents default anchor jump on mobile
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const id = href.replace('#', '')
    // Small delay lets the menu close animation start before scroll
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 150)
  }

  const isDark = resolvedTheme === 'dark'
  const hireButton =
    'inline-flex items-center gap-2 rounded-full bg-[#111110] hover:bg-black text-[#f7f5f1] dark:bg-[#f0efec] dark:hover:bg-white dark:text-[#0b0b10] text-[13px] font-semibold px-5 py-2.5 transition-colors duration-200'

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-[#f7f5f1]/85 dark:bg-[#0a0a0a]/80 backdrop-blur-md' : ''
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-[72px] gap-4">
          {/* Wordmark */}
          <a
            href="#"
            aria-label="Rey Mahendra — home"
            className="text-[20px] font-semibold tracking-[-0.04em] text-[#111110] dark:text-white leading-none"
          >
            Rey Mahendra<sup className="text-[.6em] font-normal align-super ml-0.5">°</sup>
          </a>

          {/* Desktop pill nav */}
          <nav
            aria-label="Main"
            className="hidden md:flex items-center gap-1 rounded-full border border-[#e3ded5] bg-white/70 dark:border-white/10 dark:bg-white/[0.04] p-[5px]"
          >
            {navLinks.map((link) => {
              const active = activeSection === link.href.slice(1)
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-full px-4 py-[7px] text-[12.5px] font-medium transition-colors duration-200 ${
                    active
                      ? 'bg-white text-[#111110] shadow-[0_1px_6px_rgba(40,35,25,0.10)] dark:bg-white/[0.09] dark:text-white dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]'
                      : 'text-[#6b6862] hover:text-[#111110] dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                aria-label="Toggle theme"
                className="p-2 rounded-full text-[#6b6862] hover:text-[#111110] hover:bg-black/5 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10 transition-all duration-200"
              >
                {isDark ? <HiSun className="w-[18px] h-[18px]" /> : <HiMoon className="w-[18px] h-[18px]" />}
              </button>
            )}

            {/* Hire me */}
            <a href="mailto:reymahndra@gmail.com" className={`hidden sm:inline-flex ${hireButton}`}>
              Hire me
              <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden="true">
                <path d="M1 8l7-7M2.5 1H8v5.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-[5px] p-1.5"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[1.5px] bg-[#111110] dark:bg-slate-300"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-[1.5px] bg-[#111110] dark:bg-slate-300"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[1.5px] bg-[#111110] dark:bg-slate-300"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#f7f5f1]/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#e3ded5] dark:border-white/5 overflow-hidden"
          >
            <nav className="flex flex-col py-4 px-6 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`py-3 text-sm font-medium transition-colors ${
                    activeSection === link.href.slice(1)
                      ? 'text-[#111110] dark:text-white'
                      : 'text-[#6b6862] hover:text-[#111110] dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <a href="mailto:reymahndra@gmail.com" className={`mt-2 w-fit ${hireButton}`}>
                Hire me
                <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden="true">
                  <path d="M1 8l7-7M2.5 1H8v5.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
