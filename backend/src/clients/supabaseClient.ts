let client: any | null = null;

export async function getSupabaseClient(): Promise<any | null> {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;

  if (!url || !serviceKey) {
    console.warn('[Supabase] SUPABASE_URL ou SUPABASE_SERVICE_KEY não configurados. Integração desabilitada.');
    return null;
  }

  const supabaseModule = await import('@supabase/supabase-js');
  const createClient = supabaseModule.createClient;

  client = createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
  return client;
}