interface BadgeProps {
  label: string
  variant?: 'default' | 'scheme' | 'formality' | 'mood'
  className?: string
}

const schemeColors: Record<string, string> = {
  light: 'bg-amber-100 text-amber-800',
  dark: 'bg-slate-700 text-slate-200',
  mixed: 'bg-violet-900/40 text-violet-300',
}

const formalityColors: Record<string, string> = {
  low: 'bg-green-900/40 text-green-300',
  'medium-low': 'bg-teal-900/40 text-teal-300',
  medium: 'bg-blue-900/40 text-blue-300',
  'medium-high': 'bg-indigo-900/40 text-indigo-300',
  high: 'bg-purple-900/40 text-purple-300',
}

export function Badge({ label, variant = 'default', className = '' }: BadgeProps) {
  let colorClass = 'bg-white/10 text-white/70'

  if (variant === 'scheme') colorClass = schemeColors[label] ?? colorClass
  if (variant === 'formality') colorClass = formalityColors[label] ?? colorClass

  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium tracking-wide ${colorClass} ${className}`}
    >
      {label}
    </span>
  )
}
