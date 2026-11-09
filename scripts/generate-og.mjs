// Generates public/images/og-image.png at build time using @resvg/resvg-js.
// Run via: node scripts/generate-og.mjs  (called from package.json prebuild)

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { Resvg } from '@resvg/resvg-js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const out  = join(root, 'public', 'images', 'og-image.png')

// Embed profile photo as base64 data URI
const photoPath = join(root, 'public', 'images', 'profile.png')
const photoDataUri = existsSync(photoPath)
  ? `data:image/png;base64,${readFileSync(photoPath).toString('base64')}`
  : ''

const tags = ['Java', 'Spring Boot', 'React', 'TypeScript', 'Laravel']
const tagSpacing = 160
const tagsStartX = 80

const tagRects = tags.map((tag, i) => {
  const x = tagsStartX + i * tagSpacing
  return `
    <rect x="${x}" y="390" width="140" height="36" rx="18"
      fill="rgba(99,102,241,0.15)" stroke="rgba(99,102,241,0.5)" stroke-width="1"/>
    <text x="${x + 70}" y="413" fill="#a5b4fc" font-family="sans-serif"
      font-size="16" text-anchor="middle">${tag}</text>
  `
}).join('')

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630"
     xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"  stop-color="#0f0c29"/>
      <stop offset="50%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#0f0c29"/>
    </linearGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#6366f1"/>
      <stop offset="50%"  stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
    <clipPath id="circle">
      <circle cx="1010" cy="310" r="150"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Top accent bar -->
  <rect x="0" y="0" width="1200" height="5" fill="url(#bar)"/>

  <!-- Name -->
  <text x="80" y="240" fill="#ffffff" font-family="sans-serif"
    font-size="76" font-weight="bold" letter-spacing="-2">Rey Mahendra</text>

  <!-- Title -->
  <text x="80" y="310" fill="#a5b4fc" font-family="sans-serif"
    font-size="26" letter-spacing="4" text-transform="uppercase">SOFTWARE ENGINEER</text>

  <!-- Tag pills -->
  ${tagRects}

  <!-- URL -->
  <text x="80" y="530" fill="#475569" font-family="sans-serif"
    font-size="20" letter-spacing="1">reymahendra.vercel.app</text>

  <!-- Profile photo (circle) -->
  ${photoDataUri ? `
  <circle cx="1010" cy="310" r="155" fill="rgba(99,102,241,0.3)"/>
  <image href="${photoDataUri}" x="860" y="160" width="300" height="300"
    clip-path="url(#circle)" preserveAspectRatio="xMidYMid slice"/>
  <circle cx="1010" cy="310" r="150" fill="none"
    stroke="rgba(99,102,241,0.7)" stroke-width="4"/>
  ` : ''}
</svg>
`.trim()

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: { loadSystemFonts: true },
})
const png = resvg.render().asPng()
writeFileSync(out, png)
console.log('OG image written to', out)
