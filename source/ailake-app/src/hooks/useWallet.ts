import { useState, useEffect } from 'react';
import { api } from '../services/api';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  reason: string;
  timestamp: string;
}

interface UseWalletReturn {
  balance: number;
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  refreshWalletData: () => Promise<void>;
}

export const useWallet = (userId: string = 'user_1'): UseWalletReturn => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 获取余额
      const balanceResponse = await api.wallet.getBalance(userId);
      if (balanceResponse.data && typeof balanceResponse.data.balance === 'number') {
        setBalance(balanceResponse.data.balance);
      } else {
        setBalance(0);
      }
      
      // 获取交易历史
      const historyResponse = await api.wallet.getHistory(userId);
      if (historyResponse.data && Array.isArray(historyResponse.data.transactions)) {
        setTransactions(historyResponse.data.transactions.map((tx: any) => ({
          id: tx.id,
          type: tx.type,
          amount: tx.amount,
          reason: tx.reason,
          timestamp: tx.timestamp
        })));
      } else {
        setTransactions([]);
      }
    } catch (err) {
      console.error('获取钱包数据失败:', err);
      setError('获取钱包数据失败');
      // 发生错误时设置默认值，确保页面能够正常渲染
      setBalance(0);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, [userId]);

  return {
    balance,
    transactions,
    loading,
    error,
    refreshWalletData: fetchWalletData
  };
};
