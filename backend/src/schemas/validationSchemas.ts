import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  category: z.string().min(1, "Category is required"),
  short_description: z.string().min(1, "Short description is required"),
  full_description: z.string().min(1, "Full description is required"),
  tech_stack: z.array(z.string()).optional(),
  thumbnail: z.string().optional().or(z.literal('')),
  gallery_images: z.array(z.string()).optional(),
  live_url: z.string().optional().or(z.literal('')),
  github_url: z.string().optional().or(z.literal('')),
  completion_date: z.string().optional(),
  is_featured: z.boolean().default(false),
});
