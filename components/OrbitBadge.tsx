// Rotating circular badge — sits level with the first line of the headline.

type Props = {
  className?: string
}

export default function OrbitBadge({ className }: Props) {
  return (
    <div className={`relative h-[96px] w-[96px] ${className ?? ''}`}>
      <svg
        viewBox="0 0 84 84"
        aria-hidden
        className="h-full w-full animate-spin-slow motion-reduce:animate-none"
      >
        <defs>
          <path id="orbit-badge-path" d="M42 42m-33 0a33 33 0 1 1 66 0a33 33 0 1 1-66 0" />
        </defs>
        <text className="fill-[#8b8880] dark:fill-slate-400" style={{ fontSize: 7, letterSpacing: 1.35, fontWeight: 500 }}>
          {/* textLength keeps the whole string inside the circle instead of clipping the tail */}
          <textPath
            href="#orbit-badge-path"
            startOffset="0"
            textLength="205"
            lengthAdjust="spacingAndGlyphs"
          >
            FULL-STACK ENGINEER · OPEN TO WORK ·
          </textPath>
        </text>
      </svg>
      <span className="pointer-events-none absolute inset-0 grid place-items-center">
        <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden className="text-[#111110] dark:text-white">
          <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z" fill="currentColor" />
        </svg>
      </span>
    </div>
  )
}
