import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

/**
 * BookingScreen — Màn hình đặt xe
 * Cho phép khách hàng chọn điểm đón, điểm trả và loại xe
 */
const BookingScreen = ({ navigation }) => {
  const [pickup, setPickup] = React.useState('');
  const [dropoff, setDropoff] = React.useState('');

  const handleBooking = () => {
    if (!pickup || !dropoff) {
      Alert.alert('Lỗi', 'Vui lòng nhập điểm đón và điểm trả');
      return;
    }
    navigation.navigate('Tracking', { pickup, dropoff });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đặt xe</Text>
      <TextInput style={styles.input} placeholder="📍 Điểm đón" value={pickup} onChangeText={setPickup} />
      <TextInput style={styles.input} placeholder="🏁 Điểm trả" value={dropoff} onChangeText={setDropoff} />
      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Tìm tài xế</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, color: '#333' },
  input: { backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 16, fontSize: 16, elevation: 2 },
  button: { backgroundColor: '#34A853', padding: 16, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default BookingScreen;
