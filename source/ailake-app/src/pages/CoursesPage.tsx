import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
}

const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('开始获取课程数据...');
        const response = await api.ailake.getCourses();
        console.log('获取课程数据成功:', response.data);
        setCourses(response.data.courses);
      } catch (err) {
        console.error('获取课程失败:', err);
        setError('获取课程列表失败，请检查网络连接');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner': return '初级';
      case 'intermediate': return '中级';
      case 'advanced': return '高级';
      default: return level;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      {/* 顶部状态栏 */}
      <header className="w-full flex justify-between items-center py-4 px-4 bg-white shadow-sm">
        <button onClick={() => navigate('/home')} className="text-sm text-green-600">
          ← 返回
        </button>
        <div className="text-sm font-medium text-gray-800">课程管理</div>
        <div className="w-8"></div>
      </header>

      {/* 核心内容区 */}
      <main className="flex-1 p-4 overflow-y-auto pb-20">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-green-600 mb-2">我的课程</h1>
          <p className="text-gray-600">浏览和管理您的学习课程</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-gray-500">加载中...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-red-500">{error}</div>
          </div>
        ) : courses.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-gray-500">暂无课程</div>
          </div>
        ) : (
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-1">时长:</span>
                        <span className="text-gray-700">{course.duration}</span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${getLevelColor(course.level)}`}>
                        {getLevelText(course.level)}
                      </div>
                    </div>
                  </div>
                  <button className="bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                    查看
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 底部导航栏 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-center shadow-lg z-50">
        <button onClick={() => navigate('/home')} className="flex flex-col items-center py-2 px-4 text-gray-400 hover:text-green-600 transition-colors">
          <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          <span className="text-xs font-medium">首页</span>
        </button>
        <button onClick={() => navigate('/courses')} className="flex flex-col items-center py-2 px-4 text-green-600">
          <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
          </svg>
          <span className="text-xs font-medium">学习</span>
        </button>
        <button onClick={() => navigate('/agent-usage')} className="flex flex-col items-center py-2 px-4 text-gray-400 hover:text-green-600 transition-colors">
          <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2a2 2 0 0 0-2 2c0 .74.4 1.38 1 1.73V7h-1a6 6 0 0 0-6 6v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h10v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-4a6 6 0 0 0-6-6h-1v-1.27c.6-.35 1-.99 1-1.73a2 2 0 0 0-2-2zm-4 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0z"/>
          </svg>
          <span className="text-xs font-medium">智能体</span>
        </button>
        <button onClick={() => navigate('/wallet')} className="flex flex-col items-center py-2 px-4 text-gray-400 hover:text-green-600 transition-colors">
          <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span className="text-xs font-medium">钱包</span>
        </button>
        <button onClick={() => navigate('/my')} className="flex flex-col items-center py-2 px-4 text-gray-400 hover:text-green-600 transition-colors">
          <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <span className="text-xs font-medium">我的</span>
        </button>
      </nav>
    </div>
  );
};

export default CoursesPage;