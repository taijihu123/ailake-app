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

const mockBalance = 12800;
const mockTransactions: Transaction[] = [
  { id: '1', type: 'income', amount: 5000, reason: '完成学习任务奖励', timestamp: '2024-01-15T10:30:00Z' },
  { id: '2', type: 'expense', amount: 2000, reason: '兑换课程优惠券', timestamp: '2024-01-14T15:45:00Z' },
  { id: '3', type: 'income', amount: 3000, reason: '邀请好友注册奖励', timestamp: '2024-01-13T09:20:00Z' },
  { id: '4', type: 'income', amount: 4800, reason: '参与学习活动奖励', timestamp: '2024-01-12T14:10:00Z' },
  { id: '5', type: 'expense', amount: 1000, reason: '兑换学习资料', timestamp: '2024-01-11T11:30:00Z' },
];

export const useWallet = (userId: string = 'user_1'): UseWalletReturn => {
  const [balance, setBalance] = useState<number>(mockBalance);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const balanceResponse = await api.wallet.getBalance(userId);
      if (balanceResponse.data && typeof balanceResponse.data.balance === 'number') {
        setBalance(balanceResponse.data.balance);
      } else {
        setBalance(mockBalance);
      }
      
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
        setTransactions(mockTransactions);
      }
    } catch (err) {
      console.warn('API请求失败，使用本地mock数据:', err);
      setError(null);
      setBalance(mockBalance);
      setTransactions(mockTransactions);
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
