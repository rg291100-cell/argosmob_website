import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../utils/supabase';
import { loginSchema } from '../schemas/validationSchemas';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    const { data: admin, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN as any }
    );

    // Set HTTP-only cookie
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(200).json({
      message: 'Login successful',
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        avatar: admin.avatar
      },
      token // also return in body just in case
    });

  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const logoutAdmin = (req: Request, res: Response) => {
  res.clearCookie('admin_token');
  return res.status(200).json({ message: 'Logged out successfully' });
};

export const getAdminProfile = async (req: Request, res: Response) => {
  try {
    const adminId = (req as any).admin.id;

    const { data: admin, error } = await supabase
      .from('admins')
      .select('id, name, email, role, avatar, created_at')
      .eq('id', adminId)
      .single();

    if (error || !admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    return res.status(200).json(admin);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
