-- Migration 001: Tạo bảng Users
-- Ngày: 28-05-2026

CREATE TABLE IF NOT EXISTS users (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    phone       VARCHAR(15) NOT NULL UNIQUE,
    email       VARCHAR(100) UNIQUE,
    full_name   VARCHAR(100) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    role        ENUM('customer', 'driver', 'admin') NOT NULL DEFAULT 'customer',
    avatar_url  VARCHAR(500),
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng Drivers (profile tài xế)
CREATE TABLE IF NOT EXISTS drivers (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT UNSIGNED NOT NULL UNIQUE,
    license_number  VARCHAR(20) NOT NULL,
    vehicle_type    ENUM('motorbike', 'car_4', 'car_7', 'delivery') NOT NULL,
    vehicle_plate   VARCHAR(15) NOT NULL,
    vehicle_model   VARCHAR(100),
    status          ENUM('pending', 'approved', 'rejected', 'suspended') NOT NULL DEFAULT 'pending',
    online_status   ENUM('online', 'offline', 'busy') NOT NULL DEFAULT 'offline',
    current_lat     DECIMAL(10, 8),
    current_lng     DECIMAL(11, 8),
    avg_rating      DECIMAL(3, 2) DEFAULT 5.00,
    total_trips     INT UNSIGNED DEFAULT 0,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- OTP codes
CREATE TABLE IF NOT EXISTS otp_codes (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    phone       VARCHAR(15) NOT NULL,
    code        CHAR(6) NOT NULL,
    expires_at  DATETIME NOT NULL,
    used        BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_phone_code (phone, code)
);
