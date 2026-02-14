import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  members: number;
}

const ResearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await api.ailake.getResearchProjects();
        setProjects(response.data.projects);
      } catch (err) {
        setError('获取科研项目失败');
        console.error('获取科研项目失败:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recruiting':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'recruiting':
        return '招募中';
      case 'ongoing':
        return '进行中';
      case 'completed':
        return '已完成';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-light-green-50 flex flex-col">
      {/* 顶部状态栏 */}
      <div className="w-full flex justify-between items-center py-4 px-4 bg-white shadow-sm">
        <button onClick={() => navigate('/home')} className="text-sm text-green-600">
          返回
        </button>
        <div className="text-sm font-medium">科研项目</div>
        <div className="w-8"></div> {/* 占位符 */}
      </div>

      {/* 核心内容区 */}
      <main className="flex-1 p-4">
        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-green-600 mb-2">科研项目</h1>
          <p className="text-gray-600">参与和管理科研项目</p>
        </div>

        {/* 项目列表 */}
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-gray-500">加载中...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-red-500">{error}</div>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-gray-500">暂无科研项目</div>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium mb-1">{project.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                    <div className="flex items-center space-x-4 text-xs">
                      <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                        {getStatusText(project.status)}
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-1">成员:</span>
                        <span>{project.members}人</span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-green-500 text-white py-1 px-4 rounded-lg text-sm">
                    参与
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 科研协作入口 */}
        <div className="mt-8 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium mb-4">科研协作</h3>
          <div className="flex space-x-4">
            <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg text-sm">
              发起协作
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm">
              加入团队
            </button>
          </div>
        </div>
      </main>

      {/* 底部导航栏 */}
      <nav className="flex justify-around items-center py-4 border-t bg-white">
        <div className="flex flex-col items-center text-gray-500 cursor-pointer" onClick={() => navigate('/home')}>
          <span className="text-sm">首页</span>
        </div>
        <div className="flex flex-col items-center text-gray-500 cursor-pointer" onClick={() => navigate('/courses')}>
          <span className="text-sm">学习</span>
        </div>
        <div className="flex flex-col items-center text-gray-500 cursor-pointer" onClick={() => navigate('/my')}>
          <span className="text-sm">我的</span>
        </div>
      </nav>
    </div>
  );
};

export default ResearchPage;