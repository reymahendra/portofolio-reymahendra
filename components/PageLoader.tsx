'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] bg-[#f7f5f1] dark:bg-[#0a0a0a] flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center gap-5"
          >
            <span className="text-3xl font-bold bg-gradient-to-r from-[#111110] via-[#4a4640] to-[#8b8880] dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent tracking-tight select-none">
              RM
            </span>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block w-2 h-2 rounded-full bg-[#111110] dark:bg-indigo-500"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.55, delay: i * 0.14, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
