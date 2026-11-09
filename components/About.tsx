'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import SectionHeading from './SectionHeading'
import DownloadResumeButton from './DownloadResumeButton'
import { useTilt } from '@/lib/useTilt'

const stats = [
  { label: 'Years Experience', value: '3+', numeric: 3 },
  { label: 'Projects Delivered', value: '10+', numeric: 10 },
  { label: 'Technologies', value: '20+', numeric: 20 },
  { label: 'Companies', value: '3', numeric: 3 },
]

function AnimatedCounter({ numeric, suffix, label }: { numeric: number; suffix: string; label: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  const tilt = useTilt(6)

  useEffect(() => {
    if (!isInView) return
    let start: number | null = null
    const duration = 1200

    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * numeric))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(numeric)
    }

    requestAnimationFrame(step)
  }, [isInView, numeric])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4 }}
      {...tilt}
      className="p-6 rounded-xl bg-black/[0.03] dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-indigo-500/40 transition-colors duration-300"
    >
      <p className="text-5xl font-bold bg-gradient-to-r from-[#111110] via-[#4a4640] to-[#8b8880] dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent tabular-nums">
        {count}{suffix}
      </p>
      <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">{label}</p>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionHeading number="01" title="About Me" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              I am a versatile software engineer with{' '}
              <span className="text-[#111110] dark:text-indigo-400 font-medium">3+ years</span> of industry experience,
              having successfully delivered complex technical projects utilizing a variety of
              technologies across{' '}
              <span className="text-[#111110] dark:text-indigo-400 font-medium">front-end</span> and{' '}
              <span className="text-[#111110] dark:text-indigo-400 font-medium">back-end</span> development.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mt-4">
              As a collaborative team member and effective problem solver, I am seeking an opportunity
              to contribute to a challenging environment where I can apply my skills and further my
              professional growth.
            </p>
            <div className="mt-8">
              <DownloadResumeButton className="inline-flex items-center gap-2 px-6 py-3 bg-[#111110] hover:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-500 disabled:opacity-70 disabled:cursor-wait text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5">
                Download CV
              </DownloadResumeButton>
            </div>
          </motion.div>

          {/* Profile photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-72 md:h-72">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d9d2c4]/60 to-[#c9c2b6]/60 blur-xl scale-105 dark:from-indigo-500/30 dark:to-purple-500/30" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[#e6e1d8] bg-gradient-to-b from-[#f3efe8] to-[#ddd6ca] dark:border-indigo-500/30 dark:from-slate-800 dark:to-slate-950">
                <Image
                  src="/images/rey-about.png"
                  alt="Rey Mahendra"
                  fill
                  sizes="(max-width: 768px) 256px, 288px"
                  className="object-contain object-bottom"
                  unoptimized
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl bg-[#111110] dark:bg-indigo-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/30">
                3+ yrs exp
              </div>
            </div>
          </motion.div>
        </div>

        {/* Animated stat counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const suffix = stat.value.replace(/[0-9]/g, '')
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
              >
                <AnimatedCounter numeric={stat.numeric} suffix={suffix} label={stat.label} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
