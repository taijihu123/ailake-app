import React from 'react';
import { useNavigate } from 'react-router-dom';

const WalletPage: React.FC = () => {
  const navigate = useNavigate();
  
  // 加密货币数据
  const cryptocurrencies = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', amount: '0.01352', value: '$845.54', color: 'bg-orange-500' },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', amount: '0.1329', value: '$293.17', color: 'bg-purple-500' },
  ];

  // 交易记录数据
  const transactions = [
    { id: 1, type: 'Sent', symbol: 'BTC', date: '4月8日', amount: '-BTC 0.085', value: '$532.38', isPositive: false },
    { id: 2, type: 'Bought', symbol: 'XRP', date: '4月8日', amount: '+XRP 20.12', value: '$33.66', isPositive: true },
    { id: 3, type: 'Sent', symbol: 'ETH', date: '3月29日', amount: '-ETH 0.091', value: '$201.52', isPositive: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
      {/* 头部信息区 */}
      <header className="bg-purple-600 text-white text-center py-6">
        <div className="flex justify-between items-center px-4">
          <button onClick={() => navigate('/')} className="text-white">
            返回
          </button>
          <div className="flex-1">
            <h1 className="text-sm uppercase tracking-wider">Combined Wallet Value</h1>
            <p className="text-3xl font-bold mt-2">$1,592.02</p>
          </div>
          <div className="w-10"></div> {/* 占位符 */}
        </div>
      </header>

      {/* 快捷操作区 */}
      <div className="flex justify-center space-x-4 py-6">
        <button className="bg-white text-purple-600 py-2 px-6 rounded-lg shadow flex items-center">
          <div className="w-5 h-5 bg-purple-600 rounded-full mr-2"></div>
          Send
        </button>
        <button className="bg-white text-purple-600 py-2 px-6 rounded-lg shadow flex items-center">
          <div className="w-5 h-5 bg-purple-600 rounded-full mr-2"></div>
          Receive
        </button>
        <button className="bg-white text-purple-600 py-2 px-6 rounded-lg shadow flex items-center">
          <div className="w-5 h-5 bg-purple-600 rounded-full mr-2"></div>
          Buy/Sell
        </button>
      </div>

      {/* 资产列表区 */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">My Cryptocurrencies</h2>
        </div>
        <div className="space-y-4">
          {cryptocurrencies.map((crypto) => (
            <div key={crypto.id} className="bg-white rounded-xl p-4 shadow">
              <div className="flex items-center">
                <div className={`w-10 h-10 ${crypto.color} rounded-full mr-4`}></div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-bold">{crypto.symbol} {crypto.name}</h3>
                    <p className="font-bold">{crypto.value}</p>
                  </div>
                  <p className="text-gray-500">{crypto.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 交易记录区 */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Transactions</h2>
          <a href="#" className="text-blue-500 text-sm">View all</a>
        </div>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="bg-white rounded-xl p-4 shadow">
              <div className="flex justify-between">
                <div>
                  <h3 className={`font-bold ${transaction.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {transaction.type} {transaction.symbol}
                  </h3>
                  <p className="text-gray-500 text-sm">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${transaction.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {transaction.value}
                  </p>
                  <p className="text-gray-500 text-sm">{transaction.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部导航栏 */}
      <nav className="flex justify-around items-center py-4 border-t bg-white mt-6">
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 bg-gray-400 rounded mb-1"></div>
          <span className="text-xs">HOME</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 bg-gray-400 rounded mb-1"></div>
          <span className="text-xs">NEWS</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 bg-gray-400 rounded mb-1"></div>
          <span className="text-xs">ALERT</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 bg-gray-400 rounded mb-1"></div>
          <span className="text-xs">PROFILE</span>
        </div>
      </nav>
    </div>
  );
};

export default WalletPage;