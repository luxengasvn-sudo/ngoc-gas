'use client';

import { useState, useEffect } from 'react';
import { Users, UserPlus, Shield, Key, Edit, Trash2, CheckCircle2, XCircle, AlertTriangle, Eye, EyeOff, Lock, RefreshCw } from 'lucide-react';

export default function AccountManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Notification Toast state
  const [toast, setToast] = useState(null);

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [showMyPassModal, setShowMyPassModal] = useState(false);
  
  const [selectedUser, setSelectedUser] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    display_name: '',
    role: 'editor'
  });

  const [editFormData, setEditFormData] = useState({
    display_name: '',
    role: 'editor',
    is_active: 1,
    new_password: ''
  });

  const [myPassData, setMyPassData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const getAuthHeader = () => {
    const token = localStorage.getItem('ngoc_gas_admin_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/users', { headers: getAuthHeader() });
      const data = await res.json();
      if (data.success) {
        setUsers(data.data || []);
      } else {
        showToast(data.message || 'Lỗi khi tải danh sách tài khoản', 'error');
      }
    } catch (e) {
      showToast('Lỗi kết nối máy chủ', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userStr = localStorage.getItem('ngoc_gas_admin_user');
    if (userStr) {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch (e) {}
    }
    fetchUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.display_name) {
      showToast('Vui lòng điền đầy đủ các trường thông tin', 'error');
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch('/api/auth/users', {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message || 'Tạo tài khoản thành công!');
        setShowAddModal(false);
        setFormData({ username: '', password: '', display_name: '', role: 'editor' });
        fetchUsers();
      } else {
        showToast(data.message || 'Lỗi khi tạo tài khoản', 'error');
      }
    } catch (e) {
      showToast('Lỗi kết nối máy chủ', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      setSubmitting(true);
      const res = await fetch(`/api/auth/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: getAuthHeader(),
        body: JSON.stringify(editFormData)
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message || 'Cập nhật tài khoản thành công!');
        setShowEditModal(false);
        fetchUsers();
      } else {
        showToast(data.message || 'Lỗi khi cập nhật tài khoản', 'error');
      }
    } catch (e) {
      showToast('Lỗi kết nối máy chủ', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (user) => {
    if (user.username === 'admin') {
      showToast('Không thể khóa tài khoản Admin chính!', 'error');
      return;
    }
    const newStatus = user.is_active ? 0 : 1;
    const confirmMsg = newStatus === 0 
      ? `Bạn có chắc muốn KHÓA tài khoản "${user.username}"?` 
      : `Bạn có muốn MỞ KHÓA tài khoản "${user.username}"?`;
    
    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await fetch(`/api/auth/users/${user.id}`, {
        method: 'PUT',
        headers: getAuthHeader(),
        body: JSON.stringify({ is_active: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        showToast(newStatus ? 'Đã kích hoạt tài khoản' : 'Đã khóa tài khoản thành công');
        fetchUsers();
      } else {
        showToast(data.message || 'Lỗi khi thay đổi trạng thái', 'error');
      }
    } catch (e) {
      showToast('Lỗi kết nối máy chủ', 'error');
    }
  };

  const handleDeleteUser = async (user) => {
    if (user.username === 'admin') {
      showToast('Không thể xóa tài khoản Admin chính!', 'error');
      return;
    }
    if (currentUser && currentUser.id === user.id) {
      showToast('Bạn không thể tự xóa tài khoản của chính mình!', 'error');
      return;
    }
    if (!window.confirm(`CẢNH BÁO: Bạn có chắc chắn muốn XÓA VĨNH VIỄN tài khoản "${user.username}"? Hành động này không thể hoàn tác.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/auth/users/${user.id}`, {
        method: 'DELETE',
        headers: getAuthHeader()
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message || 'Đã xóa tài khoản thành công');
        fetchUsers();
      } else {
        showToast(data.message || 'Lỗi khi xóa tài khoản', 'error');
      }
    } catch (e) {
      showToast('Lỗi kết nối máy chủ', 'error');
    }
  };

  const handleChangeMyPassword = async (e) => {
    e.preventDefault();
    if (myPassData.new_password !== myPassData.confirm_password) {
      showToast('Mật khẩu xác nhận không khớp!', 'error');
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({
          current_password: myPassData.current_password,
          new_password: myPassData.new_password
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message || 'Đổi mật khẩu thành công!');
        setShowMyPassModal(false);
        setMyPassData({ current_password: '', new_password: '', confirm_password: '' });
      } else {
        showToast(data.message || 'Lỗi khi đổi mật khẩu', 'error');
      }
    } catch (e) {
      showToast('Lỗi kết nối máy chủ', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditFormData({
      display_name: user.display_name,
      role: user.role || 'editor',
      is_active: user.is_active,
      new_password: ''
    });
    setShowEditModal(true);
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return <span className="role-badge role-admin">👑 Quản trị viên</span>;
      case 'editor':
        return <span className="role-badge role-editor">✍️ Biên tập viên</span>;
      case 'sales':
        return <span className="role-badge role-sales">📞 Nhân viên kinh doanh</span>;
      default:
        return <span className="role-badge role-editor">✍️ {role}</span>;
    }
  };

  return (
    <div className="account-page-container">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast-notification ${toast.type}`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Quản Lý Tài Khoản & Phân Quyền</h1>
          <p className="page-subtitle">Tạo tài khoản cho nhân viên và phân quyền truy cập theo từng bộ phận</p>
        </div>
        <div className="header-actions">
          <button onClick={() => setShowMyPassModal(true)} className="btn-secondary">
            <Key size={18} />
            Đổi mật khẩu của tôi
          </button>
          <button onClick={() => setShowAddModal(true)} className="btn-primary">
            <UserPlus size={18} />
            Thêm tài khoản mới
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="card table-card">
        <div className="table-header-bar">
          <div className="table-title">
            <Users size={20} className="icon-blue" />
            <span>Danh sách tài khoản ({users.length})</span>
          </div>
          <button onClick={fetchUsers} className="btn-icon-reload" title="Tải lại">
            <RefreshCw size={16} />
          </button>
        </div>

        {loading ? (
          <div className="table-loading">Đang tải danh sách tài khoản...</div>
        ) : (
          <div className="table-responsive">
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên đăng nhập</th>
                  <th>Tên hiển thị</th>
                  <th>Vai trò (Role)</th>
                  <th>Trạng thái</th>
                  <th>Ngày tạo</th>
                  <th style={{ textAlign: 'right' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className={!user.is_active ? 'row-disabled' : ''}>
                    <td>#{user.id}</td>
                    <td className="font-semibold">{user.username}</td>
                    <td>{user.display_name}</td>
                    <td>{getRoleBadge(user.role)}</td>
                    <td>
                      {user.is_active ? (
                        <span className="status-badge status-active">
                          <CheckCircle2 size={14} /> Hoạt động
                        </span>
                      ) : (
                        <span className="status-badge status-locked">
                          <XCircle size={14} /> Đã khóa
                        </span>
                      )}
                    </td>
                    <td>
                      {user.created_at ? new Date(user.created_at).toLocaleDateString('vi-VN') : '—'}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => openEditModal(user)}
                          className="btn-action btn-edit"
                          title="Chỉnh sửa thông tin / Đổi mật khẩu"
                        >
                          <Edit size={16} />
                        </button>
                        {user.username !== 'admin' && (
                          <>
                            <button
                              onClick={() => handleToggleStatus(user)}
                              className={`btn-action ${user.is_active ? 'btn-lock' : 'btn-unlock'}`}
                              title={user.is_active ? 'Khóa tài khoản' : 'Mở khóa'}
                            >
                              {user.is_active ? <Lock size={16} /> : <CheckCircle2 size={16} />}
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user)}
                              className="btn-action btn-delete"
                              title="Xóa tài khoản"
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Role Permissions Matrix Card */}
      <div className="card matrix-card">
        <div className="card-header">
          <Shield size={20} className="icon-gold" />
          <h2>Bảng Ma Trận Phân Quyền Theo Vai Trò</h2>
        </div>
        <div className="table-responsive">
          <table className="matrix-table">
            <thead>
              <tr>
                <th>Chức năng / Phân hệ</th>
                <th style={{ textAlign: 'center' }}>👑 Quản trị viên (admin)</th>
                <th style={{ textAlign: 'center' }}>✍️ Biên tập viên (editor)</th>
                <th style={{ textAlign: 'center' }}>📞 Nhân viên kinh doanh (sales)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Bảng điều khiển (Dashboard)</strong></td>
                <td className="text-center text-green">✅ Toàn quyền</td>
                <td className="text-center text-green">✅ Xem tổng quan</td>
                <td className="text-center text-green">✅ Xem tổng quan</td>
              </tr>
              <tr>
                <td><strong>Quản lý Sản phẩm & Bảng giá gas</strong></td>
                <td className="text-center text-green">✅ Thêm, Sửa, Xóa, Đổi giá</td>
                <td className="text-center text-green">✅ Thêm, Sửa bài & hình ảnh</td>
                <td className="text-center text-orange">👁️ Chỉ xem bảng giá</td>
              </tr>
              <tr>
                <td><strong>Quản lý Bài viết & Tin tức</strong></td>
                <td className="text-center text-green">✅ Toàn quyền</td>
                <td className="text-center text-green">✅ Soạn thảo & Đăng bài</td>
                <td className="text-center text-red">❌ Không có quyền</td>
              </tr>
              <tr>
                <td><strong>Quản lý Cửa hàng chi nhánh</strong></td>
                <td className="text-center text-green">✅ Toàn quyền</td>
                <td className="text-center text-red">❌ Không có quyền</td>
                <td className="text-center text-green">✅ Xem danh sách & Hotline</td>
              </tr>
              <tr>
                <td><strong>Khách hàng Liên hệ / Đặt gas</strong></td>
                <td className="text-center text-green">✅ Xem & Xóa liên hệ</td>
                <td className="text-center text-red">❌ Không có quyền</td>
                <td className="text-center text-green">✅ Tiếp nhận & Xử lý đơn</td>
              </tr>
              <tr>
                <td><strong>Cài đặt website & Logo, Banner</strong></td>
                <td className="text-center text-green">✅ Toàn quyền cấu hình</td>
                <td className="text-center text-red">❌ Bị chặn truy cập</td>
                <td className="text-center text-red">❌ Bị chặn truy cập</td>
              </tr>
              <tr>
                <td><strong>Quản lý Tài khoản & Phân quyền</strong></td>
                <td className="text-center text-green">✅ Toàn quyền tạo/khóa tài khoản</td>
                <td className="text-center text-red">❌ Bị chặn truy cập</td>
                <td className="text-center text-red">❌ Bị chặn truy cập</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Thêm tài khoản mới */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Thêm Tài Khoản Nhân Viên Mới</h3>
              <button onClick={() => setShowAddModal(false)} className="btn-close">×</button>
            </div>
            <form onSubmit={handleCreateUser}>
              <div className="form-group">
                <label>Tên đăng nhập (Username) *</label>
                <input
                  type="text"
                  required
                  placeholder="ví dụ: nvkd_ngocgas, editor01"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') })}
                  className="form-control"
                />
                <small className="form-hint">Chỉ dùng chữ cái thường, số và dấu gạch dưới (không dấu, không cách).</small>
              </div>

              <div className="form-group">
                <label>Tên hiển thị (Họ và Tên) *</label>
                <input
                  type="text"
                  required
                  placeholder="ví dụ: Nguyễn Văn A (Kinh Doanh)"
                  value={formData.display_name}
                  onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Mật khẩu ban đầu *</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Tối thiểu 6 ký tự"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="form-control"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn-toggle-password"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Vai trò & Quyền hạn *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="form-control select-role"
                >
                  <option value="editor">✍️ Biên tập viên (Quản lý bài viết, sản phẩm, giá gas)</option>
                  <option value="sales">📞 Nhân viên kinh doanh (Xử lý đơn liên hệ, xem giá gas)</option>
                  <option value="admin">👑 Quản trị viên cấp cao (Toàn quyền hệ thống)</option>
                </select>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">
                  Hủy bỏ
                </button>
                <button type="submit" disabled={submitting} className="btn-primary">
                  {submitting ? 'Đang tạo...' : 'Tạo Tài Khoản'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Chỉnh sửa tài khoản */}
      {showEditModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Chỉnh Sửa Tài Khoản: {selectedUser.username}</h3>
              <button onClick={() => setShowEditModal(false)} className="btn-close">×</button>
            </div>
            <form onSubmit={handleUpdateUser}>
              <div className="form-group">
                <label>Tên hiển thị</label>
                <input
                  type="text"
                  required
                  value={editFormData.display_name}
                  onChange={(e) => setEditFormData({ ...editFormData, display_name: e.target.value })}
                  className="form-control"
                />
              </div>

              {selectedUser.username !== 'admin' && (
                <div className="form-group">
                  <label>Vai trò</label>
                  <select
                    value={editFormData.role}
                    onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                    className="form-control"
                  >
                    <option value="editor">✍️ Biên tập viên (Content & Sản phẩm)</option>
                    <option value="sales">📞 Nhân viên kinh doanh (Liên hệ & Cửa hàng)</option>
                    <option value="admin">👑 Quản trị viên cấp cao (Toàn quyền)</option>
                  </select>
                </div>
              )}

              {selectedUser.username !== 'admin' && (
                <div className="form-group">
                  <label>Trạng thái hoạt động</label>
                  <select
                    value={editFormData.is_active}
                    onChange={(e) => setEditFormData({ ...editFormData, is_active: parseInt(e.target.value, 10) })}
                    className="form-control"
                  >
                    <option value={1}>🟢 Đang hoạt động bình thường</option>
                    <option value={0}>🔴 Đang bị khóa (Không thể đăng nhập)</option>
                  </select>
                </div>
              )}

              <div className="form-group">
                <label>Đặt lại mật khẩu mới (Bỏ trống nếu không muốn đổi)</label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu mới nếu cần đổi..."
                  value={editFormData.new_password}
                  onChange={(e) => setEditFormData({ ...editFormData, new_password: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowEditModal(false)} className="btn-secondary">
                  Hủy
                </button>
                <button type="submit" disabled={submitting} className="btn-primary">
                  {submitting ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Đổi mật khẩu cá nhân */}
      {showMyPassModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Đổi Mật Khẩu Tài Khoản Của Bạn</h3>
              <button onClick={() => setShowMyPassModal(false)} className="btn-close">×</button>
            </div>
            <form onSubmit={handleChangeMyPassword}>
              <div className="form-group">
                <label>Mật khẩu hiện tại *</label>
                <input
                  type="password"
                  required
                  placeholder="Nhập mật khẩu hiện tại..."
                  value={myPassData.current_password}
                  onChange={(e) => setMyPassData({ ...myPassData, current_password: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Mật khẩu mới *</label>
                <input
                  type="password"
                  required
                  placeholder="Tối thiểu 6 ký tự..."
                  value={myPassData.new_password}
                  onChange={(e) => setMyPassData({ ...myPassData, new_password: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Xác nhận mật khẩu mới *</label>
                <input
                  type="password"
                  required
                  placeholder="Nhập lại mật khẩu mới..."
                  value={myPassData.confirm_password}
                  onChange={(e) => setMyPassData({ ...myPassData, confirm_password: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowMyPassModal(false)} className="btn-secondary">
                  Hủy
                </button>
                <button type="submit" disabled={submitting} className="btn-primary">
                  {submitting ? 'Đang đổi...' : 'Cập Nhật Mật Khẩu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx global>{`
        .account-page-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .page-title {
          font-size: 26px;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 6px 0;
        }

        .page-subtitle {
          font-size: 14px;
          color: #64748B;
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #1D70B8;
          color: #FFFFFF;
          border: none;
          padding: 10px 18px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .btn-primary:hover {
          background-color: #155894;
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #FFFFFF;
          color: #334155;
          border: 1px solid #CBD5E1;
          padding: 10px 16px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          background-color: #F8FAFC;
          border-color: #94A3B8;
        }

        .card {
          background-color: #FFFFFF;
          border-radius: 16px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          margin-bottom: 28px;
          overflow: hidden;
        }

        .table-header-bar {
          padding: 18px 24px;
          border-bottom: 1px solid #F1F5F9;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .table-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 17px;
          font-weight: 700;
          color: #1E293B;
        }

        .icon-blue {
          color: #1D70B8;
        }

        .icon-gold {
          color: #D97706;
        }

        .btn-icon-reload {
          background: transparent;
          border: 1px solid #E2E8F0;
          padding: 6px 10px;
          border-radius: 6px;
          cursor: pointer;
          color: #64748B;
        }

        .btn-icon-reload:hover {
          background-color: #F1F5F9;
          color: #0F172A;
        }

        .table-responsive {
          overflow-x: auto;
        }

        .user-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .user-table th {
          background-color: #F8FAFC;
          padding: 14px 20px;
          text-align: left;
          font-weight: 600;
          color: #475569;
          border-bottom: 1px solid #E2E8F0;
        }

        .user-table td {
          padding: 16px 20px;
          border-bottom: 1px solid #F1F5F9;
          color: #334155;
        }

        .user-table tr:hover {
          background-color: #FAFAFA;
        }

        .row-disabled {
          opacity: 0.6;
          background-color: #FFF1F2;
        }

        .role-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .role-admin {
          background-color: #FEF3C7;
          color: #B45309;
          border: 1px solid #FDE68A;
        }

        .role-editor {
          background-color: #E0E7FF;
          color: #3730A3;
          border: 1px solid #C7D2FE;
        }

        .role-sales {
          background-color: #DCFCE7;
          color: #15803D;
          border: 1px solid #BBF7D0;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          font-weight: 500;
        }

        .status-active {
          color: #16A34A;
        }

        .status-locked {
          color: #DC2626;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }

        .btn-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: 1px solid #CBD5E1;
          background-color: #FFFFFF;
          cursor: pointer;
          transition: all 0.15s;
        }

        .btn-edit:hover {
          background-color: #EFF6FF;
          border-color: #93C5FD;
          color: #1D70B8;
        }

        .btn-lock:hover {
          background-color: #FEF2F2;
          border-color: #FCA5A5;
          color: #DC2626;
        }

        .btn-unlock:hover {
          background-color: #F0FDF4;
          border-color: #86EFAC;
          color: #16A34A;
        }

        .btn-delete:hover {
          background-color: #FEF2F2;
          border-color: #F87171;
          color: #DC2626;
        }

        /* Matrix Table */
        .matrix-card .card-header {
          padding: 18px 24px;
          border-bottom: 1px solid #F1F5F9;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .matrix-card .card-header h2 {
          font-size: 16px;
          font-weight: 700;
          color: #1E293B;
          margin: 0;
        }

        .matrix-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }

        .matrix-table th {
          background-color: #F8FAFC;
          padding: 12px 18px;
          text-align: left;
          font-weight: 600;
          color: #475569;
          border-bottom: 1px solid #E2E8F0;
        }

        .matrix-table td {
          padding: 14px 18px;
          border-bottom: 1px solid #F1F5F9;
        }

        .text-center {
          text-align: center;
        }

        .text-green {
          color: #15803D;
          font-weight: 500;
        }

        .text-orange {
          color: #C2410C;
          font-weight: 500;
        }

        .text-red {
          color: #DC2626;
          font-weight: 500;
        }

        /* Modals */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(15, 23, 42, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background-color: #FFFFFF;
          border-radius: 16px;
          max-width: 520px;
          width: 100%;
          padding: 28px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .modal-header h3 {
          font-size: 18px;
          font-weight: 700;
          color: #0F172A;
          margin: 0;
        }

        .btn-close {
          background: transparent;
          border: none;
          font-size: 24px;
          color: #94A3B8;
          cursor: pointer;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 6px;
        }

        .form-control {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #CBD5E1;
          border-radius: 8px;
          font-size: 14px;
          box-sizing: border-box;
        }

        .form-control:focus {
          outline: none;
          border-color: #1D70B8;
          box-shadow: 0 0 0 3px rgba(29, 112, 184, 0.1);
        }

        .form-hint {
          display: block;
          font-size: 12px;
          color: #64748B;
          margin-top: 4px;
        }

        .password-input-wrapper {
          position: relative;
        }

        .btn-toggle-password {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          color: #64748B;
          cursor: pointer;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
        }

        .toast-notification {
          position: fixed;
          top: 24px;
          right: 24px;
          padding: 14px 20px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          font-size: 14px;
          z-index: 2000;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          animation: slideIn 0.2s ease-out;
        }

        .toast-notification.success {
          background-color: #16A34A;
          color: #FFFFFF;
        }

        .toast-notification.error {
          background-color: #DC2626;
          color: #FFFFFF;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
