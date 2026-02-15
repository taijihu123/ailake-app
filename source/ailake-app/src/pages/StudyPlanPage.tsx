import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const StudyPlanPage: React.FC = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState<string[]>(['']);
  const [timePerWeek, setTimePerWeek] = useState<number | ''>('');
  const [creating, setCreating] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleAddGoal = () => {
    setGoals([...goals, '']);
  };

  const handleRemoveGoal = (index: number) => {
    const newGoals = [...goals];
    newGoals.splice(index, 1);
    setGoals(newGoals);
  };

  const handleGoalChange = (index: number, value: string) => {
    const newGoals = [...goals];
    newGoals[index] = value;
    setGoals(newGoals);
  };

  const handleCreatePlan = async () => {
    const validGoals = goals.filter(goal => goal.trim());
    if (validGoals.length === 0) {
      setMessage('请至少添加一个学习目标');
      return;
    }

    try {
      setCreating(true);
      await api.ailake.createStudyPlan({
        user_id: 'user_1',
        goals: validGoals,
        time_per_week: timePerWeek || undefined
      });
      setMessage('学习计划创建成功！');
      // 重置表单
      setTimeout(() => {
        setGoals(['']);
        setTimePerWeek('');
        setMessage(null);
      }, 2000);
    } catch (err) {
      setMessage('创建学习计划失败');
      console.error('创建学习计划失败:', err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      {/* 顶部状态栏 */}
      <div className="w-full flex justify-between items-center py-4 px-4 bg-white shadow-sm">
        <button onClick={() => navigate('/home')} className="text-sm text-green-600">
          返回
        </button>
        <div className="text-sm font-medium">学习计划</div>
        <div className="w-8"></div> {/* 占位符 */}
      </div>

      {/* 核心内容区 */}
      <main className="flex-1 p-4">
        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-green-600 mb-2">制定学习计划</h1>
          <p className="text-gray-600">创建个性化的学习计划</p>
        </div>

        {/* 学习计划表单 */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          {/* 学习目标 */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">学习目标</h3>
            <div className="space-y-3">
              {goals.map((goal, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => handleGoalChange(index, e.target.value)}
                    placeholder={`目标 ${index + 1}`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  {goals.length > 1 && (
                    <button
                      onClick={() => handleRemoveGoal(index)}
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={handleAddGoal}
                className="w-full text-center text-green-600 py-2 border border-dashed border-green-300 rounded-lg text-sm"
              >
                + 添加目标
              </button>
            </div>
          </div>

          {/* 每周学习时间 */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">每周学习时间</h3>
            <input
              type="number"
              value={timePerWeek}
              onChange={(e) => setTimePerWeek(e.target.value ? parseInt(e.target.value) : '')}
              placeholder="每周学习时间（小时）"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              min="1"
              max="168"
            />
            <p className="text-xs text-gray-500 mt-1">可选，建议每周学习10-20小时</p>
          </div>

          {/* 消息提示 */}
          {message && (
            <div className={`mb-4 py-2 px-3 rounded-lg text-center ${message.includes('成功') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}

          {/* 创建按钮 */}
          <button
            onClick={handleCreatePlan}
            className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors"
            disabled={creating}
          >
            {creating ? '创建中...' : '创建学习计划'}
          </button>
        </div>

        {/* 学习计划建议 */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium mb-3">学习计划建议</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>设定明确、可衡量的学习目标</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>合理安排每周学习时间，保持连续性</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>结合课程内容制定具体的学习计划</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>定期回顾和调整学习计划</span>
            </li>
          </ul>
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

export default StudyPlanPage;