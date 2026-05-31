import React from 'react';

/** UserManagement.jsx — Quản lý người dùng (Admin) */
const UserManagement = () => {
  const [users] = React.useState([
    { id: 1, name: 'Nguyễn Văn An', phone: '0901234567', role: 'customer', status: 'active' },
    { id: 2, name: 'Trần Thị Bình', phone: '0902345678', role: 'customer', status: 'active' },
    { id: 3, name: 'Lê Văn Cường', phone: '0903456789', role: 'driver', status: 'active' },
  ]);

  const roleColor = { customer: '#1a73e8', driver: '#34A853', admin: '#EA4335' };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👥 Quản lý người dùng</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.th}>
            {['ID', 'Họ tên', 'SĐT', 'Vai trò', 'Trạng thái', 'Thao tác'].map(h => (
              <th key={h} style={styles.thCell}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td style={styles.td}>{u.id}</td>
              <td style={styles.td}>{u.name}</td>
              <td style={styles.td}>{u.phone}</td>
              <td style={styles.td}>
                <span style={{ ...styles.badge, background: roleColor[u.role] }}>{u.role}</span>
              </td>
              <td style={styles.td}>{u.status}</td>
              <td style={styles.td}>
                <button style={styles.lockBtn}>🔒 Khóa tài khoản</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: { padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, color: '#1a1a2e' },
  table: { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
  th: { background: '#1a1a2e', color: '#fff' },
  thCell: { padding: '12px 16px', textAlign: 'left' },
  td: { padding: '12px 16px', borderBottom: '1px solid #f0f0f0' },
  badge: { padding: '4px 10px', borderRadius: 20, color: '#fff', fontSize: 12, fontWeight: 600 },
  lockBtn: { background: '#EA4335', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', cursor: 'pointer' },
};

export default UserManagement;
