-- Migration 002: Tạo bảng Bookings (Chuyến đi)
-- Trạng thái: pending → driver_assigned → picked_up → in_progress → completed | cancelled

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
    FOREIGN KEY (driver_id)   REFERENCES drivers(id),
    INDEX idx_customer (customer_id),
    INDEX idx_driver   (driver_id),
    INDEX idx_status   (status)
);
