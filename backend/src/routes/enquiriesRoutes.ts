import express from 'express';
import { supabase } from '../utils/supabase';
import { authenticateAdmin } from '../middlewares/authMiddleware';
import { z } from 'zod';

const router = express.Router();

const statusSchema = z.object({
  status: z.enum(['new', 'contacted', 'in_discussion', 'converted', 'closed'])
});

// Get all enquiries
router.get('/', authenticateAdmin, async (req, res) => {
  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Update enquiry status
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const validatedData = statusSchema.parse(req.body);
    const { data, error } = await supabase
      .from('enquiries')
      .update({ status: validatedData.status })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.errors || error.message });
  }
});

export default router;
