import { FaGithub, FaEnvelope } from 'react-icons/fa'

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/reymahendra', label: 'GitHub' },
  { icon: FaEnvelope, href: 'mailto:reymahndra@gmail.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-black/5 dark:border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Rey Mahendra. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400 dark:text-indigo-400 transition-colors text-xl"
            >
              <link.icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
