'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa'
import { useTilt } from '@/lib/useTilt'

interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: 'bg-blue-400',
  JavaScript: 'bg-yellow-400',
  Python: 'bg-green-400',
  CSS: 'bg-pink-400',
  HTML: 'bg-orange-400',
  Vue: 'bg-emerald-400',
  Dart: 'bg-cyan-400',
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}

function RepoCard({ repo, index }: { repo: Repo; index: number }) {
  const tilt = useTilt(6)
  return (
    <motion.a
      key={repo.id}
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      {...tilt}
      className="group flex flex-col gap-3 p-5 rounded-xl bg-black/[0.03] dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10 transition-colors duration-300"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <FaGithub className="text-slate-500 flex-shrink-0" />
          <span className="font-semibold text-slate-900 dark:text-white text-sm truncate group-hover:text-indigo-500 dark:group-hover:text-indigo-400 dark:text-indigo-400 transition-colors">
            {repo.name}
          </span>
        </div>
      </div>

      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2 flex-1">
        {repo.description ?? 'No description'}
      </p>

      <div className="flex items-center gap-4 text-xs text-slate-500">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${LANG_COLORS[repo.language] ?? 'bg-slate-400'}`} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <FaStar className="text-yellow-500" />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <FaCodeBranch />
          {repo.forks_count}
        </span>
        <span className="ml-auto">{timeAgo(repo.updated_at)}</span>
      </div>
    </motion.a>
  )
}

export default function RepoCards({ repos }: { repos: Repo[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {repos.map((repo, i) => (
        <RepoCard key={repo.id} repo={repo} index={i} />
      ))}
    </div>
  )
}
