import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import avatar from '../assets/images/avatar.jpg';

// 为浏览器环境添加Buffer支持
if (typeof window !== 'undefined' && !window.Buffer) {
  // 使用ES模块导入
  import('buffer').then(({ Buffer }) => {
    window.Buffer = Buffer;
  });
}

const GlobalAgentFloating: React.FC = () => {
  // 功能列表（可无限扩展）
  const functions = [
    { id: 'text', label: '文字聊天', icon: '💬' },
    { id: 'voice', label: '语音通话', icon: '🎙️' },
    { id: 'video', label: '视频通话', icon: '📹' },
    { id: 'teach', label: '教学辅导', icon: '📚' },
    { id: 'code', label: '代码生成', icon: '💻' },
    { id: 'project', label: '项目孵化', icon: '🚀' },
  ];

  // 当前功能索引
  const [currentIndex] = useState(0);
  // 对话框显示状态
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  // 输入框内容
  const [inputText, setInputText] = useState('');
  // 聊天消息
  const [messages, setMessages] = useState([
    { id: 1, text: '你好，有什么可以帮你的吗？', sender: 'ai' }
  ]);

  // 语音和视频通话状态
  const [isRecording, setIsRecording] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [subtitles, setSubtitles] = useState('你好，有什么可以帮你的吗？');
  
  // WebSocket连接和音视频相关引用
  const wsRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  // 自动滚动到最新消息
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 点击外部关闭对话框
  const dialogRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setIsDialogVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);



  // WebSocket连接初始化
  const initWebSocket = () => {
    try {
      // 使用相对路径，通过 Vite 代理连接到后端
      const wsUrl = 'ws://localhost:5001/api/v3/realtime/dialogue';
      const appId = '1901918589';
      const accessToken = '9Pp0y97idKKwXlVkhMz-F-iMemXWuD18';
      setIsSpeaking(true);
      
      console.log('正在建立WebSocket连接:', wsUrl);
      
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
            app_id: appId,
            access_token: accessToken,
            resource_id: 'volc.speech.dialog',
            app_key: 'PlgvMymc7f3tC...' // 从文档中获取完整的app_key
          }
        };
        console.log('发送初始化消息:', initMessage);
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
              setMessages(prev => [...prev, {
                id: prev.length + 1,
                text: message.data.text,
                sender: 'ai'
              }]);
              // 更新字幕
              setSubtitles(message.data.text);
            }
          } else if (message.type === 'transcript') {
            // 处理实时转录结果
            if (message.data.text) {
              setSubtitles(prev => prev + ' ' + message.data.text);
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
            setIsSpeaking(false);
          }
        } catch (error) {
          console.error('解析WebSocket消息失败:', error);
          setIsSpeaking(false);
        }
      };
      
      // 连接关闭
      ws.onclose = () => {
        console.log('WebSocket连接已关闭');
        setIsWebSocketConnected(false);
        setIsSpeaking(false);
      };
      
      // 连接错误
      ws.onerror = (error) => {
        console.error('WebSocket连接错误:', error);
        setIsWebSocketConnected(false);
        setIsSpeaking(false);
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
      // 确保WebSocket已连接
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        initWebSocket();
        // 等待连接建立
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      setIsSpeaking(true);
      
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
      setIsSpeaking(false);
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
  
  // 开始视频通话
  const startVideoCall = async () => {
    try {
      // 请求摄像头和麦克风权限
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      streamRef.current = stream;
      
      // 显示本地视频
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      // 确保WebSocket已连接
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        initWebSocket();
      }
      
      setIsInCall(true);
      setIsVideoEnabled(true);
      console.log('开始视频通话');
    } catch (error) {
      console.error('开始视频通话失败:', error);
    }
  };
  
  // 停止视频通话
  const stopVideoCall = () => {
    // 关闭媒体流
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    // 停止本地视频
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    // 停止远程视频
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    
    setIsInCall(false);
    setIsVideoEnabled(false);
    console.log('停止视频通话');
  };
  
  // 发送消息
  const sendMessage = () => {
    if (inputText.trim()) {
      const newUserMsg = { id: messages.length + 1, text: inputText, sender: 'user' };
      setMessages(prev => [...prev, newUserMsg]);
      setInputText('');

      // 模拟AI回复
      setTimeout(() => {
        const aiReply = {
          id: messages.length + 2,
          text: `在「${functions[currentIndex].label}」模式下：${inputText}`,
          sender: 'ai'
        };
        setMessages(prev => [...prev, aiReply]);
      }, 1000);
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

  const floatingContent = (
    <div>
      {/* 添加CSS动画样式 */}
      <style>
        {
          `
          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-12px);
            }
            100% {
              transform: translateY(0px);
            }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          
          .speaking {
            animation: pulse 1s infinite;
          }
          `
        }
      </style>
      <div
        style={{
          position: 'fixed',
          left: '80px',      // 固定在左侧
          top: '50%',        // 垂直居中
          transform: 'translateY(-50%)', // 确保垂直居中
          zIndex: 9999,      // 确保在最上层
        }}
      >
        {/* 悬浮头像（自动上下浮动） */}
        <div
          ref={avatarRef}
          onClick={() => setIsDialogVisible(!isDialogVisible)}
          className={isSpeaking ? 'speaking' : ''}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            position: 'relative',
            background: '#f0f0f0',
            overflow: 'hidden',
            userSelect: 'none',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            animation: isSpeaking ? 'pulse 1s infinite' : 'float 3s ease-in-out infinite', // 说话时脉冲动画，否则浮动动画
            cursor: 'pointer'
          }}
        >
          <img
            src={avatar}
            alt="Ailake"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '4px',
              right: '4px',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: '#4CAF50',
              border: '2px solid white'
            }}
          />
        </div>

        {/* 浮动对话框 */}
        {isDialogVisible && (
          <div
            ref={dialogRef}
            style={{
              position: 'absolute',
              left: '80px',
              top: '50%',
              transform: 'translateY(-50%)', // 对话框与头像水平对齐
              width: '360px',
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* 顶部功能显示栏（功能名+灰色文字说明） */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingBottom: '12px',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>
                {functions[currentIndex].icon} {functions[currentIndex].label}
              </div>
              <div style={{ fontSize: '12px', color: '#999' }}>
                点击头像切换功能
              </div>
            </div>

            {/* 字幕显示区域 */}
            {(functions[currentIndex].id === 'voice' || functions[currentIndex].id === 'video') && (
              <div style={{ padding: '12px', background: '#f9f9f9', borderRadius: '8px', marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>实时字幕</div>
                <div style={{ fontSize: '14px', color: '#333', minHeight: '40px', lineHeight: '1.4' }}>
                  {subtitles}
                </div>
              </div>
            )}
            
            {/* 聊天内容区域（可滚动） */}
            <div
              style={{
                minHeight: '160px',
                maxHeight: '240px',
                overflowY: 'auto',
                padding: '8px 0',
              }}
            >
              {messages.map(msg => (
                <div
                  key={msg.id}
                  style={{
                    marginBottom: '12px',
                    textAlign: msg.sender === 'user' ? 'right' : 'left',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '8px 16px',
                      borderRadius: '16px',
                      backgroundColor: msg.sender === 'user' ? '#4CAF50' : '#f0f0f0',
                      color: msg.sender === 'user' ? 'white' : '#333',
                      maxWidth: '80%',
                      wordBreak: 'break-word',
                      fontSize: '14px'
                    }}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* 音视频通话控制区 */}
            {functions[currentIndex].id === 'voice' && (
              <div style={{ padding: '12px', background: '#f9f9f9', borderRadius: '8px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    style={{
                      padding: '12px 24px',
                      background: isRecording ? '#f44336' : '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    {isRecording ? '停止录音' : '开始录音'}
                  </button>
                </div>
                <div style={{ textAlign: 'center', marginTop: '8px', fontSize: '12px', color: '#666' }}>
                  WebSocket状态: {isWebSocketConnected ? '已连接' : '未连接'}
                </div>
              </div>
            )}
            
            {/* 视频通话控制区 */}
            {functions[currentIndex].id === 'video' && (
              <div>
                {isInCall ? (
                  <div>
                    {/* 视频显示区域 */}
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                      <div style={{ flex: 1, aspectRatio: 16/9, background: '#f0f0f0', borderRadius: '8px', overflow: 'hidden' }}>
                        <video ref={videoRef} style={{ width: '100%', height: '100%', objectFit: 'cover' }} autoPlay muted></video>
                      </div>
                      <div style={{ flex: 1, aspectRatio: 16/9, background: '#f0f0f0', borderRadius: '8px', overflow: 'hidden' }}>
                        <video ref={remoteVideoRef} style={{ width: '100%', height: '100%', objectFit: 'cover' }} autoPlay></video>
                      </div>
                    </div>
                    
                    {/* 视频控制按钮 */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                      <button
                        onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                        style={{
                          padding: '10px 20px',
                          background: isVideoEnabled ? '#4CAF50' : '#f0f0f0',
                          color: isVideoEnabled ? 'white' : '#333',
                          border: '1px solid #e0e0e0',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        {isVideoEnabled ? '关闭视频' : '开启视频'}
                      </button>
                      <button
                        onClick={stopVideoCall}
                        style={{
                          padding: '10px 20px',
                          background: '#f44336',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        结束通话
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: '24px', textAlign: 'center', background: '#f9f9f9', borderRadius: '8px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📹</div>
                    <p style={{ marginBottom: '24px', color: '#666' }}>点击开始按钮发起视频通话</p>
                    <button
                      onClick={startVideoCall}
                      style={{
                        padding: '12px 24px',
                        background: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    >
                      开始视频通话
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* 文本输入区 */}
            {(functions[currentIndex].id === 'text' || functions[currentIndex].id === 'teach' || functions[currentIndex].id === 'code' || functions[currentIndex].id === 'project') && (
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="输入消息..."
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '14px',
                  }}
                />
                <button
                  onClick={sendMessage}
                  style={{
                    padding: '10px 20px',
                    background: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  发送
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // 使用Portal将悬浮组件挂载到body下
  return createPortal(floatingContent, document.body);
};

export default GlobalAgentFloating;