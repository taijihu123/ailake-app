import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import avatar from '../assets/images/avatar.jpg';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  // 对话框显示状态
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  // 输入框内容
  const [inputText, setInputText] = useState('');
  // 聊天消息
  const [messages, setMessages] = useState([
    { id: 1, text: '你好，有什么可以帮你的吗？', sender: 'ai' }
  ]);

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

  // 切换功能
  const prevFunction = () => {
    setCurrentIndex(prev => (prev === 0 ? functions.length - 1 : prev - 1));
  };
  const nextFunction = () => {
    setCurrentIndex(prev => (prev === functions.length - 1 ? 0 : prev + 1));
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

  const floatingContent = (
    <div>
      {/* 添加CSS动画样式 */}
      <style>
        {`
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
        `}
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
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            position: 'relative',
            background: '#f0f0f0',
            overflow: 'hidden',
            userSelect: 'none',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            animation: 'float 3s ease-in-out infinite', // 自动上下浮动
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
            {/* 顶部功能切换栏（箭头+功能名） */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '12px',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              <button
                onClick={prevFunction}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#666',
                }}
              >
                ↑
              </button>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                {functions[currentIndex].icon} {functions[currentIndex].label}
              </div>
              <button
                onClick={nextFunction}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#666',
                }}
              >
                ↓
              </button>
            </div>

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

            {/* 输入框 */}
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
          </div>
        )}
      </div>
    </div>
  );

  // 使用Portal将悬浮组件挂载到body下
  return createPortal(floatingContent, document.body);
};

export default GlobalAgentFloating;