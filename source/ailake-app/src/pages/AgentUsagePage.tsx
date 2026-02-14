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
        // 模拟获取智能体列表
        // 实际项目中应调用后端API
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
    // 实际项目中应调用后端API启动智能体
    alert(`正在启动 ${agent.name} 智能体...`);
    // 导航到聊天页面或智能体交互页面
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      {/* 顶部状态栏 */}
      <div className="w-full flex justify-between items-center py-4 px-4 bg-white shadow-sm">
        <button onClick={() => navigate('/home')} className="text-sm text-[#09bb07] font-medium">
          ← 返回
        </button>
        <div className="text-sm font-medium">智能体中心</div>
        <div className="w-8"></div> {/* 占位符 */}
      </div>

      {/* 核心内容区 */}
      <main className="flex-1 p-4">
        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#09bb07] mb-2">智能体中心</h1>
          <p className="text-gray-600">与您的智能助手通话</p>
        </div>

        {/* 分类筛选 */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-3 pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  selectedCategory === category.id 
                    ? 'bg-[#09bb07] text-white'
                    : 'bg-white text-gray-700 border border-gray-200'
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
              <div key={agent.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start">
                    <div className={`w-20 h-20 ${agent.status === 'active' ? 'bg-gradient-to-br from-green-400 to-blue-500' : 'bg-gray-300'} rounded-full flex items-center justify-center text-3xl text-white mr-4 shadow-md`}>
                      {agent.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-medium">{agent.name}</h3>
                          <p className="text-xs text-gray-500 mt-1">{agent.category === 'education' ? '教育助手' : agent.category === 'research' ? '科研助手' : agent.category === 'life' ? '生活助手' : '创意助手'}</p>
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
                          className={`flex-1 py-3 rounded-lg text-sm font-medium flex items-center justify-center transition-colors ${agent.status === 'active' ? 'bg-[#09bb07] text-white hover:bg-[#079a05]' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
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

export default AgentUsagePage;