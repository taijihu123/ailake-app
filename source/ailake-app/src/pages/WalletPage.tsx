import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';

interface EarnMethod {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const WalletPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'balance' | 'history' | 'exchange' | 'digital'>('balance');
  const { balance, transactions, loading, error } = useWallet();

  const earnMethods: EarnMethod[] = [
    { id: '1', title: '完成学习任务', description: '每日学习任务和课程作业', icon: '📚' },
    { id: '2', title: '推荐好友注册', description: '邀请新用户注册并完成首次学习', icon: '👥' },
    { id: '3', title: '参与学习活动', description: '线上线下学习活动和竞赛', icon: '🎉' },
    { id: '4', title: '评价课程内容', description: '对已学课程进行评价和反馈', icon: '⭐' }
  ];

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'income': return 'text-green-600';
      case 'expense': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      {/* 顶部状态栏 */}
      <header className="w-full flex justify-between items-center py-4 px-4 bg-white shadow-sm">
        <button onClick={() => navigate('/home')} className="text-sm text-green-600">
          ← 返回
        </button>
        <div className="text-sm font-medium text-gray-800">学习币</div>
        <div className="w-8"></div>
      </header>

      {/* 标签页导航 */}
      <div className="flex border-b border-gray-200 bg-white">
        <button 
          onClick={() => setActiveTab('balance')}
          className={`flex-1 py-3 text-center text-sm transition-colors ${activeTab === 'balance' ? 'text-green-600 border-b-2 border-green-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
        >
          余额显示
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 text-center text-sm transition-colors ${activeTab === 'history' ? 'text-green-600 border-b-2 border-green-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
        >
          交易历史
        </button>
        <button 
          onClick={() => setActiveTab('exchange')}
          className={`flex-1 py-3 text-center text-sm transition-colors ${activeTab === 'exchange' ? 'text-green-600 border-b-2 border-green-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
        >
          积分兑换
        </button>
        <button 
          onClick={() => setActiveTab('digital')}
          className={`flex-1 py-3 text-center text-sm transition-colors ${activeTab === 'digital' ? 'text-green-600 border-b-2 border-green-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
        >
          数字钱包
        </button>
      </div>

      {/* 核心内容区 */}
      <main className="flex-1 p-4 overflow-y-auto pb-20">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">加载中...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-red-500">{error}</div>
          </div>
        ) : (
          <>
            {activeTab === 'balance' && (
              <div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 text-center">
                  <h2 className="text-gray-600 mb-2">我的学习币</h2>
                  <div className="text-3xl font-bold text-green-600">{balance}</div>
                  <div className="flex justify-center space-x-4 mt-4">
                    <button className="bg-green-600 text-white py-2 px-6 rounded-lg text-sm font-medium">
                      充值
                    </button>
                    <button className="bg-gray-100 text-gray-700 py-2 px-6 rounded-lg text-sm font-medium">
                      提现
                    </button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium mb-4 text-gray-800">如何获得学习币</h3>
                  <div className="space-y-4">
                    {earnMethods.map((method) => (
                      <div key={method.id} className="flex items-start">
                        <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mr-3">
                          <span className="text-lg">{method.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{method.title}</h4>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-4 text-gray-800">交易记录</h3>
                {transactions.length === 0 ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="text-gray-500">暂无交易记录</div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-gray-800 mb-1">{transaction.reason}</div>
                            <div className="text-xs text-gray-500">{formatDate(transaction.timestamp)}</div>
                          </div>
                          <div className={`font-medium ${getTransactionTypeColor(transaction.type)}`}>
                            {transaction.type === 'expense' ? '-' : '+'}{transaction.amount}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'exchange' && (
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-4 text-gray-800">积分兑换</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mr-3">
                        <span className="text-lg">📚</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">学习资料</h4>
                        <p className="text-sm text-gray-600">专业课程资料</p>
                      </div>
                    </div>
                    <div className="text-green-600 font-medium">500</div>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mr-3">
                        <span className="text-lg">🎓</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">课程折扣</h4>
                        <p className="text-sm text-gray-600">课程优惠券</p>
                      </div>
                    </div>
                    <div className="text-green-600 font-medium">1000</div>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mr-3">
                        <span className="text-lg">🏆</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">学习证书</h4>
                        <p className="text-sm text-gray-600">专业认证证书</p>
                      </div>
                    </div>
                    <div className="text-green-600 font-medium">2000</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'digital' && (
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-4 text-gray-800">数字钱包</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mr-3">
                        <span className="text-lg">💳</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">绑定银行卡</h4>
                        <p className="text-sm text-gray-600">用于充值和提现</p>
                      </div>
                    </div>
                    <button className="text-green-600 text-sm">绑定</button>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mr-3">
                        <span className="text-lg">🔒</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">安全设置</h4>
                        <p className="text-sm text-gray-600">修改支付密码</p>
                      </div>
                    </div>
                    <button className="text-green-600 text-sm">设置</button>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mr-3">
                        <span className="text-lg">📊</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">消费统计</h4>
                        <p className="text-sm text-gray-600">查看消费记录</p>
                      </div>
                    </div>
                    <button className="text-green-600 text-sm">查看</button>
                  </div>
                </div>
              </div>
            )}
          </>
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
        <button onClick={() => navigate('/agent-usage')} className="flex flex-col items-center py-2 px-4 text-gray-400 hover:text-green-600 transition-colors">
          <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2a2 2 0 0 0-2 2c0 .74.4 1.38 1 1.73V7h-1a6 6 0 0 0-6 6v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h10v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-4a6 6 0 0 0-6-6h-1v-1.27c.6-.35 1-.99 1-1.73a2 2 0 0 0-2-2zm-4 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0z"/>
          </svg>
          <span className="text-xs font-medium">智能体</span>
        </button>
        <button onClick={() => navigate('/wallet')} className="flex flex-col items-center py-2 px-4 text-green-600">
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

export default WalletPage;