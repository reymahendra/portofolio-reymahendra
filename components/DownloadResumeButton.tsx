'use client'

import { useState } from 'react'

interface Props {
  className?: string
  children?: React.ReactNode
}

export default function DownloadResumeButton({ className, children }: Props) {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    if (loading) return
    setLoading(true)
    try {
      const { generateResumePdf } = await import('@/lib/generateResumePdf')
      const blob = await generateResumePdf()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'Rey_Mahendra_CV.pdf'
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Failed to generate resume PDF:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleDownload} disabled={loading} className={className}>
      {loading ? 'Generating…' : children ?? 'Download CV'}
    </button>
  )
}
