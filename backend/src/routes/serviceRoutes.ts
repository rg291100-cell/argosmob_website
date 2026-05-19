import express from 'express';
import { supabase } from '../utils/supabase';
import { authenticateAdmin } from '../middlewares/authMiddleware';
import { z } from 'zod';

const router = express.Router();

const serviceSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  is_active: z.boolean().default(true),
  order_index: z.number().int().default(0),
  image_url: z.string().optional().or(z.literal('')),
});

// Get all services
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*');

    if (error) {
      console.error("Supabase error in GET /api/services:", error);
      return res.status(500).json({ error: error.message });
    }

    if (!data) return res.json([]);
    
    // Map back to frontend naming
    const mapped = data.map((s: any) => ({
      id: s.id,
      title: s.title || "Untitled",
      description: s.full_description || s.short_description || s.description || "",
      icon: s.icon || "Layout",
      is_active: s.is_active !== undefined ? s.is_active : true,
      order_index: s.order_index || 0,
      image_url: s.image_url || ""
    }));
    
    // Sort manually
    mapped.sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
    
    res.json(mapped);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Create service
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const validatedData = serviceSchema.parse(req.body);
    
    // Check columns first (internal check)
    const dbData: any = {
      title: validatedData.title,
      slug: validatedData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      full_description: validatedData.description,
      short_description: validatedData.description.substring(0, 150),
      icon: validatedData.icon,
      image_url: validatedData.image_url || "",
      created_at: new Date()
    };

    const { data, error } = await supabase
      .from('services')
      .insert([dbData])
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.errors || error.message });
  }
});

// Update service
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const validatedData = serviceSchema.partial().parse(req.body);
    
    const dbData: any = {};
    if (validatedData.title) {
      dbData.title = validatedData.title;
      dbData.slug = validatedData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    if (validatedData.description) {
      dbData.full_description = validatedData.description;
      dbData.short_description = validatedData.description.substring(0, 150);
    }
    if (validatedData.icon) dbData.icon = validatedData.icon;
    if (validatedData.image_url !== undefined) dbData.image_url = validatedData.image_url;

    const { data, error } = await supabase
      .from('services')
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

// Delete service
router.delete('/:id', authenticateAdmin, async (req, res) => {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', req.params.id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
});

export default router;
