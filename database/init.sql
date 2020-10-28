CREATE DATABASE pitapaldb;
USE pitapaldb;
SET SQL_SAFE_UPDATES = 0;

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;


CREATE TABLE city (
  id int,
  city_name varchar(255),
  zip_code int
);

INSERT INTO city (id, city_name, zip_code)
VALUES
(1,'New York', 11368),
(1,'New York', 11106),
(2,'Philadelphia',11456),
(2,'Philadelphia',11457),
(3,'Boston',11256),
(3,'Boston',11389);

CREATE TABLE customer (
  id varchar(255) PRIMARY KEY,
  customer_name varchar(255),
  city_id int,
  phone varchar(255),
  email varchar(255),
  time_joined timestamp
);

INSERT INTO customer(id,customer_name,city_id,phone,email,time_joined)
VALUES
('12345678', 'John Smith', 1, '7189786524', 'jsmith@gmail.com', '2020-10-01 22:00:00'),
('12345679', 'Allam Fromberg', 1, '6469786578', 'aberg@gmail.com', '2020-10-04 13:00:00');

CREATE TABLE carts (
  id varchar(255) PRIMARY KEY,
  customer_id varchar(255),
  cart_name varchar(255),
  lat float,
  lon float,
  cart_address varchar(255),
  active boolean,
  city_id int
)

INSERT INTO carts(id,customer_id,cart_name,lat,lon,cart_address,active,city_id)
VALUES
('12345678-1','12345678', 'Rafiqquis Halal', '43.0000', '-73.0000', '23-55 Broadway Street', '1',1),
('12345678-2','12345678', 'Rafiqquis Halal', '43.1212', '-73.2431', '57-34 Main Street', '1',1),
('12345679-1','12345679', 'Adels Halal', '43.0987', '-73.0987', '110-32 Munch Street', '1',1);;


CREATE TABLE menu_item (
  id int PRIMARY KEY,
  customer_id varchar(255),
  cart_id int,
  item_name varchar(255),
  category_id int,
  offer_id int,
  cart_description text,
  condiments Json,
  price decimal(12,2),
  active boolean
);

INSERT INTO menu_item(id,customer_id,cart_id,item_name,category_id,offer_id,cart_description,condiments,price,active)
VALUES
('12345678-1-1','12345678','12345678-1','Chicken Over Rice',1,1,'Halal cart offering multiple halal meals','[{ id: 1, value: "white sauce", isChecked: false },{ id: 2, value: "red sauce", isChecked: true },{ id: 3, value: "green sauce", isChecked: false },{ id: 3, value: "salad", isChecked: false }]',6,1),
('12345678-1-2','12345678','12345678-1','Lamb Over Rice',1,1,'Halal cart offering multiple halal meals','[{ id: 1, value: "white sauce", isChecked: false },{ id: 2, value: "red sauce", isChecked: false },{ id: 3, value: "green sauce", isChecked: true },{ id: 3, value: "salad", isChecked: false }]',6,1),
('12345679-1-1','12345679','12345679-1','Combo Over Rice',1,1,'Halal cart offering multiple halal meals','[{ id: 1, value: "white sauce", isChecked: false },{ id: 2, value: "red sauce", isChecked: false },{ id: 3, value: "green sauce", isChecked: true },{ id: 3, value: "salad", isChecked: true }]',7,1);


CREATE TABLE in_offer (
  id int PRIMARY KEY,
  offer_id int,
  menu_item_id int
);

INSERT INTO in_offer(id,offer_id,menu_item_id)
VALUES
(12345,1,'12345678-1-1'),
(12346,2,'12345678-1-2');

CREATE TABLE offer (
  id int PRIMARY KEY,
  datetime_active_from timestamp,
  datetime_active_to timestamp,
  offer_price decimal(12,2)
);

INSERT INTO offer(id,datetime_active_from,datetime_active_to,offer_price)
VALUES
(1,'2020-10-15-01 00:00', '2020-12-21-01 00:00',4),
(2,'2020-09-15-01 00:00', '2020-11-21-01 00:00',3);

CREATE TABLE placed_orders (
  id int PRIMARY KEY,
  cart_id int,
  order_time datetime,
  customer_id int,
  menu_item_id int,
  condiments json,
  price decimal(12,2),
  discount decimal(12,2),
  final_price decimal(12,2),
  comment text,
  order_datetime timestamp
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
  condiments json,
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
