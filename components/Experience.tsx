'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { useTilt } from '@/lib/useTilt'

const experiences = [
    {
        company: "Pusat Informasi Kriminal Bareskrim Polri",
        role: "Software Engineer",
        date: "Mei 2026 – November 2026",
        gradient: "from-indigo-500 to-purple-500",
        dot: "bg-indigo-500",
        bullets: [
            "Merancang dan memimpin pengembangan sistem Dashboard SPPT-TI secara end-to-end",
            "Mengembangkan arsitektur backend dan RESTful API yang aman menggunakan Java Spring Boot",
            "Merancang antarmuka pengguna (UI/UX) yang intuitif dari konsep hingga siap diimplementasikan",
            "Mengelola struktur basis data untuk efisiensi pemrosesan data perkara pidana",
            "Melakukan pengujian kualitas perangkat lunak (QA testing) komprehensif untuk memastikan stabilitas sistem",
            "Memastikan performa aplikasi berjalan andal, responsif, dan sesuai kebutuhan operasional",
        ],
    },
    {
        company: "Pusat Informasi Kriminal Bareskrim Polri",
        role: "UI/UX Designer & QA",
        date: "Oktober 2025 – November 2026",
        gradient: "from-cyan-500 to-blue-500",
        dot: "bg-cyan-500",
        bullets: [
            "Merancang wireframe, prototipe, dan antarmuka pengguna yang intuitif untuk mengoptimalkan navigasi sistem internal",
            "Mengeksekusi pengujian perangkat lunak (software testing) secara komprehensif guna mendeteksi bug dan memastikan stabilitas sistem sebelum rilis",
            "Memastikan keselarasan implementasi antarmuka pengembang dengan standar desain fungsional yang ditetapkan",
        ],
    },
    {
        company: "Lembaga Perlindungan Saksi dan Korban (LPSK)",
        role: "UI/UX Designer & QA",
        date: "Oktober 2025 – November 2026",
        gradient: "from-cyan-500 to-blue-500",
        dot: "bg-cyan-500",
        bullets: [
            "Merancang antarmuka pengguna (UI/UX) website resmi LPSK yang intuitif, informatif, dan mudah diakses publik",
            "Membuat wireframe, prototype, dan elemen desain visual untuk meningkatkan pengalaman pengguna (user experience)",
            "Menyusun skenario pengujian dan mengeksekusi QA testing secara menyeluruh (manual & fungsional)",
            "Mengidentifikasi, mendokumentasikan, dan memverifikasi perbaikan bug sebelum implementasi ke environment produksi",
            "Berkoordinasi dengan tim developer untuk memastikan hasil pengembangan sesuai dengan standar desain dan spesifikasi teknis",
        ],
    },
    {
        company: "Pusat Informasi Kriminal Bareskrim Polri",
        role: "IT Support Specialist & Helpdesk",
        date: "Januari 2024 – September 2025",
        gradient: "from-emerald-500 to-teal-500",
        dot: "bg-emerald-500",
        bullets: [
            "Menangani pemeliharaan infrastruktur IT, jaringan, dan perangkat keras pendukung operasional harian",
            "Menyelesaikan kendala teknis pengguna (troubleshooting) secara cepat untuk menjaga stabilitas sistem",
        ],
    },
];

function ExperienceItem({ exp, index }: { exp: (typeof experiences)[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const tilt = useTilt(5)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="relative pl-10 pb-12 last:pb-0"
    >
      <div className="absolute left-0 top-3 bottom-0 w-px bg-gradient-to-b from-black/10 dark:from-white/10 to-transparent" />
      <div className={`absolute left-0 top-2.5 -translate-x-[5px] w-2.5 h-2.5 rounded-full ${exp.dot} shadow-lg`} />

      <motion.div {...tilt} className="p-6 rounded-xl bg-black/[0.03] dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-colors duration-300">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{exp.company}</h3>
            <p className={`text-sm font-medium mt-0.5 bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent`}>
              {exp.role}
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-1 rounded-full whitespace-nowrap">
            {exp.date}
          </span>
        </div>
        <ul className="space-y-2">
          {exp.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              <span className="text-[#111110] dark:text-indigo-400 mt-0.5 flex-shrink-0">▸</span>
              {bullet}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="py-24 px-4 bg-black/[0.02] dark:bg-white/[0.02]">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionHeading number="02" title="Experience" />
        </motion.div>
        <div>
          {experiences.map((exp, i) => (
            <ExperienceItem key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
