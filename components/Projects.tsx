'use client'

import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import SectionHeading from './SectionHeading'
import { imgSrc } from '@/lib/imgSrc'

type Project = {
  title: string
  image: string
  tech: string[]
  description: string
  link: string
  glow: string
  border: string
  badge: string
}

const projects: Project[] = [
    {
        title: "Dashboard SPPT-TI",
        image: "/images/sppti.png",
        tech: ["Java Spring Boot", "RESTful API", "UI/UX Design", "QA Testing"],
        description:
            "Sistem dashboard terpadu untuk pemrosesan dan penyajian data perkara pidana. Mengembangkan arsitektur backend hingga antarmuka pengguna secara end-to-end serta mengeksekusi pengujian sistem komprehensif.",
        link: "#",
        glow: "group-hover:shadow-indigo-500/20",
        border: "hover:border-indigo-500/40",
        badge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    },
    {
        title: "EMP (Elektronik Manajemen Penyidikan)",
        image: "/images/emp.png",
        tech: [
            "UI/UX Design",
            "QA Testing",
            "Helpdesk Support",
            "System Audit",
        ],
        description:
            "Platform manajemen investigasi kepolisian internal. Merancang wireframe dan antarmuka pengguna yang intuitif, mengeksekusi software testing menyeluruh, serta menangani dukungan teknis tingkat lanjut.",
        link: "#",
        glow: "group-hover:shadow-cyan-500/20",
        border: "hover:border-cyan-500/40",
        badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    },
    {
        title: "Website Resmi LPSK",
        image: "/images/lpsk.png",
        tech: [
            "UI/UX Design",
            "QA Testing",
            "Web Architecture",
            "User Research",
        ],
        description:
            "Website publik resmi Lembaga Perlindungan Saksi dan Korban. Merancang prototipe antarmuka berstandar aksesibilitas tinggi serta menyusun skenario pengujian fungsional secara menyeluruh.",
        link: "https://www.lpsk.go.id/beranda",
        glow: "group-hover:shadow-blue-500/20",
        border: "hover:border-blue-500/40",
        badge: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    },
    {
        title: "Infrastruktur Operasional Pusiknas",
        image: "/images/piknas.png",
        tech: [
            "IT Support",
            "Hardware & Network",
            "Troubleshooting",
            "System Admin",
        ],
        description:
            "Pemeliharaan infrastruktur jaringan, hardware, dan sistem operasional harian di lingkungan Pusiknas Bareskrim Polri untuk memastikan stabilitas dan uptime layanan 24/7.",
        link: "https://pusiknas.polri.go.id",
        glow: "group-hover:shadow-emerald-500/20",
        border: "hover:border-emerald-500/40",
        badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 2) * 0.15 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group rounded-2xl overflow-hidden bg-black/[0.03] dark:bg-white/5 border border-black/10 dark:border-white/10 ${project.border} transition-colors duration-300 shadow-xl ${project.glow}`}
    >
      <div className="relative h-52 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 z-10 group-hover:from-black/30 group-hover:via-black/10 group-hover:to-transparent transition-all duration-500" />
        <Image
          src={imgSrc(project.image)}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          unoptimized
        />
        {project.link !== '#' && (
          <div className="absolute top-3 right-3 z-20 translate-y-[-6px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-white text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{project.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span key={t} className={`text-xs px-2.5 py-1 rounded-full border ${project.badge}`}>
              {t}
            </span>
          ))}
        </div>
        {project.link !== '#' ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[#111110] hover:text-black dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors font-medium group/link"
          >
            View Project
            <span className="group-hover/link:translate-x-1 transition-transform">→</span>
          </a>
        ) : (
          <span className="text-sm text-slate-500 dark:text-slate-600 italic">Private / Internal</span>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="py-24 px-4 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionHeading number="04" title="Projects" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
