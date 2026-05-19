import { Request, Response } from 'express';
import { supabase } from '../utils/supabase';

export const createEnquiry = async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, company, projectType, budget, message } = req.body;

    const { data, error } = await supabase
      .from('enquiries')
      .insert([{
        full_name: fullName,
        email,
        phone,
        company,
        project_type: projectType,
        budget,
        message,
        status: 'new'
      }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getEnquiries = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
