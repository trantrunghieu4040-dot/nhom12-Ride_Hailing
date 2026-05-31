import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/** PaymentScreen — Thanh toán: MoMo, VNPay, tiền mặt */
const PaymentScreen = ({ navigation }) => {
  const methods = [
    { id: 'momo', label: '💜 MoMo', color: '#A50064' },
    { id: 'vnpay', label: '🔵 VNPay', color: '#0066CC' },
    { id: 'cash', label: '💵 Tiền mặt', color: '#34A853' },
  ];

  const handlePay = (method) => {
    // TODO: Tích hợp payment-service
    navigation.navigate('Review');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn phương thức thanh toán</Text>
      {methods.map((m) => (
        <TouchableOpacity key={m.id} style={[styles.method, { borderColor: m.color }]} onPress={() => handlePay(m.id)}>
          <Text style={[styles.methodText, { color: m.color }]}>{m.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 24 },
  method: { borderWidth: 2, borderRadius: 12, padding: 18, marginBottom: 14 },
  methodText: { fontSize: 18, fontWeight: '600', textAlign: 'center' },
});

export default PaymentScreen;
