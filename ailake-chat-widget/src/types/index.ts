// 聊天组件配置类型
export interface ChatWidgetConfig {
  // 主题颜色
  theme?: 'green' | 'blue';
  // 后端API地址
  backendUrl?: string;
  // 悬浮组件位置
  position?: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  };
  // 品牌Logo
  brandLogo?: string;
  // 组件宽度
  width?: string;
  // 组件高度
  height?: string;
  // 客户端类型
  clientType?: 'web' | 'app';
}

// 消息类型
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: string;
  status: 'sending' | 'sent' | 'failed';
}

// 场景类型
export type SceneType = 'study' | 'work' | 'life';

// 场景信息
export interface SceneInfo {
  id: string;
  type: SceneType;
  name: string;
  description?: string;
}

// 用户信息
export interface UserInfo {
  id: string;
  name: string;
  avatar?: string;
}

// 智能体信息
export interface AgentInfo {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline';
}
