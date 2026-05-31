import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

/** ProfileScreen.jsx — Quản lý hồ sơ cá nhân (Use Case 4.2.3) */
const ProfileScreen = ({ navigation }) => {
  const [user] = React.useState({
    name: 'Nguyễn Văn An',
    phone: '0901234567',
    email: 'customer@gmail.com',
    totalTrips: 24,
    memberSince: '05/2026',
  });

  const menuItems = [
    { icon: '📜', label: 'Lịch sử chuyến đi', onPress: () => {} },
    { icon: '💳', label: 'Phương thức thanh toán', onPress: () => {} },
    { icon: '🔔', label: 'Thông báo', onPress: () => {} },
    { icon: '❓', label: 'Hỗ trợ khách hàng', onPress: () => {} },
    { icon: '🔒', label: 'Đổi mật khẩu', onPress: () => {} },
    { icon: '🚪', label: 'Đăng xuất', onPress: () => Alert.alert('Đăng xuất', 'Bạn có chắc muốn đăng xuất?') },
  ];

  return (
    <View style={styles.container}>
      {/* Header profile */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.phone}>{user.phone}</Text>
        <Text style={styles.stats}>🚗 {user.totalTrips} chuyến đi · Thành viên từ {user.memberSince}</Text>
      </View>

      {/* Menu items */}
      <View style={styles.menu}>
        {menuItems.map((item, i) => (
          <TouchableOpacity key={i} style={styles.menuItem} onPress={item.onPress}>
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  header: { backgroundColor: '#1a73e8', padding: 32, alignItems: 'center', paddingTop: 60 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { fontSize: 36, color: '#fff', fontWeight: 'bold' },
  name: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  phone: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  stats: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 8 },
  menu: { backgroundColor: '#fff', margin: 16, borderRadius: 16, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  menuIcon: { fontSize: 20, marginRight: 14 },
  menuLabel: { flex: 1, fontSize: 15, color: '#333' },
  chevron: { fontSize: 22, color: '#ccc' },
});

export default ProfileScreen;
