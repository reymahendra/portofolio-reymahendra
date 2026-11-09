const isGitHubPages = process.env.GITHUB_PAGES === 'true'
// Must match the GitHub repository name when deploying to GitHub Pages.
const repo = 'rey-portfolio'
const basePath = isGitHubPages ? `/${repo}` : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
}

module.exports = nextConfig
