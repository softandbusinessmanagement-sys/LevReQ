-- Migración inicial para el sistema de levantamiento de información
-- Ejecutar esta migración en tu proyecto Supabase

-- Tabla de administradores
create table public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;

-- Tabla principal de levantamientos
create table public.levantamientos (
  id uuid primary key default gen_random_uuid(),
  empresa text not null,
  proyecto text not null default '',
  share_token text not null unique default replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', ''),
  data jsonb not null default '{}'::jsonb,
  pend jsonb not null default '{}'::jsonb,
  meta jsonb not null default '{}'::jsonb,
  progreso int not null default 0,
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.levantamientos enable row level security;
create index levantamientos_updated_idx on public.levantamientos (updated_at desc);

-- Función para verificar si es admin
create or replace function public.lev_is_admin() returns boolean language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.admins where user_id = auth.uid()) $$;

-- Función para validar token de acceso
create or replace function public.lev_token_ok(p_token text) returns boolean language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.levantamientos where share_token = p_token) $$;

-- Función para reclamar rol de admin (primera cuenta)
create or replace function public.lev_claim_admin() returns boolean language plpgsql security definer set search_path = ''
as $$
begin
  if auth.uid() is null then return false; end if;
  if not exists (select 1 from public.admins) then insert into public.admins (user_id) values (auth.uid()); end if;
  return exists (select 1 from public.admins where user_id = auth.uid());
end $$;

-- Función para obtener datos de un levantamiento
create or replace function public.lev_get(p_token text) returns jsonb language sql stable security definer set search_path = ''
as $$ select to_jsonb(t) from (select id, empresa, proyecto, data, pend, meta, progreso, updated_at from public.levantamientos where share_token = p_token) t $$;

-- Función para guardar datos de un levantamiento
create or replace function public.lev_save(p_token text, p_data jsonb, p_pend jsonb, p_meta jsonb, p_progreso int)
returns timestamptz language plpgsql security definer set search_path = ''
as $$
declare r timestamptz;
begin
  update public.levantamientos set
    data = coalesce(p_data, '{}'::jsonb), 
    pend = coalesce(p_pend, '{}'::jsonb), 
    meta = coalesce(p_meta, '{}'::jsonb),
    progreso = coalesce(p_progreso, 0),
    empresa = coalesce(nullif(trim(p_data->>'empresa'), ''), empresa),
    proyecto = coalesce(nullif(trim(p_data->>'proyecto'), ''), proyecto),
    updated_at = now()
  where share_token = p_token returning updated_at into r;
  return r;
end $$;

-- Permisos para funciones
revoke all on function public.lev_claim_admin() from public, anon;
grant execute on function public.lev_claim_admin() to authenticated;

-- Políticas de seguridad para levantamientos
create policy "admins gestionan levantamientos" on public.levantamientos for all to authenticated
  using (public.lev_is_admin()) with check (public.lev_is_admin());

-- Bucket para almacenamiento de archivos
insert into storage.buckets (id, name, public, file_size_limit)
values ('levantamiento-files', 'levantamiento-files', false, 26214400) on conflict (id) do nothing;

-- Políticas de seguridad para archivos
create policy "lev files select" on storage.objects for select to anon, authenticated
  using (bucket_id = 'levantamiento-files' and (public.lev_is_admin() or public.lev_token_ok((storage.foldername(name))[1])));

create policy "lev files insert" on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'levantamiento-files' and (public.lev_is_admin() or public.lev_token_ok((storage.foldername(name))[1])));

create policy "lev files delete" on storage.objects for delete to anon, authenticated
  using (bucket_id = 'levantamiento-files' and (public.lev_is_admin() or public.lev_token_ok((storage.foldername(name))[1])));
