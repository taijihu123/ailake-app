import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: string;
}

const CommunityPage: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [creating, setCreating] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await api.ailake.getCommunityPosts();
        setPosts(response.data.posts);
      } catch (err) {
        setError('获取社区帖子失败');
        console.error('获取社区帖子失败:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert('请填写标题和内容');
      return;
    }

    try {
      setCreating(true);
      await api.ailake.createCommunityPost({
        user_id: 'user_1',
        title: newPost.title,
        content: newPost.content
      });
      // 刷新帖子列表
      const response = await api.ailake.getCommunityPosts();
      setPosts(response.data.posts);
      setNewPost({ title: '', content: '' });
      setShowCreateModal(false);
    } catch (err) {
      alert('创建帖子失败');
      console.error('创建帖子失败:', err);
    } finally {
      setCreating(false);
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN');
  };

  return (
    <div className="min-h-screen bg-light-green-50 flex flex-col">
      {/* 顶部状态栏 */}
      <div className="w-full flex justify-between items-center py-4 px-4 bg-white shadow-sm">
        <button onClick={() => navigate('/home')} className="text-sm text-green-600">
          返回
        </button>
        <div className="text-sm font-medium">社区</div>
        <button onClick={() => setShowCreateModal(true)} className="text-sm text-green-600">
          发布
        </button>
      </div>

      {/* 核心内容区 */}
      <main className="flex-1 p-4">
        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-green-600 mb-2">社区讨论</h1>
          <p className="text-gray-600">加入社区讨论，分享您的见解</p>
        </div>

        {/* 帖子列表 */}
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-gray-500">加载中...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-red-500">{error}</div>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-gray-500">暂无社区帖子</div>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium mb-1">{post.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{post.content}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>作者: {post.author}</span>
                      <span>{formatDate(post.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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

      {/* 创建帖子弹窗 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">发布帖子</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-500">
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">标题</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="请输入帖子标题"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">内容</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg h-32"
                  placeholder="请输入帖子内容"
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm"
                >
                  取消
                </button>
                <button
                  onClick={handleCreatePost}
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg text-sm"
                  disabled={creating}
                >
                  {creating ? '发布中...' : '发布'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;