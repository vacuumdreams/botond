import { z } from "zod"

export const projectSchema = z.object({
  name: z.string(),
  featured: z.boolean().or(z.undefined()),
  type: z.string().or(z.undefined()),
  url: z.string().url().or(z.null()),
  repoUrl: z.string().url().optional(),
  icon: z.string().or(z.undefined()),
  description: z.string(),
  start: z.string(),
  end: z.string().or(z.null()),
  tags: z.array(z.string()).or(z.undefined()),
  stack: z.array(z.string()).or(z.undefined()),
})

export const permanentSchema = z.object({
  id: z.string(),
  name: z.string(),
  industry: z.string(),
  phase: z.string().or(z.undefined()),
  employment: z.literal("permanent"),
  url: z.string().url().or(z.null()),
  level: z.string(),
  time: z.string(),
  description: z.string(),
  start: z.string(),
  end: z.string().or(z.null()),
  reasonEnd: z.string().or(z.null()),
  location: z.string(),
  icon: z.string().or(z.undefined()),
  projects: z.array(projectSchema).or(z.undefined()),
  tags: z.array(z.string()).or(z.undefined()),
  stack: z.array(z.string()),
})

export const freelanceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  employment: z.literal("freelance"),
  start: z.string(),
  end: z.string().or(z.null()),
  clients: z.record(permanentSchema.omit({ employment: true })),
})

export const schema = z.object({
  name: z.string(),
  location: z.string(),
  picture: z.string(),
  headline: z.array(z.string()),
  description: z.string(),
  social: z.object({
    website: z.string(),
    email: z.string(),
    phone: z.string(),
    links: z.record(
      z.object({
        name: z.string(),
        url: z.string().url(),
        icon: z.string().or(z.undefined()),
      }),
    ),
  }),
  education: z.object({
    courses: z.record(
      z.object({
        name: z.string(),
        description: z.string(),
        issuer: z.string().or(z.null()),
        date: z.string(),
        icon: z.string().or(z.undefined()),
        link: z.string(),
        tags: z.array(z.string()).or(z.undefined()),
      }),
    ),
    school: z.record(
      z.object({
        name: z.string(),
        location: z.string(),
        degree: z.string().or(z.null()),
        field: z.string(),
        icon: z.string().or(z.undefined()),
        start: z.string(),
        end: z.string(),
      }),
    ),
  }),
  skills: z.object({
    languages: z.record(
      z.object({
        name: z.string(),
        icon: z.string().or(z.undefined()),
        level: z.number(),
      }),
    ),
    tech: z.record(
      z.object({
        name: z.string(),
        featured: z.boolean().or(z.undefined()),
        tags: z.array(z.string()),
        icon: z.string().or(z.undefined()),
      }),
    ),
  }),
  work: z.object({
    history: z.record(permanentSchema.or(freelanceSchema)),
  }),
  projects: z.record(projectSchema),
})

export type Data = z.infer<typeof schema>;
