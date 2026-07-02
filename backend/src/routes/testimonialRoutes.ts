import express from 'express';
import { supabase } from '../utils/supabase';
import { authenticateAdmin } from '../middlewares/authMiddleware';
import { z } from 'zod';

const router = express.Router();

const testimonialSchema = z.object({
  client_name: z.string().min(1),
  designation: z.string().optional(),
  company: z.string().optional(),
  content: z.string().min(1),
  rating: z.number().min(1).max(5).default(5),
  image_url: z.string().optional().or(z.literal('')),
  is_featured: z.boolean().default(false),
});

// Get all testimonials
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*');

    if (error) {
      console.error("Supabase error in GET /api/testimonials:", error);
      return res.status(500).json({ error: error.message });
    }

    if (!data) return res.json([]);
    
    // Map back to frontend naming
    const mapped = data.map((t: any) => ({
      id: t.id,
      client_name: t.client_name || "Anonymous",
      designation: t.designation || "",
      company: t.company_name || t.company || "",
      content: t.review || t.content || "",
      rating: t.rating || 5,
      image_url: t.client_image || t.image_url || "",
      is_featured: t.is_featured || false,
      created_at: t.created_at
    }));
    
    // Sort manually
    mapped.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    res.json(mapped);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Create testimonial
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const validatedData = testimonialSchema.parse(req.body);
    
    const dbData = {
      client_name: validatedData.client_name,
      designation: validatedData.designation,
      company_name: validatedData.company,
      review: validatedData.content,
      rating: validatedData.rating,
      client_image: validatedData.image_url,
      is_featured: validatedData.is_featured,
      created_at: new Date()
    };

    const { data, error } = await supabase
      .from('testimonials')
      .insert([dbData])
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.errors || error.message });
  }
});

// Update testimonial
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const validatedData = testimonialSchema.partial().parse(req.body);
    
    const dbData: any = {};
    if (validatedData.client_name) dbData.client_name = validatedData.client_name;
    if (validatedData.designation) dbData.designation = validatedData.designation;
    if (validatedData.company) dbData.company_name = validatedData.company;
    if (validatedData.content) dbData.review = validatedData.content;
    if (validatedData.rating) dbData.rating = validatedData.rating;
    if (validatedData.image_url) dbData.client_image = validatedData.image_url;
    if (validatedData.is_featured !== undefined) dbData.is_featured = validatedData.is_featured;

    const { data, error } = await supabase
      .from('testimonials')
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

// Delete testimonial
router.delete('/:id', authenticateAdmin, async (req, res) => {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', req.params.id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
});

export default router;
