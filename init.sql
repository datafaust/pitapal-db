CREATE DATABASE pitapaldb;
USE pitapaldb;
SET SQL_SAFE_UPDATES = 0;

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;


CREATE TABLE carts (
  id int PRIMARY KEY AUTO_INCREMENT,
  lat float,
  lon float,
  address varchar(255),
  status boolean,
  city_id int
);

CREATE TABLE city (
  id int PRIMARY KEY,
  city_name varchar(255),
  zip_code int
);

CREATE TABLE customer (
  id int PRIMARY KEY,
  customer_name varchar(255),
  city_id int,
  phone varchar(255),
  email varchar(255),
  time_joined timestamp
);

CREATE TABLE menu_item (
  id int PRIMARY KEY,
  item_name varchar(255),
  category_id int,
  offer_id int,
  description text,
  ingredients text,
  price decimal(12,2),
  active boolean
);

CREATE TABLE category (
  id int PRIMARY KEY,
  category_name varchar(255)
);

CREATE TABLE condiments (
  id int PRIMARY KEY,
  condiment_name varchar(255),
  include boolean,
  price decimal(12,2)
);

CREATE TABLE in_offer (
  id int PRIMARY KEY,
  offer_id int,
  menu_item_id int
);

CREATE TABLE offer (
  id int PRIMARY KEY,
  datetime_active_from timestamp,
  datetime_active_to timestamp,
  offer_price decimal(12,2)
);

CREATE TABLE placed_orders (
  id int PRIMARY KEY,
  restaurant_id int,
  order_time datetime,
  customer_id int,
  price decimal(12,2),
  discount decimal(12,2),
  final_price decimal(12,2),
  comment text,
  ts timestamp
);

CREATE TABLE comment (
  id int PRIMARY KEY,
  placed_order_id int,
  comment_text text,
  ts timestamp
);

CREATE TABLE in_order (
  id int PRIMARY KEY,
  placed_order_id int,
  offer_id int,
  menu_item_id int,
  quantity int,
  item_price int,
  price decimal(12,2),
  comment text
);

CREATE TABLE order_status (
  id int PRIMARY KEY,
  placed_order_id int,
  status_catalogue_id int,
  ts timestamp
);

CREATE TABLE status_catalogue (
  id int,
  status_nam varchar(255)
);

CREATE TABLE pending_menu_item (
  id int PRIMARY KEY,
  item_name varchar(255),
  category_id int,
  offer_id int,
  description text,
  ingredients text,
  price decimal(12,2),
  active boolean
);

CREATE TABLE pending_condiments (
  id int PRIMARY KEY,
  condiment_name varchar(255),
  include boolean,
  price decimal(12,2)
);
