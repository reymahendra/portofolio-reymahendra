'use client'

import { useRef, type ReactNode } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import Terminal from './Terminal'
import { useOrbit, type OrbitBase } from '@/lib/useOrbit'

/** Base angle + small vertical offset, per the orbit spec. */
const BASES: OrbitBase[] = [
  { a: -60, y: -20 }, // wide — Frontend
  { a: -104, y: 10 }, // image tile
  { a: -14, y: 22 }, // wide — Backend
  { a: 42, y: -6 }, // wide — AI and health
  { a: 86, y: 44 }, // image tile
  { a: 138, y: 0 }, // ghost
  { a: 182, y: -10 }, // ghost
  { a: -150, y: 0 }, // ghost
]

const CARD_SHELL =
  'relative overflow-hidden rounded-2xl border border-[#e6e1d8] bg-white/85 ' +
  'shadow-[0_16px_36px_-14px_rgba(40,35,25,0.18)] backdrop-blur-[14px] backdrop-saturate-[1.4] ' +
  'dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_16px_36px_-14px_rgba(0,0,0,0.75)]'

/** Cylinder shading: the middle catches the light, the far edge falls off. */
const CARD_GLOSS =
  'pointer-events-none absolute inset-0 rounded-[inherit] ' +
  'bg-[linear-gradient(100deg,rgba(255,255,255,0.85),rgba(255,255,255,0.15)_32%,rgba(0,0,0,0.02)_68%,rgba(0,0,0,0.07))] ' +
  'dark:bg-[linear-gradient(100deg,rgba(255,255,255,0.14),rgba(255,255,255,0.02)_32%,rgba(0,0,0,0.06)_68%,rgba(0,0,0,0.26))]'

const AVATARS = ['P', 'L']

type WideCard = { kind: 'wide'; label: string; caption: ReactNode; chip: string; glyph: ReactNode }
type TileCard = { kind: 'tile'; art: 'mountain' | 'moon' }
type GhostCard = { kind: 'ghost' }
type Card = WideCard | TileCard | GhostCard

const CARDS: Card[] = [
    {
        kind: "wide",
        label: "Database",
        caption: (
            <>
                MongoDB, MySQL,
                <br />
                Database Design
            </>
        ),
        chip: "bg-[#c9f26b] text-[#16200a]",
        glyph: (
            <>
                <ellipse cx="8" cy="4" rx="5" ry="2.2" />
                <path d="M3 4v8c0 1.2 2.2 2.2 5 2.2s5-1 5-2.2V4" />
                <path d="M3 8c0 1.2 2.2 2.2 5 2.2s5-1 5-2.2" />
            </>
        ),
    },
    {
        kind: "wide",
        label: "Frontend",
        caption: (
            <>
                React, TypeScript,
                <br />
                Tailwind CSS
            </>
        ),
        chip: "bg-[#a5e3ff] text-[#10283a]",
        glyph: (
            <>
                <rect x="2" y="2.5" width="12" height="9" rx="1.5" />
                <path d="M5.5 14h5M8 11.5V14" />
                <path d="m5.5 6 2-1.5L9.5 6M5.5 8.5l2 1.5 2-1.5" />
            </>
        ),
    },
    {
        kind: "wide",
        label: "QA Testing",
        caption: (
            <>
                Manual, Functional,
                <br />
                Bug Reporting
            </>
        ),
        chip: "bg-[#d6c5ff] text-[#281747]",
        glyph: (
            <>
                <rect x="4" y="1.5" width="8" height="13" rx="1.8" />
                <path d="M7 3.5h2M7.5 12h1" />
            </>
        ),
    },
    {
        kind: "wide",
        label: "Tools",
        caption: (
            <>
                Git, GitHub,
                <br />
                Postman, Figma
            </>
        ),
        chip: "bg-[#ffc4dc] text-[#42172c]",
        glyph: (
            <>
                <circle cx="4" cy="4" r="2" />
                <circle cx="12" cy="4" r="2" />
                <circle cx="8" cy="12" r="2" />
                <path d="M6 4h4M5 5.5l2 4.5M11 5.5 9 10" />
            </>
        ),
    },
    {
        kind: "wide",
        label: "DevOps",
        caption: (
            <>
                Docker, Linux,
                <br />
                CI/CD, GitLab
            </>
        ),
        chip: "bg-[#ffd0a6] text-[#43240d]",
        glyph: (
            <>
                <path d="M2 10h12l-1.5 3H4z" />
                <rect x="3" y="6" width="3" height="3" rx=".5" />
                <rect x="7" y="6" width="3" height="3" rx=".5" />
                <rect x="7" y="2" width="3" height="3" rx=".5" />
                <path d="M1.5 8.5c-.5 2.5 1 5 4 5.5" />
            </>
        ),
    },
    {
        kind: "wide",
        label: "UI/UX",
        caption: (
            <>
                Figma, Design Systems,
                <br />
                Prototyping
            </>
        ),
        chip: "bg-[#b8a4ff] text-[#1a1033]",
        glyph: (
            <>
                <rect x="2" y="2" width="12" height="12" rx="2" />
                <path d="M2 6h12M6 6v8" />
                <circle
                    cx="4"
                    cy="4"
                    r=".6"
                    fill="currentColor"
                    stroke="none"
                />
                <circle
                    cx="6"
                    cy="4"
                    r=".6"
                    fill="currentColor"
                    stroke="none"
                />
            </>
        ),
    },
    {
        kind: "wide",
        label: "Backend",
        caption: (
            <>
                Java Spring Boot,
                <br />
                Python Flask, Node.js
            </>
        ),
        chip: "bg-[#a8c7ff] text-[#142747]",
        glyph: (
            <>
                <path d="M5 3 2 8l3 5M11 3l3 5-3 5M9.5 2 6.5 14" />
            </>
        ),
    },
    {
        kind: "wide",
        label: "IT Support",
        caption: (
            <>
                Network, Hardware,
                <br />
                Troubleshooting
            </>
        ),
        chip: "bg-[#ffb685] text-[#2b1608]",
        glyph: (
            <>
                <path d="M8 2v12M2 8h12" />
                <path d="M5 5c-1.5-1.5-3 .5-1.5 2L8 12l4.5-5c1.5-1.5 0-3.5-1.5-2L8 7z" />
            </>
        ),
    },
];

function TileArt({ art }: { art: 'mountain' | 'moon' }) {
  return (
    <svg viewBox="0 0 112 132" preserveAspectRatio="xMidYMid slice" aria-hidden className="h-full w-full">
      {art === 'mountain' ? (
        <>
          <rect width="112" height="132" fill="#bdbdbd" />
          <path d="M0 132L38 52L58 84L76 62L112 132Z" fill="#2b2b2d" />
        </>
      ) : (
        <>
          <rect width="112" height="132" fill="#1a1a1c" />
          <circle cx="56" cy="66" r="30" fill="#d9d9d9" />
          <circle cx="68" cy="58" r="26" fill="#1a1a1c" />
        </>
      )}
    </svg>
  )
}

function AvatarStack() {
  return (
    <div className="flex items-center">
      {AVATARS.map((initial) => (
        <span
          key={initial}
          className="-mr-2 grid h-7 w-7 place-items-center rounded-full border-2 border-[#f7f5f1] bg-gradient-to-b from-slate-500 to-slate-700 text-[10px] font-medium text-white dark:border-[#0a0a0a] dark:from-slate-600 dark:to-slate-800 last:mr-0"
        >
          {initial}
        </span>
      ))}
      <span className="ml-3 grid h-7 w-7 place-items-center rounded-full border border-[#d9d3c8] bg-white/70 text-[11px] text-[#6b6862] dark:border-white/15 dark:bg-white/[0.06] dark:text-slate-300">
        +
      </span>
    </div>
  )
}

export default function HeroOrbit() {
  const frameRef = useRef<HTMLDivElement>(null)
  const figureRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<(HTMLElement | null)[]>([])
  const reduceMotion = useReducedMotion()

  useOrbit(frameRef, figureRef, nodeRefs, {
    bases: BASES,
    // The portrait's head sits ~30% down the cropped photo (not 43% like the vector).
    headRatio: 0.3,
  })

  return (
    <div className="relative mx-auto mt-6 w-full max-w-[1200px]">
      {/* ── Frame: figure + orbit only ─────────────────────────────── */}
      <div
        ref={frameRef}
        role="group"
        aria-label="Skill cards orbiting the portrait — drag horizontally or use the arrow keys to spin"
        className="relative h-[270px] w-full cursor-grab touch-pan-y select-none overflow-hidden min-[821px]:h-[440px] lg:h-[470px]"
      >
        {/* Figure — middle layer, so back cards hide behind it and front cards ride over it */}
        <div
          ref={figureRef}
          aria-hidden
          className="pointer-events-auto absolute bottom-[-8%] left-1/2 z-[2] w-[76vw] max-w-[340px] -translate-x-1/2 min-[821px]:w-[46vw] min-[821px]:max-w-[620px]"
        >
          <Image
            src="/images/rey.png"
            alt=""
            width={637}
            height={449}
            priority
            draggable={false}
            sizes="(max-width: 821px) 340px, 620px"
            className="h-auto w-full"
          />
        </div>

        {/* Bottom-left — trusted by */}
        <div className="absolute bottom-[22%] left-[1%] z-[16] hidden w-[190px] lg:block">
          <div className="mb-3 h-px w-6 bg-[#c9c2b6] dark:bg-white/25" />
          <p className="text-[13px] leading-snug text-[#6b6862] dark:text-slate-400">
            Trusted by teams at Pusiknas Bareskrim Polri and LPSK.
          </p>
          <div className="mt-3">
            <AvatarStack />
          </div>
        </div>

        {/* Bottom-right — tagline */}
        <div className="absolute bottom-[20%] right-[2%] z-[16] hidden w-[160px] lg:block">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="mb-2 text-[#111110] dark:text-white">
            <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z" fill="currentColor" />
          </svg>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-px w-5 bg-[#c9c2b6] dark:bg-white/25" />
          </div>
          <p className="text-[13px] leading-snug text-[#6b6862] dark:text-slate-400">
            Less noise.
            <br />
            More shipped.
          </p>
        </div>

        {/* Orbiting cards — positioned only by the JS transform */}
        {CARDS.map((card, i) => (
          <div
            key={i}
            ref={(el) => {
              nodeRefs.current[i] = el
            }}
            aria-hidden={card.kind !== 'wide' ? true : undefined}
            style={{ transform: 'translate(-50%, -50%)', opacity: 0 }}
            className="absolute left-1/2 top-0 will-change-transform"
          >
            {card.kind === 'wide' && (
              <div className={`w-[120px] p-3 min-[821px]:w-[176px] ${CARD_SHELL}`}>
                <span className={CARD_GLOSS} />
                <div className="relative flex items-start gap-2.5">
                  <span className={`grid h-[34px] w-[34px] flex-none place-items-center rounded-[10px] ${card.chip}`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                      {card.glyph}
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.88rem] font-medium leading-tight text-[#111110] dark:text-white">{card.label}</p>
                    <p className="mt-0.5 text-[0.66rem] leading-[1.25] text-[#6b6862] dark:text-slate-400">{card.caption}</p>
                  </div>
                </div>
              </div>
            )}

            {card.kind === 'tile' && (
              <div className={`h-[84px] w-[70px] rounded-[20px] min-[821px]:h-[132px] min-[821px]:w-[112px] ${CARD_SHELL}`}>
                <TileArt art={card.art} />
                <span className={CARD_GLOSS} />
              </div>
            )}

            {card.kind === 'ghost' && (
              <div className={`h-[84px] w-[70px] rounded-[20px] bg-white/55 dark:bg-white/[0.035] min-[821px]:h-[132px] min-[821px]:w-[112px] ${CARD_SHELL}`}>
                <span className={CARD_GLOSS} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Side column: straddles the frame's top edge like the reference ── */}

      {/* Rotating badge — moved to Hero so it tracks the headline */}

      {/* Left note — playlist */}
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.94, rotate: -7 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, rotate: -4 }}
        transition={
          reduceMotion
            ? { duration: 0.3 }
            : { type: 'spring', stiffness: 220, damping: 17, delay: 0.5 }
        }
        className="pointer-events-auto absolute left-0 -top-[90px] z-[50] hidden w-[300px] min-[1100px]:block"
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
          transition={reduceMotion ? undefined : { duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
          className="rounded-[24px] border border-[#e6e1d8] bg-white/90 shadow-[0_16px_36px_-14px_rgba(40,35,25,0.18)] backdrop-blur-[14px] backdrop-saturate-[1.4] dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_16px_36px_-14px_rgba(0,0,0,0.75)]"
        >
          <div data-orbit-interactive className="h-[150px] overflow-hidden rounded-[20px]">
            <iframe
              src="https://open.spotify.com/embed/playlist/6i2CO1JHvixFjHNaBhxPGy?utm_source=generator&theme=0"
              title="Spotify playlist: My Playlist"
              width="100%"
              height="190"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="block rounded-[20px]"
            />
          </div>
          <a
            href="https://open.spotify.com/playlist/6i2CO1JHvixFjHNaBhxPGy?si=1cMdM5y9Q-m0vgT3xZPo9Q"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-b-[24px] px-4 py-3 text-center text-[11px] font-medium text-[#1ed760] outline-none transition-colors hover:bg-black/[0.03] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1ed760] dark:hover:bg-white/[0.04]"
          >
            Open full playlist in Spotify
          </a>
        </motion.div>
      </motion.div>

      {/* Right note — the terminal takes the "Ideas, anytime, anywhere" slot */}
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.94, rotate: 9 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, rotate: 5 }}
        transition={
          reduceMotion
            ? { duration: 0.3 }
            : { type: 'spring', stiffness: 220, damping: 18, delay: 0.62 }
        }
        className="absolute right-0 -top-[60px] z-[25] hidden w-[325px] origin-top-right lg:block"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <motion.div
          whileHover={reduceMotion ? undefined : { y: -4 }}
          transition={{ type: 'spring', stiffness: 320, damping: 20 }}
        >
          <Terminal compact />
        </motion.div>
      </motion.div>
    </div>
  )
}
