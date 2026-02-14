import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';

const LoginPage: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 更新时间
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    // 初始更新
    updateTime();

    // 每分钟更新一次
    const interval = setInterval(updateTime, 60000);

    // 清理
    return () => clearInterval(interval);
  }, []);

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

  const handleSocialLogin = (type: string) => {
    // 社交登录逻辑
    console.log('Social login with:', type);
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center p-4">
      {/* 顶部状态栏 */}
      <div className="w-full flex justify-between items-center mb-8 px-4">
        <div className="flex items-center">
          <button 
            onClick={() => window.history.back()}
            className="mr-4 text-sm text-[#09bb07] font-medium"
          >
            ← 返回
          </button>
          <div className="text-xs">{currentTime}</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-[#09bb07] rounded-full"></div>
          <div className="text-xs">Ailake</div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Ailake 标志 */}
        <div className="w-24 h-24 mb-6">
          <img 
            src={logo} 
            alt="Ailake" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* 标题 */}
        <h1 className="text-2xl font-bold text-[#09bb07] mb-2">Ailake</h1>
        <p className="text-gray-600 mb-8 text-center">欢迎回来，请登录您的账户</p>

        {/* 登录表单 */}
        <form onSubmit={handleLogin} className="w-full space-y-4 bg-white p-6 rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
          {/* 手机号输入框 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">手机号</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="请输入您的手机号"
              className="w-full px-4 py-3 border border-gray-300 rounded-[8px] focus:outline-none focus:border-[#09bb07] focus:shadow-[0_0_0_3px_rgba(9,187,7,0.1)] transition-all duration-300"
              required
            />
          </div>

          {/* 密码输入框 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔒
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入您的密码"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-[8px] focus:outline-none focus:border-[#09bb07] focus:shadow-[0_0_0_3px_rgba(9,187,7,0.1)] transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* 登录按钮 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#09bb07] text-white py-3 px-6 rounded-[8px] font-medium hover:bg-[#34c732] active:bg-[#079a05] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 shadow-md hover:shadow-lg active:shadow-sm"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                登录中...
              </div>
            ) : (
              '登录'
            )}
          </button>

          {/* 辅助链接 */}
          <div className="flex justify-between">
            <a href="#" className="text-sm text-[#09bb07] font-medium hover:text-[#079a05] transition-colors">
              忘记密码？
            </a>
            <a href="#" className="text-sm text-[#09bb07] font-medium hover:text-[#079a05] transition-colors">
              立即注册
            </a>
          </div>
        </form>

        {/* 其他登录方式 */}
        <div className="w-full mt-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <div className="mx-4 text-xs text-gray-500">其他登录方式</div>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <div className="flex justify-center space-x-6">
            <button 
              onClick={() => handleSocialLogin('wechat')}
              className="flex flex-col items-center transition-transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-[#09bb07] rounded-full flex items-center justify-center text-white text-lg mb-2 shadow-md hover:shadow-lg transition-all">
                💚
              </div>
              <span className="text-xs text-gray-600">微信</span>
            </button>
            <button 
              onClick={() => handleSocialLogin('github')}
              className="flex flex-col items-center transition-transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white text-lg mb-2 shadow-md hover:shadow-lg transition-all">
                🐱
              </div>
              <span className="text-xs text-gray-600">GitHub</span>
            </button>
            <button 
              onClick={() => handleSocialLogin('phone')}
              className="flex flex-col items-center transition-transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg mb-2 shadow-md hover:shadow-lg transition-all">
                👤
              </div>
              <span className="text-xs text-gray-600">手机号</span>
            </button>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="mt-12 text-xs text-gray-500 text-center">
          © 2025 Ailake.保留所有权利。
        </div>
      </div>
    </div>
  );
};

export default LoginPage;