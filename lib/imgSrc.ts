// Prefix a /public image path with the basePath so it works on
// GitHub Pages (/rey-portfolio/...) and on localhost (no prefix).
export const imgSrc = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`
