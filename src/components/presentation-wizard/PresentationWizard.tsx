import { useState } from 'react'
import { TEMPLATES, type TemplateEntry, MOOD_OPTIONS, pickCandidates } from '../../lib/templates'
import { TemplateCard } from '../template-gallery/TemplateCard'
import { TemplateGallery } from '../template-gallery/TemplateGallery'
import { Button } from '../ui/Button'
import { buildDeck, downloadHtml, type PresentationContent } from '../../lib/deck-builder'

type Step = 'occasion' | 'mood' | 'pick' | 'browse' | 'content' | 'done'

interface WizardState {
  occasionText: string
  selectedMoods: string[]
  candidates: TemplateEntry[]
  chosenSlug: string
  content: PresentationContent
}

const defaultContent: PresentationContent = {
  title: '',
  subtitle: '',
  author: '',
  date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
  organization: '',
}

interface PresentationWizardProps {
  onClose: () => void
}

export function PresentationWizard({ onClose }: PresentationWizardProps) {
  const [step, setStep] = useState<Step>('occasion')
  const [state, setState] = useState<WizardState>({
    occasionText: '',
    selectedMoods: [],
    candidates: [],
    chosenSlug: '',
    content: defaultContent,
  })
  const [building, setBuilding] = useState(false)
  const [previewSlug, setPreviewSlug] = useState<string | null>(null)

  const chosen = TEMPLATES.find(t => t.slug === state.chosenSlug)

  function updateContent(patch: Partial<PresentationContent>) {
    setState(s => ({ ...s, content: { ...s.content, ...patch } }))
  }

  function handleMoodToggle(keywords: string[]) {
    setState(s => {
      const key = keywords[0]
      const already = s.selectedMoods.includes(key)
      return {
        ...s,
        selectedMoods: already
          ? s.selectedMoods.filter(m => m !== key)
          : [...s.selectedMoods, key],
      }
    })
  }

  function handleNext_occasion() {
    if (!state.occasionText.trim()) return
    setStep('mood')
  }

  function handleNext_mood() {
    // Derive keyword lists from user inputs
    const occasionKeywords = state.occasionText.toLowerCase().split(/[\s,]+/).filter(Boolean)
    const moodKeywords = state.selectedMoods.flatMap(m => {
      const opt = MOOD_OPTIONS.find(o => o.keywords[0] === m)
      return opt ? opt.keywords : [m]
    })

    const candidates = pickCandidates({ moodKeywords, occasionKeywords })
    setState(s => ({ ...s, candidates }))
    setStep('pick')
  }

  function handlePickTemplate(template: TemplateEntry) {
    setState(s => ({ ...s, chosenSlug: template.slug }))
  }

  function handleConfirmPick() {
    if (!state.chosenSlug) return
    setStep('content')
  }

  async function handleBuild() {
    if (!state.chosenSlug || !state.content.title) return
    setBuilding(true)
    try {
      const html = await buildDeck(state.chosenSlug, state.content)
      const slug = state.content.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      downloadHtml(html, `${slug || 'presentation'}.html`)
      setStep('done')
    } catch (err) {
      console.error(err)
    } finally {
      setBuilding(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/95 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">New Presentation</h2>
            <p className="text-sm text-white/50 mt-1">
              {step === 'occasion' && 'Step 1 of 4 — What are you presenting?'}
              {step === 'mood' && 'Step 2 of 4 — What vibe do you want?'}
              {(step === 'pick' || step === 'browse') && 'Step 3 of 4 — Pick a template'}
              {step === 'content' && 'Step 4 of 4 — Add your details'}
              {step === 'done' && 'Done!'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white flex items-center justify-center text-sm transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-white/10 rounded-full h-1 mb-10">
          <div
            className="bg-[#EC7000] h-1 rounded-full transition-all duration-300"
            style={{
              width:
                step === 'occasion' ? '10%'
                : step === 'mood' ? '35%'
                : step === 'pick' || step === 'browse' ? '60%'
                : step === 'content' ? '85%'
                : '100%',
            }}
          />
        </div>

        {/* ── Step 1: Occasion ─────────────────────────────────────────── */}
        {step === 'occasion' && (
          <div className="flex flex-col gap-8 max-w-2xl">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">What's the occasion?</h3>
              <p className="text-sm text-white/50">
                Describe what you're presenting and who the audience is. Be as specific or vague as you like.
              </p>
            </div>
            <textarea
              autoFocus
              rows={4}
              placeholder="e.g. Quarterly business review for the executive team — we need to show progress on our digital transformation strategy and highlight key metrics."
              value={state.occasionText}
              onChange={e => setState(s => ({ ...s, occasionText: e.target.value }))}
              className="w-full rounded-xl bg-white/8 border border-white/15 px-5 py-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#EC7000]/60 resize-none transition-colors leading-relaxed"
            />
            <div className="flex gap-3">
              <Button onClick={handleNext_occasion} disabled={!state.occasionText.trim()}>
                Continue →
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* ── Step 2: Mood ─────────────────────────────────────────────── */}
        {step === 'mood' && (
          <div className="flex flex-col gap-8 max-w-2xl">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">What mood / vibe do you want?</h3>
              <p className="text-sm text-white/50">
                Pick one or more that feel right. This helps match you to the best template.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {MOOD_OPTIONS.map(opt => {
                const isSelected = state.selectedMoods.includes(opt.keywords[0])
                return (
                  <button
                    key={opt.keywords[0]}
                    onClick={() => handleMoodToggle(opt.keywords)}
                    className={`rounded-xl p-4 text-left text-sm font-medium transition-all duration-150 cursor-pointer border
                      ${isSelected
                        ? 'bg-[#EC7000]/20 border-[#EC7000] text-white'
                        : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                      }`}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
            <div className="flex gap-3">
              <Button onClick={handleNext_mood}>
                See recommendations →
              </Button>
              <Button variant="ghost" onClick={() => setStep('occasion')}>
                ← Back
              </Button>
            </div>
          </div>
        )}

        {/* ── Step 3: Pick ─────────────────────────────────────────────── */}
        {step === 'pick' && (
          <div className="flex flex-col gap-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Three options to compare</h3>
                <p className="text-sm text-white/50">
                  Based on your brief, these templates fit best. Click one to select it, or hover to preview.
                </p>
              </div>
              <button
                onClick={() => setStep('browse')}
                className="shrink-0 text-xs text-[#EC7000] hover:text-[#F5A623] underline underline-offset-2 cursor-pointer"
              >
                Browse all 32 →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {state.candidates.map(candidate => (
                <TemplateCard
                  key={candidate.slug}
                  template={candidate}
                  onSelect={handlePickTemplate}
                  onPreview={tpl => setPreviewSlug(tpl.slug)}
                  selected={state.chosenSlug === candidate.slug}
                />
              ))}
            </div>

            {/* Why we picked these */}
            <div className="text-xs text-white/30 border border-white/10 rounded-xl p-4 bg-white/3">
              <strong className="text-white/50">Why these?</strong> We matched your description "
              {state.occasionText.slice(0, 80)}…" and moods [
              {state.selectedMoods.join(', ') || 'any'}
              ] against each template's tone, occasion, and mood tags.
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleConfirmPick}
                disabled={!state.chosenSlug}
              >
                Use selected template →
              </Button>
              <Button variant="ghost" onClick={() => setStep('mood')}>
                ← Back
              </Button>
            </div>
          </div>
        )}

        {/* ── Step 3b: Browse all ─────────────────────────────────────── */}
        {step === 'browse' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">All Templates</h3>
              <button
                onClick={() => setStep('pick')}
                className="text-xs text-[#EC7000] hover:text-[#F5A623] underline underline-offset-2 cursor-pointer"
              >
                ← Back to recommendations
              </button>
            </div>
            <TemplateGallery
              onSelect={(t) => {
                handlePickTemplate(t)
                setStep('pick')
              }}
              selectedSlug={state.chosenSlug}
              mode="picker"
            />
          </div>
        )}

        {/* ── Step 4: Content ──────────────────────────────────────────── */}
        {step === 'content' && chosen && (
          <div className="flex flex-col gap-8 max-w-2xl">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Add your details</h3>
              <p className="text-sm text-white/50">
                Using <strong className="text-white/70">{chosen.name}</strong>. These will be written into the cover slide.
              </p>
            </div>

            {/* Mini preview of chosen template */}
            <div className="rounded-xl overflow-hidden border border-white/15 aspect-video">
              <iframe
                src={`/templates/${chosen.slug}/template.html`}
                className="w-full h-full pointer-events-none"
                title={chosen.name}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs text-white/50 mb-1.5">Presentation title *</label>
                <input type="text" placeholder="Q2 Business Review" value={state.content.title}
                  onChange={e => updateContent({ title: e.target.value })}
                  className="w-full rounded-lg bg-white/8 border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#EC7000]/60 transition-colors" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs text-white/50 mb-1.5">Subtitle</label>
                <input type="text" placeholder="Digital Transformation Progress" value={state.content.subtitle}
                  onChange={e => updateContent({ subtitle: e.target.value })}
                  className="w-full rounded-lg bg-white/8 border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#EC7000]/60 transition-colors" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Presenter name</label>
                <input type="text" placeholder="João Silva" value={state.content.author}
                  onChange={e => updateContent({ author: e.target.value })}
                  className="w-full rounded-lg bg-white/8 border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#EC7000]/60 transition-colors" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Organization</label>
                <input type="text" placeholder="Itaú Empresas" value={state.content.organization}
                  onChange={e => updateContent({ organization: e.target.value })}
                  className="w-full rounded-lg bg-white/8 border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#EC7000]/60 transition-colors" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Date</label>
                <input type="text" placeholder="June 2025" value={state.content.date}
                  onChange={e => updateContent({ date: e.target.value })}
                  className="w-full rounded-lg bg-white/8 border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#EC7000]/60 transition-colors" />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleBuild}
                disabled={!state.content.title || building}
              >
                {building ? 'Building…' : 'Download presentation →'}
              </Button>
              <Button variant="ghost" onClick={() => setStep('pick')}>
                ← Change template
              </Button>
            </div>

            <p className="text-xs text-white/30">
              The downloaded HTML file is fully self-contained. Open it in any browser to present.
            </p>
          </div>
        )}

        {/* ── Done ────────────────────────────────────────────────────── */}
        {step === 'done' && chosen && (
          <div className="flex flex-col items-center gap-8 py-12 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#EC7000]/20 flex items-center justify-center text-4xl">
              🎉
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Your deck is ready!</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                "{state.content.title}" has been downloaded as a standalone HTML file using the{' '}
                <strong className="text-white/70">{chosen.name}</strong> template. Open it in any browser to
                present or share.
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => {
                setState({ occasionText: '', selectedMoods: [], candidates: [], chosenSlug: '', content: defaultContent })
                setStep('occasion')
              }}>
                Create another
              </Button>
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Full-screen preview modal */}
      {previewSlug && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-6"
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
                if (t) { handlePickTemplate(t); setPreviewSlug(null) }
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
