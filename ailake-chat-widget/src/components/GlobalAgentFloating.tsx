import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatWidgetConfig } from '../types';

interface GlobalAgentFloatingProps {
  config: ChatWidgetConfig;
}

const GlobalAgentFloating: React.FC<GlobalAgentFloatingProps> = ({ config }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [position, setPosition] = useState({
    x: 30,
    y: 300
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const floatingRef = useRef<HTMLDivElement>(null);

  // 处理拖动开始
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  // 处理拖动
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  // 处理拖动结束
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 添加和移除全局鼠标事件监听器
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  // 处理智能体点击
  const handleAgentClick = () => {
    setIsExpanded(!isExpanded);
  };

  // 处理场景切换
  const handleSceneChange = (scene: string) => {
    console.log(`切换到场景: ${scene}`);
    navigate(`/chat?scene=${scene}&clientType=${config.clientType || 'web'}`);
    setIsExpanded(false);
  };

  // 处理其他功能
  const handleOtherFunction = () => {
    console.log('其他功能');
    alert('其他功能开发中...');
    setIsExpanded(false);
  };

  // 获取主题颜色
  const getThemeColor = () => {
    switch (config.theme) {
      case 'green':
        return 'from-ailake-green-400 to-ailake-green-500';
      case 'blue':
        return 'from-ailake-blue-400 to-ailake-blue-500';
      default:
        return 'from-ailake-green-400 to-ailake-green-500';
    }
  };

  // 计算悬浮组件位置
  const getPositionStyles = () => {
    const baseStyles = {
      position: 'fixed' as const,
      zIndex: 9999,
      cursor: isDragging ? 'grabbing' : 'grab' as const,
      pointerEvents: 'auto' as const
    };

    // 如果配置了position，则使用配置的位置
    if (config.position) {
      return {
        ...baseStyles,
        left: config.position.left,
        right: config.position.right,
        top: config.position.top,
        bottom: config.position.bottom
      };
    }

    // 否则使用默认的拖拽位置
    return {
      ...baseStyles,
      left: `${position.x}px`,
      top: `${position.y}px`
    };
  };

  return (
    <div
      ref={floatingRef}
      style={getPositionStyles()}
    >
      {/* 悬浮头像 */}
      <div
        className={`w-14 h-14 rounded-full bg-gradient-to-br ${getThemeColor()} flex items-center justify-center shadow-lg border-2 border-white`}
        onMouseDown={handleMouseDown}
        onClick={handleAgentClick}
      >
        {config.brandLogo ? (
          <img 
            src={config.brandLogo} 
            alt="Ailake Agent" 
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-full flex items-center justify-center text-white text-2xl">
            🤖
          </div>
        )}
        {/* 在线状态指示器 */}
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
      </div>

      {/* 展开的功能菜单 */}
      {isExpanded && (
        <div className="absolute bottom-full right-0 mb-3 w-48 bg-white rounded-xl shadow-lg border border-gray-100 p-3 z-50">
          <div className="flex flex-col space-y-2">
            {/* 学习场景按钮 */}
            <button
              onClick={() => handleSceneChange('study')}
              className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">
                📚
              </span>
              <span className="text-sm font-medium">学习场景</span>
            </button>

            {/* 工作场景按钮 */}
            <button
              onClick={() => handleSceneChange('work')}
              className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">
                💼
              </span>
              <span className="text-sm font-medium">工作场景</span>
            </button>

            {/* 生活场景按钮 */}
            <button
              onClick={() => handleSceneChange('life')}
              className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">
                🏠
              </span>
              <span className="text-sm font-medium">生活场景</span>
            </button>

            {/* 其他功能按钮 */}
            <button
              onClick={handleOtherFunction}
              className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">
                ⚙️
              </span>
              <span className="text-sm font-medium">其他功能</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalAgentFloating;
