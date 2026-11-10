'use client'

import { motion } from 'framer-motion'
import { FaStar, FaCodeBranch, FaGithub, FaUsers } from 'react-icons/fa'

const LANG_COLORS: Record<string, string> = {
  TypeScript:  '#3178c6',
  JavaScript:  '#f1e05a',
  Python:      '#3572A5',
  CSS:         '#563d7c',
  HTML:        '#e34c26',
  Vue:         '#41b883',
  Dart:        '#00B4AB',
  Shell:       '#89e051',
  SCSS:        '#c6538c',
  Kotlin:      '#A97BFF',
  Swift:       '#F05138',
  Go:          '#00ADD8',
  Rust:        '#dea584',
  Java:        '#b07219',
  PHP:         '#4F5D95',
}

export interface LangStat { name: string; percent: number }

interface Props {
  totalStars: number
  totalForks: number
  publicRepos: number
  followers: number
  languages: LangStat[]
}

export default function GitHubNativeStats({ totalStars, totalForks, publicRepos, followers, languages }: Props) {
  const statItems = [
    { icon: FaStar,       label: 'Total Stars',   value: totalStars,   color: 'text-yellow-400' },
    { icon: FaCodeBranch, label: 'Total Forks',   value: totalForks,   color: 'text-purple-400' },
    { icon: FaGithub,     label: 'Public Repos',  value: publicRepos,  color: 'text-[#111110] dark:text-indigo-400' },
    { icon: FaUsers,      label: 'Followers',     value: followers,    color: 'text-emerald-400' },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-4 mb-4">
      {/* GitHub Stats */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-5 rounded-xl bg-black/[0.03] dark:bg-white/5 border border-black/10 dark:border-white/10"
      >
        <p className="text-xs font-semibold text-[#111110] dark:text-indigo-400 uppercase tracking-widest mb-4">
          GitHub Stats
        </p>
        <div className="grid grid-cols-2 gap-3">
          {statItems.map(({ icon: Icon, label, value, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5"
            >
              <Icon className={`text-lg flex-shrink-0 ${color}`} />
              <div>
                <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums leading-tight">{value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Top Languages */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="p-5 rounded-xl bg-black/[0.03] dark:bg-white/5 border border-black/10 dark:border-white/10"
      >
        <p className="text-xs font-semibold text-[#111110] dark:text-indigo-400 uppercase tracking-widest mb-4">
          Top Languages
        </p>

        {/* Segmented rainbow bar */}
        <div className="flex h-2 rounded-full overflow-hidden mb-5 gap-px">
          {languages.map((lang) => (
            <motion.div
              key={lang.name}
              initial={{ width: 0 }}
              animate={{ width: `${lang.percent}%` }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{ backgroundColor: LANG_COLORS[lang.name] ?? '#6366f1' }}
              title={`${lang.name}: ${lang.percent}%`}
            />
          ))}
        </div>

        <div className="space-y-2.5">
          {languages.map((lang, i) => (
            <div key={lang.name} className="flex items-center gap-2.5">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: LANG_COLORS[lang.name] ?? '#6366f1' }}
              />
              <span className="text-sm text-slate-700 dark:text-slate-300 w-24 truncate">{lang.name}</span>
              <div className="flex-1 h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.percent}%` }}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.05, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: LANG_COLORS[lang.name] ?? '#6366f1' }}
                />
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums w-8 text-right">
                {lang.percent}%
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
