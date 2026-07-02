const { createClient } = require('@supabase/supabase-client');
require('dotenv').config({ path: '/media/rishabh/Rishabh1/ArgosMob Tech & AI Website/argosmob_website/backend/.env' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkSchema() {
  console.log("Checking tech_stack table...");
  const { data: columns, error } = await supabase
    .rpc('get_table_columns', { table_name: 'tech_stack' }); // This RPC might not exist by default

  // Fallback: try to select from the table
  const { data, error: selectError } = await supabase.from('tech_stack').select('*').limit(1);
  
  if (selectError) {
    console.error("Select Error:", selectError.message);
  } else {
    console.log("Table 'tech_stack' exists. Data sample:", data);
  }

  // Try to describe the table if possible, or just check what columns come back
  const { data: health, error: healthError } = await supabase.from('tech_stack').select().limit(0);
  console.log("Columns detection (empty select):", healthError ? "Error" : "Success");
}

checkSchema();
