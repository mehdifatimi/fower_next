-- Enable Extensions
create extension if not exists "uuid-ossp";

-- 1. Profiles (Linked to auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  phone text,
  address text,
  updated_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);

-- 2. Categories
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name_ar text not null,
  name_fr text not null,
  description_ar text,
  description_fr text,
  image_url text,
  slug text unique not null,
  created_at timestamp with time zone default now()
);

alter table public.categories enable row level security;

create policy "Categories are viewable by everyone" on public.categories
  for select using (true);

-- 3. Flowers (Products)
create table public.flowers (
  id uuid default uuid_generate_v4() primary key,
  name_ar text not null,
  name_fr text not null,
  description_ar text,
  description_fr text,
  price decimal(10,2) not null,
  category_id uuid references public.categories(id) on delete set null,
  stock integer default 0,
  featured boolean default false,
  images jsonb default '{"s": null, "m": null, "xl": null}'::jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.flowers enable row level security;

create policy "Flowers are viewable by everyone" on public.flowers
  for select using (true);

-- 4. Orders
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete set null,
  total_amount decimal(10,2) not null,
  status text not null default 'pending', -- pending, processing, delivered, cancelled
  delivery_address text,
  phone text,
  notes text,
  created_at timestamp with time zone default now()
);

alter table public.orders enable row level security;

create policy "Users can view their own orders" on public.orders
  for select using (auth.uid() = user_id);

create policy "Users can create their own orders" on public.orders
  for insert with check (auth.uid() = user_id);

-- 5. Order Items
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade,
  flower_id uuid references public.flowers(id) on delete set null,
  quantity integer not null default 1,
  price decimal(10,2) not null, -- snapshot of price at purchase
  size text not null default 'M' -- S, M, XL
);

alter table public.order_items enable row level security;

create policy "Users can view their own order items" on public.order_items
  for select using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- 6. Messages (Contact Form)
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text,
  message text not null,
  status text default 'unread', -- unread, read
  created_at timestamp with time zone default now()
);

alter table public.messages enable row level security;

create policy "Anyone can send a message" on public.messages
  for insert with check (true);

create policy "Only admins can view messages" on public.messages
  for select using (
    -- Simple admin check (can be improved with roles table)
    auth.jwt() ->> 'email' = 'admin@ataralward.com'
  );
