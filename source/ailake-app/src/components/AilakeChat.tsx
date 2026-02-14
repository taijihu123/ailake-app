import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

interface Message {
  role: string;
  content: string;
}

const AilakeChat: React.FC = () => {
  // 场景列表：对应三个基础层向量库
  const scenes = ['teaching', 'lab', 'agent'];
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 获取当前场景名称
  const currentScene = scenes[currentSceneIndex];
  const sceneNameMap: Record<string, string> = {
    teaching: '教学辅导',
    lab: '实验室孵化',
    agent: '智能体协作'
  };

  // 场景切换时初始化消息
  useEffect(() => {
    setMessages([{
      role: 'system',
      content: `已切换到「${sceneNameMap[currentScene]}」模式，请开始提问。`
    }]);
  }, [currentScene]);

  // 上下箭头切换场景
  const switchScene = (direction: 'up' | 'down') => {
    let newIndex = currentSceneIndex;
    if (direction === 'up') {
      newIndex = (currentSceneIndex - 1 + scenes.length) % scenes.length;
    } else {
      newIndex = (currentSceneIndex + 1) % scenes.length;
    }
    setCurrentSceneIndex(newIndex);
  };

  // 发送消息并调用向量检索
  const sendMessage = async () => {
    if (!input.trim()) return;
    
    // 添加用户消息
    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // 根据当前场景选择对应的向量库
      let searchResults;
      
      switch (currentScene) {
        case 'teaching':
          searchResults = await api.knowledge.search(`教学 ${input}`);
          break;
        case 'lab':
          searchResults = await api.knowledge.search(`实验室 ${input}`);
          break;
        case 'agent':
          searchResults = await api.knowledge.search(`智能体 ${input}`);
          break;
        default:
          searchResults = await api.knowledge.search(input);
      }

      // 生成AI回复
      const aiContent = generateAIResponse(input, currentScene, searchResults.data.results);
      const aiMsg: Message = { role: 'assistant', content: aiContent };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      console.error('对话失败:', e);
      const errorMsg: Message = {
        role: 'assistant',
        content: '抱歉，暂时无法处理您的请求，请稍后再试。'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // 根据搜索结果生成AI回复
  const generateAIResponse = (query: string, scene: string, results: any[]) => {
    if (results.length === 0) {
      return `在「${sceneNameMap[scene]}」模式下，我暂时没有找到关于「${query}」的相关信息。`;
    }

    // 提取搜索结果中的内容
    const relevantContent = results.slice(0, 2).map((result, index) => {
      const metadata = result.metadata || {};
      const title = metadata.title || `相关内容 ${index + 1}`;
      const content = metadata.content || result.content || '';
      return `${title}: ${content}`;
    }).join('\n');

    // 根据场景生成不同的回复模板
    switch (scene) {
      case 'teaching':
        return `在教学辅导模式下，关于「${query}」的相关信息：\n\n${relevantContent}\n\n希望这些信息对您的学习有所帮助！`;
      case 'lab':
        return `在实验室孵化模式下，关于「${query}」的项目相关信息：\n\n${relevantContent}\n\n这些资源可以帮助您更好地开展项目。`;
      case 'agent':
        return `在智能体协作模式下，关于「${query}」的相关能力：\n\n${relevantContent}\n\n智能体可以为您提供这些方面的帮助。`;
      default:
        return `关于「${query}」的相关信息：\n\n${relevantContent}`;
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-white rounded-lg shadow">
      {/* 顶部场景提示 */}
      <div className="p-4 border-b text-center text-gray-600 bg-green-50">
        当前模式：{sceneNameMap[currentScene]}
      </div>

      {/* 对话内容区 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`p-3 rounded-lg ${msg.role === 'user' ? 'bg-green-50 ml-auto max-w-[80%]' : 'bg-gray-50 mr-auto max-w-[80%]'}
          `}>
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="p-3 rounded-lg bg-gray-50 mr-auto max-w-[80%]">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* 底部输入区 + 上下箭头 */}
      <div className="p-4 border-t flex items-center gap-2">
        <button 
          onClick={() => switchScene('up')} 
          className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          aria-label="切换到上一个场景"
        >
          ↑
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入问题，按回车发送..."
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button 
          onClick={sendMessage} 
          disabled={isLoading}
          className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          发送
        </button>
        <button 
          onClick={() => switchScene('down')} 
          className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          aria-label="切换到下一个场景"
        >
          ↓
        </button>
      </div>
    </div>
  );
};

export default AilakeChat;