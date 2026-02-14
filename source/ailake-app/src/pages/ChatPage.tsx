import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 获取URL参数中的场景类型
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scene = params.get('scene');
    
    if (scene === 'study') {
      // 学习场景
      console.log('进入学习场景');
    } else if (scene === 'work') {
      // 工作场景
      console.log('进入工作场景');
    } else if (scene === 'life') {
      // 生活场景
      console.log('进入生活场景');
    } else {
      // 默认场景
      console.log('进入默认场景');
    }
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 flex flex-col">
      {/* 顶部控制区 */}
      <header className="flex justify-between items-center p-4">
        <button onClick={() => navigate('/')} className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <div className="flex flex-col space-y-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
          </div>
        </button>
        <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg flex items-center">
          <div className="grid grid-cols-2 gap-1 mr-2">
            <div className="w-2 h-2 bg-black rounded-sm"></div>
            <div className="w-2 h-2 bg-black rounded-sm"></div>
            <div className="w-2 h-2 bg-black rounded-sm"></div>
            <div className="w-2 h-2 bg-black rounded-sm"></div>
          </div>
          选择数字人
        </button>
        <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg">
          字幕
        </button>
      </header>

      {/* 对话核心区 */}
      <main className="flex-1 flex flex-col items-center justify-center relative">
        {/* 半透明球体 */}
        <div className="absolute w-64 h-64 bg-white bg-opacity-30 rounded-full"></div>
        
        {/* 智能体形象 */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-32 h-32 bg-white rounded-full mb-4 flex items-center justify-center">
            {/* AI女形象示意 */}
            <div className="flex flex-col items-center">
              {/* 头发 */}
              <div className="w-16 h-8 bg-black rounded-t-full mb-2"></div>
              {/* 脸和身体 */}
              <div className="w-12 h-12 bg-white border-2 border-black rounded-full mb-1"></div>
              <div className="w-16 h-12 bg-white border-2 border-black rounded-b-lg"></div>
            </div>
          </div>
          
          {/* 进度指示器和提示文字 */}
          <div className="flex space-y-4 mb-8">
            <div className="flex space-x-2 mb-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
            <p className="text-gray-500 text-sm">你可以开始说话</p>
          </div>
        </div>
      </main>

      {/* 底部交互区 */}
      <footer className="p-4">
        <div className="flex justify-center space-x-6 mb-4">
          <button className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-black rounded-full"></div>
          </button>
          <button className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-black">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3V21M5 12H19" stroke="black" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </button>
          <button className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-black">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H21C21.5304 3 22.0391 3.21071 22.4142 3.58579C22.7893 3.96086 23 4.46957 23 5V19Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 9H9.01" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 9H15.01" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 15H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
          <button className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
          </button>
        </div>
        
        {/* 快捷入口 */}
        <div className="flex justify-start">
          <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatPage;