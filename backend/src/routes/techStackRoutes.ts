import express from 'express';
import { supabase } from '../utils/supabase';
import { authenticateAdmin } from '../middlewares/authMiddleware';
import { z } from 'zod';

const router = express.Router();

const techStackSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  icon_url: z.string().optional().or(z.literal('')),
});

// Get all tech stack items
router.get('/', async (req, res) => {
  console.log(">>> Backend: GET /api/tech-stack request received");
  try {
    const { data, error } = await supabase
      .from('tech_stack')
      .select('*');

    if (error) {
      console.error("Supabase Error fetching tech_stack:", error);
      return res.status(500).json({ error: error.message });
    }

    if (!data) return res.json([]);
    
    // Map back to frontend naming, handle both schema variations just in case
    const mapped = data.map((item: any) => ({
      id: item.id,
      name: item.technology_name || item.name || "Unnamed",
      category: item.category || "General",
      icon_url: item.logo || item.icon_url || ""
    }));
    
    // Sort manually to avoid "column not found" errors in SQL order
    mapped.sort((a, b) => a.name.localeCompare(b.name));
    
    res.json(mapped);
  } catch (error: any) {
    console.error("Internal Error in GET /api/tech-stack:", error);
    res.status(500).json({ error: error.message });
  }
});

// Create tech stack item
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const validatedData = techStackSchema.parse(req.body);
    
    // Check table info to see which columns exist
    const { data: health, error: healthError } = await supabase.from('tech_stack').select('*').limit(1);
    
    let dbData: any = {
      category: validatedData.category,
      proficiency: 100,
      display_order: 0
    };

    // Dynamic mapping based on what columns exist in the table
    // We'll try to insert into both technology_name and logo if we're not sure,
    // but the best way is to try the primary ones first.
    
    // Let's assume the user has technology_name as per their schema artifact
    dbData.technology_name = validatedData.name;
    dbData.logo = validatedData.icon_url;

    const { data, error } = await supabase
      .from('tech_stack')
      .insert([dbData])
      .select()
      .single();

    if (error) {
      // If technology_name failed, try 'name'
      if (error.message.includes("technology_name")) {
        const altData = {
          name: validatedData.name,
          category: validatedData.category,
          icon_url: validatedData.icon_url
        };
        const { data: altRes, error: altError } = await supabase.from('tech_stack').insert([altData]).select().single();
        if (altError) return res.status(500).json({ error: altError.message });
        return res.status(201).json(altRes);
      }
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.errors || error.message });
  }
});

// Update tech stack item
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const validatedData = techStackSchema.partial().parse(req.body);
    
    let dbData: any = {};
    if (validatedData.name) dbData.technology_name = validatedData.name;
    if (validatedData.category) dbData.category = validatedData.category;
    if (validatedData.icon_url !== undefined) dbData.logo = validatedData.icon_url;

    const { data, error } = await supabase
      .from('tech_stack')
      .update(dbData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      // Try alternate column names
      const altData: any = {};
      if (validatedData.name) altData.name = validatedData.name;
      if (validatedData.category) altData.category = validatedData.category;
      if (validatedData.icon_url !== undefined) altData.icon_url = validatedData.icon_url;

      const { data: altRes, error: altError } = await supabase
        .from('tech_stack')
        .update(altData)
        .eq('id', req.params.id)
        .select()
        .single();
        
      if (altError) return res.status(500).json({ error: altError.message });
      return res.json(altRes);
    }
    res.json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.errors || error.message });
  }
});

// Delete tech stack item
router.delete('/:id', authenticateAdmin, async (req, res) => {
  const { error } = await supabase
    .from('tech_stack')
    .delete()
    .eq('id', req.params.id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
});

export default router;
