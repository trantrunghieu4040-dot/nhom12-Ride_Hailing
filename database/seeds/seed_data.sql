-- Seeds: Dữ liệu mẫu để test
-- Nhóm 12 — Ride-Hailing Connect

USE ride_hailing;

-- Admin account (password: Admin@123 — bcrypt hash)
INSERT INTO users (phone, email, full_name, password, role) VALUES
('0900000001', 'admin@ridehailing.vn', 'Admin Hệ Thống', '$2b$10$exampleHashForAdmin', 'admin');

-- Khách hàng mẫu
INSERT INTO users (phone, email, full_name, password, role) VALUES
('0901234567', 'customer1@gmail.com', 'Nguyễn Văn An', '$2b$10$exampleHashForCustomer1', 'customer'),
('0902345678', 'customer2@gmail.com', 'Trần Thị Bình', '$2b$10$exampleHashForCustomer2', 'customer');

-- Tài xế mẫu
INSERT INTO users (phone, email, full_name, password, role) VALUES
('0903456789', 'driver1@gmail.com', 'Lê Văn Cường', '$2b$10$exampleHashForDriver1', 'driver'),
('0904567890', 'driver2@gmail.com', 'Phạm Minh Đức', '$2b$10$exampleHashForDriver2', 'driver');

-- Profile tài xế
INSERT INTO drivers (user_id, license_number, vehicle_type, vehicle_plate, vehicle_model, status, online_status, current_lat, current_lng) VALUES
(4, 'B2-123456', 'car_4', '51A-12345', 'Toyota Vios 2022', 'approved', 'online', 10.7769, 106.7009),
(5, 'A1-789012', 'motorbike', '59B2-67890', 'Honda Wave Alpha', 'approved', 'online', 10.7800, 106.6950);

-- Chuyến đi mẫu (đã hoàn thành)
INSERT INTO bookings (customer_id, driver_id, vehicle_type, pickup_address, pickup_lat, pickup_lng,
    dropoff_address, dropoff_lat, dropoff_lng, distance_km, estimated_price, final_price, status, completed_at)
VALUES
(2, 1, 'car_4', '10 Trần Hưng Đạo, Quận 1, TP.HCM', 10.7769, 106.7009,
    '123 Lê Lợi, Quận 3, TP.HCM', 10.7800, 106.6950, 3.5, 45000, 47000, 'completed', NOW());

-- Đánh giá mẫu
INSERT INTO reviews (booking_id, reviewer_id, reviewee_id, rating, comment)
VALUES (1, 2, 4, 5, 'Tài xế lịch sự, xe sạch sẽ, đúng giờ. Rất hài lòng!');

-- Thanh toán mẫu
INSERT INTO payments (booking_id, amount, method, status, paid_at)
VALUES (1, 47000, 'cash', 'success', NOW());
