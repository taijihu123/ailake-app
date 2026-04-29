import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/images/avatar.jpg';
import { useWallet } from '../hooks/useWallet';

interface EarnMethod {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'balance' | 'history' | 'wallet' | 'personal'>('balance');
  const { balance, transactions, loading, error } = useWallet();

  const userData = {
    avatar: avatar,
    name: "用户名",
    phone: "138****1234",
    email: "邮箱@example.com",
    address: "北京市朝阳区XX街道XX小区XX号楼",
    idCard: "110***********1234",
    balance: balance,
    walletAddress: "0x123456789abcdef",
    walletStatus: "已绑定"
  };

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

  const handleRecharge = () => {
    console.log('充值功能开发中');
  };

  const handleWithdraw = () => {
    console.log('提现功能开发中');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      {/* 顶部用户栏 */}
      <div className="bg-green-600 text-white p-4">
        <div className="flex items-center">
          <img 
            src={userData.avatar} 
            className="w-12 h-12 rounded-full mr-3 border-2 border-white object-cover" 
            alt="用户头像" 
          />
          <h2 className="text-lg font-bold">{userData.name}</h2>
        </div>
      </div>

      {/* 标签栏 */}
      <div className="bg-white border-b overflow-x-auto">
        <div className="flex whitespace-nowrap">
          <button 
            className={`flex-1 min-w-[80px] py-3 text-center text-sm font-medium transition-colors ${activeTab === 'balance' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`} 
            onClick={() => setActiveTab('balance')}
          >
            余额
          </button>
          <button 
            className={`flex-1 min-w-[80px] py-3 text-center text-sm font-medium transition-colors ${activeTab === 'history' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`} 
            onClick={() => setActiveTab('history')}
          >
            历史记录
          </button>
          <button 
            className={`flex-1 min-w-[80px] py-3 text-center text-sm font-medium transition-colors ${activeTab === 'wallet' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`} 
            onClick={() => setActiveTab('wallet')}
          >
            数字钱包
          </button>
          <button 
            className={`flex-1 min-w-[80px] py-3 text-center text-sm font-medium transition-colors ${activeTab === 'personal' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`} 
            onClick={() => setActiveTab('personal')}
          >
            个人信息
          </button>
        </div>
      </div>

      {/* 内容区 */}
      <main className="flex-1 p-4 overflow-y-auto pb-20">
        {activeTab === 'balance' && (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center mb-6">
              <h4 className="text-gray-600 mb-2">我的学习币</h4>
              <p className="text-3xl font-bold text-green-600 mb-6">{userData.balance}</p>
              <div className="flex justify-center space-x-4">
                <button onClick={handleRecharge} className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium">充值</button>
                <button onClick={handleWithdraw} className="border border-green-600 text-green-600 px-6 py-2 rounded-lg text-sm font-medium">提现</button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
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
          </>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h4 className="text-lg font-medium mb-4 text-gray-800">交易历史</h4>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">加载中...</div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-red-500">{error}</div>
              </div>
            ) : transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex justify-between items-start pb-3 border-b border-gray-100">
                    <div>
                      <h4 className="font-medium text-gray-800">{transaction.reason}</h4>
                      <p className="text-sm text-gray-500">{formatDate(transaction.timestamp)}</p>
                    </div>
                    <div className={`font-medium ${getTransactionTypeColor(transaction.type)}`}>
                      {transaction.type === 'expense' ? '-' : '+'}{transaction.amount}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-center py-8">
                <p>暂无交易记录</p>
                <p className="text-sm mt-2">完成首次充值/提现后，记录将显示在这里</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h4 className="text-lg font-medium mb-4 text-gray-800">数字钱包信息</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500">钱包地址</span>
                <span className="font-medium text-gray-800">{userData.walletAddress}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500">绑定状态</span>
                <span className="text-green-600 font-medium">{userData.walletStatus}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg mt-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mr-4">💳</div>
                  <div>
                    <h4 className="font-medium text-gray-800">绑定银行卡</h4>
                    <p className="text-sm text-gray-500">用于充值和提现</p>
                  </div>
                </div>
                <button className="text-green-600 text-sm">绑定</button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mr-4">🔒</div>
                  <div>
                    <h4 className="font-medium text-gray-800">安全设置</h4>
                    <p className="text-sm text-gray-500">修改支付密码</p>
                  </div>
                </div>
                <button className="text-green-600 text-sm">设置</button>
              </div>
              
              <button className="mt-4 text-green-600 text-sm">刷新钱包信息</button>
            </div>
          </div>
        )}

        {activeTab === 'personal' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium text-gray-800">个人信息</h4>
              <button className="text-green-600 text-sm">编辑信息</button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500">姓名</span>
                <span className="font-medium text-gray-800">{userData.name}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500">手机号</span>
                <span className="font-medium text-gray-800">{userData.phone}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500">电子邮箱</span>
                <span className="font-medium text-gray-800">{userData.email}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500">身份证号</span>
                <span className="font-medium text-gray-800">{userData.idCard}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-500">联系地址</span>
                <span className="font-medium text-gray-600 text-right max-w-[60%]">{userData.address}</span>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-medium mb-4 text-gray-800">账号设置</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">📱</div>
                    <span className="text-gray-800">账号设置</span>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
                <div className="flex items-center justify-between p-3 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">🔒</div>
                    <span className="text-gray-800">隐私设置</span>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
                <div className="flex items-center justify-between p-3 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">📞</div>
                    <span className="text-gray-800">联系客服</span>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
                <div className="flex items-center justify-between p-3 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">ℹ️</div>
                    <span className="text-gray-800">关于我们</span>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
              </div>
            </div>
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
        <button onClick={() => navigate('/my')} className="flex flex-col items-center py-2 px-4 text-green-600">
          <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <span className="text-xs font-medium">我的</span>
        </button>
      </nav>
    </div>
  );
};

export default MyPage;