import axios from 'axios';

const API_BASE_URL = '/api';

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

// 公开接口列表
const publicEndpoints = [
  '/auth/register',
  '/auth/login',
  '/auth/forgot-password',
  '/auth/reset-password'
];

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const isPublicEndpoint = publicEndpoints.some(endpoint => 
      config.url?.startsWith(endpoint)
    );
    
    if (!isPublicEndpoint) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = '网络请求失败，请稍后重试';
    
    if (error.response?.status === 401) {
      errorMessage = '登录已过期，请重新登录';
    } else if (error.response?.status === 404) {
      errorMessage = '请求的资源不存在';
    } else if (error.response?.status === 500) {
      errorMessage = '服务器内部错误，请稍后重试';
    } else if (error.response?.data?.msg) {
      errorMessage = error.response.data.msg;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    const newError = new Error(errorMessage);
    (newError as any).originalError = error;
    (newError as any).status = error.response?.status;
    
    return Promise.reject(newError);
  }
);

// API 服务
export const api = {
  // 基础请求方法
  get: (url: string, params?: any) => instance.get(url, { params }),
  post: (url: string, data?: any) => instance.post(url, data),
  put: (url: string, data?: any) => instance.put(url, data),
  delete: (url: string, data?: any) => instance.delete(url, { data }),
  
  // AILake 业务
  ailake: {
    getCourses: () => instance.get('/ailake/learning/courses'),
    getResearchProjects: () => instance.get('/ailake/research/projects'),
    getCommunityPosts: () => instance.get('/ailake/community/posts'),
    createCommunityPost: (data: { user_id: string; title: string; content: string }) => instance.post('/ailake/community/create', data),
    createStudyPlan: (data: { user_id: string; goals: string[]; time_per_week?: number }) => instance.post('/ailake/study/plan', data),
  },
  
  // 知识库
  knowledge: {
    search: (query: string, topK = 5) => instance.post('/knowledge/search', { query, top_k: topK }),
    add: (content: string, metadata?: any) => instance.post('/knowledge/add', { content, metadata }),
    delete: (docId: string) => instance.delete('/knowledge/delete', { data: { doc_id: docId } }),
    getStats: () => instance.get('/knowledge/stats'),
  },
  
  // 钱包
  wallet: {
    getBalance: (userId: string) => instance.get('/wallet/balance', { params: { user_id: userId } }),
    transfer: (fromUserId: string, toUserId: string, amount: number) => instance.post('/wallet/transfer', { from_user_id: fromUserId, to_user_id: toUserId, amount }),
    getHistory: (userId: string) => instance.get('/wallet/history', { params: { user_id: userId } }),
    reward: (userId: string, amount: number, reason: string) => instance.post('/wallet/reward', { user_id: userId, amount, reason }),
  },
  
  // Nobel 学术智能体
  nobel: {
    ask: (userId: string, question: string, field?: string) => instance.post('/lab/nobel/ask', { user_id: userId, question, field }),
    getResearchFields: () => instance.get('/lab/nobel/fields'),
    suggestPapers: (userId: string, topic: string, field?: string) => instance.post('/lab/nobel/papers/suggest', { user_id: userId, topic, field }),
    createResearchPlan: (userId: string, topic: string, field: string, duration?: string) => instance.post('/lab/nobel/research/plan', { user_id: userId, topic, field, duration }),
  },
  
  // 研究协作
  research: {
    getTopics: () => instance.get('/lab/research/topics'),
    createTopic: (data: { user_id: string; title: string; description: string }) => instance.post('/lab/research/topics/create', data),
    getPapers: () => instance.get('/lab/research/papers'),
    getCollaborations: () => instance.get('/lab/research/collaborations'),
    joinCollaboration: (userId: string, collaborationId: string) => instance.post('/lab/research/collaborations/join', { user_id: userId, collaboration_id: collaborationId }),
  },
};