import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      order: z.number().optional(),
      // CTF logo paths stay as string so we can inline them (Image pipeline breaks in prod)
      image: z
        .union([
          z.string().refine((s) => s.includes('ctf_flag_logo')),
          z.union([image(), z.string()]),
        ])
        .optional(),
      tags: z.array(z.string()).optional(),
      authors: z.array(z.string()).optional(),
      draft: z.boolean().optional(),
      category: z.string().optional(), // e.g. "ctf", "education", "tools" - for sidebar grouping
    }),
})

// const authors = defineCollection({
//   loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/authors' }),
//   schema: z.object({
//     name: z.string(),
//     pronouns: z.string().optional(),
//     avatar: z.string().url().or(z.string().startsWith('/')),
//     bio: z.string().optional(),
//     mail: z.string().email().optional(),
//     website: z.string().url().optional(),
//     twitter: z.string().url().optional(),
//     github: z.string().url().optional(),
//     linkedin: z.string().url().optional(),
//     discord: z.string().url().optional(),
//   }),
// })

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      image: z.union([image(), z.string()]).optional(),
      link: z.string().url(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      caseStudy: z.boolean().optional(),
    }),
})

export const collections = { blog, /* authors, */ projects }
