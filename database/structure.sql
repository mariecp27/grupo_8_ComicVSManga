DROP DATABASE IF EXISTS cvm_db;
CREATE DATABASE cvm_db;
USE cvm_db;

DROP TABLE IF EXISTS users_types;
CREATE TABLE users_types (
	user_type_id INT AUTO_INCREMENT NOT NULL,
	user_type VARCHAR(15) NOT NULL,
	PRIMARY KEY (user_type_id)
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
	user_id INT AUTO_INCREMENT NOT NULL,
	user VARCHAR(10) NOT NULL,
	name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(100) NOT NULL,
	image VARCHAR(50) NOT NULL DEFAULT 'default.png',
	user_type_id INT NOT NULL,
	PRIMARY KEY (user_id),
	FOREIGN KEY (user_type_id) REFERENCES users_types(user_type_id)
);

DROP TABLE IF EXISTS formats;
CREATE TABLE formats (
	format_id INT AUTO_INCREMENT NOT NULL,
	format VARCHAR(25) NOT NULL,
	PRIMARY KEY (format_id)
);

DROP TABLE IF EXISTS products;
CREATE TABLE products  (
	product_id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	description TEXT NOT NULL,
	image VARCHAR(50) NOT NULL,
    author VARCHAR(100) NOT NULL,
	format_id INT NOT NULL, 
	pages INT NOT NULL,
	price INT NOT NULL,
	featured TINYINT NOT NULL,
	on_sale TINYINT NOT NULL,
	discount DECIMAL(5,2) NOT NULL, 
	stock INT NOT NULL,
	PRIMARY KEY (product_id),
	FOREIGN KEY (format_id) REFERENCES formats(format_id)
);

DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
	category_id INT NOT NULL AUTO_INCREMENT,
	category VARCHAR(25) NOT NULL,
	PRIMARY KEY (category_id)
);

DROP TABLE IF EXISTS products_categories;
CREATE TABLE products_categories (
	product_category_id INT NOT NULL AUTO_INCREMENT,
	product_id INT NOT NULL,
	category_id INT NOT NULL,
	PRIMARY KEY (product_category_id),
	FOREIGN KEY (product_id) REFERENCES products(product_id),
	FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

DROP TABLE IF EXISTS shopping_cart;
CREATE TABLE shopping_cart (
	shopping_cart_id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	total DECIMAL(10,2) NOT NULL,
	PRIMARY KEY (shopping_cart_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id)
);

DROP TABLE IF EXISTS products_shopping_cart;
CREATE TABLE products_shopping_cart (
	product_category_id INT NOT NULL AUTO_INCREMENT,
	shopping_cart_id INT NOT NULL,
	product_id INT NOT NULL,
	amount INT NOT NULL,
	product_total DECIMAL(10,2) NOT NULL,
	PRIMARY KEY( product_category_id),
	FOREIGN KEY (shopping_cart_id) REFERENCES shopping_cart(shopping_cart_id),
	FOREIGN KEY (product_id) REFERENCES products (product_id)
);
