-- Migration 004: Tạo bảng Reviews (Đánh giá 1–5 sao)
-- Khách hàng đánh giá tài xế và ngược lại sau mỗi chuyến đi

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
    FOREIGN KEY (reviewee_id) REFERENCES users(id),
    INDEX idx_reviewee (reviewee_id),
    INDEX idx_booking  (booking_id)
);

-- Bảng Notifications (thông báo FCM/SMS)
CREATE TABLE IF NOT EXISTS notifications (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT UNSIGNED NOT NULL,
    title       VARCHAR(200) NOT NULL,
    body        TEXT NOT NULL,
    type        ENUM('booking', 'payment', 'system', 'promotion') NOT NULL,
    is_read     BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user_read (user_id, is_read)
);
