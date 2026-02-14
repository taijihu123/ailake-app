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
  // 控制功能标签切换（新增 personal 选项对应个人信息）
  const [activeTab, setActiveTab] = useState<'balance' | 'history' | 'wallet' | 'personal'>('balance');
  const { balance, transactions, loading, error } = useWallet();

  // 模拟用户数据
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
    <div className="min-h-screen bg-gray-50">
      {/* 顶部极简用户栏：仅保留头像+用户名，不干扰功能区 */}
      <div className="bg-green-600 text-white p-4">
        <div className="flex items-center">
          <img 
            src={userData.avatar} 
            className="w-12 h-12 rounded-full mr-3 border-2 border-white" 
            alt="用户头像" 
          />
          <h2 className="text-lg font-bold">{userData.name}</h2>
        </div>
      </div>

      {/* 核心功能标签栏：四个并列标签（余额/历史/钱包/个人信息） */}
      <div className="bg-white border-b overflow-x-auto">
        <div className="flex whitespace-nowrap">
          <button 
            className={`flex-1 min-w-[80px] py-3 text-center font-medium ${activeTab === 'balance' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`} 
            onClick={() => setActiveTab('balance')}
          >
            余额
          </button>
          <button 
            className={`flex-1 min-w-[80px] py-3 text-center font-medium ${activeTab === 'history' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`} 
            onClick={() => setActiveTab('history')}
          >
            历史记录
          </button>
          <button 
            className={`flex-1 min-w-[80px] py-3 text-center font-medium ${activeTab === 'wallet' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`} 
            onClick={() => setActiveTab('wallet')}
          >
            数字钱包
          </button>
          <button 
            className={`flex-1 min-w-[80px] py-3 text-center font-medium ${activeTab === 'personal' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`} 
            onClick={() => setActiveTab('personal')}
          >
            个人信息
          </button>
        </div>
      </div>

      {/* 功能内容区：每个标签对应独立模块 */}
      <div className="p-4">
        {/* 1. 余额标签内容 */}
        {activeTab === 'balance' && (
          <>
            {/* 余额显示 */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-center mb-6">
              <h4 className="text-gray-600 mb-2">我的学习币</h4>
              <p className="text-3xl font-bold text-green-600 mb-6">{userData.balance}</p>
              <div className="flex justify-center space-x-4">
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg">充值</button>
                <button className="border border-green-600 text-green-600 px-6 py-2 rounded-lg">提现</button>
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
          </>
        )}

        {/* 2. 历史记录标签内容 */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h4 className="text-lg font-medium mb-4">交易历史</h4>
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
                      <h4 className="font-medium">{transaction.reason}</h4>
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

        {/* 3. 数字钱包标签内容 */}
        {activeTab === 'wallet' && (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h4 className="text-lg font-medium mb-4">数字钱包信息</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-500">钱包地址</span>
                <span className="font-medium">{userData.walletAddress}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-500">绑定状态</span>
                <span className="text-green-600 font-medium">{userData.walletStatus}</span>
              </div>
              
              {/* 绑定银行卡 */}
              <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg mt-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mr-4">
                    💳
                  </div>
                  <div>
                    <h4 className="font-medium">绑定银行卡</h4>
                    <p className="text-sm text-gray-500">用于充值和提现</p>
                  </div>
                </div>
                <button className="text-green-600 text-sm">绑定</button>
              </div>
              
              {/* 安全设置 */}
              <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mr-4">
                    🔒
                  </div>
                  <div>
                    <h4 className="font-medium">安全设置</h4>
                    <p className="text-sm text-gray-500">修改支付密码</p>
                  </div>
                </div>
                <button className="text-green-600 text-sm">设置</button>
              </div>
              
              <button className="mt-4 text-green-600 text-sm">刷新钱包信息</button>
            </div>
          </div>
        )}

        {/* 4. 个人信息标签内容（核心新增模块） */}
        {activeTab === 'personal' && (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium">个人信息</h4>
              <button className="text-green-600 text-sm">编辑信息</button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-500">姓名</span>
                <span className="font-medium">{userData.name}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-500">手机号</span>
                <span className="font-medium">{userData.phone}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-500">电子邮箱</span>
                <span className="font-medium">{userData.email}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-500">身份证号</span>
                <span className="font-medium">{userData.idCard}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-500">联系地址</span>
                <span className="font-medium text-right max-w-[60%] text-gray-600">{userData.address}</span>
              </div>
            </div>
            
            {/* 账号设置相关 */}
            <div className="mt-8">
              <h4 className="text-lg font-medium mb-4">账号设置</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">
                      📱
                    </div>
                    <span>账号设置</span>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
                <div className="flex items-center justify-between p-3 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">
                      🔒
                    </div>
                    <span>隐私设置</span>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
                <div className="flex items-center justify-between p-3 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">
                      📞
                    </div>
                    <span>联系客服</span>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
                <div className="flex items-center justify-between p-3 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">
                      ℹ️
                    </div>
                    <span>关于我们</span>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航栏 */}
      <nav className="flex justify-around items-center py-4 border-t bg-white">
        <div className="flex flex-col items-center text-gray-500 cursor-pointer" onClick={() => navigate('/home')}>
          <span className="text-sm">首页</span>
        </div>
        <div className="flex flex-col items-center text-gray-500 cursor-pointer" onClick={() => navigate('/courses')}>
          <span className="text-sm">学习</span>
        </div>
        <div className="flex flex-col items-center text-green-600 font-medium cursor-pointer" onClick={() => navigate('/my')}>
          <span className="text-sm">我的</span>
        </div>
      </nav>
    </div>
  );
};

export default MyPage;