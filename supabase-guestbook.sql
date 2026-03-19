create table if not exists public.guestbook (
  id uuid default gen_random_uuid() primary key,
  message text not null,
  name text,
  email text,
  created_at timestamptz default now() not null
);

alter table public.guestbook enable row level security;

create policy "Allow anonymous insert"
  on public.guestbook for insert
  with check (true);

create policy "Allow anonymous select"
  on public.guestbook for select
  using (true);
