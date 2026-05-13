import { useState } from 'react'
import { TemplateGallery } from './components/template-gallery/TemplateGallery'
import { PresentationWizard } from './components/presentation-wizard/PresentationWizard'
import { type TemplateEntry } from './lib/templates'
import { Button } from './components/ui/Button'

export default function App() {
  const [showWizard, setShowWizard] = useState(false)
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)

  function handleGallerySelect(template: TemplateEntry) {
    setSelectedSlug(template.slug)
    setShowWizard(true)
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-white/8 bg-[#0f0f0f]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/logos/logo-itau-laranja.png"
              alt="Itaú"
              className="h-7 w-auto"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
            <span className="text-sm font-medium text-white/60 hidden sm:block">
              Slides Generator
            </span>
          </div>

          <Button onClick={() => { setSelectedTemplate(null); setShowWizard(true) }}>
            + New Presentation
          </Button>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
            Beautiful slide decks,{' '}
            <span className="text-[#EC7000]">in seconds.</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed mb-8">
            Pick a template from 32 professionally designed themes. Customize with your content and download a
            fully self-contained HTML deck ready to present in any browser.
          </p>
          <div className="flex gap-3">
            <Button size="lg" onClick={() => setShowWizard(true)}>
              Create a presentation
            </Button>
            <Button size="lg" variant="secondary" onClick={() => {
              document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              Browse templates ↓
            </Button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="max-w-7xl mx-auto px-6 pb-10">
        <div className="flex gap-8 border-t border-white/8 pt-8">
          {[
            { value: '32', label: 'Templates' },
            { value: '100%', label: 'Self-contained HTML' },
            { value: '∞', label: 'Customizable' },
            { value: '0', label: 'Dependencies to install' },
          ].map(stat => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-[#EC7000]">{stat.value}</div>
              <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div id="gallery" className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Template Library</h2>
            <p className="text-sm text-white/40 mt-1">32 themes — hover to preview, click to use</p>
          </div>
        </div>
        <TemplateGallery
          onSelect={handleGallerySelect}
          selectedSlug={selectedSlug ?? undefined}
        />
      </div>

      {/* Wizard overlay */}
      {showWizard && (
        <PresentationWizard onClose={() => setShowWizard(false)} />
      )}
    </div>
  )
}
