export type SlideLayout =
  | 'titulo'
  | 'agenda'
  | 'conteudo'
  | 'duas-colunas'
  | 'codigo'
  | 'metricas'
  | 'secao'
  | 'encerramento'

export type SlideTheme = 'itau-escuro' | 'itau-claro'

export type TransitionType = 'fade' | 'slide' | 'none'

export interface SlideFooter {
  showLogo: boolean
  showPageNumber: boolean
  logoVariant: 'laranja' | 'branca' | 'azul-escuro'
}

export interface SlideContent {
  title: string
  subtitle?: string
  bullets?: string[]
  code?: {
    language: string
    content: string
  }
  stats?: Array<{
    value: string
    label: string
  }>
  columns?: [string[], string[]]
  image?: {
    src: string
    alt: string
    caption?: string
  }
  notes?: string
}

export interface Slide {
  id: string
  layout: SlideLayout
  content: SlideContent
  footer?: SlideFooter
  transition?: TransitionType
  className?: string
}

export interface Presentation {
  id: string
  title: string
  author: string
  date: string
  theme: SlideTheme
  brand: 'itau-empresas'
  slides: Slide[]
  defaultTransition: TransitionType
  defaultFooter: SlideFooter
}

export interface PresentationConfig {
  theme: SlideTheme
  transition: TransitionType
  showFooter: boolean
  showPageNumbers: boolean
  format: '16:9' | '4:3'
}
