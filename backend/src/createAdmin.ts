import bcrypt from 'bcryptjs';
import { supabase } from './utils/supabase';

async function createAdmin() {
  const email = 'admin@argosmob.com';
  const password = 'password123';
  const name = 'Super Admin';

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const { data, error } = await supabase
    .from('admins')
    .insert([{
      name,
      email,
      password_hash: passwordHash,
      role: 'admin',
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating admin:', error.message);
  } else {
    console.log('Admin created successfully!');
    console.log('Email:', email);
    console.log('Password:', password);
  }
}

createAdmin();
