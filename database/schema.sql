-- =============================================
-- SCHEMA.SQL — Ride-Hailing Connect (Nhóm 12)
-- Version: 0.9 | MySQL 8+
-- =============================================

CREATE DATABASE IF NOT EXISTS ride_hailing CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ride_hailing;

-- =============================================
-- BẢNG NGƯỜI DÙNG
-- =============================================
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

-- =============================================
-- BẢNG TÀI XẾ (mở rộng từ users)
-- =============================================
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

-- =============================================
-- BẢNG ĐẶT XE / CHUYẾN ĐI
-- =============================================
CREATE TABLE IF NOT EXISTS bookings (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id     BIGINT UNSIGNED NOT NULL,
    driver_id       BIGINT UNSIGNED,
    vehicle_type    ENUM('motorbike', 'car_4', 'car_7', 'delivery') NOT NULL,
    pickup_address  VARCHAR(500) NOT NULL,
    pickup_lat      DECIMAL(10, 8) NOT NULL,
    pickup_lng      DECIMAL(11, 8) NOT NULL,
    dropoff_address VARCHAR(500) NOT NULL,
    dropoff_lat     DECIMAL(10, 8) NOT NULL,
    dropoff_lng     DECIMAL(11, 8) NOT NULL,
    distance_km     DECIMAL(8, 2),
    estimated_price DECIMAL(12, 2),
    final_price     DECIMAL(12, 2),
    status          ENUM('pending', 'driver_assigned', 'picked_up', 'in_progress', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
    cancel_reason   VARCHAR(500),
    pickup_at       DATETIME,
    completed_at    DATETIME,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id),
    FOREIGN KEY (driver_id)   REFERENCES drivers(id)
);

-- =============================================
-- BẢNG THANH TOÁN
-- =============================================
CREATE TABLE IF NOT EXISTS payments (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    booking_id      BIGINT UNSIGNED NOT NULL UNIQUE,
    amount          DECIMAL(12, 2) NOT NULL,
    method          ENUM('cash', 'momo', 'vnpay', 'card') NOT NULL,
    status          ENUM('pending', 'success', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
    transaction_id  VARCHAR(100),
    gateway_ref     VARCHAR(200),
    paid_at         DATETIME,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- =============================================
-- BẢNG ĐÁNH GIÁ
-- =============================================
CREATE TABLE IF NOT EXISTS reviews (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    booking_id  BIGINT UNSIGNED NOT NULL UNIQUE,
    reviewer_id BIGINT UNSIGNED NOT NULL,
    reviewee_id BIGINT UNSIGNED NOT NULL,
    rating      TINYINT UNSIGNED NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment     TEXT,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id)  REFERENCES bookings(id),
    FOREIGN KEY (reviewer_id) REFERENCES users(id),
    FOREIGN KEY (reviewee_id) REFERENCES users(id)
);

-- =============================================
-- BẢNG OTP (xác thực đăng ký/đăng nhập)
-- =============================================
CREATE TABLE IF NOT EXISTS otp_codes (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    phone       VARCHAR(15) NOT NULL,
    code        CHAR(6) NOT NULL,
    expires_at  DATETIME NOT NULL,
    used        BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_phone_code (phone, code)
);

-- =============================================
-- BẢNG THÔNG BÁO
-- =============================================
CREATE TABLE IF NOT EXISTS notifications (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT UNSIGNED NOT NULL,
    title       VARCHAR(200) NOT NULL,
    body        TEXT NOT NULL,
    type        ENUM('booking', 'payment', 'system', 'promotion') NOT NULL,
    is_read     BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
