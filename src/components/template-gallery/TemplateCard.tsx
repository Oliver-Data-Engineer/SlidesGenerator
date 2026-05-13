import { useState } from 'react'
import { type TemplateEntry, getScreenshotUrl } from '../../lib/templates'
import { Badge } from '../ui/Badge'

interface TemplateCardProps {
  template: TemplateEntry
  onSelect: (template: TemplateEntry) => void
  onPreview: (template: TemplateEntry) => void
  selected?: boolean
  compact?: boolean
}

const formalityLabel: Record<string, string> = {
  low: 'Casual',
  'medium-low': 'Semi-casual',
  medium: 'Medium',
  'medium-high': 'Semi-formal',
  high: 'Formal',
}

export function TemplateCard({
  template,
  onSelect,
  onPreview,
  selected = false,
  compact = false,
}: TemplateCardProps) {
  const [imgError, setImgError] = useState(false)

  const schemeIcon = template.scheme === 'dark' ? '◼' : template.scheme === 'mixed' ? '◑' : '◻'

  return (
    <div
      className={`
        group relative flex flex-col rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer
        ${selected
          ? 'border-[#EC7000] ring-2 ring-[#EC7000]/40'
          : 'border-white/10 hover:border-white/30'
        }
        bg-[#161616]
      `}
      onClick={() => onSelect(template)}
    >
      {/* Screenshot */}
      <div className={`relative bg-[#0a0a0a] overflow-hidden ${compact ? 'aspect-[16/9]' : 'aspect-[16/9]'}`}>
        {!imgError ? (
          <img
            src={getScreenshotUrl(template.slug)}
            alt={`${template.name} cover slide`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20 gap-2">
            <div className="text-4xl">🖼</div>
            <div className="text-xs">{template.name}</div>
          </div>
        )}

        {/* Scheme badge overlay */}
        <div className="absolute top-2 right-2">
          <span className="text-xs px-2 py-0.5 rounded-full bg-black/60 text-white/80 backdrop-blur-sm">
            {schemeIcon} {template.scheme}
          </span>
        </div>

        {selected && (
          <div className="absolute inset-0 bg-[#EC7000]/10 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-[#EC7000] flex items-center justify-center text-white font-bold text-sm">
              ✓
            </div>
          </div>
        )}

        {/* Preview button on hover */}
        <button
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40"
          onClick={(e) => {
            e.stopPropagation()
            onPreview(template)
          }}
        >
          <span className="px-3 py-1.5 rounded-lg bg-white/90 text-black text-xs font-semibold">
            Preview →
          </span>
        </button>
      </div>

      {/* Info */}
      <div className={`flex flex-col gap-2 ${compact ? 'p-3' : 'p-4'}`}>
        <div className="flex items-start justify-between gap-2">
          <h3 className={`font-semibold text-white leading-tight ${compact ? 'text-sm' : 'text-base'}`}>
            {template.name}
          </h3>
          <span className="text-xs text-white/40 shrink-0 mt-0.5">{template.slide_count} slides</span>
        </div>

        {!compact && (
          <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{template.tagline}</p>
        )}

        <div className="flex flex-wrap gap-1.5 mt-1">
          <Badge label={formalityLabel[template.formality] || template.formality} variant="formality" />
          {template.mood.slice(0, 2).map(m => (
            <Badge key={m} label={m} />
          ))}
        </div>
      </div>
    </div>
  )
}
