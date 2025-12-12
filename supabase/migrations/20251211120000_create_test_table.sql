create table if not exists test_verification (
  id uuid primary key default gen_random_uuid(),
  name text,
  created_at timestamp with time zone default now()
);

-- Enable RLS (Supabase best practice, though we use service_role)
alter table test_verification enable row level security;
