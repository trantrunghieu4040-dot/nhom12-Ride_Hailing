-- Migration 003: Tạo bảng Payments (Thanh toán)
-- Hỗ trợ: tiền mặt (cash), MoMo, VNPay, thẻ ngân hàng (card)

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
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    INDEX idx_booking  (booking_id),
    INDEX idx_status   (status),
    INDEX idx_method   (method)
);
