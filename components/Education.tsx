'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { useTilt } from '@/lib/useTilt'

const education = [
    {
        school: "Universitas Bina Sarana Informatika",
        degree: "Diploma in Information Systems (Incomplete)",
        date: "Aug 2021 – 2024",
    },
    {
        school: "SMK Pelita Ciampea",
        degree: "Vocational High School – Computer and Network Engineering",
        date: "July 2014 – June 2017",
    },
];

function EducationCard({ edu, index, isInView }: { edu: (typeof education)[0]; index: number; isInView: boolean }) {
  const tilt = useTilt(6)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      {...tilt}
      className="p-6 rounded-xl bg-black/[0.03] dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-indigo-500/30 transition-colors duration-300 group"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
          🎓
        </div>
        <div>
          <h3 className="text-slate-900 dark:text-white font-semibold leading-snug">{edu.school}</h3>
          <p className="text-[#111110] dark:text-indigo-400 text-sm font-medium mt-1.5">{edu.degree}</p>
          <p className="text-slate-500 text-xs font-mono mt-2">{edu.date}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className="py-24 px-4">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionHeading number="03" title="Education" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, i) => (
            <EducationCard key={edu.school} edu={edu} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
