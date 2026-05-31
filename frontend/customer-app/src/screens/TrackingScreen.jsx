import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

/** TrackingScreen — Theo dõi tài xế realtime qua WebSocket + Google Maps */
const TrackingScreen = ({ route }) => {
  const { pickup, dropoff } = route?.params || {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đang tìm tài xế...</Text>
      <ActivityIndicator size="large" color="#1a73e8" />
      <Text style={styles.info}>Từ: {pickup}</Text>
      <Text style={styles.info}>Đến: {dropoff}</Text>
      {/* TODO: Tích hợp Google Maps + Socket.io để hiển thị vị trí tài xế realtime */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  info: { fontSize: 16, color: '#666', marginTop: 8 },
});

export default TrackingScreen;
