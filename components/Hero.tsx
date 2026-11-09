'use client'

import { motion } from 'framer-motion'
import HeroOrbit from './HeroOrbit'
import OrbitBadge from './OrbitBadge'
import Terminal from './Terminal'

const CONTACT_ANCHOR = '#contact'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pb-20 pt-28"
    >
      {/* Warm vignette behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(17,17,16,0.055),transparent_62%)] dark:bg-[radial-gradient(circle_at_50%_34%,rgba(120,130,255,0.10),transparent_62%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center font-serif text-[clamp(2.6rem,7.4vw,6.2rem)] leading-[0.95] tracking-[-0.02em] text-[#111110] dark:text-white"
          >
            <span className="block">Clean code for</span>
            <span className="block italic">a clearer product.</span>
          </motion.h1>

          {/* Badge sits level with the first headline line */}
          <div className="pointer-events-none absolute right-0 top-0 z-[18] hidden md:block">
            <OrbitBadge />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mx-auto mt-6 max-w-[54ch] text-center text-[15px] leading-relaxed text-[#6b6862] dark:text-slate-400 sm:text-[17px]"
          >
            Rey Mahendra is a full-stack engineer with 3+ years building React, TypeScript and
            Django products — lately in AI-powered healthcare.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative z-40 mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-[#111110] px-6 py-3 text-[13px] font-semibold text-[#f7f5f1] transition-colors duration-200 hover:bg-black dark:bg-[#f0efec] dark:text-[#0b0b10] dark:hover:bg-white"
            >
              View projects
              <svg width="13" height="10" viewBox="0 0 13 10" aria-hidden="true">
                <path d="M0 5h11M7 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </a>
            <a
              href={CONTACT_ANCHOR}
              className="inline-flex items-center gap-2 rounded-full border border-[#d9d3c8] bg-white/70 px-6 py-3 text-[13px] font-semibold text-[#111110] backdrop-blur-sm transition-colors duration-200 hover:bg-white dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/[0.12]"
            >
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#111110] text-white dark:bg-white dark:text-[#0b0b10]">
                <svg width="6" height="7" viewBox="0 0 6 7" aria-hidden="true">
                  <path d="M0 0l6 3.5L0 7z" fill="currentColor" />
                </svg>
              </span>
              Get in touch
            </a>
          </motion.div>

          <HeroOrbit />

          {/* Terminal — takes the right note slot inside the ring on desktop,
              stacks below it on smaller screens. */}
          <div className="mx-auto mt-4 w-full max-w-md lg:hidden">
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  )
}
