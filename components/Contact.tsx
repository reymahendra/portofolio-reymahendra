'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiMail } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'
import SectionHeading from './SectionHeading'

const EMAIL = 'reymahndra@gmail.com'
// Set NEXT_PUBLIC_FORMSPREE_ID to enable the contact form; otherwise it falls back to the visitor's mail app.
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID

type Status = 'idle' | 'sending' | 'success' | 'mailto' | 'error'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)
    const sender = String(data.get('_replyto') ?? '')
    const message = String(data.get('message') ?? '')

    if (!FORMSPREE_ID) {
      const subject = encodeURIComponent(`Portfolio contact from ${sender}`)
      const body = encodeURIComponent(`${message}\n\nFrom: ${sender}`)
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
      setStatus('mailto')
      return
    }

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-2xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <SectionHeading number="07" title="Get In Touch" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-7"
        >
          I&apos;m currently open to new opportunities. Whether you have a question or just want
          to say hi — my inbox is always open!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111110] hover:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            <HiMail className="text-base" />
            Send an Email
          </a>
          <a
            href="https://github.com/reymahendra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400 dark:text-indigo-400 font-medium text-sm transition-all duration-300"
          >
            <FaGithub className="text-base" />
            GitHub Profile
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="p-8 rounded-2xl bg-black/[0.03] dark:bg-white/5 border border-black/10 dark:border-white/10"
        >
          {status === 'success' || status === 'mailto' ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🎉</div>
              <p className="text-slate-900 dark:text-white font-semibold text-lg">
                {status === 'mailto' ? 'Your email app is opening…' : 'Message sent!'}
              </p>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                {status === 'mailto'
                  ? 'Send the pre-filled email and I will get back to you soon.'
                  : 'Thanks for reaching out. I will get back to you soon.'}
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 px-5 py-2 text-sm text-[#111110] dark:text-indigo-400 border border-[#d9d3c8] dark:text-indigo-400 dark:border-indigo-500/30 rounded-lg hover:bg-indigo-500/10 transition-all"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="hidden" name="_subject" value="Contact request from portfolio" />
              <div>
                <label className="block text-slate-500 dark:text-slate-400 text-sm mb-1.5 font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  name="_replyto"
                  required
                  placeholder="hello@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-slate-500 dark:text-slate-400 text-sm mb-1.5 font-medium">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Your message..."
                  className="w-full px-4 py-3 rounded-lg bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none"
                />
              </div>
              {status === 'error' && (
                <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3.5 bg-[#111110] hover:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-wait text-white rounded-lg font-medium transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
