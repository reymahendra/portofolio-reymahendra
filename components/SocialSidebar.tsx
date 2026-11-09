'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'

const links = [
  { icon: FaGithub, href: 'https://github.com/reymahendra', label: 'GitHub' },
  { icon: HiMail, href: 'mailto:reymahndra@gmail.com', label: 'Email' },
]

export default function SocialSidebar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.3 }}
          className="fixed left-5 bottom-1/3 z-40 hidden lg:flex flex-col items-center gap-3"
        >
          {links.map(({ icon: Icon, href, label }, i) => (
            <motion.a
              key={label}
              href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.15, y: -2 }}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 dark:text-indigo-400 border border-black/10 dark:border-white/10 hover:border-indigo-500/40 bg-white/80 dark:bg-black/40 backdrop-blur-sm transition-colors duration-200 shadow-sm"
            >
              <Icon className="w-[15px] h-[15px]" />
            </motion.a>
          ))}
          <div className="w-px h-14 bg-gradient-to-b from-indigo-500/40 to-transparent mt-1" />
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
