export type Formality = 'low' | 'medium-low' | 'medium' | 'medium-high' | 'high'
export type Density = 'low' | 'medium' | 'medium-high' | 'high'
export type Scheme = 'light' | 'dark' | 'mixed'

export interface TemplatePalette {
  bg: string
  ink: string
  accent: string
  paper?: string
  muted?: string
  description: string
}

export interface TemplateTypography {
  display: string
  body: string
  mono?: string
  style: string
}

export interface TemplateEntry {
  slug: string
  name: string
  tagline: string
  mood: string[]
  occasion: string[]
  tone: string[]
  formality: Formality
  density: Density
  scheme: Scheme
  best_for: string
  avoid_for: string
  slide_count: number
  palette?: TemplatePalette
  typography?: TemplateTypography
}

// Full template registry imported from index.json
export const TEMPLATES: TemplateEntry[] = [
  {
    slug: '8-bit-orbit',
    name: '8-Bit Orbit',
    tagline: 'Pixel-art neon arcade aesthetic on a deep navy void.',
    mood: ['retro-tech', 'playful', 'cyberpunk', 'energetic'],
    occasion: ['gaming pitch', 'hackathon demo', 'web3 / crypto deck', 'indie product launch', 'developer tools', 'synthwave brand'],
    tone: ['geeky', 'neon', 'rebellious', 'sci-fi'],
    formality: 'low',
    density: 'medium',
    scheme: 'dark',
    best_for: 'Anything that should feel like a CRT screen at 2am: cyberpunk, gaming, web3, indie dev tools, hackathon demos.',
    avoid_for: 'Quiet institutional finance, healthcare patient-facing, traditional luxury.',
    slide_count: 10,
  },
  {
    slug: 'biennale-yellow',
    name: 'Biennale Yellow',
    tagline: 'Solar yellow on warm parchment with deep indigo serif and atmospheric sun-glow gradients.',
    mood: ['editorial', 'atmospheric', 'warm', 'cultural-institution', 'poster-like'],
    occasion: ['exhibition or biennale', 'arts institution programme', 'design conference', 'literary publication', 'studio annual report'],
    tone: ['literary', 'considered', 'contemplative', 'warm-modern', 'Dutch-editorial'],
    formality: 'high',
    density: 'medium',
    scheme: 'light',
    best_for: 'Art-biennale poster or museum annual programme: exhibition decks, arts-institution announcements, design conference brochures.',
    avoid_for: 'Decks needing visual punch or saturated multi-color energy.',
    slide_count: 8,
  },
  {
    slug: 'block-frame',
    name: 'BlockFrame',
    tagline: 'Neobrutalist deck with pastel-neon color blocks and chunky black borders.',
    mood: ['bold', 'playful', 'graphic', 'fresh'],
    occasion: ['creative agency pitch', 'indie SaaS launch', 'designer portfolio', 'brand redesign', 'modern startup deck'],
    tone: ['confident', 'graphic', 'pop', 'design-led'],
    formality: 'medium-low',
    density: 'high',
    scheme: 'light',
    best_for: 'Pop-graphic and design-led: indie SaaS launches, agency credentials, creative reviews, brand redesigns.',
    avoid_for: 'Contexts requiring quiet institutional restraint or traditional weight.',
    slide_count: 10,
  },
  {
    slug: 'blue-professional',
    name: 'Blue Professional',
    tagline: 'Cream paper background with electric cobalt blue accents; clean modern professional.',
    mood: ['professional', 'modern', 'calm', 'trustworthy'],
    occasion: ['B2B SaaS pitch', 'consulting deliverable', 'internal review', 'advisory pitch', 'investor update'],
    tone: ['clean', 'considered', 'polished', 'neutral'],
    formality: 'medium-high',
    density: 'medium',
    scheme: 'light',
    best_for: 'Modern-considered and lightly authoritative: B2B SaaS pitches, consulting deliverables, advisory updates, investor reports.',
    avoid_for: 'Contexts where the deck should feel hot, playful, or intentionally informal.',
    slide_count: 10,
  },
  {
    slug: 'bold-poster',
    name: 'Bold Poster',
    tagline: 'Editorial poster aesthetic with massive Shrikhand display and a single fire-engine red accent.',
    mood: ['bold', 'editorial', 'loud', 'confident'],
    occasion: ['brand manifesto', 'creative-led pitch', 'magazine / editorial', 'founder vision deck', 'art / culture'],
    tone: ['dramatic', 'graphic', 'sharp', 'intentional'],
    formality: 'medium',
    density: 'low',
    scheme: 'light',
    best_for: 'Magazine cover feel: brand manifestos, founder vision decks, editorial / cultural pitches, creative reviews.',
    avoid_for: 'Decks that need to communicate dense information per slide.',
    slide_count: 10,
  },
  {
    slug: 'broadside',
    name: 'Broadside',
    tagline: 'Dark editorial canvas with a single fire orange accent and bilingual Latin/Chinese type stack.',
    mood: ['editorial', 'dramatic', 'loud', 'newspaper'],
    occasion: ['brand manifesto', 'founder vision deck', 'magazine / cultural pitch', 'design talk', 'campaign launch'],
    tone: ['graphic', 'punchy', 'literary', 'considered'],
    formality: 'medium-high',
    density: 'medium',
    scheme: 'dark',
    best_for: 'Broadside newspaper headline: brand manifestos, magazine and cultural pitches, design talks, founder vision statements.',
    avoid_for: 'Decks that need to feel quiet, warm, or institutionally traditional.',
    slide_count: 20,
  },
  {
    slug: 'capsule',
    name: 'Capsule',
    tagline: 'Modular pill-shaped cards on warm bone with a full pastel-pop palette.',
    mood: ['playful', 'modern', 'warm', 'fresh', 'fun'],
    occasion: ['lifestyle brand', 'creator portfolio', 'DTC product launch', 'wellness or beauty pitch', 'Y2K-tinged brand work'],
    tone: ['upbeat', 'graphic', 'approachable', 'cool'],
    formality: 'medium-low',
    density: 'medium',
    scheme: 'light',
    best_for: 'Modular, modern, and a little Y2K: lifestyle brands, creator portfolios, DTC launches, beauty / wellness.',
    avoid_for: 'Contexts requiring traditional institutional weight.',
    slide_count: 10,
  },
  {
    slug: 'cartesian',
    name: 'Cartesian',
    tagline: 'Quiet warm-neutral palette with classical Playfair serifs; tasteful and unhurried.',
    mood: ['quiet', 'considered', 'elegant', 'warm-minimal'],
    occasion: ['investment thesis', 'white paper', 'advisory deliverable', 'research report', 'book / longform pitch', 'gallery / cultural'],
    tone: ['classical', 'literary', 'restrained', 'confident-quiet'],
    formality: 'high',
    density: 'low',
    scheme: 'light',
    best_for: 'Quiet, considered, and grown-up: investment theses, white papers, advisory work, longform research.',
    avoid_for: 'Decks needing visual heat, multiple accents, or a sense of urgency.',
    slide_count: 10,
  },
  {
    slug: 'cobalt-grid',
    name: 'Cobalt Grid',
    tagline: 'Electric cobalt italic serifs on a graph-paper canvas, anchored by stair-stepped pixel-glitch decorations.',
    mood: ['editorial', 'design-research', 'studious', 'modernist', 'tech-print', 'monochrome'],
    occasion: ['design trend or research report', 'studio annual', 'creative agency capabilities deck', 'art or architecture publication'],
    tone: ['considered', 'literary', 'studious', 'quietly-modern', 'editorial'],
    formality: 'high',
    density: 'medium',
    scheme: 'light',
    best_for: 'Quietly serious design / research bulletin, art publication, or curated trend report.',
    avoid_for: 'Decks needing warmth, multi-colour energy, or a casual / playful voice.',
    slide_count: 8,
  },
  {
    slug: 'coral',
    name: 'Coral',
    tagline: 'Cream and coral on near-black, set in oversized Bebas Neue.',
    mood: ['bold', 'warm', 'modern', 'confident'],
    occasion: ['fashion / beauty pitch', 'fitness brand', 'F&B brand deck', 'lifestyle launch', 'creative agency'],
    tone: ['graphic', 'punchy', 'magazine'],
    formality: 'medium',
    density: 'medium',
    scheme: 'mixed',
    best_for: 'Warm-graphic and editorial: fashion, beauty, fitness, F&B, lifestyle brands, agency credentials.',
    avoid_for: 'Contexts that should feel quiet or institutional.',
    slide_count: 10,
  },
  {
    slug: 'creative-mode',
    name: 'Creative Mode',
    tagline: 'Cream paper canvas with confident multi-color (green, pink, orange, yellow) accents and Archivo Black display.',
    mood: ['creative', 'confident', 'playful', 'design-led'],
    occasion: ['creative agency pitch', 'design studio deck', 'ad shop credentials', 'brand creative review', 'concept presentation'],
    tone: ['graphic', 'expressive', 'modern'],
    formality: 'medium',
    density: 'medium-high',
    scheme: 'light',
    best_for: 'Design-led and confident: creative agency pitches, design studio decks, ad shop credentials, brand creative reviews.',
    avoid_for: 'Contexts demanding institutional restraint and a quiet authority.',
    slide_count: 8,
  },
  {
    slug: 'daisy-days',
    name: 'Daisy Days',
    tagline: 'Cheerful pastel deck with hand-drawn daisies, stars, and rainbows. Friendly, soft, and warm.',
    mood: ['cheerful', 'playful', 'warm', 'sunny', 'wholesome'],
    occasion: ['education / classroom', 'kids product launch', 'wellness program', 'community workshop', 'creator portfolio'],
    tone: ['friendly', 'soft', 'encouraging', 'approachable', 'lighthearted'],
    formality: 'low',
    density: 'medium',
    scheme: 'light',
    best_for: 'Friendly, soft, and joyful: educational content, kids and family, wellness programs, community workshops.',
    avoid_for: 'Contexts where the audience explicitly expects authority and precision.',
    slide_count: 10,
  },
  {
    slug: 'editorial-tri-tone',
    name: 'Editorial Tri-Tone',
    tagline: 'Three-color editorial system: dusty pink, mustard cream, and deep burgundy.',
    mood: ['editorial', 'warm', 'intentional', 'moody'],
    occasion: ['editorial / magazine pitch', 'fashion brand deck', 'lifestyle media', 'literary / cultural', 'art direction review'],
    tone: ['literary', 'warm', 'considered', 'stylish'],
    formality: 'medium-high',
    density: 'medium',
    scheme: 'mixed',
    best_for: 'Fashion-magazine spread: editorial pitches, fashion brand decks, lifestyle media, art direction reviews.',
    avoid_for: 'Decks needing to read as soft or comforting.',
    slide_count: 8,
  },
  {
    slug: 'grove',
    name: 'Grove',
    tagline: 'Forest-green canvas with cream type, classical Playfair serifs, and a single rust accent.',
    mood: ['organic', 'considered', 'warm', 'literary', 'natural'],
    occasion: ['sustainability brand', 'wellness brand', 'outdoor / nature product', 'winery or restaurant', 'literary or arts deck'],
    tone: ['classical', 'warm', 'considered', 'patient'],
    formality: 'medium-high',
    density: 'medium',
    scheme: 'mixed',
    best_for: 'Organic, considered, and grown-up: sustainability and wellness brands, outdoor / nature products, wineries and restaurants.',
    avoid_for: 'Decks needing neon energy or rapid-fire pop.',
    slide_count: 12,
  },
  {
    slug: 'long-table',
    name: 'Long Table',
    tagline: 'Warm cream and rust-red supper-club aesthetic with bold uppercase grotesk headlines.',
    mood: ['warm', 'intimate', 'modern', 'friendly', 'small-batch', 'social', 'hospitality'],
    occasion: ['supper club or dinner series', 'event or community gathering', 'small hospitality / restaurant brand', 'creative studio open house'],
    tone: ['warm', 'playful', 'considered', 'social', 'magazine-friendly', 'modern-editorial'],
    formality: 'medium',
    density: 'medium',
    scheme: 'light',
    best_for: 'Warm, intimate, modern hospitality / community brand: supper clubs, dinner series, small restaurants, lifestyle brands.',
    avoid_for: 'Decks needing corporate polish, technical density, or a cold / minimalist register.',
    slide_count: 8,
  },
  {
    slug: 'mat',
    name: 'Mat',
    tagline: 'Dark sage canvas with bone paper and burnt-orange accent; mid-century modern with wood undertones.',
    mood: ['warm-modern', 'considered', 'tactile', 'mid-century'],
    occasion: ['design studio credentials', 'architecture / interior brand', 'ceramics or craft brand', 'furniture pitch', 'advisory deliverable'],
    tone: ['warm', 'design-led', 'intentional', 'considered'],
    formality: 'medium',
    density: 'medium',
    scheme: 'mixed',
    best_for: 'Mid-century, tactile, and intentional: design studio credentials, architecture / interior brands, ceramics / craft / furniture.',
    avoid_for: 'Contexts needing fast tech energy or institutional restraint.',
    slide_count: 9,
  },
  {
    slug: 'monochrome',
    name: 'Monochrome',
    tagline: 'Ivory ledger paper with all-black type; Lora serif headlines, Jost body, no color at all.',
    mood: ['restrained', 'literary', 'archival', 'ledger'],
    occasion: ['user research synthesis', 'white paper', 'longform report', 'academic deck', 'policy brief', 'advisory deliverable'],
    tone: ['literary', 'considered', 'neutral', 'honest'],
    formality: 'high',
    density: 'high',
    scheme: 'light',
    best_for: 'Hand-typeset ledger: user research synthesis, white papers, longform reports, academic and policy briefs.',
    avoid_for: 'Decks needing visual personality or color-led storytelling.',
    slide_count: 18,
  },
  {
    slug: 'neo-grid-bold',
    name: 'Neo-Grid Bold',
    tagline: 'Editorial neo-brutalism with a single neon yellow accent on off-white paper.',
    mood: ['confident', 'punchy', 'editorial', 'modern'],
    occasion: ['product launch', 'design review', 'founder pitch', 'brand deck', 'consulting findings', 'conference talk'],
    tone: ['bold', 'minimal', 'design-led', 'graphic'],
    formality: 'medium',
    density: 'high',
    scheme: 'light',
    best_for: 'Confident and editorial-graphic: design-led pitches, brand work, founder talks, conference keynotes.',
    avoid_for: 'Contexts needing to feel quiet, traditional, or warm.',
    slide_count: 13,
  },
  {
    slug: 'peoples-platform',
    name: "People's Platform",
    tagline: 'Activist poster energy: blue, orange, red on cream, with Alfa Slab + Caveat Brush.',
    mood: ['activist', 'loud', 'graphic', 'honest'],
    occasion: ['cultural commentary', 'manifesto', 'community / civic deck', 'design talk', 'campaign pitch', 'founder vision'],
    tone: ['punchy', 'direct', 'expressive', 'warm-bold'],
    formality: 'medium-low',
    density: 'medium-high',
    scheme: 'light',
    best_for: 'Honest, loud, and graphic: cultural commentary, manifestos, civic and community decks, design talks, campaign pitches.',
    avoid_for: 'Contexts where institutional restraint is the actual goal.',
    slide_count: 10,
  },
  {
    slug: 'pin-and-paper',
    name: 'Pin & Paper',
    tagline: 'Yellow paper with safety-pin illustrations, ink-blue handwritten Caveat, paper-grain texture.',
    mood: ['crafted', 'handmade', 'warm', 'thoughtful', 'literary'],
    occasion: ['research findings with personality', 'qualitative report', 'founder reflection', 'creator essay deck', 'workshop debrief'],
    tone: ['literary', 'intimate', 'warm', 'grounded'],
    formality: 'medium',
    density: 'medium',
    scheme: 'light',
    best_for: 'Hand-crafted, warm, and literary: qualitative research findings, founder reflections, longform brand stories, workshop debriefs.',
    avoid_for: 'Decks needing digital-native polish or rigorously data-driven presentation.',
    slide_count: 11,
  },
  {
    slug: 'pink-script',
    name: 'Pink Script — After Hours',
    tagline: 'Black canvas, hot pink accent, pearl-cream paper, Instrument Serif headlines: late-night editorial luxury.',
    mood: ['nocturnal', 'moody', 'intentional', 'luxe', 'expressive'],
    occasion: ['fashion brand deck', 'creator personal brand', 'after-hours product', 'luxury launch', 'editorial feature'],
    tone: ['literary', 'sultry', 'considered', 'magazine'],
    formality: 'medium-high',
    density: 'low',
    scheme: 'dark',
    best_for: 'Nocturnal, intentional, and a little luxe: fashion brand decks, creator personal brands, after-hours / nightlife / spirits launches.',
    avoid_for: 'Daytime corporate-professional and traditional B2B contexts.',
    slide_count: 9,
  },
  {
    slug: 'playful',
    name: 'Playful',
    tagline: 'Sun-warm peach background with Syne display: a friendly indie launch deck.',
    mood: ['warm', 'approachable', 'indie', 'friendly'],
    occasion: ['creator portfolio', 'indie product launch', 'lifestyle brand', 'small-business pitch', 'newsletter / community'],
    tone: ['upbeat', 'informal', 'welcoming'],
    formality: 'low',
    density: 'medium',
    scheme: 'light',
    best_for: 'Warm, indie, and approachable: creator portfolios, indie product launches, lifestyle brands, small-business pitches.',
    avoid_for: 'Contexts where institutional credibility matters more than warmth.',
    slide_count: 10,
  },
  {
    slug: 'raw-grid',
    name: 'Raw Grid',
    tagline: 'Neo-brutalist deck with thick borders, offset shadows, and a pink/sage/ink palette.',
    mood: ['raw', 'punchy', 'energetic', 'confident'],
    occasion: ['startup pitch', 'accelerator demo day', 'founder pitch', 'indie product launch', 'brand deck', 'creator portfolio'],
    tone: ['direct', 'modern', 'no-nonsense', 'graphic'],
    formality: 'medium-low',
    density: 'high',
    scheme: 'light',
    best_for: 'Direct and graphic-confident: founder pitches, accelerator demos, brand decks, indie launches, creator portfolios.',
    avoid_for: 'Contexts needing to feel soft, warm, or intentionally quiet.',
    slide_count: 10,
  },
  {
    slug: 'retro-windows',
    name: 'Retro Windows',
    tagline: 'Windows 95 chrome: gray title bars, MS Sans Serif, pixel typography, full nostalgia.',
    mood: ['nostalgic', 'retro', 'geeky', 'playful'],
    occasion: ['retro gaming pitch', 'Y2K brand', 'creator portfolio (90s aesthetic)', 'tech-history talk'],
    tone: ['winking', 'nostalgic', 'geeky', 'fun'],
    formality: 'low',
    density: 'medium',
    scheme: 'light',
    best_for: 'Knowingly nostalgic: retro gaming, Y2K-aesthetic brands, creator portfolios with a 90s vibe, tech-history talks.',
    avoid_for: 'Decks needing to read as modern, elegant, or institutionally credible.',
    slide_count: 10,
  },
  {
    slug: 'retro-zine',
    name: 'Retro Zine',
    tagline: 'Beige paper with green accent and Bebas Neue + Caveat: a riso-printed zine in HTML form.',
    mood: ['crafted', 'lo-fi', 'underground', 'warm-retro'],
    occasion: ['indie zine / publication', 'music or arts brand', 'creator portfolio', 'small-batch / craft launch', 'cultural / community deck'],
    tone: ['scrappy', 'warm', 'intentional', 'DIY'],
    formality: 'medium-low',
    density: 'medium',
    scheme: 'light',
    best_for: 'Printed, lo-fi, and crafted: indie zines and publications, music / arts brands, creator portfolios, small-batch craft launches.',
    avoid_for: 'Contexts demanding digital-native polish or fast modern-tech energy.',
    slide_count: 10,
  },
  {
    slug: 'sakura-chroma',
    name: 'Sakura Chroma',
    tagline: 'Vintage Japanese cassette-package aesthetic: cream paper, diagonal rainbow ribbons, condensed bold type.',
    mood: ['retro', 'playful', 'kawaii-tech', 'warm', 'tactile', 'product-catalogue'],
    occasion: ['product launch or catalogue', 'indie hardware or analog studio brand', 'music label or release schedule', 'creative studio annual report'],
    tone: ['playful', 'confident', 'warm', 'tactile', '80s-Japanese-tech'],
    formality: 'low',
    density: 'medium',
    scheme: 'light',
    best_for: 'Vintage Japanese cassette package or TDK / Sony product catalogue: indie hardware brand decks, music-label release schedules.',
    avoid_for: 'Decks needing restrained, corporate, or quiet typography.',
    slide_count: 8,
  },
  {
    slug: 'scatterbrain',
    name: 'Scatterbrain',
    tagline: 'Post-it inspired: pastel sticky notes, Caveat handwriting, Shrikhand and Zilla Slab type stack.',
    mood: ['playful', 'creative', 'warm', 'messy-on-purpose', 'workshop'],
    occasion: ['brainstorm / workshop', 'creative agency credentials', 'design-thinking session', 'ideation pitch', 'art-direction review'],
    tone: ['informal', 'warm', 'expressive', 'human'],
    formality: 'low',
    density: 'high',
    scheme: 'light',
    best_for: "Designer's whiteboard: brainstorms, workshops, creative-agency credentials, design-thinking sessions, ideation pitches.",
    avoid_for: 'Contexts demanding precision and institutional weight.',
    slide_count: 10,
  },
  {
    slug: 'signal',
    name: 'Signal',
    tagline: 'Deep navy canvas with bone paper and a single muted-gold accent; institutional with quiet weight.',
    mood: ['institutional', 'trustworthy', 'considered', 'weighty'],
    occasion: ['investor deck', 'consulting deliverable', 'board presentation', 'legal / policy brief', 'academic deck', 'advisory pitch'],
    tone: ['sober', 'polished', 'established', 'literary'],
    formality: 'high',
    density: 'high',
    scheme: 'mixed',
    best_for: 'Weighty, considered, and credibly institutional: investor decks, board presentations, consulting deliverables, legal / policy briefs.',
    avoid_for: 'Contexts that should feel hot, fast, or intentionally playful.',
    slide_count: 18,
  },
  {
    slug: 'soft-editorial',
    name: 'Soft Editorial',
    tagline: 'Cormorant Garamond serif on warm paper with sage, blush, and lemon accents.',
    mood: ['literary', 'elegant', 'quiet', 'warm-classical'],
    occasion: ['editorial feature', 'longform brand story', 'gallery or museum', 'literary pitch', 'advisory deliverable', 'wedding / lifestyle media'],
    tone: ['literary', 'considered', 'warm', 'magazine'],
    formality: 'high',
    density: 'low',
    scheme: 'light',
    best_for: 'Literary, elegant, and unhurried: editorial features, longform brand stories, gallery / museum decks, advisory deliverables.',
    avoid_for: 'Decks needing visual heat or punch.',
    slide_count: 12,
  },
  {
    slug: 'stencil-tablet',
    name: 'Stencil & Tablet',
    tagline: 'Bone paper with stencil-cut headlines and a six-color earth palette: archaeology meets brand.',
    mood: ['archival', 'earthy', 'tactile', 'considered', 'graphic'],
    occasion: ['museum / cultural institution', 'art / architecture brand', 'longform research', 'heritage / craft brand', 'manifesto'],
    tone: ['weighty', 'considered', 'tactile', 'literary'],
    formality: 'medium-high',
    density: 'medium',
    scheme: 'light',
    best_for: 'Archival, tactile, and weighty-graphic: museum and cultural-institution decks, art / architecture brands, longform research.',
    avoid_for: 'Contexts demanding digital-native polish or playful pop.',
    slide_count: 11,
  },
  {
    slug: 'studio',
    name: 'Studio',
    tagline: 'Black canvas with electric-yellow type; high-voltage design studio aesthetic.',
    mood: ['electric', 'bold', 'graphic', 'design-led', 'high-contrast'],
    occasion: ['design studio credentials', 'creative agency pitch', 'brand showcase', 'art-direction review', 'fashion / sneaker brand'],
    tone: ['graphic', 'loud', 'modern', 'intentional'],
    formality: 'medium',
    density: 'medium',
    scheme: 'dark',
    best_for: 'Electric and design-led: studio credentials, creative agency pitches, brand showcases, art-direction reviews.',
    avoid_for: 'Contexts that should feel quiet or institutional.',
    slide_count: 12,
  },
  {
    slug: 'vellum',
    name: 'Vellum',
    tagline: 'Deep navy canvas with warm-yellow italic Cormorant serifs and a single dusty teal accent.',
    mood: ['scholarly', 'literary', 'considered', 'quiet', 'intellectual'],
    occasion: ['research findings', 'white paper or longform report', 'academic or university deck', 'advisory deliverable', 'founder reflection'],
    tone: ['literary', 'considered', 'patient', 'intelligent'],
    formality: 'high',
    density: 'low',
    scheme: 'dark',
    best_for: 'Scholarly, literary, and quietly intelligent: research synthesis, white papers, academic and policy briefs, advisory deliverables.',
    avoid_for: 'Contexts needing visual heat or pop.',
    slide_count: 9,
  },
]

export function getScreenshotUrl(slug: string): string {
  return `/screenshots/${slug}-1.png`
}

// Score a template against user's mood/occasion description
function scoreTemplate(template: TemplateEntry, moodKeywords: string[], occasionKeywords: string[]): number {
  let score = 0
  const allUserKeywords = [...moodKeywords, ...occasionKeywords].map(k => k.toLowerCase())

  for (const keyword of allUserKeywords) {
    for (const m of template.mood) {
      if (m.toLowerCase().includes(keyword) || keyword.includes(m.toLowerCase())) score += 3
    }
    for (const t of template.tone) {
      if (t.toLowerCase().includes(keyword) || keyword.includes(t.toLowerCase())) score += 2
    }
    for (const o of template.occasion) {
      if (o.toLowerCase().includes(keyword) || keyword.includes(o.toLowerCase())) score += 1
    }
    if (template.best_for.toLowerCase().includes(keyword)) score += 1
  }

  return score
}

export interface MatchOptions {
  moodKeywords: string[]
  occasionKeywords: string[]
  preferredScheme?: Scheme
}

// Pick 3 diverse candidates that match user preferences
export function pickCandidates(options: MatchOptions): TemplateEntry[] {
  const { moodKeywords, occasionKeywords, preferredScheme } = options

  const scored = TEMPLATES.map(t => ({
    template: t,
    score: scoreTemplate(t, moodKeywords, occasionKeywords) + (t.scheme === preferredScheme ? 2 : 0),
  })).sort((a, b) => b.score - a.score)

  // Pick top candidate, then two more that are diverse (different scheme/formality)
  const picks: TemplateEntry[] = []
  const usedSchemes = new Set<Scheme>()
  const usedFormalities = new Set<Formality>()

  for (const { template } of scored) {
    if (picks.length >= 3) break
    const isFirstPick = picks.length === 0
    const isDiverse =
      !usedSchemes.has(template.scheme) ||
      !usedFormalities.has(template.formality) ||
      picks.length < 2

    if (isFirstPick || isDiverse) {
      picks.push(template)
      usedSchemes.add(template.scheme)
      usedFormalities.add(template.formality)
    }
  }

  // Fill up to 3 if we didn't get enough diverse picks
  for (const { template } of scored) {
    if (picks.length >= 3) break
    if (!picks.includes(template)) picks.push(template)
  }

  return picks.slice(0, 3)
}

export const MOOD_OPTIONS = [
  { label: 'Bold & Confident', keywords: ['bold', 'confident', 'punchy'] },
  { label: 'Warm & Friendly', keywords: ['warm', 'friendly', 'approachable', 'playful'] },
  { label: 'Dark & Moody', keywords: ['dark', 'moody', 'nocturnal', 'dramatic'] },
  { label: 'Clean & Professional', keywords: ['professional', 'clean', 'polished', 'trustworthy'] },
  { label: 'Literary & Elegant', keywords: ['literary', 'elegant', 'quiet', 'considered'] },
  { label: 'Creative & Expressive', keywords: ['creative', 'expressive', 'graphic', 'design-led'] },
  { label: 'Retro & Nostalgic', keywords: ['retro', 'nostalgic', 'crafted', 'lo-fi'] },
  { label: 'Editorial & Graphic', keywords: ['editorial', 'graphic', 'modern', 'punchy'] },
]
