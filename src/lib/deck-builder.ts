export interface PresentationContent {
  title: string
  subtitle: string
  author: string
  date: string
  organization: string
}

function escHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

async function fetchText(url: string): Promise<string | null> {
  try {
    const r = await fetch(url)
    return r.ok ? r.text() : null
  } catch {
    return null
  }
}

// Inline deck-stage.js — try template-local version first, fall back to global
async function inlineDeckStage(slug: string, html: string): Promise<string> {
  let js = await fetchText(`/templates/${slug}/deck-stage.js`)
  if (!js) js = await fetchText('/deck-stage.js')
  if (!js) return html

  const inlined = `<script>\n${js}\n</script>`
  return html
    .replace(/<script[^>]+src="deck-stage\.js"[^>]*><\/script>/gi, inlined)
    .replace(/<script[^>]+src="[^"]*deck-stage\.js"[^>]*><\/script>/gi, inlined)
}

// Inline external styles.css if referenced
async function inlineStyles(slug: string, html: string): Promise<string> {
  const css = await fetchText(`/templates/${slug}/styles.css`)
  if (!css) return html
  return html.replace(
    /<link[^>]+href="styles\.css"[^>]*\/?>/gi,
    `<style>\n${css}\n</style>`,
  )
}

// Replace placeholder content in the cover slide with user content.
// Strategy: target the <title> tag and the first meaningful heading inside
// the first .slide section, plus common copyright/meta lines.
function replaceContent(html: string, content: PresentationContent): string {
  const { title, subtitle, author, date, organization } = content

  // <title> tag
  if (title) {
    html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escHtml(title)}</title>`)
  }

  // Replace the first <h1> inside the first slide section with the user's title
  // Use a pattern that captures the full element
  if (title) {
    html = html.replace(
      /(<section[^>]*class="[^"]*slide[^"]*"[^>]*>[\s\S]*?)(<h1[^>]*>)([\s\S]*?)(<\/h1>)/,
      (_match, pre, open, _inner, close) =>
        `${pre}${open}${escHtml(title)}${close}`,
    )
  }

  // If subtitle present, replace the first <h2> or .subtitle element in cover
  if (subtitle) {
    // Only replace once, in the first 3000 chars of body (cover slide area)
    const coverEnd = Math.min(html.indexOf('</section>') + 10, 4000)
    const coverPart = html.slice(0, coverEnd)
    const rest = html.slice(coverEnd)

    const updatedCover = coverPart.replace(
      /(<(?:h2|p)[^>]*class="[^"]*subtitle[^"]*"[^>]*>)([\s\S]*?)(<\/(?:h2|p)>)/,
      (_m, open, _inner, close) => `${open}${escHtml(subtitle)}${close}`,
    )
    html = updatedCover + rest
  }

  // Replace copyright / byline patterns
  if (author && organization) {
    html = html
      .replace(/©\s*\d{4}\s+[A-Z][A-Z\s]+/g, `© ${date.split(/[,\s]/)[0] || new Date().getFullYear()} ${organization.toUpperCase()}`)
      .replace(/All rights reserved\./g, author)
  } else if (author) {
    html = html.replace(/All rights reserved\./g, author)
  }

  return html
}

export async function buildDeck(slug: string, content: PresentationContent): Promise<string> {
  const raw = await fetchText(`/templates/${slug}/template.html`)
  if (!raw) throw new Error(`Template not found: ${slug}`)

  let html = raw

  // Inline external assets so the file is self-contained
  html = await inlineDeckStage(slug, html)
  html = await inlineStyles(slug, html)

  // Replace placeholder content
  html = replaceContent(html, content)

  return html
}

export function downloadHtml(html: string, filename: string): void {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
