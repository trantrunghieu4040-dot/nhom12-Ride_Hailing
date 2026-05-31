import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

/**
 * TripReceiveScreen.jsx — Tài xế nhận/từ chối chuyến xe
 * Use Case 4.2.6: Tiếp nhận và Cập nhật chuyến xe (Driver)
 */
const TripReceiveScreen = ({ navigation }) => {
  const trip = {
    customer: 'Nguyễn Văn An',
    pickup: '10 Trần Hưng Đạo, Quận 1',
    dropoff: '123 Lê Lợi, Quận 3',
    distance: '3.5 km',
    estimated: '45,000đ',
    vehicleType: 'Ô tô 4 chỗ',
  };

  const handleAccept = () => {
    Alert.alert('✅ Đã nhận chuyến!', 'Đang dẫn đường đến điểm đón...');
    navigation.navigate('Navigation', { trip });
  };

  const handleReject = () => {
    Alert.alert('Từ chối', 'Bạn đã từ chối chuyến đi này.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔔 Có chuyến xe mới!</Text>
      <View style={styles.card}>
        <Row label="👤 Khách hàng" value={trip.customer} />
        <Row label="📍 Điểm đón" value={trip.pickup} />
        <Row label="🏁 Điểm trả" value={trip.dropoff} />
        <Row label="📏 Khoảng cách" value={trip.distance} />
        <Row label="💰 Giá cước" value={trip.estimated} />
        <Row label="🚗 Loại xe" value={trip.vehicleType} />
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.accept} onPress={handleAccept}>
          <Text style={styles.acceptText}>✅ Nhận chuyến</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reject} onPress={handleReject}>
          <Text style={styles.rejectText}>❌ Từ chối</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Row = ({ label, value }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6 }}>
    <Text style={{ color: '#666', fontSize: 14 }}>{label}</Text>
    <Text style={{ fontWeight: '600', fontSize: 14, maxWidth: '60%', textAlign: 'right' }}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f5f7fa' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#1a1a2e' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, elevation: 4, marginBottom: 24 },
  actions: { flexDirection: 'row', gap: 12 },
  accept: { flex: 1, backgroundColor: '#34A853', padding: 16, borderRadius: 12, alignItems: 'center' },
  acceptText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  reject: { flex: 1, borderWidth: 2, borderColor: '#EA4335', padding: 16, borderRadius: 12, alignItems: 'center' },
  rejectText: { color: '#EA4335', fontWeight: '700', fontSize: 16 },
});

export default TripReceiveScreen;
