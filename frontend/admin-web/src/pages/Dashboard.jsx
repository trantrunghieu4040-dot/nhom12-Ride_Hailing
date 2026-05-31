import React from 'react';

/** Dashboard.jsx — Trang tổng quan Admin */
const Dashboard = () => {
  const stats = [
    { label: 'Tổng chuyến xe', value: '1,234', icon: '🚗', color: '#1a73e8' },
    { label: 'Doanh thu hôm nay', value: '12.5M đ', icon: '💰', color: '#34A853' },
    { label: 'Tài xế đang hoạt động', value: '89', icon: '🧑‍💼', color: '#FBBC04' },
    { label: 'Khách hàng mới', value: '47', icon: '👥', color: '#EA4335' },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📊 Dashboard Quản trị viên</h1>
      <div style={styles.grid}>
        {stats.map((s, i) => (
          <div key={i} style={{ ...styles.card, borderTop: `4px solid ${s.color}` }}>
            <span style={styles.icon}>{s.icon}</span>
            <p style={styles.value}>{s.value}</p>
            <p style={styles.label}>{s.label}</p>
          </div>
        ))}
      </div>
      {/* TODO: Tích hợp biểu đồ doanh thu theo ngày/tuần/tháng */}
    </div>
  );
};

const styles = {
  container: { padding: 24, backgroundColor: '#f5f7fa', minHeight: '100vh' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, color: '#1a1a2e' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 10px rgba(0,0,0,0.08)', textAlign: 'center' },
  icon: { fontSize: 36 },
  value: { fontSize: 28, fontWeight: 'bold', margin: '8px 0 4px', color: '#1a1a2e' },
  label: { fontSize: 14, color: '#666', margin: 0 },
};

export default Dashboard;
