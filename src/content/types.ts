export type GuideSection = {
  id: string
  heading: string
  content: string
}

export type FAQItem = {
  question: string
  answer: string
}

export type GuideContent = {
  title: string
  description: string
  sections: GuideSection[]
}

export type FAQContent = {
  title: string
  description: string
  items: FAQItem[]
}

export type LocalizedContent<T> = {
  en: T
  de: T
}
