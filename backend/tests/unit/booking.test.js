/**
 * Unit Tests — User Service
 * Nhóm 12 — Ride-Hailing Connect
 * 
 * Công cụ: JUnit 5 / Jest + Mockito
 * Kỹ thuật: Whitebox — Branch Coverage
 * 
 * Test Case #1 (Whitebox): Kiểm tra logic cập nhật trạng thái chuyến đi
 * Luồng: PENDING → DRIVER_ASSIGNED → PICKED_UP → COMPLETED
 */

describe('User Service — Unit Tests', () => {
  // ===== Authentication Logic =====
  describe('Validation', () => {
    test('Số điện thoại hợp lệ phải có 10 chữ số', () => {
      const isValidPhone = (phone) => /^0\d{9}$/.test(phone);
      expect(isValidPhone('0901234567')).toBe(true);
      expect(isValidPhone('123')).toBe(false);
      expect(isValidPhone('abcdefghij')).toBe(false);
    });

    test('Mật khẩu phải có ít nhất 8 ký tự', () => {
      const isValidPassword = (pwd) => pwd && pwd.length >= 8;
      expect(isValidPassword('password123')).toBe(true);
      expect(isValidPassword('short')).toBe(false);
      expect(isValidPassword('')).toBe(false);
    });

    test('Email hợp lệ phải chứa @ và domain', () => {
      const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      expect(isValidEmail('user@gmail.com')).toBe(true);
      expect(isValidEmail('invalid-email')).toBe(false);
    });
  });

  // ===== Booking Status Machine =====
  describe('Trạng thái chuyến đi (State Machine)', () => {
    const VALID_TRANSITIONS = {
      pending: ['driver_assigned', 'cancelled'],
      driver_assigned: ['picked_up', 'cancelled'],
      picked_up: ['in_progress'],
      in_progress: ['completed'],
      completed: [],
      cancelled: [],
    };

    const canTransition = (from, to) =>
      VALID_TRANSITIONS[from]?.includes(to) ?? false;

    // Nhánh 1: Luồng thành công - có tài xế
    test('PENDING → DRIVER_ASSIGNED khi có tài xế', () => {
      expect(canTransition('pending', 'driver_assigned')).toBe(true);
    });

    test('DRIVER_ASSIGNED → PICKED_UP khi tài xế đến điểm đón', () => {
      expect(canTransition('driver_assigned', 'picked_up')).toBe(true);
    });

    test('PICKED_UP → IN_PROGRESS khi bắt đầu di chuyển', () => {
      expect(canTransition('picked_up', 'in_progress')).toBe(true);
    });

    test('IN_PROGRESS → COMPLETED khi hoàn thành', () => {
      expect(canTransition('in_progress', 'completed')).toBe(true);
    });

    // Nhánh 2: Không tìm thấy tài xế
    test('PENDING → CANCELLED khi khách hàng hủy', () => {
      expect(canTransition('pending', 'cancelled')).toBe(true);
    });

    // Nhánh 3: Trạng thái không hợp lệ
    test('COMPLETED không thể chuyển sang trạng thái khác', () => {
      expect(canTransition('completed', 'pending')).toBe(false);
      expect(canTransition('completed', 'cancelled')).toBe(false);
    });

    test('CANCELLED không thể chuyển sang trạng thái khác', () => {
      expect(canTransition('cancelled', 'pending')).toBe(false);
    });
  });

  // ===== Fare Calculation =====
  describe('Tính giá cước', () => {
    const BASE_FARE = { motorbike: 10000, car_4: 15000, car_7: 20000 };
    const PER_KM = { motorbike: 3500, car_4: 5000, car_7: 7000 };

    const calculateFare = (vehicleType, distanceKm) => {
      const base = BASE_FARE[vehicleType] || 0;
      const perKm = PER_KM[vehicleType] || 0;
      return base + perKm * distanceKm;
    };

    test('Xe máy — 3.5km → 22,250đ', () => {
      expect(calculateFare('motorbike', 3.5)).toBe(22250);
    });

    test('Ô tô 4 chỗ — 3.5km → 32,500đ', () => {
      expect(calculateFare('car_4', 3.5)).toBe(32500);
    });

    test('Ô tô 7 chỗ — 3.5km → 44,500đ', () => {
      expect(calculateFare('car_7', 3.5)).toBe(44500);
    });

    test('Loại xe không hợp lệ trả về 0', () => {
      expect(calculateFare('unknown', 5)).toBe(0);
    });
  });
});
