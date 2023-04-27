CREATE TABLE roles (
id SERIAL NOT NULL,
role_name VARCHAR(255),
permission VARCHAR(255),

PRIMARY KEY (id)
);

CREATE TABLE users (
id SERIAL NOT NULL,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
phone_no VARCHAR(255) NOT NULL,
created_on TIMESTAMP DEFAULT NOW(),
role_id INT,

FOREIGN KEY (role_id) REFERENCES roles(id),

craft_id INT,

FOREIGN KEY (craft_id) REFERENCES crafts(id),
is_deleted SMALLINT DEFAULT 0,

PRIMARY KEY (id)
);

CREATE TABLE crafts (
id SERIAL NOT NULL,
name VARCHAR(255),

PRIMARY KEY (id)
);

CREATE TABLE posts (
id SERIAL NOT NULL,
title VARCHAR(255),
description text,
pricing INT,
created_on TIMESTAMP DEFAULT NOW(),

user_id INT,

FOREIGN KEY (user_id) REFERENCES users(id),

PRIMARY KEY (id)
);

CREATE TABLE orders (
id SERIAL NOT NULL,

schedule_date date,

order_desc VARCHAR(255),

requester_user_id INT NOT NULL REFERENCES users(id),

receiver_user_id INT NOT NULL REFERENCES users(id),

state_id INT,

FOREIGN KEY (state_id) REFERENCES state(id),

PRIMARY KEY (id)
);

CREATE TABLE state(

id SERIAL NOT NULL,

state_desc VARCHAR(255),

PRIMARY KEY (id)

);

CREATE TABLE comments (
id SERIAL NOT NULL,
description text,
requester_user_id INT NOT NULL REFERENCES users(id),
created_on TIMESTAMP DEFAULT NOW(),

PRIMARY KEY (id)
);

CREATE TABLE notifications (
id SERIAL NOT NULL,

description VARCHAR(255),

status VARCHAR(255),

receiver_user_id INT NOT NULL REFERENCES users(id),

order_id INT,

FOREIGN KEY (order_id) REFERENCES orders(id),

PRIMARY KEY (id)
);

‌

CREATE TABLE reviews (
id SERIAL NOT NULL,

rate INT,
requester_user_id INT NOT NULL REFERENCES users(id),

receiver_user_id INT NOT NULL REFERENCES users(id),

order_id INT,

FOREIGN KEY (order_id) REFERENCES orders(id),

PRIMARY KEY (id)
);