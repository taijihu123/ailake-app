import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 头部区域 */}
      <header className="py-4 flex justify-between items-center px-4">
        <button onClick={() => navigate('/')} className="text-blue-500">
          返回
        </button>
        <h1 className="text-xl font-bold">我的Ailake</h1>
        <div className="w-10"></div> {/* 占位符，保持标题居中 */}
      </header>

      {/* 核心内容区 */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold mb-4 text-center">
          欢迎来到Ailake
          <div className="h-1 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full mt-2"></div>
        </h2>
        <p className="text-gray-600 text-center mb-8 max-w-md">
          Ailake是一个智能知识管理平台，帮助您更好地组织和利用知识资源。
        </p>
        <button className="bg-black text-white py-3 px-8 rounded-lg">
          新建知识库
        </button>
      </main>

      {/* 底部导航栏 */}
      <nav className="flex justify-around items-center py-4 border-t">
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 bg-gray-400 rounded mb-1"></div>
          <span className="text-xs">首页</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 bg-blue-500 rounded mb-1"></div>
          <span className="text-xs text-blue-500">知识库</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 bg-gray-400 rounded mb-1"></div>
          <span className="text-xs">个人中心</span>
        </div>
      </nav>
    </div>
  );
};

export default HomePage;