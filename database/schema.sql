CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  phone VARCHAR(15) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
    booking_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    booking_type VARCHAR(20) NOT NULL,  -- tour / visit / seva / parking
    name VARCHAR(100) NOT NULL,
    booking_date DATE NOT NULL,
    persons INT NOT NULL CHECK (persons > 0),
    status VARCHAR(20) DEFAULT 'pending',  -- pending / confirmed / cancelled
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



ALTER TABLE bookings
ADD COLUMN user_id INT;

create table products (
  product_id uuid primary key default gen_random_uuid(),
  product_name varchar(255) not null,
  description text,
  price numeric(10,2) not null,
  stock int default 0,
  image varchar(500),
  status varchar(20) default 'Active',
  created_at timestamp default now()
);

create type order_status as enum (
  'Processing',
  'Shipping',
  'Delivered'
);

create table orders (
  order_id uuid primary key default gen_random_uuid(),

  user_id int not null references users(user_id) on delete cascade,
  product_id int not null references products(product_id) on delete cascade,

  customer_name text not null,
  product_name jsonb not null,
  total numeric not null,

  date timestamp default now(),
  status order_status default 'Processing'
);

create table events (
  event_id uuid primary key default gen_random_uuid(),
  image varchar(500) not null,
  date date not null,
  time time not null,
  title varchar(255) not null,
  description text not null,
);

create table donors (
  donor_id uuid primary key default gen_random_uuid(),

  user_id int not null references users(user_id) on delete cascade,

  amount numeric(10,2) not null,
  methods varchar(50) not null,

  date timestamp default now()
);

create table admins (
  admin_id uuid primary key default gen_random_uuid(),
  email varchar(255) unique not null,
  password varchar(255) not null,
  role varchar(20) default 'admin'
);

alter table users
add constraint users_role_only_user
check (role = 'user');

ALTER TABLE admin
ADD CONSTRAINT admin_role_only_admin
CHECK (role = 'admin');

CREATE TABLE tour_guide (
    guide_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    photo VARCHAR(255),
    bio TEXT,
    languages VARCHAR(200),
    rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
    status VARCHAR(20) DEFAULT 'available' 
        CHECK (status IN ('available','not_available'))
);

CREATE TABLE event_participant (
    participant_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL,
    user_id INT NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(15),
    registration_date TIMESTAMP DEFAULT now(),
    status VARCHAR(20) DEFAULT 'registered',

    FOREIGN KEY (event_id) REFERENCES events(event_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE crowd (
    crowd_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visit_date DATE UNIQUE NOT NULL,
    total_people INT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT now()
);