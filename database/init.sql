CREATE DATABASE pitapaldb;
USE pitapaldb;
SET SQL_SAFE_UPDATES = 0;

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;


CREATE TABLE city (
  id int PRIMARY KEY,
  city_name varchar(255),
  zip_code int
);

INSERT INTO city(id,city_name,zip_code)
VALUES (1, 'New York', 11368),
       (2, 'Philadelphia', 02278);

CREATE TABLE customer (
  id int PRIMARY KEY,
  customer_name varchar(255),
  city_id int,
  phone varchar(255),
  email varchar(255),
  time_joined timestamp,
  cart_name varchar(255),
  cart_address varchar(255),
  category varchar(255)
);

INSERT INTO customer (id,customer_name,city_id,phone,email,time_joined,cart_name,cart_address, category)
VALUES (1234, 'John Smith', 1, '646-639-3360', 'joselopez@gmail.com', '2020-11-01 11:01','', '110-23', 'customer'),
       (1347, 'Adel Marouk', 1, '347-908-0987', 'adelCart@gmail.com', '2019-10-07 12:01','Adels Halal Cart','134-87', 'cart'),
       (1001, 'Mamoud Hassan', 1, '245-098-0989', 'mhalal@gmail.com', '2019-09-04 13:01','Mamoud Halal Cart','12-87', 'cart');


CREATE VIEW carts AS 
SELECT
id,
cart_name as cart_name,
'43.0000' as lat,
'-74.0000' AS lon,
cart_address as address,
1 as status,
city_id as city_id
FROM
customer
WHERE category = 'cart';

CREATE TABLE menu_item_stg (
  id int PRIMARY KEY,
  item_name varchar(255),
  category_id int,
  offer_id int,
  description text,
  ingredients text,
  price decimal(12,2),
  active boolean
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
