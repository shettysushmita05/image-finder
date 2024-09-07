// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://saxfrmruyqylyyqlhnhg.supabase.co";
// const supabaseKey = import.meta.env.VITE_SUPABASE_API;
// export const supabase = createClient(supabaseUrl, supabaseKey);


// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// export const supabase = createClient(supabaseUrl, supabaseKey);

// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://fsqwguytlwkryamqwhgw.supabase.co";
// const supabaseKey = import.meta.env.VITE_SUPABASE_API;
// export const supabase = createClient(supabaseUrl, supabaseKey);





import { createClient } from "@supabase/supabase-js";

// Correctly use the environment variable for Supabase key
const supabaseUrl = "https://fsqwguytlwkryamqwhgw.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseKey) {
  console.error("Supabase key is missing!");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
