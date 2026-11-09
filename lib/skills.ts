// Single source of truth for the skills shown in the Skills section
// and in the hero orbit ring.

export type SkillCategory = {
  name: string
  dot: string
  badge: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Backend',
    dot: 'bg-purple-400',
    badge: 'bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-500/20',
    skills: ['Java Spring Boot', 'RESTful API', 'Python', 'Flask', 'Node.js', 'Laravel', 'Sanctum'],
  },
  {
    name: 'Frontend',
    dot: 'bg-blue-400',
    badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-300 border-blue-500/20',
    skills: ['JavaScript', 'TypeScript', 'React', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    name: 'Databases',
    dot: 'bg-emerald-400',
    badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20',
    skills: ['MongoDB', 'MySQL', 'Database Design', 'Query Optimization'],
  },
  {
    name: 'UI/UX & QA',
    dot: 'bg-pink-400',
    badge: 'bg-pink-500/10 text-pink-600 dark:text-pink-300 border-pink-500/20',
    skills: ['UI/UX Design', 'Wireframing', 'Prototyping', 'Manual Testing', 'Functional Testing'],
  },
  {
    name: 'IT Support',
    dot: 'bg-orange-400',
    badge: 'bg-orange-500/10 text-orange-600 dark:text-orange-300 border-orange-500/20',
    skills: ['Network Maintenance', 'Hardware Maintenance', 'System Administration', 'Troubleshooting'],
  },
  {
    name: 'Tools',
    dot: 'bg-violet-400',
    badge: 'bg-violet-500/10 text-violet-600 dark:text-violet-300 border-violet-500/20',
    skills: ['Git', 'GitHub', 'Postman', 'Figma', 'Linux', 'Windows'],
  },
]
