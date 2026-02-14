import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';
import avatar from '../assets/images/avatar.jpg';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';

interface SearchResult {
  id: string;
  score: number;
  metadata: any;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching] = useState(false);
  


  const handleSearchResults = (results: SearchResult[]) => {
    setSearchResults(results);
  };





  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      {/* 顶部状态栏 */}
      <div className="w-full flex justify-between items-center py-4 px-4">
        <div className="flex items-center">
          <div className="w-8 h-8 mr-2">
            <img 
              src={logo} 
              alt="Ailake" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-sm font-medium">Ailake 实验室</div>
        </div>
        <div className="w-8 h-8">
          <img 
            src={avatar} 
            alt="User" 
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>

      {/* 核心内容区 */}
      <main className="flex-1 p-4 overflow-y-auto">
        {/* 欢迎区域 */}
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-2">Ailake 实验室</h1>
          <p className="text-gray-600 italic">让日常观察，变成可落地的创新；让协作共创，变成看得见的价值。</p>
        </div>

        {/* 搜索功能 */}
        <SearchBar onSearchResults={handleSearchResults} />
        <SearchResults results={searchResults} loading={isSearching} />

        {/* 研究任务阶梯 */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            📝 研究任务阶梯（聚焦通用场景与现代价值）
          </h2>

          {/* 基础任务 */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h3 className="text-lg font-medium mb-2">基础任务：「日常观察日志」——从生活里找「创新锚点」</h3>
            <p className="text-gray-600 mb-3">要求：提交"日常场景 × 未被满足的需求"观察笔记（比如"写字楼电梯高峰的拥挤问题，能否用动态预约系统优化？""社区老年食堂的剩菜处理，有没有更环保的循环方案？"）。</p>
            <div className="bg-green-50 p-3 rounded">
              <p className="text-sm text-green-700">奖励：优质笔记收录进《实验室观察手册》，作者署名；积累5篇优质笔记可兑换1次"AI需求分析工具"使用权（系统自动提炼需求关键词、匹配潜在解决方案）。</p>
            </div>
          </div>

          {/* 进阶任务 */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h3 className="text-lg font-medium mb-2">进阶任务：「小组协作课题」——从"单点观察"到"系统落地"</h3>
            <p className="text-gray-600 mb-2">示例课题：</p>
            <ul className="list-disc pl-5 mb-3 text-gray-600">
              <li>"社区共享工具柜的优化设计"（如何通过智能锁具+信用积分，降低物品损耗率？）</li>
              <li>"早餐摊的数字化改造"（用小程序预点单+动线设计，能否缩短排队时间？）</li>
            </ul>
            <p className="text-gray-600 mb-3">实验室提供支持：开放"用户行为数据库"（匿名脱敏的消费习惯、场景痛点数据）、协作白板工具（实时同步多人想法，自动生成思维导图）。</p>
            <div className="bg-green-50 p-3 rounded">
              <p className="text-sm text-green-700">奖励：课题成果纳入《民生场景创新白皮书》，核心参与者获得"协作贡献勋章"；小组可申请500元启动资金，将方案做成简易原型（如手绘流程图、模拟小程序界面）。</p>
            </div>
          </div>

          {/* 核心任务 */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-2">核心任务：「独立发起项目」——从"想法"到"可验证的价值"</h3>
            <p className="text-gray-600 mb-3">要求：自选一个具体领域（如"银发群体的智能设备简化操作""办公室午休空间的模块化设计"），提交包含"用户痛点+解决方案框架+成本预估"的项目计划书。</p>
            <p className="text-gray-600 mb-3">实验室支持：匹配1位行业导师（如产品经理、设计师）1对1指导；开放"原型制作资源包"（3D打印模型优惠、小程序开发模板）。</p>
            <div className="bg-green-50 p-3 rounded">
              <p className="text-sm text-green-700">奖励：项目通过初筛后，可入驻实验室"孵化区"，享受场地支持；若落地产生收益（如与企业合作试点），研究员可获30%收益分成。</p>
            </div>
          </div>
        </div>

        {/* 研究员成长体系 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            🎓 研究员成长体系
          </h2>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="mb-3">- <strong>初级 → 认证研究员</strong>：完成3个进阶任务 + 1个核心任务初筛，即可升级。</p>
            <p className="mb-2"><strong>认证研究员权益</strong>：</p>
            <ul className="list-disc pl-5 mb-4 text-gray-600">
              <li>免费参与线下"创新工作坊"（与企业产品负责人面对面交流）</li>
              <li>优先对接产业资源（如给连锁便利店做场景优化建议、为社区服务中心设计活动方案）</li>
              <li>个人主页展示"研究成果墙"，增强行业曝光</li>
            </ul>
            <div className="bg-gray-50 p-3 rounded italic text-sm text-gray-600">
              逻辑核心：用"生活化课题"降低入门门槛，让普通人也能从"观察身边事"入手；用"协作+资源支持"推动想法落地，再用"署名、分成、行业对接"强化价值感——就像一群人凑在一起琢磨"怎么让日子过得更顺"，既实在又有奔头，比单纯买课更有参与欲～
            </div>
          </div>
        </div>

        {/* 实验室作为用户层与项目层的融合枢纽 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            🏠 Ailake 实验室：用户层与项目层的融合枢纽
          </h2>
          
          {/* 实验室作为统一入口 */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h3 className="text-lg font-medium mb-2">1. 实验室作为统一入口</h3>
            <ul className="list-disc pl-5 mb-3 text-gray-600">
              <li><strong>用户层</strong>：每个用户在实验室的行为（观察日志、协作课题、项目发起）都会沉淀到用户向量空间，作为个性化学习和心理分析的数据源。</li>
              <li><strong>项目层</strong>：实验室孵化的项目（从核心任务中诞生）会自动存入项目向量库，成为后续智能体生成新内容、推荐新方向的素材。</li>
            </ul>
          </div>
          
          {/* 与智能体和学习币的结合 */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h3 className="text-lg font-medium mb-2">2. 与智能体和学习币的结合</h3>
            <div className="mb-3">
              <p className="font-medium mb-1">智能体驱动：</p>
              <ul className="list-disc pl-5 mb-2 text-gray-600">
                <li>智能体在实验室中作为"研究助手"，自动分析用户的观察笔记，提炼创新点；</li>
                <li>在项目孵化阶段，智能体自动生成计划书、拆解任务、预测收益。</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">学习币激励：</p>
              <ul className="list-disc pl-5 mb-2 text-gray-600">
                <li>完成实验室任务（观察日志、协作课题）获得学习币；</li>
                <li>学习币可兑换实验室资源（AI工具使用权、原型制作优惠）；</li>
                <li>项目落地产生收益后，学习币可直接兑换现金或等值资源。</li>
              </ul>
            </div>
          </div>
          
          {/* 数据闭环 */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h3 className="text-lg font-medium mb-2">3. 数据闭环</h3>
            <ol className="list-decimal pl-5 mb-3 text-gray-600">
              <li>用户在实验室完成任务 → 数据沉淀到用户向量空间</li>
              <li>智能体基于用户向量空间生成论文/项目 → 存入项目向量库</li>
              <li>项目落地产生收益 → 学习币激励用户继续参与</li>
            </ol>
          </div>
          
          {/* 下一步行动建议 */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-2">下一步行动建议</h3>
            <ol className="list-decimal pl-5 mb-3 text-gray-600">
              <li><strong>先把实验室首页落地</strong>：将之前设计的「研究任务阶梯」和「研究员成长体系」做成前端页面，作为用户进入实验室的入口。</li>
              <li><strong>再打通用户层与实验室数据</strong>：让用户在实验室的行为自动同步到用户向量空间。</li>
              <li><strong>最后开放项目孵化</strong>：将项目层向量库与实验室"孵化区"对接，让用户可直接落地项目。</li>
            </ol>
          </div>
        </div>
      </main>

      {/* 底部导航栏 */}
      <nav className="flex justify-around items-center py-4 border-t">
        <div className="flex flex-col items-center text-green-500 cursor-pointer font-medium" onClick={() => navigate('/home')}>
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

export default HomePage;