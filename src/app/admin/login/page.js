'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Flame, Lock, User, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Vui lòng nhập tên đăng nhập và mật khẩu');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('ngoc_gas_admin_token', data.token);
        localStorage.setItem('ngoc_gas_admin_user', JSON.stringify(data.user));
        router.push('/admin');
      } else {
        setError(data.message || 'Sai tên đăng nhập hoặc mật khẩu');
      }
    } catch (err) {
      console.error(err);
      setError('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="login-card card">
          <div className="login-header">
            <div className="login-logo-circle">
              <Flame size={40} className="login-logo-icon" />
            </div>
            <h1>NGỌC GAS</h1>
            <p>Hệ thống quản trị website</p>
          </div>

          {error && (
            <div className="login-error">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">Tên đăng nhập</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Nhập tên đăng nhập"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Mật khẩu</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu"
                  disabled={loading}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
              {loading ? 'Đang xác thực...' : 'Đăng nhập'}
            </button>
          </form>
        </div>
      </div>

      <style jsx global>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-surface);
          padding: 20px;
        }

        .login-card {
          width: 100%;
          max-width: 400px;
          background-color: #FFFFFF;
          padding: 40px 30px;
          box-shadow: var(--shadow-lg);
        }

        .login-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .login-logo-circle {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background-color: var(--primary-light);
          color: var(--primary-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          box-shadow: var(--shadow-sm);
        }

        .login-header h1 {
          font-family: var(--font-inter), sans-serif;
          font-size: 24px;
          font-weight: 800;
          color: var(--text);
          margin-bottom: 6px;
        }

        .login-header p {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .login-error {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          border-radius: var(--radius-sm);
          background-color: rgba(220, 38, 38, 0.1);
          color: var(--error);
          border: 1px solid rgba(220, 38, 38, 0.2);
          margin-bottom: 24px;
          font-size: 14px;
          font-weight: 500;
        }

        .input-with-icon {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
          opacity: 0.7;
        }

        .input-with-icon .form-control {
          padding-left: 40px;
        }

        .login-btn {
          width: 100%;
          padding: 14px;
          font-size: 16px;
          margin-top: 10px;
        }
      `}</style>
    </>
  );
}
