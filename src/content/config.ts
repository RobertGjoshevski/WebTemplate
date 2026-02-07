import { defineCollection, z } from 'astro:content';

// Content is file-based: Astro reads from src/content/blog/ at build time.
// Local dev and production both use the same source (the repo). No API or env switching.
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
