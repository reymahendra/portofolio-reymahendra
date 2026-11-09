// Builds the resume PDF in-browser using @react-pdf/renderer.
// Only ever loaded via dynamic import on click — never in the server render.

import {
  Document,
  Page,
  Text,
  View,
  Link,
  Image,
  StyleSheet,
  pdf,
} from '@react-pdf/renderer'
import { resumeData } from './resume'
import { profilePhoto } from './profilePhoto'

const HEADER_BG   = '#1e1b4b'
const ACCENT      = '#4f46e5'
const ACCENT_LIGHT = '#a5b4fc'
const HEADING     = '#111827'
const BODY        = '#374151'
const MUTED       = '#6b7280'
const RULE        = '#e5e7eb'

const s = StyleSheet.create({
  // paddingTop applies to ALL pages — keeps page 2 from sticking to the top
  page: {
    fontFamily: 'Helvetica',
    fontSize: 8.8,
    color: BODY,
    lineHeight: 1.38,
    paddingTop: 20,
    paddingBottom: 22,
  },

  /* ── Header band ─────────────────────────────────────── */
  header: {
    backgroundColor: HEADER_BG,
    paddingTop: 16,
    paddingBottom: 14,
    paddingHorizontal: 32,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -20, // pull up into the paddingTop space so band still bleeds to top
  },
  headerText: { flex: 1, paddingRight: 14 },
  photo: { width: 76, height: 76, borderRadius: 38, objectFit: 'cover' },
  name:  { fontSize: 24, fontFamily: 'Helvetica-Bold', color: '#ffffff', letterSpacing: 0.4 },
  title: { fontSize: 9.5, color: ACCENT_LIGHT, marginTop: 2, textTransform: 'uppercase', letterSpacing: 2 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, fontSize: 7.8, color: '#cbd5e1' },
  contactItem: { color: '#cbd5e1', marginRight: 4 },
  contactSep:  { color: ACCENT_LIGHT, marginRight: 4 },

  /* ── Two-column body ─────────────────────────────────── */
  body: { flexDirection: 'row', paddingHorizontal: 32 },
  sidebar: { width: '33%', paddingRight: 14 },
  main:    { width: '67%', paddingLeft: 14, borderLeftWidth: 1, borderLeftColor: RULE },

  /* ── Section headings ────────────────────────────────── */
  sectionWrap: { marginBottom: 9 },
  heading: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: ACCENT,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  headingRule: { height: 1.5, width: 22, backgroundColor: ACCENT, marginBottom: 6 },

  /* ── Shared entry blocks ─────────────────────────────── */
  block: { marginBottom: 6 },
  entryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  entryTitle: { fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: HEADING },
  entryRole:  { fontSize: 8.8, color: ACCENT, marginTop: 1 },
  entryDate:  { fontSize: 7.5, color: MUTED, fontFamily: 'Helvetica-Bold' },
  bulletRow:  { flexDirection: 'row', marginTop: 2, paddingRight: 2 },
  bulletDot:  { color: ACCENT, marginRight: 4, fontFamily: 'Helvetica-Bold' },
  bulletText: { flex: 1, color: BODY },

  /* ── Projects ────────────────────────────────────────── */
  projectsGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  projectCell:  { width: '50%', paddingRight: 8, marginBottom: 7 },
  projectName:  { fontSize: 9.2, fontFamily: 'Helvetica-Bold', color: HEADING },
  projectTech:  { fontSize: 7.8, color: ACCENT, marginTop: 1, fontFamily: 'Helvetica-Oblique' },
  projectDesc:  { color: BODY, marginTop: 1.5, fontSize: 8.5 },
  seeMore:      { fontSize: 8, color: ACCENT, marginTop: 4, fontFamily: 'Helvetica-Oblique' },

  /* ── Sidebar items ───────────────────────────────────── */
  skillBlock:   { marginBottom: 4 },
  skillCat:     { fontSize: 8.8, fontFamily: 'Helvetica-Bold', color: HEADING, marginBottom: 1 },
  skillItems:   { color: BODY, fontSize: 8.3 },
  eduSchool:    { fontSize: 8.8, fontFamily: 'Helvetica-Bold', color: HEADING },
  eduDegree:    { fontSize: 8.3, color: ACCENT, marginTop: 1 },
  eduDate:      { fontSize: 7.5, color: MUTED, marginTop: 0.5 },
  certRow:      { flexDirection: 'row', marginBottom: 3 },
  certText:     { flex: 1, color: BODY, fontSize: 8.3 },

  summary: { color: BODY },
})

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={s.sectionWrap}>
      <Text style={s.heading}>{title}</Text>
      <View style={s.headingRule} />
      {children}
    </View>
  )
}

export function ResumeDocument() {
  const d = resumeData
  const contacts = [
    { label: d.contact.email,         href: `mailto:${d.contact.email}` },
    { label: d.contact.phone,         href: `tel:${d.contact.phone.replace(/\s+/g, '')}` },
    { label: d.contact.portfolio,     href: `https://${d.contact.portfolio}` },
    { label: d.contact.github,        href: `https://${d.contact.github}` },
  ]

  return (
    <Document title={`${d.name} — Resume`} author={d.name} subject={d.title}>
      <Page size="A4" style={s.page}>

        {/* Header band — negative marginTop pulls it flush to the top edge */}
        <View style={s.header}>
          <View style={s.headerText}>
            <Text style={s.name}>{d.name}</Text>
            <Text style={s.title}>{d.title}</Text>
            <View style={s.contactRow}>
              {contacts.map((c, i) => (
                <View key={c.href} style={{ flexDirection: 'row' }}>
                  {i > 0 && <Text style={s.contactSep}>  |  </Text>}
                  <Link src={c.href} style={s.contactItem}>{c.label}</Link>
                </View>
              ))}
            </View>
          </View>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image style={s.photo} src={profilePhoto} />
        </View>

        {/* Two-column body */}
        <View style={s.body}>

          {/* ── Sidebar ── */}
          <View style={s.sidebar}>
            <Section title="Skills">
              {d.skills.map((g) => (
                <View key={g.category} style={s.skillBlock}>
                  <Text style={s.skillCat}>{g.category}</Text>
                  <Text style={s.skillItems}>{g.pdfItems ?? g.items}</Text>
                </View>
              ))}
            </Section>

            <Section title="Education">
              {d.education.map((e) => (
                <View key={e.school} style={s.block} wrap={false}>
                  <Text style={s.eduSchool}>{e.school}</Text>
                  <Text style={s.eduDegree}>{e.degree}</Text>
                  <Text style={s.eduDate}>{e.date}</Text>
                </View>
              ))}
            </Section>

            {d.certifications.length > 0 && (
              <Section title="Certifications">
                {d.certifications.map((cert, i) => (
                  <View key={i} style={s.certRow}>
                    <Text style={s.bulletDot}>•</Text>
                    <Text style={s.certText}>{cert}</Text>
                  </View>
                ))}
              </Section>
            )}
          </View>

          {/* ── Main column ── */}
          <View style={s.main}>
            <Section title="Profile">
              <Text style={s.summary}>{d.summary}</Text>
            </Section>

            <Section title="Experience">
              {d.experience.map((exp) => (
                <View key={exp.company} style={s.block} wrap={false}>
                  <View style={s.entryRow}>
                    <Text style={s.entryTitle}>{exp.company}</Text>
                    <Text style={s.entryDate}>{exp.date}</Text>
                  </View>
                  <Text style={s.entryRole}>{exp.role}</Text>
                  {exp.bullets.map((b, i) => (
                    <View key={i} style={s.bulletRow}>
                      <Text style={s.bulletDot}>•</Text>
                      <Text style={s.bulletText}>{b}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </Section>

            {/* Projects in a 2×2 grid to save vertical space */}
            <Section title="Projects">
              <View style={s.projectsGrid}>
                {d.projects.map((proj) => (
                  <View key={proj.title} style={s.projectCell} wrap={false}>
                    <Text style={s.projectName}>{proj.title}</Text>
                    <Text style={s.projectTech}>{proj.tech}</Text>
                    <Text style={s.projectDesc}>{proj.description}</Text>
                  </View>
                ))}
              </View>
              <Link src="https://reymahendra.vercel.app/#projects" style={s.seeMore}>
                See more projects → reymahendra.vercel.app
              </Link>
            </Section>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export async function generateResumePdf(): Promise<Blob> {
  return pdf(<ResumeDocument />).toBlob()
}
