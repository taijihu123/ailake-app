import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentScene, setCurrentScene] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{
    id: string;
    content: string;
    sender: 'user' | 'agent';
    timestamp: string;
  }>>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 获取URL参数中的场景类型
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 flex flex-col">
      {/* 顶部控制区 */}
      <header className="flex justify-between items-center p-4">
        <button onClick={() => navigate('/')} className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <div className="flex flex-col space-y-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
          </div>
        </button>
        <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg flex items-center">
          <div className="grid grid-cols-2 gap-1 mr-2">
            <div className="w-2 h-2 bg-black rounded-sm"></div>
            <div className="w-2 h-2 bg-black rounded-sm"></div>
            <div className="w-2 h-2 bg-black rounded-sm"></div>
            <div className="w-2 h-2 bg-black rounded-sm"></div>
          </div>
          选择数字人
        </button>
        <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg">
          字幕
        </button>
      </header>

      {/* 对话核心区 */}
      <main className="flex-1 flex flex-col items-center justify-center relative">
        {isInCall ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-4">
            {/* 视频通话界面 */}
            {callType === 'video' && (
              <div className="w-full max-w-2xl h-3/4 bg-black rounded-lg mb-4 relative">
                {/* 远端视频 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {remoteVideoRef.current ? (
                    <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-white">
                      <div className="w-32 h-32 bg-gray-700 rounded-full mb-4 flex items-center justify-center">
                        {/* AI形象示意 */}
                        <div className="flex flex-col items-center">
                          {/* 头发 */}
                          <div className="w-16 h-8 bg-black rounded-t-full mb-2"></div>
                          {/* 脸和身体 */}
                          <div className="w-12 h-12 bg-white border-2 border-black rounded-full mb-1"></div>
                          <div className="w-16 h-12 bg-white border-2 border-black rounded-b-lg"></div>
                        </div>
                      </div>
                      <p className="text-xl font-medium">Ailake Agent</p>
                      <p className="text-gray-300">正在通话中...</p>
                    </div>
                  )}
                </div>
                
                {/* 本地视频 */}
                {isVideoEnabled && (
                  <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg overflow-hidden border-2 border-white">
                    {localVideoRef.current ? (
                      <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center text-white h-full">
                        <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-2xl">👤</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {/* 语音通话界面 */}
            {callType === 'voice' && (
              <div className="w-full max-w-md h-3/4 flex flex-col items-center justify-center">
                <div className="w-48 h-48 bg-white rounded-full mb-8 flex items-center justify-center">
                  {/* AI形象示意 */}
                  <div className="flex flex-col items-center">
                    {/* 头发 */}
                    <div className="w-24 h-12 bg-black rounded-t-full mb-3"></div>
                    {/* 脸和身体 */}
                    <div className="w-16 h-16 bg-white border-2 border-black rounded-full mb-2"></div>
                    <div className="w-24 h-16 bg-white border-2 border-black rounded-b-lg"></div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Ailake Agent</h2>
                <p className="text-gray-600 mb-8">语音通话中...</p>
                <div className="flex space-x-2 mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            )}
            
            {/* 通话控制按钮 */}
            <div className="flex justify-center space-x-6">
              <button 
                onClick={toggleAudio} 
                className={`w-14 h-14 rounded-full flex items-center justify-center ${isAudioEnabled ? 'bg-gray-200' : 'bg-red-500 text-white'}`}
              >
                <span className="text-2xl">{isAudioEnabled ? '🎙️' : '🔇'}</span>
              </button>
              {callType === 'video' && (
                <button 
                  onClick={toggleVideo} 
                  className={`w-14 h-14 rounded-full flex items-center justify-center ${isVideoEnabled ? 'bg-gray-200' : 'bg-red-500 text-white'}`}
                >
                  <span className="text-2xl">{isVideoEnabled ? '📹' : '📵'}</span>
                </button>
              )}
              <button 
                onClick={endCall} 
                className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center text-white"
              >
                <span className="text-2xl">📞</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* 半透明球体 */}
            <div className="absolute w-64 h-64 bg-white bg-opacity-30 rounded-full"></div>
            
            {/* 智能体形象 */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-32 h-32 bg-white rounded-full mb-4 flex items-center justify-center">
                {/* AI女形象示意 */}
                <div className="flex flex-col items-center">
                  {/* 头发 */}
                  <div className="w-16 h-8 bg-black rounded-t-full mb-2"></div>
                  {/* 脸和身体 */}
                  <div className="w-12 h-12 bg-white border-2 border-black rounded-full mb-1"></div>
                  <div className="w-16 h-12 bg-white border-2 border-black rounded-b-lg"></div>
                </div>
              </div>
              
              {/* 进度指示器和提示文字 */}
              <div className="flex space-y-4 mb-8">
                <div className="flex space-x-2 mb-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
                <p className="text-gray-500 text-sm">你可以开始说话</p>
              </div>
              
              {/* 通话按钮 */}
              <div className="flex space-x-6">
                <button 
                  onClick={() => {
                    setCallType('voice');
                    startCall();
                  }}
                  className="bg-[#09bb07] text-white py-3 px-6 rounded-lg flex items-center"
                >
                  <span className="mr-2">🎙️</span>
                  语音通话
                </button>
                <button 
                  onClick={() => {
                    setCallType('video');
                    startCall();
                  }}
                  className="bg-blue-500 text-white py-3 px-6 rounded-lg flex items-center"
                >
                  <span className="mr-2">📹</span>
                  视频通话
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      {/* 底部交互区 */}
      {!isInCall && (
        <footer className="p-4">
          <div className="flex justify-center space-x-6 mb-4">
            <button className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-black rounded-full"></div>
            </button>
            <button className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-black">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3V21M5 12H19" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </button>
            <button className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-black">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H21C21.5304 3 22.0391 3.21071 22.4142 3.58579C22.7893 3.96086 23 4.46957 23 5V19Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9H9.01" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 9H15.01" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 15H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
            <button className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm"></div>
              </div>
            </button>
          </div>
          
          {/* 快捷入口 */}
          <div className="flex justify-start">
            <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
            </button>
          </div>
        </footer>
      )}
    </div>
  );
};

export default ChatPage;