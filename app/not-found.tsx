import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent select-none">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">
        Page not found
      </h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-sm">
        Looks like this page doesn&apos;t exist. Let&apos;s get you back to the portfolio.
      </p>
      <Link
        href="/"
        className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0"
      >
        Back to Portfolio
      </Link>
    </div>
  )
}
