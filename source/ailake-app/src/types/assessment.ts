// 测评相关类型定义

// 测评维度类型
export type AssessmentDimension = 'knowledgeStructure' | 'personality' | 'socialAdaptability';

// 测评维度名称映射
export const dimensionNames: Record<AssessmentDimension, string> = {
  knowledgeStructure: '知识结构',
  personality: '人格特点',
  socialAdaptability: '社会适应能力'
};

// 测评触发类型
export type TriggerType = 'behavior' | 'needResponse' | 'statusChange';

// 测评触发场景
export interface TriggerScenario {
  id: string;
  type: TriggerType;
  description: string;
  conditions: any;
  dimension: AssessmentDimension;
  weight: number;
}

// 测评问题类型
export interface AssessmentQuestion {
  id: string;
  text: string;
  type: 'multipleChoice' | 'openEnded' | 'scenario';
  dimension: AssessmentDimension;
  options?: {
    id: string;
    text: string;
    value: number;
  }[];
  weight: number;
}

// 测评答案类型
export interface AssessmentAnswer {
  questionId: string;
  answer: string | string[];
  timestamp: number;
}

// 用户行为数据类型
export interface UserBehaviorData {
  id: string;
  type: string;
  timestamp: number;
  duration?: number;
  details?: any;
  dimension: AssessmentDimension;
  weight: number;
}

// 测评标签类型
export interface AssessmentTag {
  id: string;
  name: string;
  dimension: AssessmentDimension;
  value: number;
  confidence: number;
  lastUpdated: number;
}

// 测评结果类型
export interface AssessmentResult {
  userId: string;
  dimensions: {
    [key in AssessmentDimension]: {
      score: number;
      tags: AssessmentTag[];
      lastUpdated: number;
    };
  };
  overallScore: number;
  recommendations: string[];
  lastUpdated: number;
}

// 测评配置类型
export interface AssessmentConfig {
  dimensions: AssessmentDimension[];
  triggers: TriggerScenario[];
  questions: AssessmentQuestion[];
  behaviorThresholds: {
    [key: string]: number;
  };
  integrationPoints: {
    [key: string]: any;
  };
}

// 测评会话类型
export interface AssessmentSession {
  id: string;
  userId: string;
  dimension: AssessmentDimension;
  startTime: number;
  endTime?: number;
  status: 'active' | 'completed' | 'cancelled';
  answers: AssessmentAnswer[];
  behaviors: UserBehaviorData[];
  result?: AssessmentResult;
}
