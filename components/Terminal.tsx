'use client'

import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Line = { type: 'input' | 'output' | 'error'; text: string }

const RESPONSES: Record<string, string[]> = {
    whoami: [
        "  Rey Mahendra — Software Engineer",
        "  3+ years building full-stack web & mobile applications.",
        "  Currently @ Pusiknas Bareskrim Polri.",
        "  Based in Indonesia · Open to global opportunities.",
    ],
    skills: [
        "  Backend     → Java Spring Boot, RESTful API, Python, Flask, Node.js",
        "  UI/UX & QA  → UI/UX Design, Wireframing, Prototyping, Manual & Functional QA Testing",
        "  Databases   → MongoDB, Database Design & Optimization",
        "  Frameworks  → Laravel, Sanctum API Security",
        "  IT Support  → Network & Hardware Maintenance, System Administration, Troubleshooting",
        "  Tools & OS  → Git, Postman, Linux/Windows, Systems Infrastructure",
    ],
    projects: [
        "  1. Dashboard SPPT-TI     Case-data dashboard     (Java Spring Boot, REST API)",
        "  2. EMP                    Investigation platform   (UI/UX, QA, Support)",
        "  3. Website Resmi LPSK     Public agency website    (UI/UX, QA)",
        "  4. Infrastruktur Pusiknas Network & hardware ops   (IT Support, SysAdmin)",
    ],
    experience: [
        "  Pusiknas Bareskrim Polri · Software Engineer        Mei 2026 - Nov 2026",
        "  Pusiknas Bareskrim Polri · UI/UX Designer & QA      Okt 2025 - Nov 2026",
        "  Website Resmi LPSK       · UI/UX Designer & QA      Okt 2025 - Nov 2026",
        "  Pusiknas Bareskrim Polri · IT Support Specialist    Jan 2024 - Sep 2025",
    ],
    education: [
        "  SMK Pelita Ciampea (Tekhnik Komputer Jaringan) · 2014 - 2017",
        "  Universitas Bina Sarana Informatika (incomplete) · 2021 - 2024",
    ],
    contact: [
        "  Email     → reymahndra@gmail.com",
        "  GitHub    → github.com/reymahendra",
    ],
    resume: ["  Preparing your download...", "  CV will download in a moment."],
    help: [
        "  Available commands:",
        "  whoami      Who is Rey?",
        "  skills      Tech stack overview",
        "  projects    Featured projects",
        "  experience  Work history",
        "  education   Academic background",
        "  contact     Get in touch",
        "  resume      Download CV",
        "  clear       Clear terminal",
    ],
};

const BOOT_LINES = [
  'Rey Portfolio OS v2.0.0',
  'Type \'help\' to see available commands.',
  '',
]

export default function Terminal({ compact = false }: { compact?: boolean }) {
  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const [booted, setBooted] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Boot sequence
  useEffect(() => {
    let cancelled = false
    let timer: ReturnType<typeof setTimeout> | undefined
    let i = 0

    // Reset so a remount (React Strict Mode runs effects twice in dev)
    // doesn't leave the previous run's lines behind.
    setLines([])

    const tick = () => {
      if (cancelled) return
      if (i < BOOT_LINES.length) {
        const text = BOOT_LINES[i]
        setLines((prev) => [...prev, { type: 'output', text }])
        i++
        timer = setTimeout(tick, 120)
      } else {
        setBooted(true)
      }
    }

    tick()

    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    // Scroll only the terminal body, never the page (scrollIntoView would bubble to window)
    const body = bodyRef.current
    if (body) body.scrollTop = body.scrollHeight
  }, [lines])

  const runCommand = async (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    setLines((prev) => [...prev, { type: 'input', text: `$ ${cmd}` }])
    setHistory((h) => [cmd, ...h].slice(0, 50))
    setHistIdx(-1)

    if (trimmed === 'clear') {
      setLines([])
      return
    }
    if (trimmed === '') return

    const response = RESPONSES[trimmed]
    if (response) {
      if (trimmed === 'resume') {
        setLines((prev) => [...prev, ...response.map((t) => ({ type: 'output' as const, text: t }))])
        const { generateResumePdf } = await import('@/lib/generateResumePdf')
        const blob = await generateResumePdf()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'Rey_Mahendra_CV.pdf'
        a.click()
        URL.revokeObjectURL(url)
      } else {
        setLines((prev) => [...prev, ...response.map((t) => ({ type: 'output' as const, text: t }))])
      }
    } else {
      setLines((prev) => [
        ...prev,
        { type: 'error', text: `  command not found: ${trimmed}. Type 'help' for options.` },
      ])
    }
  }

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, history.length - 1)
      setHistIdx(next)
      setInput(history[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(histIdx - 1, -1)
      setHistIdx(next)
      setInput(next === -1 ? '' : history[next])
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.4 }}
      className="block w-full max-w-2xl mx-auto"
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800 rounded-t-xl border border-white/10 border-b-0">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-zinc-400 font-mono">rey@portfolio — terminal</span>
      </div>

      {/* Body */}
      <div ref={bodyRef} className={`bg-zinc-900/95 border border-white/10 border-t-0 rounded-b-xl p-3 sm:p-4 ${compact ? 'h-[188px]' : 'h-44 sm:h-64'} overflow-y-auto font-mono text-xs sm:text-sm cursor-text`}>
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.type === 'input'
                ? 'text-indigo-400 mb-0.5'
                : line.type === 'error'
                ? 'text-red-400 mb-0.5'
                : 'text-zinc-300 mb-0.5'
            }
          >
            {line.text || ' '}
          </div>
        ))}

        {booted && (
          <div className="flex items-center gap-1 text-indigo-400">
            <span>$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              className="flex-1 bg-transparent outline-none text-zinc-100 caret-indigo-400 ml-1"
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}

