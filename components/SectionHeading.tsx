interface Props {
  number: string
  title: string
}

export default function SectionHeading({ number, title }: Props) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[#111110] dark:text-indigo-400 font-mono text-sm tracking-widest">{number}.</span>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">{title}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/40 to-transparent ml-4 hidden sm:block" />
    </div>
  )
}
