CREATE DATABASE IF NOT EXISTS last_bite_db;
USE last_bite_db;

CREATE TABLE IF NOT EXISTS ngos (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    area VARCHAR(255),
    emoji VARCHAR(10),
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    greenStars DECIMAL(3, 1) DEFAULT 0,
    meals INT DEFAULT 0,
    score INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS food_items (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ngo_name VARCHAR(255),
    ngo_id VARCHAR(50),
    emoji VARCHAR(10),
    qty INT DEFAULT 1,
    originalPrice DECIMAL(10, 2),
    category VARCHAR(50),
    expiryHours INT,
    entryTime BIGINT,
    status VARCHAR(50),
    discount INT DEFAULT 0,
    area VARCHAR(255),
    FOREIGN KEY (ngo_id) REFERENCES ngos(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY,
    food_id VARCHAR(50),
    item_name VARCHAR(255),
    ngo_name VARCHAR(255),
    price DECIMAL(10, 2),
    otp VARCHAR(10),
    status VARCHAR(50),
    time BIGINT,
    FOREIGN KEY (food_id) REFERENCES food_items(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS alerts (
    id VARCHAR(50) PRIMARY KEY,
    item_name VARCHAR(255),
    ngo_name VARCHAR(255),
    qty INT,
    area VARCHAR(255),
    time BIGINT,
    status VARCHAR(50),
    emoji VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS crops (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255),
    farmer VARCHAR(255),
    qty INT,
    price DECIMAL(10, 2),
    area VARCHAR(255),
    time BIGINT,
    status VARCHAR(50)
);
