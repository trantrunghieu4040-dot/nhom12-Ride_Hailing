import React from 'react';

/**
 * DriverApproval.jsx — Phê duyệt hồ sơ tài xế (Admin)
 * Use Case 4.2.8: Phê duyệt hồ sơ và Quản lý người dùng
 */
const DriverApproval = () => {
  const [drivers, setDrivers] = React.useState([
    { id: 1, name: 'Lê Văn Cường', phone: '0903456789', plate: '51A-12345', vehicle: 'Ô tô 4 chỗ', license: 'B2-123456', status: 'pending' },
    { id: 2, name: 'Phạm Minh Đức', phone: '0904567890', plate: '59B2-67890', vehicle: 'Xe máy', license: 'A1-789012', status: 'pending' },
  ]);

  const handleAction = (id, action) => {
    setDrivers(prev => prev.map(d =>
      d.id === id ? { ...d, status: action } : d
    ));
    // TODO: Gọi API admin để update trạng thái tài xế
  };

  const badge = { pending: '#FBBC04', approved: '#34A853', rejected: '#EA4335' };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🧑‍💼 Phê duyệt hồ sơ tài xế</h2>
      <p style={styles.sub}>Danh sách tài xế đang chờ xét duyệt</p>
      <table style={styles.table}>
        <thead>
          <tr style={styles.th}>
            {['Họ tên', 'SĐT', 'Biển số', 'Loại xe', 'Bằng lái', 'Trạng thái', 'Thao tác'].map(h => (
              <th key={h} style={styles.thCell}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {drivers.map(d => (
            <tr key={d.id} style={styles.row}>
              <td style={styles.td}>{d.name}</td>
              <td style={styles.td}>{d.phone}</td>
              <td style={styles.td}>{d.plate}</td>
              <td style={styles.td}>{d.vehicle}</td>
              <td style={styles.td}>{d.license}</td>
              <td style={styles.td}>
                <span style={{ ...styles.badge, background: badge[d.status] }}>{d.status}</span>
              </td>
              <td style={styles.td}>
                {d.status === 'pending' && (
                  <>
                    <button style={styles.approve} onClick={() => handleAction(d.id, 'approved')}>✅ Duyệt</button>
                    <button style={styles.reject} onClick={() => handleAction(d.id, 'rejected')}>❌ Từ chối</button>
                  </>
                )}
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
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a2e' },
  sub: { color: '#666', marginBottom: 24 },
  table: { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
  th: { background: '#1a1a2e', color: '#fff' },
  thCell: { padding: '12px 16px', textAlign: 'left', fontWeight: 600 },
  row: { borderBottom: '1px solid #f0f0f0' },
  td: { padding: '12px 16px' },
  badge: { padding: '4px 10px', borderRadius: 20, color: '#fff', fontSize: 12, fontWeight: 600 },
  approve: { background: '#34A853', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', cursor: 'pointer', marginRight: 8 },
  reject: { background: '#EA4335', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', cursor: 'pointer' },
};

export default DriverApproval;
