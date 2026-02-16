// 导出组件
export { default as GlobalAgentFloating } from './components/GlobalAgentFloating';
export { default as ChatPage } from './components/ChatPage';

// 导出类型
export * from './types';

// 导出默认配置
export const defaultChatWidgetConfig = {
  theme: 'green' as const,
  showVideoCall: true,
  showVoiceCall: true,
  backendUrl: '/api/chat',
  position: {
    right: '20px',
    bottom: '20px'
  },
  width: '320px',
  clientType: 'web' as const
};

// 导出工具函数
export { getThemeColor, getPositionStyles } from './utils/styles';
