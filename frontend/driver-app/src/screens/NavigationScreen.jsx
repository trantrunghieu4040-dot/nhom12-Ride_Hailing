import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * NavigationScreen.jsx — Màn hình dẫn đường cho tài xế
 * Use Case 4.2.6 - Bước 4: Định vị và Dẫn đường
 */
const NavigationScreen = ({ route, navigation }) => {
  const trip = route?.params?.trip || {};
  const [tripStatus, setTripStatus] = React.useState('heading_to_pickup');

  const statusLabels = {
    heading_to_pickup: '🚗 Đang đến điểm đón...',
    picked_up: '👤 Đã đón khách — Đang di chuyển',
    completed: '✅ Chuyến đi hoàn thành!',
  };

  const nextAction = {
    heading_to_pickup: { label: '✅ Đã đón khách', next: 'picked_up' },
    picked_up: { label: '🏁 Hoàn thành chuyến', next: 'completed' },
  };

  const handleNext = () => {
    const action = nextAction[tripStatus];
    if (action) setTripStatus(action.next);
    if (action?.next === 'completed') {
      navigation.navigate('Income');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{statusLabels[tripStatus]}</Text>
      <View style={styles.info}>
        <Text style={styles.label}>📍 Điểm đón: <Text style={styles.value}>{trip.pickup || 'N/A'}</Text></Text>
        <Text style={styles.label}>🏁 Điểm trả: <Text style={styles.value}>{trip.dropoff || 'N/A'}</Text></Text>
      </View>
      {/* TODO: Tích hợp Google Maps SDK để hiển thị bản đồ dẫn đường */}
      <View style={styles.mapPlaceholder}>
        <Text style={{ color: '#999', fontSize: 16 }}>🗺️ Bản đồ Google Maps</Text>
        <Text style={{ color: '#ccc', fontSize: 12 }}>Tích hợp Google Maps SDK</Text>
      </View>
      {nextAction[tripStatus] && (
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>{nextAction[tripStatus].label}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa', padding: 20 },
  status: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, color: '#1a1a2e' },
  info: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, elevation: 2 },
  label: { fontSize: 14, color: '#333', marginVertical: 4 },
  value: { fontWeight: '600', color: '#1a73e8' },
  mapPlaceholder: { flex: 1, backgroundColor: '#e8f0fe', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  button: { backgroundColor: '#1a73e8', padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default NavigationScreen;
