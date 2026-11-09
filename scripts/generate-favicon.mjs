// Generates public/favicon.png and public/favicon.ico at build time.

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { Resvg } from '@resvg/resvg-js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const svg = `
<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#0f0c29"/>
    </linearGradient>
    <linearGradient id="text" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="#818cf8"/>
      <stop offset="50%"  stop-color="#c084fc"/>
      <stop offset="100%" stop-color="#f472b6"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#bg)"/>
  <text x="32" y="46" text-anchor="middle"
    font-family="sans-serif" font-weight="bold" font-size="30"
    fill="url(#text)">RM</text>
</svg>
`.trim()

const pongPng = readFileSync(join(root, 'public', 'pong.png')).toString('base64')
const pongSvg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><image href="data:image/png;base64,${pongPng}" width="512" height="512"/></svg>`
const pongIconPng = new Resvg(pongSvg, { fitTo: { mode: 'width', value: 256 } }).render().asPng()
const iconHeader = Buffer.alloc(22)
iconHeader.writeUInt16LE(1, 2)
iconHeader.writeUInt16LE(1, 4)
iconHeader.writeUInt16LE(1, 10)
iconHeader.writeUInt16LE(32, 12)
iconHeader.writeUInt32LE(pongIconPng.length, 14)
iconHeader.writeUInt32LE(iconHeader.length, 18)
const pongIco = Buffer.concat([iconHeader, pongIconPng])

writeFileSync(join(root, 'public', 'pong.ico'), pongIco)
writeFileSync(join(root, 'public', 'favicon.ico'), pongIco)
console.log('pong.ico and favicon.ico written (256×256 Pong icon)')

// 180×180 for Apple touch icon
const resvg180 = new Resvg(svg, { fitTo: { mode: 'width', value: 180 }, font: { loadSystemFonts: true } })
const png180 = resvg180.render().asPng()
writeFileSync(join(root, 'public', 'apple-touch-icon.png'), png180)
console.log('apple-touch-icon.png written (180×180)')
