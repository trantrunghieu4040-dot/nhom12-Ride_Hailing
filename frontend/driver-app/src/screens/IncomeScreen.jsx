import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * IncomeScreen.jsx — Thống kê thu nhập tài xế
 * Use Case 4.2.7: Thống kê thu nhập (Driver)
 * Hiển thị tổng doanh thu theo ngày/tuần/tháng
 */
const IncomeScreen = () => {
  const [period, setPeriod] = React.useState('today');

  const data = {
    today:  { total: '285,000đ', trips: 6, cash: '150,000đ', momo: '135,000đ' },
    week:   { total: '1,450,000đ', trips: 32, cash: '800,000đ', momo: '650,000đ' },
    month:  { total: '6,200,000đ', trips: 128, cash: '3,500,000đ', momo: '2,700,000đ' },
  };

  const d = data[period];
  const tabs = [
    { key: 'today', label: 'Hôm nay' },
    { key: 'week',  label: 'Tuần này' },
    { key: 'month', label: 'Tháng này' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💰 Thống kê thu nhập</Text>

      {/* Tab chọn kỳ */}
      <View style={styles.tabs}>
        {tabs.map(t => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tab, period === t.key && styles.activeTab]}
            onPress={() => setPeriod(t.key)}
          >
            <Text style={[styles.tabText, period === t.key && styles.activeTabText]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tổng thu nhập */}
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Tổng thu nhập</Text>
        <Text style={styles.totalValue}>{d.total}</Text>
        <Text style={styles.tripsCount}>{d.trips} chuyến đi</Text>
      </View>

      {/* Chi tiết theo phương thức */}
      <View style={styles.detail}>
        <Text style={styles.detailTitle}>Chi tiết theo phương thức</Text>
        <Row icon="💵" label="Tiền mặt" value={d.cash} />
        <Row icon="💜" label="MoMo" value={d.momo} />
      </View>
    </View>
  );
};

const Row = ({ icon, label, value }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }}>
    <Text style={{ fontSize: 15 }}>{icon} {label}</Text>
    <Text style={{ fontWeight: '600', fontSize: 15 }}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#1a1a2e' },
  tabs: { flexDirection: 'row', backgroundColor: '#e8edf2', borderRadius: 10, padding: 4, marginBottom: 20 },
  tab: { flex: 1, padding: 10, borderRadius: 8, alignItems: 'center' },
  activeTab: { backgroundColor: '#fff', elevation: 2 },
  tabText: { color: '#666', fontWeight: '500' },
  activeTabText: { color: '#1a73e8', fontWeight: '700' },
  totalCard: { backgroundColor: '#1a73e8', borderRadius: 16, padding: 24, alignItems: 'center', marginBottom: 20 },
  totalLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  totalValue: { color: '#fff', fontSize: 36, fontWeight: 'bold', marginVertical: 4 },
  tripsCount: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  detail: { backgroundColor: '#fff', borderRadius: 16, padding: 20 },
  detailTitle: { fontWeight: '700', fontSize: 16, marginBottom: 12, color: '#1a1a2e' },
});

export default IncomeScreen;
