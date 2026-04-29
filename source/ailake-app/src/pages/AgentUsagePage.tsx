import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Agent {
  id: string;
  name: string;
  description: string;
  features: string[];
  icon: string;
  category: string;
  status: 'active' | 'inactive';
  lastUsed?: string;
}

const AgentUsagePage: React.FC = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        setError(null);
        const mockAgents: Agent[] = [
          {
            id: 'agent_1',
            name: '学习助手',
            description: '专为学习设计的智能助手，提供课程答疑和学习计划制定',
            features: ['课程答疑', '学习计划', '知识总结', '考试辅导'],
            icon: '📚',
            category: 'education',
            status: 'active',
            lastUsed: '2026-02-12 15:30'
          },
          {
            id: 'agent_2',
            name: '科研助手',
            description: '科研项目辅助工具，帮助文献检索和实验设计',
            features: ['文献检索', '实验设计', '数据分析', '论文写作'],
            icon: '🔬',
            category: 'research',
            status: 'active',
            lastUsed: '2026-02-11 10:15'
          },
          {
            id: 'agent_3',
            name: '生活助手',
            description: '日常生活管理助手，提供日程安排和健康管理',
            features: ['日程安排', '健康管理', '购物清单', '旅行规划'],
            icon: '🏠',
            category: 'life',
            status: 'inactive'
          },
          {
            id: 'agent_4',
            name: '创意助手',
            description: '创意生成工具，帮助写作和设计灵感',
            features: ['写作辅助', '设计灵感', '创意生成', '内容策划'],
            icon: '💡',
            category: 'creative',
            status: 'active',
            lastUsed: '2026-02-12 09:45'
          }
        ];
        setAgents(mockAgents);
      } catch (err) {
        console.error('获取智能体列表失败:', err);
        setError('获取智能体列表失败');
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  const categories = [
    { id: 'all', name: '全部' },
    { id: 'education', name: '教育' },
    { id: 'research', name: '科研' },
    { id: 'life', name: '生活' },
    { id: 'creative', name: '创意' }
  ];

  const filteredAgents = selectedCategory === 'all' 
    ? agents 
    : agents.filter(agent => agent.category === selectedCategory);

  const handleUseAgent = (agent: Agent) => {
    console.log('使用智能体:', agent.name);
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      {/* 顶部状态栏 */}
      <header className="w-full flex justify-between items-center py-4 px-4 bg-white shadow-sm">
        <button onClick={() => navigate('/home')} className="text-sm text-green-600 font-medium">
          ← 返回
        </button>
        <div className="text-sm font-medium text-gray-800">智能体中心</div>
        <div className="w-8"></div>
      </header>

      {/* 核心内容区 */}
      <main className="flex-1 p-4 overflow-y-auto pb-20">
        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-green-600 mb-2">智能体中心</h1>
          <p className="text-gray-600">与您的智能助手通话</p>
        </div>

        {/* 分类筛选 */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-3 pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === category.id 
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* 智能体列表 */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">加载中...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-red-500">{error}</div>
          </div>
        ) : filteredAgents.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">暂无智能体</div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAgents.map(agent => (
              <div key={agent.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start">
                    <div className={`w-20 h-20 ${agent.status === 'active' ? 'bg-gradient-to-br from-green-400 to-blue-500' : 'bg-gray-300'} rounded-full flex items-center justify-center text-3xl text-white mr-4 shadow-md`}>
                      {agent.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-medium text-gray-800">{agent.name}</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {agent.category === 'education' ? '教育助手' : 
                             agent.category === 'research' ? '科研助手' : 
                             agent.category === 'life' ? '生活助手' : '创意助手'}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${agent.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {agent.status === 'active' ? '在线' : '离线'}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{agent.description}</p>
                      {agent.lastUsed && (
                        <p className="text-xs text-gray-500 mb-4">
                          上次通话: {agent.lastUsed}
                        </p>
                      )}
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleUseAgent(agent)}
                          disabled={agent.status === 'inactive'}
                          className={`flex-1 py-3 rounded-lg text-sm font-medium flex items-center justify-center transition-colors ${agent.status === 'active' ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                        >
                          <span className="mr-2">📞</span>
                          语音通话
                        </button>
                        <button
                          onClick={() => handleUseAgent(agent)}
                          disabled={agent.status === 'inactive'}
                          className={`flex-1 py-3 rounded-lg text-sm font-medium flex items-center justify-center transition-colors ${agent.status === 'active' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                        >
                          <span className="mr-2">📹</span>
                          视频通话
                        </button>
                      </div>
                    </div>
                  </div>
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
        <button onClick={() => navigate('/courses')} className="flex flex-col items-center py-2 px-4 text-gray-400 hover:text-green-600 transition-colors">
          <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
          </svg>
          <span className="text-xs font-medium">学习</span>
        </button>
        <button onClick={() => navigate('/agent-usage')} className="flex flex-col items-center py-2 px-4 text-green-600">
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

export default AgentUsagePage;