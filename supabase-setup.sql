create table if not exists public.scriptorium (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  key text not null,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);

alter table public.scriptorium enable row level security;

create policy "own rows only" on public.scriptorium
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
