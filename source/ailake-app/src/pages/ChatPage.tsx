import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// 为浏览器环境添加Buffer支持
if (typeof window !== 'undefined' && !window.Buffer) {
  // 使用ES模块导入
  import('buffer').then(({ Buffer }) => {
    window.Buffer = Buffer;
  });
}

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 状态管理
  const [messages, setMessages] = useState<Array<{
    role: 'user' | 'assistant';
    content: string;
  }>>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingContent, setThinkingContent] = useState('');
  
  // 语音功能状态
  const [isRecording, setIsRecording] = useState(false);
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);
  
  // WebSocket连接和音频相关引用
  const wsRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // WebSocket连接初始化
  const initWebSocket = () => {
    try {
      // 连接到本地后端代理地址
      const wsUrl = 'ws://localhost:5001/api/v3/realtime/dialogue';
      
      // 创建WebSocket连接
      const ws = new WebSocket(wsUrl);
      
      // 连接建立时
      ws.onopen = () => {
        console.log('WebSocket连接已建立');
        setIsWebSocketConnected(true);
        
        // 发送初始化消息
        const initMessage = {
          type: 'init',
          data: {
            app_id: '1901918589',
            access_token: '9Pp0y97idKKwXlVkhMz-F-iMemXWuD18',
            resource_id: 'volc.speech.dialog'
          }
        };
        ws.send(JSON.stringify(initMessage));
      };
      
      // 接收消息
      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log('收到WebSocket消息:', message);
          
          // 处理不同类型的消息
          if (message.type === 'result') {
            // 处理识别/回复结果
            if (message.data.text) {
              // 将语音识别结果显示在输入框
              setInputText(message.data.text);
              // 同时添加到消息列表
              setMessages(prev => [...prev, {
                role: 'assistant',
                content: message.data.text
              }]);
            }
          } else if (message.type === 'audio') {
            // 处理合成音频
            if (message.data.audio) {
              // 播放音频
              playAudio(message.data.audio);
            }
          } else if (message.type === 'error') {
            // 处理错误
            console.error('WebSocket错误:', message.data);
          } else if (message.type === 'ai_response') {
            // 处理AI思考和响应
            if (message.is_thinking) {
              // 更新思考内容
              setThinkingContent(prev => prev + message.content);
            } else {
              // 更新AI回复
              setMessages(prev => {
                // 检查最后一条消息是否是assistant类型
                if (prev.length > 0 && prev[prev.length - 1].role === 'assistant') {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = {
                    ...newMessages[newMessages.length - 1],
                    content: newMessages[newMessages.length - 1].content + message.content
                  };
                  return newMessages;
                } else {
                  // 如果没有assistant消息，添加一条新的
                  return [...prev, {
                    role: 'assistant' as const,
                    content: message.content
                  }];
                }
              });
            }
          } else if (message.type === 'ai_done') {
            // 处理AI思考完成
            setIsThinking(false);
            setThinkingContent('');
          }
        } catch (error) {
          console.error('解析WebSocket消息失败:', error);
        }
      };
      
      // 连接关闭
      ws.onclose = () => {
        console.log('WebSocket连接已关闭');
        setIsWebSocketConnected(false);
      };
      
      // 连接错误
      ws.onerror = (error) => {
        console.error('WebSocket连接错误:', error);
        setIsWebSocketConnected(false);
      };
      
      wsRef.current = ws;
    } catch (error) {
      console.error('初始化WebSocket失败:', error);
    }
  };
  
  // 播放音频
  const playAudio = (audioData: string) => {
    try {
      // 将base64音频数据转换为Blob
      const audioBlob = new Blob([new Uint8Array(Buffer.from(audioData, 'base64'))], { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // 创建音频元素并播放
      const audio = new Audio(audioUrl);
      audio.play();
      
      // 播放完成后释放资源
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };
    } catch (error) {
      console.error('播放音频失败:', error);
    }
  };
  
  // 开始录音
  const startRecording = async () => {
    try {
      // 请求麦克风权限
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      streamRef.current = stream;
      
      // 创建音频上下文和分析器
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
        sourceRef.current.connect(analyserRef.current);
      }
      
      // 创建媒体录制器
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      
      // 录制数据
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      // 录制结束
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        sendAudioToWebSocket(audioBlob);
      };
      
      // 开始录制
      mediaRecorder.start(100); // 每100ms发送一次数据
      setIsRecording(true);
      console.log('开始录音');
    } catch (error) {
      console.error('开始录音失败:', error);
    }
  };
  
  // 停止录音
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      console.log('停止录音');
    }
    
    // 关闭媒体流
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };
  
  // 发送音频到WebSocket
  const sendAudioToWebSocket = async (audioBlob: Blob) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error('WebSocket未连接');
      return;
    }
    
    try {
      // 转换音频格式为PCM
      const arrayBuffer = await audioBlob.arrayBuffer();
      
      // 发送音频数据
      const audioMessage = {
        type: 'audio',
        data: {
          audio: Array.from(new Uint8Array(arrayBuffer)),
          format: 'webm'
        }
      };
      
      wsRef.current.send(JSON.stringify(audioMessage));
      console.log('发送音频数据');
    } catch (error) {
      console.error('发送音频失败:', error);
    }
  };
  
  // 初始化WebSocket连接
  useEffect(() => {
    initWebSocket();
    
    // 清理函数
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);
  
  // 获取URL参数中的场景类型
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scene = params.get('scene');
    
    if (scene === 'study') {
      // 学习场景
      console.log('进入学习场景');
    } else if (scene === 'work') {
      // 工作场景
      console.log('进入工作场景');
    } else if (scene === 'life') {
      // 生活场景
      console.log('进入生活场景');
    } else {
      // 默认场景
      console.log('进入默认场景');
    }
  }, [location.search]);
  
  // 发送消息
  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;
    
    // 添加用户消息
    const newUserMessage = { role: 'user' as const, content: inputText };
    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    setIsThinking(true);
    setThinkingContent('');
    
    try {
      // 发送消息到后端
      const response = await fetch('/api/ailake/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            { role: 'user', content: inputText }
          ]
        })
      });
      
      if (!response.ok) {
        throw new Error('发送消息失败');
      }
      
      const result = await response.json();
      console.log('后端回复:', result);
    } catch (error) {
      console.error('发送消息失败:', error);
      // 显示错误消息
      setMessages(prev => [...prev, {
        role: 'assistant' as const,
        content: '抱歉，发送消息失败，请稍后重试。'
      }]);
    } finally {
      // 注意：由于使用了WebSocket流式响应，这里不需要手动设置isThinking为false
      // 后端会通过WebSocket发送ai_done事件来通知前端思考完成
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
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* 半透明球体 */}
        <div className="absolute w-64 h-64 bg-white bg-opacity-30 rounded-full top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* 消息列表 */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className={`max-w-[70%] ${message.role === 'user' ? 'bg-blue-100' : 'bg-white'} p-3 rounded-lg shadow-sm`}>
                <p className="text-gray-800">{message.content}</p>
              </div>
            </div>
          ))}
          
          {/* DeepSeek 思考状态 */}
          {isThinking && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-start">
                  <div className="text-gray-500 mr-2">🤔</div>
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">DeepSeek 思考中...</p>
                    <p className="text-gray-500 text-sm">{thinkingContent}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* 加载状态 */}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          {/* 初始提示 */}
          {messages.length === 0 && !isLoading && !isThinking && (
            <div className="flex flex-col items-center justify-center h-full">
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
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 底部输入区 */}
      <footer className="p-4 bg-white border-t">
        {/* 底部控制栏 - 上下箭头和标题 */}
        <div className="flex justify-between items-center mb-4">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            ↑
          </button>
          <span className="text-gray-700 font-medium">教学辅导</span>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            ↓
          </button>
        </div>
        
        {/* 输入区域 */}
        <div className="flex items-center mb-4">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-3 mr-2 ${isRecording ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            {isRecording ? '停止录音' : '🎤'}
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="输入消息..."
            className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={sendMessage}
            disabled={!inputText.trim() || isLoading}
            className={`px-6 py-3 bg-purple-500 text-white rounded-r-lg ${(!inputText.trim() || isLoading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-600'}`}
          >
            发送
          </button>
        </div>
        
        {/* WebSocket连接状态 */}
        <div className="text-xs text-gray-500 mb-2">
          WebSocket连接状态: {isWebSocketConnected ? '已连接' : '未连接'}
        </div>
        
        {/* 快捷入口 */}
        <div className="flex justify-start space-x-2">
          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            学习计划
          </button>
          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            课程推荐
          </button>
          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            研究项目
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatPage;