import express from 'express';
import { supabase } from '../utils/supabase';
import { authenticateAdmin } from '../middlewares/authMiddleware';
import { z } from 'zod';

const router = express.Router();

const storySchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  category: z.string().min(1),
  cover_image: z.string().optional().or(z.literal('')),
  status: z.enum(['draft', 'published']).default('draft'),
  author: z.string().min(1),
  youtube_url: z.string().optional().or(z.literal('')),
});

// Get all stories
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select('*');

    if (error) {
      console.error("Supabase error in GET /api/stories:", error);
      return res.status(500).json({ error: error.message });
    }

    if (!data) return res.json([]);
    
    // Map back to frontend naming
    const mapped = data.map((s: any) => ({
      id: s.id,
      title: s.title || "Untitled Story",
      slug: s.slug || "",
      content: s.full_content || s.content || "",
      excerpt: s.short_description || s.excerpt || "",
      category: s.category || "General",
      cover_image: s.cover_image || "",
      status: s.is_published ? 'published' : 'draft',
      author: s.author || "",
      youtube_url: s.youtube_url || "",
      created_at: s.created_at
    }));
    
    // Sort manually
    mapped.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    res.json(mapped);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Create story
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const validatedData = storySchema.parse(req.body);
    
    const dbData = {
      title: validatedData.title,
      slug: validatedData.slug || validatedData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      full_content: validatedData.content,
      short_description: validatedData.excerpt || validatedData.title,
      category: validatedData.category,
      cover_image: validatedData.cover_image,
      is_published: validatedData.status === 'published',
      youtube_url: validatedData.youtube_url || "",
      created_at: new Date()
    };

    const { data, error } = await supabase
      .from('stories')
      .insert([dbData])
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.errors || error.message });
  }
});

// Update story
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const validatedData = storySchema.partial().parse(req.body);
    
    const dbData: any = {};
    if (validatedData.title) dbData.title = validatedData.title;
    if (validatedData.slug) dbData.slug = validatedData.slug;
    if (validatedData.content) dbData.full_content = validatedData.content;
    if (validatedData.excerpt) dbData.short_description = validatedData.excerpt;
    if (validatedData.category) dbData.category = validatedData.category;
    if (validatedData.cover_image) dbData.cover_image = validatedData.cover_image;
    if (validatedData.status) dbData.is_published = validatedData.status === 'published';
    if (validatedData.youtube_url !== undefined) dbData.youtube_url = validatedData.youtube_url;

    const { data, error } = await supabase
      .from('stories')
      .update(dbData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.errors || error.message });
  }
});

// Delete story
router.delete('/:id', authenticateAdmin, async (req, res) => {
  const { error } = await supabase
    .from('stories')
    .delete()
    .eq('id', req.params.id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
});

export default router;
