import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* 登录标题 */}
      <h1 className="text-2xl font-bold mb-8">微信登录</h1>
      
      {/* 微信图标和按钮 */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-white rounded-full"></div>
        </div>
        <button 
          className="bg-gray-400 text-white py-3 px-12 rounded-full cursor-not-allowed"
          disabled
        >
          微信授权
        </button>
      </div>

      {/* 用户协议 */}
      <div className="flex items-start mb-8">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 mr-2"
        />
        <p className="text-sm">
          我已阅读并同意
          <a href="#" className="text-blue-500 underline">《用户服务协议》</a>
          和
          <a href="#" className="text-blue-500 underline">《隐私政策》</a>
        </p>
      </div>

      {/* 其他登录方式 */}
      <div className="w-full max-w-md">
        <p className="text-center text-gray-500 mb-4">其他登录方式</p>
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full mb-2"></div>
            <span className="text-xs">手机号</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full mb-2"></div>
            <span className="text-xs">邮箱</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-800 rounded-full mb-2"></div>
            <span className="text-xs">账号ID</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-black rounded-full mb-2"></div>
            <span className="text-xs">Apple</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-2 border-blue-500 rounded-full mb-2"></div>
            <span className="text-xs">Github</span>
          </div>
        </div>
      </div>

      {/* 导航按钮（仅用于演示） */}
      <div className="mt-8 flex space-x-4">
        <button 
          onClick={() => navigate('/home')}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          主页
        </button>
        <button 
          onClick={() => navigate('/chat')}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          聊天
        </button>
        <button 
          onClick={() => navigate('/wallet')}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          钱包
        </button>
      </div>
    </div>
  );
};

export default LoginPage;