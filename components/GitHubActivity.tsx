import SectionHeading from './SectionHeading'
import RepoCards from './RepoCards'
import GitHubStatPills from './GitHubStatPills'
import GitHubNativeStats from './GitHubNativeStats'
import { FaGithub } from 'react-icons/fa'

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

interface GitHubProfile {
  public_repos: number
  followers: number
  following: number
}

const GITHUB_USERNAME = 'reymahendra'
const PINNED_REPOS = [
  'CRUD-java',
  'LearnByDoing',
  'elearncode',
  'Chatter-ui_chat-app',
  'reymahendra',
  'rey-mahendra',
  'demo_part2',
  'Django_project',
]

const GH_HEADERS = { Accept: 'application/vnd.github+json' }

async function fetchRepos(): Promise<Repo[]> {
  try {
    const results = await Promise.all(
      PINNED_REPOS.map((name) =>
        fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${name}`, {
          headers: GH_HEADERS,
          cache: 'force-cache',
        }).then((r) => (r.ok ? (r.json() as Promise<Repo>) : null))
      )
    )
    return results.filter(Boolean) as Repo[]
  } catch {
    return []
  }
}

async function fetchProfile(): Promise<GitHubProfile | null> {
  try {
    const r = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: GH_HEADERS,
      cache: 'force-cache',
    })
    return r.ok ? (r.json() as Promise<GitHubProfile>) : null
  } catch {
    return null
  }
}

/** Language mix of the pinned repos, by repo count (top N). */
function topLanguages(repos: Repo[], limit = 6) {
  const counts = new Map<string, number>()
  for (const r of repos) {
    if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1)
  }
  const total = Array.from(counts.values()).reduce((a, b) => a + b, 0)
  if (total === 0) return []
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, n]) => ({ name, percent: Math.round((n / total) * 100) }))
}

export default async function GitHubActivity() {
  const [repos, profile] = await Promise.all([fetchRepos(), fetchProfile()])
  // Keep the section visible as long as one source answered — a rate-limited
  // repo fetch alone shouldn't make the whole section disappear.
  if (repos.length === 0 && !profile) return null

  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0)
  const totalForks = repos.reduce((acc, r) => acc + r.forks_count, 0)

  return (
    <section className="py-24 px-4 bg-black/[0.02] dark:bg-white/[0.02]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <SectionHeading number="07" title="GitHub Activity" />
        </div>

        {/* Live stat pills */}
        <GitHubStatPills
          publicRepos={profile?.public_repos ?? repos.length}
          totalStars={totalStars}
          followers={profile?.followers ?? 0}
          totalForks={totalForks}
        />

        {/* GitHub Stats + Top Languages — rendered from the GitHub API, no external image service */}
        <GitHubNativeStats
          totalStars={totalStars}
          totalForks={totalForks}
          publicRepos={profile?.public_repos ?? repos.length}
          followers={profile?.followers ?? 0}
          languages={topLanguages(repos)}
        />

        {/* Streak Stats */}
        <div className="rounded-xl border border-black/10 dark:border-white/10 overflow-hidden bg-white dark:bg-transparent flex items-center justify-center p-2 mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://streak-stats.demolab.com/?user=${GITHUB_USERNAME}&theme=swift&hide_border=false`}       alt="Rey's GitHub streak stats" className="w-full max-w-2xl block dark:hidden" loading="lazy" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://streak-stats.demolab.com/?user=${GITHUB_USERNAME}&theme=transparent&hide_border=true&stroke=818cf8&ring=818cf8&fire=f97316&currStreakNum=94a3b8&sideNums=94a3b8&currStreakLabel=818cf8&sideLabels=64748b&dates=64748b&background=00000000`} alt="Rey's GitHub streak stats" className="w-full max-w-2xl hidden dark:block" loading="lazy" />
        </div>

        {/* Pinned repo cards */}
        <RepoCards repos={repos} />

        {/* Contribution activity graph */}
        <div className="mt-10 p-4 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 overflow-hidden">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium">Contribution Activity</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
            alt={`GitHub contribution activity graph for ${GITHUB_USERNAME}`}
            className="w-full rounded"
            loading="lazy"
          />
        </div>

        <div className="mt-6 text-center">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-indigo-500/40 hover:text-indigo-500 dark:hover:text-indigo-400 dark:text-indigo-400 transition-all text-sm font-medium"
          >
            <FaGithub />
            View all repositories
          </a>
        </div>
      </div>
    </section>
  )
}
