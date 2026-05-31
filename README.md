# 🚗 Ride-Hailing Connect — Nhóm 12

> **Hệ thống quản lý dịch vụ đặt xe trực tuyến** kết nối khách hàng với tài xế, hỗ trợ đặt xe, thanh toán và quản trị hệ thống.

**Version:** 0.9 | **Ngày:** 28-05-2026

---

## 👥 Thành viên Nhóm 12

| Họ tên | Vai trò / Phụ trách |
|--------|---------------------|
| Trần Trung Hiếu | Nhóm trưởng — Mục 1.3, 4.7, 4.8, 5.1.1, 5.1.2 |
| Đỗ Cao Hải Đăng | Mục 1.1, 4.4 |
| Hàng Minh Thức | Mục 2, 4.6, 5.1.3, 5.1.4 |
| Trần Nguyễn Anh Huy | Mục 1.2, 4.1 |
| Nguyễn Tấn Minh Khôi | Nhóm trưởng — Mục 1.4, 4.3, 4.5, 5.2 |
| Lại Minh Thông | Mục 3.1, 3.2, 4.2, 5.3 |

---

## 📋 Tổng quan dự án

Nền tảng công nghệ kết nối trực tiếp khách hàng có nhu cầu di chuyển với đội ngũ tài xế chuyên nghiệp. Hệ thống gồm:

- **Ứng dụng khách hàng** (Customer App): Đặt xe, theo dõi tài xế realtime, thanh toán, đánh giá
- **Ứng dụng tài xế** (Driver App): Nhận chuyến, dẫn đường GPS, thống kê thu nhập
- **Dashboard quản trị** (Admin Web): Phê duyệt hồ sơ tài xế, quản lý người dùng, báo cáo doanh thu

### Loại xe hỗ trợ
| Loại | Mô tả |
|------|-------|
| 🏍️ Xe máy (Ride-Motor) | Di chuyển nhanh trong đô thị |
| 🚗 Ô tô 4 chỗ (Economy) | Cá nhân / nhóm nhỏ 3-4 người |
| 🚙 Ô tô 7 chỗ (Premium/Family) | Gia đình hoặc nhóm đông người |
| 📦 Giao hàng (Delivery) | Vận chuyển hàng hóa, bưu phẩm |

---

## 🛠 Công nghệ sử dụng

| Layer | Công nghệ |
|-------|-----------|
| Backend | Node.js + Express.js / Java Spring Boot |
| Mobile App | React Native (Android 14+, iOS 15+) |
| Admin Web | React.js |
| Database | MySQL 8+ / PostgreSQL 15 |
| Realtime | WebSocket (Socket.io) — theo dõi GPS |
| Payment | MoMo, VNPay, Tiền mặt |
| Maps | Google Maps API |
| Notification | Firebase Cloud Messaging (FCM), SMS OTP |
| Cache | Redis |
| AI Chatbot | OpenAI API |
| CI/CD | GitHub Actions |
| Deploy | Docker + Docker Compose |

---

## 📁 Cấu trúc dự án

```
ride-hailing-connect/
├── docs/                    # Tài liệu đặc tả (v0.9)
│   ├── BanDacTa_v0.9.docx
│   ├── TestPlan_v1.0.md
│   ├── ERD.png
│   ├── deployment-diagram.png
│   └── figma-link.md
├── backend/                 # 7 Microservices (Node.js)
│   └── src/services/
│       ├── user-service/        # Đăng ký, đăng nhập, xác thực OTP
│       ├── booking-service/     # Đặt xe, quản lý trạng thái chuyến
│       ├── payment-service/     # MoMo, VNPay, tiền mặt
│       ├── location-service/    # WebSocket GPS realtime
│       ├── notification-service/# FCM push, SMS OTP
│       ├── review-service/      # Đánh giá 1–5 sao
│       └── chat-service/        # AI Chatbox
├── frontend/
│   ├── customer-app/        # App React Native cho khách hàng
│   ├── driver-app/          # App React Native cho tài xế
│   └── admin-web/           # Dashboard quản trị viên
├── database/                # Schema SQL & migrations
└── .github/                 # CI/CD GitHub Actions
```

---

## 🚀 Khởi động nhanh

```bash
# 1. Clone repo
git clone https://github.com/trantrunghieu4040-dot/nhom12-Ride_Hailing.git
cd nhom12-Ride_Hailing/ride-hailing-connect

# 2. Copy file cấu hình
cp .env.example .env
# Điền các API key vào file .env

# 3. Khởi động toàn bộ stack với Docker
docker-compose up -d

# 4. Kiểm tra các service
curl http://localhost:3001/health  # user-service
curl http://localhost:3002/health  # booking-service
```

---

## 🔐 Phân quyền (RBAC)

| Vai trò | Quyền hạn |
|---------|-----------|
| **Khách hàng** | Đặt xe, thanh toán, đánh giá, quản lý hồ sơ |
| **Tài xế** | Nhận chuyến, cập nhật trạng thái, xem thu nhập |
| **Quản trị viên** | Phê duyệt tài xế, quản lý người dùng, điều chỉnh giá cước |

---

## 📄 Tài liệu

- [📖 Bản Đặc Tả v0.9](docs/BanDacTa_v0.9.docx)
- [🧪 Test Plan v1.0](docs/TestPlan_v1.0.md)
- [🗄️ ERD Diagram](docs/ERD.png)
- [🏗️ Deployment Diagram](docs/deployment-diagram.png)
- [🎨 Figma Prototype](docs/figma-link.md)

---

## 📊 Yêu cầu phi chức năng chính

- **Hiệu suất:** Phản hồi < 3 giây, xử lý ≥ 10.000 user đồng thời
- **Uptime:** 99.99% / năm (≤ 52 phút 35 giây downtime)
- **Bảo mật:** RBAC, mã hóa dữ liệu, xác thực OTP, penetration testing
- **Tương thích:** Android 14+, iOS 15+, Google Chrome (mới nhất)
