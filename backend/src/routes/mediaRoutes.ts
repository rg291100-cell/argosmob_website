import express from 'express';
import { supabase } from '../utils/supabase';
import { authenticateAdmin } from '../middlewares/authMiddleware';
import crypto from 'crypto';

const router = express.Router();

// Upload file via Base64 (bypass multer dependency)
router.post('/upload', authenticateAdmin, async (req, res) => {
  try {
    const { file, fileName, fileType } = req.body;

    if (!file) {
      return res.status(400).json({ error: 'No file data provided' });
    }

    // Extract base64 data
    const base64Data = file.split(';base64,').pop();
    const buffer = Buffer.from(base64Data, 'base64');
    
    const fileExt = fileName.split('.').pop();
    const newFileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `uploads/${newFileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('media')
      .upload(filePath, buffer, {
        contentType: fileType,
        upsert: false
      });

    if (error) {
      console.error('Storage error:', error);
      throw error;
    }

    // Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);

    // Save to database
    const { data: dbData, error: dbError } = await supabase
      .from('project_media')
      .insert([{
        media_url: publicUrl,
        media_type: fileType.startsWith('image/') ? 'image' : 'video',
      }])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      // Warning only, file is already in storage
      return res.status(201).json({ 
        url: publicUrl, 
        warning: 'Uploaded to storage but failed to save to database record'
      });
    }

    res.status(201).json({ 
      url: publicUrl, 
      id: dbData.id,
      type: dbData.media_type 
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all media
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('project_media')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Delete media
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { data: fileInfo, error: fetchError } = await supabase
      .from('project_media')
      .select('media_url')
      .eq('id', req.params.id)
      .single();

    if (fetchError || !fileInfo) throw new Error('File not found');

    const urlParts = fileInfo.media_url.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const filePath = `uploads/${fileName}`;

    await supabase.storage.from('media').remove([filePath]);

    const { error: dbError } = await supabase
      .from('project_media')
      .delete()
      .eq('id', req.params.id);

    if (dbError) throw dbError;

    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
