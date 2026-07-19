import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Projects — each markdown file is one project. Frontmatter drives the
 * homepage card; the markdown body becomes the deep-dive page at
 * /projects/<filename>/. Adding a project = adding one file here.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    kicker: z.string(), // e.g. "Flagship · DisruptLab"
    num: z.string(), // display index on the card, e.g. "01"
    metricValue: z.string(), // the big terracotta number/phrase
    metricLabel: z.string(), // caption beside the metric
    outcome: z.string(), // one-line "why it matters"
    desc: z.string(), // card body summary
    tags: z.array(z.string()),
    wide: z.boolean().default(false), // spans both columns on the grid
    order: z.number(), // sort order on the homepage
  }),
});

/**
 * Experience — each file is one role in the timeline. Sorted by `order`
 * (newest first). No body needed; everything renders from frontmatter.
 */
const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    role: z.string(),
    org: z.string(),
    orgDetail: z.string().optional(), // the accented project/context suffix
    period: z.string(),
    points: z.array(z.string()),
    order: z.number(),
  }),
});

export const collections = { projects, experience };
