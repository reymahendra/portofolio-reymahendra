'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaStar, FaUsers, FaCode } from 'react-icons/fa'

interface Props {
  publicRepos: number
  totalStars: number
  followers: number
  totalForks: number
}

const pills = [
  { key: 'publicRepos', label: 'Public Repos', Icon: FaGithub, color: 'text-[#111110] dark:text-indigo-400' },
  { key: 'totalStars', label: 'Total Stars', Icon: FaStar, color: 'text-yellow-400' },
  { key: 'followers', label: 'Followers', Icon: FaUsers, color: 'text-emerald-400' },
  { key: 'totalForks', label: 'Total Forks', Icon: FaCode, color: 'text-purple-400' },
]

export default function GitHubStatPills({ publicRepos, totalStars, followers, totalForks }: Props) {
  const values = { publicRepos, totalStars, followers, totalForks }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
      {pills.map(({ key, label, Icon, color }, i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="flex flex-col items-center gap-2 py-5 px-4 rounded-xl bg-black/[0.03] dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-indigo-500/30 transition-colors"
        >
          <Icon className={`text-xl ${color}`} />
          <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {values[key as keyof typeof values]}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 text-center">{label}</span>
        </motion.div>
      ))}
    </div>
  )
}
