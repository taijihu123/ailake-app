import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { GlobalAgentFloating, ChatPage, defaultChatWidgetConfig } from './index';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* 导航栏 */}
        <nav className="bg-white shadow-sm p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-xl font-bold text-ailake-green-500">Ailake Chat Widget</div>
            </div>
            <div className="flex space-x-4">
              <a href="/" className="text-gray-600 hover:text-ailake-green-500">首页</a>
              <a href="/chat" className="text-gray-600 hover:text-ailake-green-500">聊天页面</a>
            </div>
          </div>
        </nav>

        {/* 主内容区 */}
        <main className="max-w-7xl mx-auto py-8 px-4">
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="text-center">
                  <h1 className="text-3xl font-bold mb-4">Ailake Chat Widget 演示</h1>
                  <p className="text-gray-600 mb-8">这是 Ailake 聊天组件库的演示页面</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h2 className="text-xl font-bold mb-4">绿色主题（栖居App）</h2>
                      <p className="text-gray-600 mb-4">使用绿色主题，悬浮在左侧，开启音视频通话</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h2 className="text-xl font-bold mb-4">蓝色主题（官网）</h2>
                      <p className="text-gray-600 mb-4">使用蓝色主题，悬浮在右下角，只保留文字聊天</p>
                    </div>
                  </div>
                </div>
              } 
            />
            <Route 
              path="/chat" 
              element={<ChatPage config={defaultChatWidgetConfig} />} 
            />
          </Routes>
        </main>

        {/* 悬浮聊天组件 */}
        <GlobalAgentFloating config={defaultChatWidgetConfig} />
      </div>
    </Router>
  </React.StrictMode>,
);
