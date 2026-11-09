import type { Metadata } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/next'
import ScrollProgress from '@/components/ScrollProgress'
import BackToTop from '@/components/BackToTop'
import CursorSpotlight from '@/components/CursorSpotlight'
import PageLoader from '@/components/PageLoader'
import ParticleBackground from '@/components/ParticleBackground'
import GradientMesh from '@/components/GradientMesh'
import GrainOverlay from '@/components/GrainOverlay'
import SocialSidebar from '@/components/SocialSidebar'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
})

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const SITE_URL = 'https://reymahendra.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Rey Mahendra | Software Engineer',
    template: '%s | Rey Mahendra',
  },
  description:
    'Portfolio of Rey Mahendra — Software Engineer with 3+ years of full-stack experience in Java Spring Boot, React, TypeScript, Laravel, and more. Available for new opportunities.',

  keywords: [
    'Rey Mahendra',
    'Software Engineer',
    'Full Stack Developer',
    'Java Spring Boot',
    'React Developer',
    'TypeScript',
    'Laravel',
    'UI/UX Designer',
    'QA Engineer',
    'Portfolio',
    'Backend Developer',
    'REST API',
    'Node.js',
  ],

  authors: [{ name: 'Rey Mahendra', url: SITE_URL }],
  creator: 'Rey Mahendra',
  publisher: 'Rey Mahendra',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: `${BASE}/pong.ico?v=2`,
    shortcut: `${BASE}/pong.ico?v=2`,
    apple: `${BASE}/pong.ico?v=2`,
  },

  openGraph: {
    title: 'Rey Mahendra | Software Engineer',
    description:
      'Software Engineer with 3+ years of full-stack experience in Java Spring Boot, React, TypeScript, Laravel and more. Available for new opportunities.',
    url: SITE_URL,
    siteName: 'Rey Mahendra Portfolio',
    type: 'profile',
    firstName: 'Rey',
    lastName: 'Mahendra',
    username: 'ReyMhndra',
    locale: 'en_US',
    images: [
      {
        url: `${BASE}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Rey Mahendra — Software Engineer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Rey Mahendra | Software Engineer',
    description:
      'Software Engineer with 3+ years of full-stack experience in Java Spring Boot, React, TypeScript, Laravel and more.',
    images: [`${BASE}/images/og-image.png`],
  },

  category: 'technology',
}

// JSON-LD structured data — helps Google understand the page as a Person entity
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Rey Mahendra',
  url: SITE_URL,
  jobTitle: 'Software Engineer',
  description:
    'Software Engineer with 3+ years of full-stack experience in Java Spring Boot, React, TypeScript, and Laravel.',
  sameAs: [
    'https://github.com/reymahendra',
    SITE_URL,
  ],
  knowsAbout: [
    'Java', 'Spring Boot', 'REST API', 'JavaScript', 'TypeScript',
    'React', 'Node.js', 'Python', 'Flask', 'Laravel',
    'MongoDB', 'MySQL', 'UI/UX Design', 'QA Testing',
  ],
  email: 'mailto:reymahndra@gmail.com',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Disable browser scroll restoration before any JS runs */}
        <script dangerouslySetInnerHTML={{ __html: `history.scrollRestoration='manual';` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} ${inter.variable} ${instrumentSerif.variable} overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <GradientMesh />
          <GrainOverlay />
          <ParticleBackground />
          <PageLoader />
          <ScrollProgress />
          <CursorSpotlight />
          <SocialSidebar />
          {children}
          <BackToTop />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
