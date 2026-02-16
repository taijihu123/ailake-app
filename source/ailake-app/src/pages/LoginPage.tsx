import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';
import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // 登录逻辑
    setLoading(true);
    try {
      console.log('Login with:', phone, password);
      // 模拟登录延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="login-page-container">
      {/* 顶部状态栏 */}
      <div className="login-status-bar">
        <div className="login-time">11:48</div>
        <div className="login-status-icons">
          <span className="login-status-icon">📶</span>
          <span className="login-status-icon">🔋</span>
        </div>
      </div>

      {/* Logo 区域 */}
      <div className="login-logo">
        <img 
          src={logo} 
          alt="Ailake" 
          className="w-full h-full object-contain"
        />
      </div>

      {/* 标题 */}
      <div className="login-title">
        <h1>Ailake</h1>
        <p>欢迎回来，请登录您的账户</p>
      </div>

      {/* 登录表单白框 */}
      <div className="login-form-container">
        <form onSubmit={handleLogin} className="login-form">
          {/* 手机或用户名输入框 */}
          <div className="login-form-group">
            <label className="login-form-label">手机/用户名</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="请输入您的手机/用户名"
              className="login-input"
              required
            />
          </div>

          {/* 密码输入框 */}
          <div className="login-form-group">
            <label className="login-form-label">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入您的密码"
              className="login-input"
              required
            />
          </div>

          {/* 登录按钮 */}
          <button
            type="submit"
            disabled={loading}
            className={`login-btn ${loading ? 'loading' : ''}`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="loading-spinner"></div>
                登录中...
              </div>
            ) : (
              '登录'
            )}
          </button>

          {/* 辅助链接 */}
          <div className="login-footer">
            <span className="text-gray-600 mr-2">还没有账户？</span>
            <a href="#">立即注册</a>
          </div>
        </form>
      </div>

      {/* 版权信息 */}
      <div className="login-copyright">
        © 2025 Ailake.保留所有权利。
      </div>
    </div>
  );
};

export default LoginPage;