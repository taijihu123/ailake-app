import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChatWidgetConfig, SceneType } from '../types';

interface ChatPageProps {
  config: ChatWidgetConfig;
}

const ChatPage: React.FC<ChatPageProps> = ({ config }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentScene, setCurrentScene] = useState<SceneType | null>(null);
  const [messages, setMessages] = useState<Array<{
    id: string;
    content: string;
    sender: 'user' | 'agent';
    timestamp: string;
  }>>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 模拟获取URL参数中的场景类型
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scene = params.get('scene');
    
    if (scene === 'study') {
      // 学习场景
      console.log('进入学习场景');
      setCurrentScene('study');
      // 添加学习场景欢迎消息
      setMessages([
        {
          id: 'welcome',
          content: '你好！我是Ailake的学习助手。我在这里帮助你解答学习问题，提供学习资源和学习方法建议。请随时告诉我你在学习中遇到的困难，我会尽我所能帮助你。',
          sender: 'agent',
          timestamp: new Date().toISOString()
        }
      ]);
    } else if (scene === 'work') {
      // 工作场景
      console.log('进入工作场景');
      setCurrentScene('work');
      // 添加工作场景欢迎消息
      setMessages([
        {
          id: 'welcome',
          content: '你好！我是Ailake的工作助手。我在这里帮助你提高工作效率，提供专业建议和解决方案。请随时告诉我你在工作中遇到的问题，我会尽我所能帮助你。',
          sender: 'agent',
          timestamp: new Date().toISOString()
        }
      ]);
    } else if (scene === 'life') {
      // 生活场景
      console.log('进入生活场景');
      setCurrentScene('life');
      // 添加生活场景欢迎消息
      setMessages([
        {
          id: 'welcome',
          content: '你好！我是Ailake的生活助手。我在这里为你提供生活建议，解答生活问题，分享生活技巧。请随时告诉我你在生活中遇到的困扰，我会尽我所能帮助你。',
          sender: 'agent',
          timestamp: new Date().toISOString()
        }
      ]);
    } else {
      // 默认场景
      setCurrentScene(null);
      setMessages([]);
    }
  }, [location.search]);

  // 发送消息
  const sendMessage = async () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        content: inputMessage.trim(),
        sender: 'user' as const,
        timestamp: new Date().toISOString()
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');

      // 根据当前场景生成不同的回复
      setIsLoading(true);
      try {
        // 实际项目中，这里应该根据场景调用不同的后端API
        // 模拟API调用延迟
        setTimeout(() => {
          let replyContent = '';
          
          switch (currentScene) {
            case 'study':
              replyContent = `我理解你的学习问题: ${inputMessage.trim()}。作为你的学习助手，我建议你可以尝试分解学习目标，制定合理的学习计划，并且定期复习巩固。如果你需要更具体的学习资源或方法，随时告诉我。`;
              break;
            case 'work':
              replyContent = `关于你工作中的问题: ${inputMessage.trim()}。作为你的工作助手，我建议你可以分析问题的根本原因，制定解决方案，并且与团队成员保持良好的沟通。如果你需要更具体的工作建议或工具推荐，随时告诉我。`;
              break;
            case 'life':
              replyContent = `我了解你生活中的困扰: ${inputMessage.trim()}。作为你的生活助手，我建议你可以保持积极的心态，合理安排时间，并且多与朋友家人交流。如果你需要更具体的生活建议或技巧，随时告诉我。`;
              break;
            default:
              replyContent = `我收到了你的消息: ${inputMessage.trim()}`;
          }
          
          const agentReply = {
            id: (Date.now() + 1).toString(),
            content: replyContent,
            sender: 'agent' as const,
            timestamp: new Date().toISOString()
          };
          setMessages(prev => [...prev, agentReply]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('消息处理失败:', error);
        // 错误处理
        const agentReply = {
          id: (Date.now() + 1).toString(),
          content: '抱歉，我暂时无法处理你的请求。请稍后再试。',
          sender: 'agent' as const,
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, agentReply]);
        setIsLoading(false);
      }
    }
  };

  // 获取主题颜色
  const getThemeColor = () => {
    switch (config.theme) {
      case 'green':
        return 'from-ailake-green-100 to-ailake-green-200';
      case 'blue':
        return 'from-ailake-blue-100 to-ailake-blue-200';
      default:
        return 'from-ailake-green-100 to-ailake-green-200';
    }
  };

  // 获取主题按钮颜色
  const getThemeButtonColor = () => {
    switch (config.theme) {
      case 'green':
        return 'bg-ailake-green-500 hover:bg-ailake-green-600';
      case 'blue':
        return 'bg-ailake-blue-500 hover:bg-ailake-blue-600';
      default:
        return 'bg-ailake-green-500 hover:bg-ailake-green-600';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${getThemeColor()} flex flex-col`}>
      {/* 顶部控制区 */}
      <header className="flex justify-between items-center p-4">
        <button onClick={() => navigate('/')} className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <div className="flex flex-col space-y-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
          </div>
        </button>
        <div className="text-lg font-medium text-center flex-1">
          {currentScene === 'study' && '学习助手'}
          {currentScene === 'work' && '工作助手'}
          {currentScene === 'life' && '生活助手'}
          {!currentScene && 'Ailake Agent'}
        </div>
        <div className="w-8"></div> {/* 占位符，保持布局平衡 */}
      </header>

      {/* 对话核心区 */}
      <main className="flex-1 flex flex-col">
        {/* 消息列表 */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-gray-500 mb-4">暂无消息</div>
              <p className="text-sm text-gray-400">开始与Ailake Agent聊天吧！</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'bg-white rounded-tl-lg rounded-tr-lg rounded-bl-lg' : 'bg-gray-100 rounded-tl-lg rounded-tr-lg rounded-br-lg'} p-3`}>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs text-gray-400 mt-1 text-right">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 消息输入区 */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="输入消息..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className={`px-4 py-2 rounded-lg ${getThemeButtonColor()} text-white font-medium`}
              disabled={isLoading}
            >
              {isLoading ? '发送中...' : '发送'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
