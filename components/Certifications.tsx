'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { useTilt } from '@/lib/useTilt'

/**
 * TEMPLATE — ganti isi array ini dengan sertifikatmu sendiri.
 *
 * Satu entri:
 *   name   : nama sertifikat
 *   issuer : penerbit (AWS, Red Hat, Udemy, Coursera, ...)
 *   meta   : tahun / credential ID, boleh string kosong ''
 *   icon   : emoji penanda
 *
 * Tambah atau hapus entri sesuai jumlah sertifikatmu.
 */
const certifications = [
  {
    name: 'Nama Sertifikat Kamu',
    issuer: 'Nama Penerbit',
    meta: '2024 · Credential ID: XXXXXX',
    icon: '🏅',
  },
  {
    name: 'Nama Sertifikat Kamu',
    issuer: 'Nama Penerbit',
    meta: '2023',
    icon: '📜',
  },
]

function CertCard({ cert, index, isInView }: { cert: (typeof certifications)[0]; index: number; isInView: boolean }) {
  const tilt = useTilt(5)
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      {...tilt}
      className="flex items-center gap-4 p-5 rounded-xl bg-black/[0.03] dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-indigo-500/30 transition-colors duration-300"
    >
      <span className="text-3xl">{cert.icon}</span>
      <div>
        <p className="text-slate-900 dark:text-white font-medium">{cert.name}</p>
        <p className="text-slate-500 text-sm mt-0.5">
          {cert.issuer}{cert.meta && ` · ${cert.meta}`}
        </p>
      </div>
    </motion.div>
  )
}

export default function Certifications() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="certifications" className="py-24 px-4 bg-black/[0.02] dark:bg-white/[0.02]">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionHeading number="06" title="Certifications" />
        </motion.div>

        <div className="space-y-4">
          {certifications.map((cert, i) => (
            <CertCard key={`${cert.name}-${i}`} cert={cert} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
