import { useState, useMemo } from 'react'
import { TEMPLATES, type TemplateEntry, type Scheme, type Formality } from '../../lib/templates'
import { TemplateCard } from './TemplateCard'
import { Button } from '../ui/Button'

interface TemplateGalleryProps {
  onSelect: (template: TemplateEntry) => void
  selectedSlug?: string
  mode?: 'gallery' | 'picker'
}

const schemeOptions: { value: Scheme | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'light', label: '☀ Light' },
  { value: 'dark', label: '🌙 Dark' },
  { value: 'mixed', label: '◑ Mixed' },
]

const formalityOptions: { value: Formality | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'low', label: 'Casual' },
  { value: 'medium-low', label: 'Semi-casual' },
  { value: 'medium', label: 'Medium' },
  { value: 'medium-high', label: 'Semi-formal' },
  { value: 'high', label: 'Formal' },
]

export function TemplateGallery({ onSelect, selectedSlug, mode = 'gallery' }: TemplateGalleryProps) {
  const [search, setSearch] = useState('')
  const [schemeFilter, setSchemeFilter] = useState<Scheme | 'all'>('all')
  const [formalityFilter, setFormalityFilter] = useState<Formality | 'all'>('all')
  const [previewSlug, setPreviewSlug] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return TEMPLATES.filter(t => {
      if (schemeFilter !== 'all' && t.scheme !== schemeFilter) return false
      if (formalityFilter !== 'all' && t.formality !== formalityFilter) return false
      if (q) {
        const haystack = [t.name, t.tagline, ...t.mood, ...t.tone, ...t.occasion].join(' ').toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [search, schemeFilter, formalityFilter])

  const handlePreview = (template: TemplateEntry) => {
    setPreviewSlug(template.slug)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by mood, style, occasion…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 rounded-lg bg-white/8 border border-white/15 px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#EC7000]/60 transition-colors"
        />

        <div className="flex gap-2 flex-wrap">
          {schemeOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setSchemeFilter(opt.value as Scheme | 'all')}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer
                ${schemeFilter === opt.value
                  ? 'bg-[#EC7000] text-white'
                  : 'bg-white/8 text-white/60 hover:bg-white/15 hover:text-white border border-white/10'
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2 flex-wrap">
          {formalityOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setFormalityFilter(opt.value as Formality | 'all')}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer
                ${formalityFilter === opt.value
                  ? 'bg-[#1F3B6B] text-white'
                  : 'bg-white/8 text-white/60 hover:bg-white/15 hover:text-white border border-white/10'
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="text-xs text-white/40">
        {filtered.length} template{filtered.length !== 1 ? 's' : ''}
      </div>

      {/* Grid */}
      <div className={`grid gap-4 ${mode === 'picker' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
        {filtered.map(t => (
          <TemplateCard
            key={t.slug}
            template={t}
            onSelect={onSelect}
            onPreview={handlePreview}
            selected={t.slug === selectedSlug}
            compact={mode === 'picker'}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-white/30 gap-2">
          <div className="text-4xl">🔍</div>
          <p className="text-sm">No templates match your filters.</p>
          <Button variant="ghost" size="sm" onClick={() => { setSearch(''); setSchemeFilter('all'); setFormalityFilter('all') }}>
            Clear filters
          </Button>
        </div>
      )}

      {/* Preview modal */}
      {previewSlug && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setPreviewSlug(null)}
        >
          <div
            className="relative w-full max-w-6xl aspect-video rounded-xl overflow-hidden border border-white/20 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <iframe
              src={`/templates/${previewSlug}/template.html`}
              className="w-full h-full"
              title="Template preview"
            />
            <button
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center text-sm hover:bg-black/80 transition cursor-pointer"
              onClick={() => setPreviewSlug(null)}
            >
              ✕
            </button>
            <button
              className="absolute bottom-3 right-3 px-4 py-2 rounded-lg bg-[#EC7000] text-white text-sm font-medium hover:bg-[#d46300] transition cursor-pointer"
              onClick={() => {
                const t = TEMPLATES.find(t => t.slug === previewSlug)
                if (t) { onSelect(t); setPreviewSlug(null) }
              }}
            >
              Use this template →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
