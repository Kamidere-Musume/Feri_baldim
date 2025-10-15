-- db.sql
CREATE DATABASE IF NOT EXISTS feri_baldim CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE feri_baldim;

-- categories
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  icon VARCHAR(16),
  gradient_from VARCHAR(64),
  gradient_to VARCHAR(64),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- products
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  image_url VARCHAR(255),
  tags VARCHAR(255),
  status VARCHAR(60) DEFAULT NULL,   -- e.g., "Just Launched"
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- seed categories (Gas, Electric, Vintage, Standard)
INSERT INTO categories (name, description, image_url, icon, gradient_from, gradient_to) VALUES
('Gas', 'Classic butane lighters with reliable flame.', '/uploads/cat-gas.jpg', '🔥','from-blue-500','to-cyan-400'),
('Electric', 'Rechargeable plasma arc lighters.', '/uploads/cat-electric.jpg', '⚡','from-purple-500','to-pink-400'),
('Vintage', 'Retro and antique-style lighters.', '/uploads/cat-vintage.jpg', '🕰️','from-amber-600','to-orange-500'),
('Standard', 'Essential lighters with timeless design and durable build.', '/uploads/cat-standard.jpg', '⭐','from-green-600','to-emerald-500');

-- sample products (assign real image paths under /uploads)
INSERT INTO products (category_id, name, description, price, image_url, tags, status) VALUES
(1, 'Butane Pro Classic', 'Reliable single-flame butane lighter.', 999.00, '/uploads/p1.jpg', 'GAS,PRO', 'Just Launched'),
(1, 'WindGuard Jet', 'Windproof jet flame for outdoor use.', 1299.00, '/uploads/p2.jpg', 'GAS,OUTDOOR', 'Latest'),
(2, 'Plasma Arc Duo', 'Dual arc USB rechargeable lighter.', 1599.00, '/uploads/p3.jpg', 'ELECTRIC,USB', 'Limited'),
(2, 'NeoSpark USB', 'Slim electric lighter with safety lock.', 1399.00, '/uploads/p4.jpg', 'ELECTRIC,SLIM', 'Latest'),
(3, 'Retro Brass 1955', 'Vintage-styled brass finish.', 1999.00, '/uploads/p5.jpg', 'VINTAGE,BRASS', 'Exclusive'),
(4, 'Everyday Standard', 'Durable lighter for daily carry.', 799.00, '/uploads/p6.jpg', 'STANDARD,DAILY', 'Bestseller');



select * from products; 