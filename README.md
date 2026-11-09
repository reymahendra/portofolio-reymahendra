# Rey Mahendra — Portfolio

A modern, animated personal portfolio built as a **statically-exported Next.js** site. Dark theme, glassmorphism UI, scroll-triggered motion, and a GSAP-animated hero.

🔗 **Live:** [reymahendra.vercel.app](https://reymahendra.vercel.app/)

---

## Tech Stack

| Layer        | Technology                                  |
| ------------ | ------------------------------------------- |
| Framework    | [Next.js 14](https://nextjs.org/) (App Router, static export) |
| Language     | TypeScript                                  |
| Styling      | [Tailwind CSS](https://tailwindcss.com/)    |
| Animation    | [Framer Motion](https://www.framer.com/motion/) (UI & scroll) + [GSAP](https://gsap.com/) (hero) |
| Icons        | [react-icons](https://react-icons.github.io/react-icons/) |
| Forms        | [Formspree](https://formspree.io/) (optional) |

---

## Features

- ⚡ **Static export** — zero server, deployable to any static host (GitHub Pages, Netlify, Vercel)
- 🎬 **GSAP hero animation** — character-by-character reveal of the name
- 📜 **Scroll-triggered motion** — Framer Motion fade/slide-in on every section
- 🧭 **Smart header** — active-section highlighting + animated mobile menu
- 🪟 **Glassmorphism cards** with hover effects across Experience, Projects, and Skills
- 📱 **Fully responsive** dark-themed design with indigo/purple accents
- 📨 **Optional contact form** via Formspree (falls back to the visitor's mail app)

---

## Getting Started

```bash
# Install dependencies
npm install

# Run the dev server (http://localhost:3000)
npm run dev

# Build a static export (outputs to ./out)
npm run build

# Run the unit tests
npm test
```

### Environment variables

| Variable                   | Purpose                                                        |
| -------------------------- | -------------------------------------------------------------- |
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree form ID. When unset, the contact form opens the visitor's mail app instead. |
| `GITHUB_PAGES`             | Set to `true` to build with the GitHub Pages base path.         |

---

## Project Structure

```
.
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Page composition (section order)
│   └── globals.css         # Global styles + Tailwind layers
├── components/
│   ├── Header.tsx          # Sticky nav with active-section detection
│   ├── Hero.tsx            # Animated landing section
│   ├── About.tsx           # Bio + animated stat cards
│   ├── Experience.tsx      # Timeline of roles
│   ├── Education.tsx       # Degrees
│   ├── Projects.tsx        # Project cards
│   ├── Skills.tsx          # Categorized skill badges
│   ├── GitHubActivity.tsx  # Live GitHub stats
│   ├── Contact.tsx         # Contact form
│   ├── Footer.tsx          # Social links
│   └── SectionHeading.tsx  # Shared numbered section heading
├── lib/                    # Resume data, skills, PDF generation, hooks
├── public/images/          # Portrait and project images
├── next.config.js          # Static export config
├── tailwind.config.ts
└── tsconfig.json
```

---

## Sections

**About · Experience · Education · Projects · Skills · GitHub Activity · Contact**

---

## Deployment

The site is configured for static export (`output: 'export'` in `next.config.js`). Running `npm run build` generates a fully static `out/` directory that can be served by any static host.

- **Vercel:** import the repository — `vercel.json` serves the `out/` directory.
- **GitHub Pages:** deployed via GitHub Actions (`.github/workflows/deploy.yml`). Set `GITHUB_PAGES=true` and keep the `repo` constant in `next.config.js` equal to the repository name so the base path matches.

---

## Contact

- **GitHub:** [reymahendra](https://github.com/reymahendra)
- **Email:** [reymahndra@gmail.com](mailto:reymahndra@gmail.com)
