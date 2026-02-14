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
    {
      id: '1',
      title: '完成学习任务',
      description: '每日学习任务和课程作业',
      icon: '📚'
    },
    {
      id: '2',
      title: '推荐好友注册',
      description: '邀请新用户注册并完成首次学习',
      icon: '👥'
    },
    {
      id: '3',
      title: '参与学习活动',
      description: '线上线下学习活动和竞赛',
      icon: '🎉'
    },
    {
      id: '4',
      title: '评价课程内容',
      description: '对已学课程进行评价和反馈',
      icon: '⭐'
    }
  ];

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'income':
        return 'text-[#09bb07]';
      case 'expense':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };



  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 顶部状态栏 */}
      <div className="w-full flex justify-between items-center py-4 px-4 bg-white shadow-sm">
        <button onClick={() => navigate('/home')} className="text-sm text-[#09bb07]">
          返回
        </button>
        <div className="text-sm font-medium">学习币</div>
        <div className="w-8"></div> {/* 占位符 */}
      </div>

      {/* 标签页导航 */}
      <div className="flex border-b border-gray-200 bg-white">
        <button 
          onClick={() => setActiveTab('balance')}
          className={`flex-1 py-3 text-center ${activeTab === 'balance' ? 'text-[#09bb07] border-b-2 border-[#09bb07] font-medium' : 'text-gray-500'}`}
        >
          余额显示
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 text-center ${activeTab === 'history' ? 'text-[#09bb07] border-b-2 border-[#09bb07] font-medium' : 'text-gray-500'}`}
        >
          交易历史
        </button>
        <button 
          onClick={() => setActiveTab('exchange')}
          className={`flex-1 py-3 text-center ${activeTab === 'exchange' ? 'text-[#09bb07] border-b-2 border-[#09bb07] font-medium' : 'text-gray-500'}`}
        >
          积分兑换
        </button>
        <button 
          onClick={() => setActiveTab('digital')}
          className={`flex-1 py-3 text-center ${activeTab === 'digital' ? 'text-[#09bb07] border-b-2 border-[#09bb07] font-medium' : 'text-gray-500'}`}
        >
          数字钱包
        </button>
      </div>

      {/* 核心内容区 */}
      <main className="flex-1 p-4">
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
            {/* 余额显示标签页 */}
            {activeTab === 'balance' && (
              <div>
                {/* 余额区域 */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8 text-center">
                  <h2 className="text-gray-600 mb-2">我的学习币</h2>
                  <div className="text-3xl font-bold text-[#09bb07]">
                    {balance}
                  </div>
                  <div className="flex justify-center space-x-4 mt-4">
                    <button className="bg-[#09bb07] text-white py-2 px-4 rounded-lg text-sm">
                      充值
                    </button>
                    <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm">
                      提现
                    </button>
                  </div>
                </div>

                {/* 如何获得学习币 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-4">如何获得学习币</h3>
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

            {/* 交易历史标签页 */}
            {activeTab === 'history' && (
              <div>
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h3 className="text-lg font-medium mb-4">交易记录</h3>
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
                              <div className="font-medium mb-1">{transaction.reason}</div>
                              <div className="text-xs text-gray-500">
                                {formatDate(transaction.timestamp)}
                              </div>
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
              </div>
            )}

            {/* 积分兑换标签页 */}
            {activeTab === 'exchange' && (
              <div>
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h3 className="text-lg font-medium mb-4">积分兑换</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mr-3">
                          <span className="text-lg">📚</span>
                        </div>
                        <div>
                          <h4 className="font-medium">学习资料</h4>
                          <p className="text-sm text-gray-600">专业课程资料</p>
                        </div>
                      </div>
                      <div className="text-[#09bb07] font-medium">500</div>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mr-3">
                          <span className="text-lg">🎓</span>
                        </div>
                        <div>
                          <h4 className="font-medium">课程折扣</h4>
                          <p className="text-sm text-gray-600">课程优惠券</p>
                        </div>
                      </div>
                      <div className="text-[#09bb07] font-medium">1000</div>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mr-3">
                          <span className="text-lg">🏆</span>
                        </div>
                        <div>
                          <h4 className="font-medium">学习证书</h4>
                          <p className="text-sm text-gray-600">专业认证证书</p>
                        </div>
                      </div>
                      <div className="text-[#09bb07] font-medium">2000</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 数字钱包标签页 */}
            {activeTab === 'digital' && (
              <div>
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h3 className="text-lg font-medium mb-4">数字钱包</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mr-3">
                          <span className="text-lg">💳</span>
                        </div>
                        <div>
                          <h4 className="font-medium">绑定银行卡</h4>
                          <p className="text-sm text-gray-600">用于充值和提现</p>
                        </div>
                      </div>
                      <button className="text-[#09bb07] text-sm">绑定</button>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mr-3">
                          <span className="text-lg">🔒</span>
                        </div>
                        <div>
                          <h4 className="font-medium">安全设置</h4>
                          <p className="text-sm text-gray-600">修改支付密码</p>
                        </div>
                      </div>
                      <button className="text-[#09bb07] text-sm">设置</button>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mr-3">
                          <span className="text-lg">📊</span>
                        </div>
                        <div>
                          <h4 className="font-medium">消费统计</h4>
                          <p className="text-sm text-gray-600">查看消费记录</p>
                        </div>
                      </div>
                      <button className="text-[#09bb07] text-sm">查看</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* 底部导航栏 */}
      <nav className="flex justify-around items-center py-4 border-t bg-white">
        <div className="flex flex-col items-center text-gray-500 cursor-pointer" onClick={() => navigate('/home')}>
          <span className="text-sm">首页</span>
        </div>
        <div className="flex flex-col items-center text-gray-500 cursor-pointer" onClick={() => navigate('/my')}>
          <span className="text-sm">我的</span>
        </div>
      </nav>
    </div>
  );
};

export default WalletPage;