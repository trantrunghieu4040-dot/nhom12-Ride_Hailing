# BẢN KẾ HOẠCH KIỂM THỬ (TEST PLAN)
# Hệ Thống Quản Lý Dịch Vụ Đặt Xe Trực Tuyến — Nhóm 12

**Ngày:** 21-05-2026 | **Version:** 1.0
**Người lập:** Trần Trung Hiếu (Nhóm 12)

---

## 1. Mục tiêu kiểm thử

Đảm bảo hệ thống vận hành đúng theo yêu cầu chức năng và phi chức năng đã được đặc tả trong tài liệu "BẢN ĐẶC TẢ DỮ LIỆU DỰ ÁN", đặc biệt các luồng chính:

- Đăng ký / Đăng nhập (xác thực OTP)
- Đặt xe trực tuyến (Customer → Driver)
- Thanh toán đa phương thức (Tiền mặt, MoMo, VNPay)
- Đánh giá và phản hồi (1–5 sao)
- Quản lý chuyến xe (Tài xế)
- Phê duyệt hồ sơ và Quản lý người dùng (Admin)

---

## 2. Phạm vi kiểm thử

| Loại | Mô tả |
|------|-------|
| Chức năng chính | Đăng ký, đăng nhập, đặt xe, thanh toán, đánh giá |
| Vai trò người dùng | Khách hàng (Customer), Tài xế (Driver), Quản trị viên (Admin) |
| Tích hợp bên thứ ba | Google Maps API, Cổng thanh toán (MoMo/VNPay) |
| Phi chức năng | Hiệu năng (10.000 user đồng thời, phản hồi < 3s), bảo mật (OTP, RBAC, mã hóa), tương thích (Android 14+, iOS 15+, Chrome, Safari) |

---

## 3. Chiến lược kiểm thử

| Loại kiểm thử | Mục tiêu | Công cụ |
|---------------|----------|---------|
| Unit Test | Kiểm tra logic xác thực OTP, tính cước, cập nhật trạng thái chuyến xe | JUnit 5, Mockito, JaCoCo |
| Integration Test | Đảm bảo kết nối ổn định với Google Maps, cổng thanh toán, database | Postman, Newman |
| System Test | Kiểm tra luồng đặt xe hoàn chỉnh từ Customer đến Driver | Selenium WebDriver, Appium |
| UI/UX Test | Giao diện thân thiện, thao tác trực quan, responsive | Detox |
| Performance Test | Chịu tải 10.000 người dùng đồng thời, phản hồi tối đa 3 giây | JMeter, k6 |
| Security Test | Xác thực OTP, phân quyền RBAC, mã hóa dữ liệu thanh toán | OWASP ZAP |

---

## 4. Môi trường kiểm thử

| Thành phần | Chi tiết |
|------------|----------|
| Thiết bị di động | Android 14+, iOS 15+ |
| Trình duyệt web | Google Chrome, Safari (phiên bản mới nhất) |
| Công cụ kiểm thử | Postman, JMeter, Selenium, JUnit/TestNG |
| Cơ sở dữ liệu | SQL 8+ |
| Hệ thống backend | Node.js / Java Spring Boot |

---

## 5. Lịch trình kiểm thử

| Tuần | Hoạt động |
|------|-----------|
| Tuần 1–2 | Unit Test + Integration Test |
| Tuần 3–4 | System Test + Performance Test |
| Tuần 5 | Security Test + UAT |

---

## 6. Test Case #1 — WHITEBOX

**Luồng kiểm tra:** Đặt xe – Kiểm tra logic cập nhật trạng thái chuyến đi

| Thành phần | Mô tả |
|------------|-------|
| Mục tiêu | Kiểm tra luồng trạng thái: `PENDING → DRIVER_ASSIGNED → PICKED_UP → COMPLETED` |
| Kỹ thuật | Whitebox – Branch Coverage |
| Điều kiện đầu | Customer đã đăng nhập, có tài xế online trong bán kính 2km |
| Đầu vào | `POST /ride/confirm` với `{"pickup": "10 Trần Hưng Đạo", "dropoff": "123 Lê Lợi", "vehicle_type": "car_4"}` |

### Các bước thực hiện:
1. Gọi API đặt xe → Kiểm tra `status = PENDING`
2. Hệ thống gán tài xế → `status = DRIVER_ASSIGNED`
3. Tài xế xác nhận đã đón → `status = PICKED_UP`
4. Tài xế xác nhận kết thúc → `status = COMPLETED`

### Kiểm tra các nhánh (Branches):

| Nhánh | Mô tả | Kết quả mong đợi |
|-------|-------|------------------|
| Nhánh 1 | Thành công - có tài xế | Chuyển đúng trình tự 4 trạng thái |
| Nhánh 2 | Không tìm thấy tài xế | Hiển thị "Hiện tại các tài xế đều đang bận" |
| Nhánh 3 | Khách hàng hủy trước khi tài xế nhận | Chuyển sang `CANCELLED`, không tính phí |

### Kết quả mong đợi:
- ✅ Trạng thái chuyến đi chuyển đổi đúng trình tự
- ✅ Database ghi nhận đúng timestamp mỗi bước
- ✅ Log hệ thống ghi lại đầy đủ sự kiện

**Công cụ:** JUnit 5, Mockito, JaCoCo

---

## 7. Test Case #2 — BLACKBOX

**Luồng kiểm tra:** Đặt xe thành công từ Customer đến Driver (End-to-End)

| Thành phần | Mô tả |
|------------|-------|
| Mục tiêu | Kiểm tra toàn bộ luồng đặt xe từ giao diện người dùng |
| Kỹ thuật | Blackbox – Functional Testing |
| Điều kiện đầu | Customer đã đăng nhập, bật GPS, có tài xế online |

### Dữ liệu đầu vào:
- **Điểm đón:** 10 Trần Hưng Đạo, Quận 1, TP.HCM
- **Điểm đến:** 123 Lê Lợi, Quận 3, TP.HCM
- **Loại xe:** Ô tô 4 chỗ (Economy)
- **Thanh toán:** Tiền mặt

### Các bước thực hiện:

| Bước | Hành động | Kết quả mong đợi |
|------|-----------|------------------|
| 1 | Mở ứng dụng, vào màn hình đặt xe | Hiển thị bản đồ với vị trí hiện tại |
| 2 | Nhập điểm đón và điểm đến | Hệ thống gợi ý địa điểm chính xác |
| 3 | Chọn loại xe "Ô tô 4 chỗ" | Hiển thị giá cước ước tính (45.000đ – 55.000đ) |
| 4 | Bấm "Đặt xe" | Tìm tài xế trong < 10 giây |
| 5 | Hiển thị thông tin tài xế | Hiển thị tên, biển số xe, vị trí trên bản đồ |
| 6 | Tài xế cập nhật "Đã đón khách" | Hiển thị "Đã đón khách – Đang di chuyển" |
| 7 | Tài xế cập nhật "Hoàn thành" | Hiển thị màn hình đánh giá (1–5 sao + nhận xét) |

### Kiểm thử ngoại lệ:

| Tình huống | Thao tác | Kết quả mong đợi |
|------------|----------|------------------|
| Nhập điểm đến không hợp lệ | Nhập "abcxyz" | Hiển thị "Không tìm thấy địa điểm" |
| Chưa bật GPS | Mở màn hình đặt xe | Hiển thị "Vui lòng bật định vị GPS" |
| Hủy chuyến trước khi tài xế nhận | Bấm "Hủy chuyến" trong 30 giây | Hủy thành công, không tính phí |

### Kết quả mong đợi tổng thể:
- ✅ Hiển thị giá cước ước tính chính xác trước khi đặt
- ✅ Tìm được tài xế trong thời gian < 10 giây
- ✅ Trạng thái chuyến đi thay đổi đúng theo thực tế
- ✅ Sau khi hoàn thành, hiển thị màn hình đánh giá
- ✅ Lịch sử chuyến đi được lưu lại

**Công cụ:** Selenium WebDriver, Appium, Postman

---

## 8. Tổng kết

| Hạng mục | Trạng thái | Ghi chú |
|----------|------------|---------|
| Test Plan | ✅ Hoàn thành | Ngày 21/05/2026 |
| Test Case Whitebox | ✅ Hoàn thành | Luồng cập nhật trạng thái |
| Test Case Blackbox | ✅ Hoàn thành | Luồng đặt xe E2E |
| Chuẩn bị môi trường test | ⏳ Chưa thực hiện | Cần setup trước tuần 1 |
