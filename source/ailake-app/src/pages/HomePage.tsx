import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';

interface VectorSearchResult {
  content: string;
  metadata: any;
  space_type: string;
  distance: number;
  weighted_score: number;
}

interface Agent {
  id: string;
  name: string;
  description: string;
  features: string[];
  icon: string;
  category: string;
  status: 'active' | 'inactive';
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<VectorSearchResult[]>([]);
  const [isSearching] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    const fetchAgents = async () => {
      const mockAgents: Agent[] = [
        {
          id: 'agent_1',
          name: '学习助手',
          description: '专为学习设计的智能助手',
          features: ['课程答疑', '学习计划', '知识总结'],
          icon: '📚',
          category: 'education',
          status: 'active'
        },
        {
          id: 'agent_2',
          name: '科研助手',
          description: '科研项目辅助工具',
          features: ['文献检索', '实验设计', '数据分析'],
          icon: '🔬',
          category: 'research',
          status: 'active'
        },
        {
          id: 'agent_3',
          name: '创意助手',
          description: '创意生成工具',
          features: ['写作辅助', '设计灵感', '创意生成'],
          icon: '💡',
          category: 'creative',
          status: 'active'
        }
      ];
      setAgents(mockAgents);
    };
    fetchAgents();
  }, []);

  const handleSearchResults = (results: VectorSearchResult[]) => {
    setSearchResults(results);
  };

  const handleAgentClick = (agent: Agent) => {
    console.log('使用智能体:', agent.name);
    navigate('/agent-usage');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      {/* 顶部状态栏 */}
      <header className="w-full flex justify-between items-center py-4 px-4 bg-white shadow-sm">
        <div className="flex items-center">
          <div className="w-8 h-8 mr-2">
            <img src={logo} alt="Ailake" className="w-full h-full object-contain" />
          </div>
          <div className="text-sm font-medium text-gray-800">Ailake 实验室</div>
        </div>
        <button onClick={() => navigate('/my')} className="flex flex-col items-center">
          <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <span className="text-xs text-gray-500">我的</span>
        </button>
      </header>

      {/* 核心内容区 */}
      <main className="flex-1 p-4 overflow-y-auto pb-24">
        {/* 欢迎区域 */}
        <div className="mb-6 text-center mt-6">
          <h1 className="text-2xl font-bold text-green-600 mb-2">Ailake 实验室</h1>
          <p className="text-gray-600 italic text-sm">让日常观察，变成可落地的创新</p>
        </div>

        {/* 搜索功能 */}
        <div className="mb-6">
          <SearchBar onSearchResults={handleSearchResults} />
          {searchResults.length > 0 && (
            <SearchResults results={searchResults} loading={isSearching} />
          )}
        </div>

        {/* 智能体快捷入口 */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 flex items-center text-gray-800">
            <span className="mr-2">🤖</span> 智能助手
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {agents.map(agent => (
              <div
                key={agent.id}
                onClick={() => handleAgentClick(agent)}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 mx-auto ${agent.status === 'active' ? 'bg-gradient-to-br from-green-400 to-blue-500' : 'bg-gray-300'} rounded-full flex items-center justify-center text-2xl text-white mb-3`}>
                  {agent.icon}
                </div>
                <h3 className="text-sm font-medium text-center text-gray-800">{agent.name}</h3>
                <p className="text-xs text-gray-500 text-center mt-1">{agent.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 研究任务阶梯 */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 flex items-center text-gray-800">
            <span className="mr-2">📝</span> 研究任务阶梯
          </h2>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
            <h3 className="text-base font-semibold mb-2 text-gray-800">基础任务：日常观察日志</h3>
            <p className="text-gray-600 text-sm">提交"日常场景 × 未被满足的需求"观察笔记</p>
            <div className="bg-green-50 p-3 rounded-lg mt-3">
              <p className="text-sm text-green-700">奖励：优质笔记收录进《实验室观察手册》</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
            <h3 className="text-base font-semibold mb-2 text-gray-800">进阶任务：小组协作课题</h3>
            <p className="text-gray-600 text-sm">从"单点观察"到"系统落地"的团队项目</p>
            <div className="bg-green-50 p-3 rounded-lg mt-3">
              <p className="text-sm text-green-700">奖励：课题成果纳入《民生场景创新白皮书》</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-base font-semibold mb-2 text-gray-800">核心任务：独立发起项目</h3>
            <p className="text-gray-600 text-sm">自选领域，提交完整项目计划书</p>
            <div className="bg-green-50 p-3 rounded-lg mt-3">
              <p className="text-sm text-green-700">奖励：入驻实验室孵化区，享受场地支持</p>
            </div>
          </div>
        </div>

        {/* 研究员成长体系 */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 flex items-center text-gray-800">
            <span className="mr-2">🎓</span> 研究员成长体系
          </h2>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="mb-3 text-sm text-gray-700">- <strong>初级 → 认证研究员</strong>：完成3个进阶任务 + 1个核心任务初筛</p>
            <p className="text-sm font-medium text-gray-800 mb-2">认证研究员权益：</p>
            <ul className="list-disc pl-5 text-gray-600 text-sm">
              <li>免费参与线下创新工作坊</li>
              <li>优先对接产业资源</li>
              <li>个人主页展示研究成果墙</li>
            </ul>
          </div>
        </div>
      </main>

      {/* 底部导航栏 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-center shadow-lg z-50">
        <button onClick={() => navigate('/home')} className="flex flex-col items-center py-2 px-4 text-green-600">
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

export default HomePage;