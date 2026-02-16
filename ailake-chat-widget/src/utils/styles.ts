import { ChatWidgetConfig } from '../types';

// 获取主题颜色
export const getThemeColor = (theme?: ChatWidgetConfig['theme']) => {
  switch (theme) {
    case 'green':
      return 'from-ailake-green-400 to-ailake-green-500';
    case 'blue':
      return 'from-ailake-blue-400 to-ailake-blue-500';
    default:
      return 'from-ailake-green-400 to-ailake-green-500';
  }
};

// 计算悬浮组件位置
export const getPositionStyles = (config?: ChatWidgetConfig) => {
  const baseStyles = {
    position: 'fixed' as const,
    zIndex: 9999,
    pointerEvents: 'auto' as const
  };

  // 如果配置了position，则使用配置的位置
  if (config?.position) {
    return {
      ...baseStyles,
      left: config.position.left,
      right: config.position.right,
      top: config.position.top,
      bottom: config.position.bottom
    };
  }

  // 否则使用默认位置
  return {
    ...baseStyles,
    right: '20px',
    bottom: '20px'
  };
};

// 获取主题按钮颜色
export const getThemeButtonColor = (theme?: ChatWidgetConfig['theme']) => {
  switch (theme) {
    case 'green':
      return 'bg-ailake-green-500 hover:bg-ailake-green-600';
    case 'blue':
      return 'bg-ailake-blue-500 hover:bg-ailake-blue-600';
    default:
      return 'bg-ailake-green-500 hover:bg-ailake-green-600';
  }
};

// 获取主题背景颜色
export const getThemeBackgroundColor = (theme?: ChatWidgetConfig['theme']) => {
  switch (theme) {
    case 'green':
      return 'from-ailake-green-100 to-ailake-green-200';
    case 'blue':
      return 'from-ailake-blue-100 to-ailake-blue-200';
    default:
      return 'from-ailake-green-100 to-ailake-green-200';
  }
};
