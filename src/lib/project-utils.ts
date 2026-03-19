import type { CollectionEntry } from 'astro:content'

export interface BentoProject {
  id: string
  name: string
  description: string
  link: string
  image: string | null
  tags: string[]
  startDate: string | null
  endDate: string | null
  caseStudy: boolean
}

export const serializeProject = (
  p: CollectionEntry<'projects'>,
): BentoProject => {
  const img = p.data.image as unknown
  let imageSrc: string | null = null
  if (img) {
    if (typeof img === 'string') {
      imageSrc = (img as string).startsWith('/public')
        ? (img as string).slice(7)
        : (img as string)
    } else if (typeof img === 'object' && img !== null && 'src' in img) {
      imageSrc = (img as { src?: string }).src ?? null
    }
  }
  return {
    id: p.id,
    name: p.data.name,
    description: p.data.description,
    link: p.data.link,
    image: imageSrc,
    tags: p.data.tags ?? [],
    startDate: p.data.startDate?.toISOString() ?? null,
    endDate: p.data.endDate?.toISOString() ?? null,
    caseStudy: p.data.caseStudy ?? false,
  }
}
