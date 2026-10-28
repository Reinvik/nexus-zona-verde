const { createClient } = require('@supabase/supabase-js');

const mainUrl = 'https://iuzpgljjfeobxlptmsma.supabase.co';
const mainKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1enBnbGpqZmVvYnhscHRtc21hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njc2Njc0MCwiZXhwIjoyMDgyMzQyNzQwfQ.HoelddG65nqo7fqJE1xFvYfmu0kCu2yNq6Zr3itlZiw';

const prodUrl = 'https://qtzpzgwyjptbnipvyjdu.supabase.co';
const prodKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0enB6Z3d5anB0Ym5pcHZ5amR1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTg0NjgwMCwiZXhwIjoyMDgxNDIyODAwfQ.AD7tPZ7sjZqs10SxR3fvcnkBxu1rTH-MWcDKDKcHTuk';

const clientMain = createClient(mainUrl, mainKey, { auth: { autoRefreshToken: false, persistSession: false } });
const clientProd = createClient(prodUrl, prodKey, { auth: { autoRefreshToken: false, persistSession: false } });

async function createAccounts() {
  const users = [
    { email: 'mariana.vega@cial.cl', name: 'Mariana Vega', role: 'prevencion' },
    { email: 'ext.fernando.albornoz@cial.cl', name: 'Fernando Albornoz', role: 'prevencion' }
  ];

  for (const u of users) {
    console.log('--- Processing:', u.email, '---');
    for (const [name, client] of [['MAIN', clientMain], ['PROD', clientProd]]) {
      const { data: listData } = await client.auth.admin.listUsers({ perPage: 1000 });
      const existing = listData?.users?.find(x => x.email?.toLowerCase() === u.email.toLowerCase());
      if (existing) {
        console.log(`[${name}] User exists (${existing.id}). Updating password and metadata...`);
        const { error: updErr } = await client.auth.admin.updateUserById(existing.id, {
          password: 'Cial2026',
          email_confirm: true,
          user_metadata: { full_name: u.name, role: u.role, area: 'Prevención de Riesgos SSO' }
        });
        if (updErr) console.error(`[${name}] Error updating:`, updErr.message);
        else console.log(`[${name}] Password updated to Cial2026 successfully.`);
      } else {
        console.log(`[${name}] Creating user...`);
        const { data: createData, error: createErr } = await client.auth.admin.createUser({
          email: u.email,
          password: 'Cial2026',
          email_confirm: true,
          user_metadata: { full_name: u.name, role: u.role, area: 'Prevención de Riesgos SSO' }
        });
        if (createErr) console.error(`[${name}] Error creating:`, createErr.message);
        else console.log(`[${name}] Created user successfully with id:`, createData.user?.id);
      }

      // Also ensure profile in public.profiles if exists
      try {
        await client.from('profiles').upsert({
          email: u.email,
          full_name: u.name,
          role: 'prevencion',
          updated_at: new Date().toISOString()
        }, { onConflict: 'email' });
        console.log(`[${name}] Profile upserted in public.profiles.`);
      } catch (profErr) {
        console.warn(`[${name}] Could not upsert public.profiles:`, profErr.message);
      }
    }
  }
}

createAccounts().catch(console.error);
