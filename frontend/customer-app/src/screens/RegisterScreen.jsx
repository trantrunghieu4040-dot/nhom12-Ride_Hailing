import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [form, setForm] = React.useState({ name: '', phone: '', email: '', password: '' });

  const handleRegister = async () => {
    // TODO: Gọi API register từ user-service
    Alert.alert('Thông báo', 'Đăng ký thành công! Vui lòng xác thực OTP.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tạo tài khoản</Text>
      {['name', 'phone', 'email', 'password'].map((field) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={field === 'name' ? 'Họ tên' : field === 'phone' ? 'Số điện thoại' : field === 'email' ? 'Email' : 'Mật khẩu'}
          value={form[field]}
          onChangeText={(v) => setForm({ ...form, [field]: v })}
          secureTextEntry={field === 'password'}
        />
      ))}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 24, color: '#1a73e8', textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 14, marginBottom: 14, fontSize: 16 },
  button: { backgroundColor: '#1a73e8', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default RegisterScreen;
