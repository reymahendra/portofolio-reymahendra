export default function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[2] pointer-events-none select-none opacity-[0.022] dark:opacity-[0.038]"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  )
}
