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
        const response = await api.ailake.getCourses();
        setCourses(response.data.courses);
      } catch (err) {
        setError('获取课程列表失败');
        console.error('获取课程失败:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner':
        return '初级';
      case 'intermediate':
        return '中级';
      case 'advanced':
        return '高级';
      default:
        return level;
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      {/* 顶部状态栏 */}
      <div className="w-full flex justify-between items-center py-4 px-4 bg-white shadow-sm">
        <button onClick={() => navigate('/home')} className="text-sm text-green-600">
          返回
        </button>
        <div className="text-sm font-medium">课程管理</div>
        <div className="w-8"></div> {/* 占位符 */}
      </div>

      {/* 核心内容区 */}
      <main className="flex-1 p-4">
        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-green-600 mb-2">我的课程</h1>
          <p className="text-gray-600">浏览和管理您的学习课程</p>
        </div>

        {/* 课程列表 */}
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
              <div key={course.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium mb-1">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-1">时长:</span>
                        <span>{course.duration}</span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${getLevelColor(course.level)}`}>
                        {getLevelText(course.level)}
                      </div>
                    </div>
                  </div>
                  <button className="bg-green-500 text-white py-1 px-4 rounded-lg text-sm">
                    查看
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 底部导航栏 */}
      <nav className="flex justify-around items-center py-4 border-t bg-white">
        <div className="flex flex-col items-center text-gray-500 cursor-pointer" onClick={() => navigate('/home')}>
          <span className="text-sm">首页</span>
        </div>
        <div className="flex flex-col items-center text-green-500 font-medium cursor-pointer">
          <span className="text-sm">学习</span>
        </div>
        <div className="flex flex-col items-center text-gray-500 cursor-pointer" onClick={() => navigate('/my')}>
          <span className="text-sm">我的</span>
        </div>
      </nav>
    </div>
  );
};

export default CoursesPage;