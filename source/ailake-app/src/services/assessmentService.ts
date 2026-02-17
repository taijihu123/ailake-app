// 测评服务核心逻辑
import { 
  AssessmentDimension, 
  TriggerScenario, 
  AssessmentQuestion, 
  AssessmentAnswer, 
  UserBehaviorData, 
  AssessmentTag, 
  AssessmentResult, 
  AssessmentSession
} from '../types/assessment';

// 测评服务类
class AssessmentService {
  private sessions: Map<string, AssessmentSession> = new Map();
  private userBehaviors: Map<string, UserBehaviorData[]> = new Map();
  private assessmentResults: Map<string, AssessmentResult> = new Map();
  private triggers: TriggerScenario[] = this.initializeTriggers();
  private questions: AssessmentQuestion[] = this.initializeQuestions();

  // 初始化触发场景
  private initializeTriggers(): TriggerScenario[] {
    return [
      {
        id: 'behavior-1',
        type: 'behavior',
        description: '连续三次使用AI生成同类文案',
        conditions: {
          action: 'generateContent',
          contentType: 'copywriting',
          count: 3,
          timeWindow: 3600000 // 1小时内
        },
        dimension: 'knowledgeStructure',
        weight: 0.8
      },
      {
        id: 'need-1',
        type: 'needResponse',
        description: '用户询问学习工具推荐',
        conditions: {
          queryPattern: '推荐.*学习工具|学习工具.*推荐'
        },
        dimension: 'knowledgeStructure',
        weight: 0.7
      },
      {
        id: 'status-1',
        type: 'statusChange',
        description: '用户使用APP满1周',
        conditions: {
          usageDays: 7
        },
        dimension: 'socialAdaptability',
        weight: 0.6
      },
      {
        id: 'behavior-2',
        type: 'behavior',
        description: '频繁修改AI生成内容',
        conditions: {
          action: 'editGeneratedContent',
          frequency: 0.8 // 80%的内容都被修改
        },
        dimension: 'personality',
        weight: 0.7
      },
      {
        id: 'behavior-3',
        type: 'behavior',
        description: '积极反馈功能问题',
        conditions: {
          action: 'feedback',
          type: 'featureIssue',
          count: 2
        },
        dimension: 'personality',
        weight: 0.6
      }
    ];
  }

  // 初始化测评问题
  private initializeQuestions(): AssessmentQuestion[] {
    return [
      // 知识结构维度问题
      {
        id: 'knowledge-1',
        text: '当需要分析一份市场报告时，你更倾向于？',
        type: 'multipleChoice',
        dimension: 'knowledgeStructure',
        options: [
          { id: 'a', text: '先看数据图表', value: 3 },
          { id: 'b', text: '通读文字结论', value: 2 },
          { id: 'c', text: '找行业案例对比', value: 4 }
        ],
        weight: 0.8
      },
      {
        id: 'knowledge-2',
        text: '你更常使用哪种类型的工具？',
        type: 'multipleChoice',
        dimension: 'knowledgeStructure',
        options: [
          { id: 'a', text: '数据分析工具', value: 3 },
          { id: 'b', text: '文案创作工具', value: 2 },
          { id: 'c', text: '代码生成工具', value: 4 }
        ],
        weight: 0.7
      },
      // 人格特点维度问题
      {
        id: 'personality-1',
        text: 'AI生成的方案与你的预期不符，你会？',
        type: 'multipleChoice',
        dimension: 'personality',
        options: [
          { id: 'a', text: '调整关键词重新生成', value: 3 },
          { id: 'b', text: '手动修改细节', value: 4 },
          { id: 'c', text: '换工具尝试', value: 2 }
        ],
        weight: 0.8
      },
      {
        id: 'personality-2',
        text: '如果协作时同事修改了你的方案，你更可能说？',
        type: 'multipleChoice',
        dimension: 'personality',
        options: [
          { id: 'a', text: '这样改不合理', value: 2 },
          { id: 'b', text: '你觉得哪里需要调整？', value: 4 },
          { id: 'c', text: '先按你的来试试', value: 3 }
        ],
        weight: 0.9
      },
      // 社会适应能力维度问题
      {
        id: 'social-1',
        text: '你更在意工具的什么特性？',
        type: 'multipleChoice',
        dimension: 'socialAdaptability',
        options: [
          { id: 'a', text: '效率', value: 3 },
          { id: 'b', text: '深度', value: 2 },
          { id: 'c', text: '协作性', value: 4 }
        ],
        weight: 0.7
      },
      {
        id: 'social-2',
        text: '当遇到技术问题时，你通常会？',
        type: 'multipleChoice',
        dimension: 'socialAdaptability',
        options: [
          { id: 'a', text: '自己研究解决', value: 2 },
          { id: 'b', text: '向同事求助', value: 4 },
          { id: 'c', text: '查看文档', value: 3 }
        ],
        weight: 0.8
      }
    ];
  }

  // 记录用户行为
  recordUserBehavior(userId: string, behavior: Omit<UserBehaviorData, 'id' | 'timestamp'>): void {
    const behaviorData: UserBehaviorData = {
      ...behavior,
      id: `behavior-${Date.now()}`,
      timestamp: Date.now()
    };

    if (!this.userBehaviors.has(userId)) {
      this.userBehaviors.set(userId, []);
    }

    const behaviors = this.userBehaviors.get(userId)!;
    behaviors.push(behaviorData);

    // 检查是否触发测评
    this.checkTriggers(userId, behaviorData);
  }

  // 检查测评触发条件
  private checkTriggers(userId: string, behavior: UserBehaviorData): void {
    const relevantTriggers = this.triggers.filter(
      trigger => trigger.dimension === behavior.dimension
    );

    for (const trigger of relevantTriggers) {
      if (this.evaluateTrigger(userId, trigger, behavior)) {
        this.startAssessmentSession(userId, trigger.dimension);
        break;
      }
    }
  }

  // 评估触发条件是否满足
  private evaluateTrigger(userId: string, trigger: TriggerScenario, behavior: UserBehaviorData): boolean {
    // 简单实现，实际需要根据具体条件评估
    switch (trigger.type) {
      case 'behavior':
        return this.evaluateBehaviorTrigger(userId, trigger);
      case 'needResponse':
        return this.evaluateNeedResponseTrigger(trigger, behavior);
      case 'statusChange':
        return this.evaluateStatusChangeTrigger(userId, trigger);
      default:
        return false;
    }
  }

  // 评估行为触发
  private evaluateBehaviorTrigger(userId: string, trigger: TriggerScenario): boolean {
    const behaviors = this.userBehaviors.get(userId) || [];
    const recentBehaviors = behaviors.filter(
      b => b.timestamp > Date.now() - (trigger.conditions.timeWindow || 3600000)
    );

    const relevantBehaviors = recentBehaviors.filter(
      b => b.type === trigger.conditions.action
    );

    return relevantBehaviors.length >= (trigger.conditions.count || 3);
  }

  // 评估需求响应触发
  private evaluateNeedResponseTrigger(trigger: TriggerScenario, behavior: UserBehaviorData): boolean {
    if (behavior.type === 'query' && behavior.details?.text) {
      const pattern = new RegExp(trigger.conditions.queryPattern, 'i');
      return pattern.test(behavior.details.text);
    }
    return false;
  }

  // 评估状态变化触发
  private evaluateStatusChangeTrigger(_userId: string, trigger: TriggerScenario): boolean {
    // 检查用户使用天数
    if (trigger.conditions.usageDays) {
      // 简单实现，实际需要从用户注册时间计算
      const mockUsageDays = 7; // 模拟用户已使用7天
      return mockUsageDays >= trigger.conditions.usageDays;
    }
    return false;
  }

  // 检查是否应该触发测评
  checkAssessmentTriggers(userId: string, behavior: any): boolean {
    const relevantTriggers = this.triggers.filter(trigger => {
      // 根据行为类型筛选相关的触发条件
      if (trigger.type === 'behavior' && behavior.type === trigger.conditions.action) {
        return true;
      }
      if (trigger.type === 'needResponse' && behavior.type === 'query') {
        return true;
      }
      if (trigger.type === 'statusChange') {
        return true;
      }
      return false;
    });

    for (const trigger of relevantTriggers) {
      if (this.evaluateTrigger(userId, trigger, behavior)) {
        return true;
      }
    }
    return false;
  }

  // 获取推荐的测评维度
  getRecommendedDimension(_userId: string): AssessmentDimension {
    // 简单实现，实际应该基于用户历史行为分析
    const dimensions: AssessmentDimension[] = ['knowledgeStructure', 'personality', 'socialAdaptability'];
    return dimensions[Math.floor(Math.random() * dimensions.length)];
  }

  // 开始测评会话
  startAssessmentSession(userId: string, dimension: AssessmentDimension): string {
    const sessionId = `session-${Date.now()}`;
    const session: AssessmentSession = {
      id: sessionId,
      userId,
      dimension,
      startTime: Date.now(),
      status: 'active',
      answers: [],
      behaviors: []
    };

    this.sessions.set(sessionId, session);
    return sessionId;
  }

  // 获取测评问题
  getAssessmentQuestions(dimension: AssessmentDimension, count: number = 3): AssessmentQuestion[] {
    return this.questions
      .filter(q => q.dimension === dimension)
      .slice(0, count);
  }

  // 提交测评答案
  submitAnswer(sessionId: string, answer: AssessmentAnswer): void {
    const session = this.sessions.get(sessionId);
    if (session && session.status === 'active') {
      session.answers.push(answer);

      // 检查是否完成测评
      if (session.answers.length >= 3) {
        this.completeSession(sessionId);
      }
    }
  }

  // 完成测评会话
  completeSession(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (session && session.status === 'active') {
      session.status = 'completed';
      session.endTime = Date.now();

      // 生成测评结果
      const result = this.generateAssessmentResult(session);
      session.result = result;

      // 保存测评结果
      this.assessmentResults.set(session.userId, result);
    }
  }

  // 生成测评结果
  private generateAssessmentResult(session: AssessmentSession): AssessmentResult {
    // 计算维度得分
    const dimensionScore = this.calculateDimensionScore(session);

    // 生成标签
    const tags = this.generateTags(session.dimension, dimensionScore);

    // 生成推荐
    const recommendations = this.generateRecommendations(session.dimension, tags);

    // 获取或创建现有结果
    const existingResult = this.assessmentResults.get(session.userId);
    const now = Date.now();

    const result: AssessmentResult = {
      userId: session.userId,
      dimensions: {
        knowledgeStructure: existingResult?.dimensions.knowledgeStructure || {
          score: 0,
          tags: [],
          lastUpdated: now
        },
        personality: existingResult?.dimensions.personality || {
          score: 0,
          tags: [],
          lastUpdated: now
        },
        socialAdaptability: existingResult?.dimensions.socialAdaptability || {
          score: 0,
          tags: [],
          lastUpdated: now
        }
      },
      overallScore: 0,
      recommendations: [],
      lastUpdated: now
    };

    // 更新当前维度结果
    result.dimensions[session.dimension] = {
      score: dimensionScore,
      tags,
      lastUpdated: now
    };

    // 计算整体得分
    result.overallScore = Object.values(result.dimensions).reduce(
      (sum, dim) => sum + dim.score,
      0
    ) / 3;

    // 添加推荐
    result.recommendations = recommendations;

    return result;
  }

  // 计算维度得分
  private calculateDimensionScore(session: AssessmentSession): number {
    if (session.answers.length === 0) return 0;

    let totalScore = 0;
    let totalWeight = 0;

    for (const answer of session.answers) {
      const question = this.questions.find(q => q.id === answer.questionId);
      if (question && question.options) {
        const selectedOption = question.options.find(opt => 
          answer.answer === opt.id || (Array.isArray(answer.answer) && answer.answer.includes(opt.id))
        );
        if (selectedOption) {
          totalScore += selectedOption.value * question.weight;
          totalWeight += question.weight;
        }
      }
    }

    return totalWeight > 0 ? totalScore / totalWeight : 0;
  }

  // 生成测评标签
  private generateTags(dimension: AssessmentDimension, score: number): AssessmentTag[] {
    const tags: AssessmentTag[] = [];

    switch (dimension) {
      case 'knowledgeStructure':
        if (score >= 3.5) {
          tags.push({
            id: `tag-${Date.now()}-1`,
            name: '实践型',
            dimension,
            value: score,
            confidence: 0.8,
            lastUpdated: Date.now()
          });
        } else if (score >= 2.5) {
          tags.push({
            id: `tag-${Date.now()}-2`,
            name: '平衡型',
            dimension,
            value: score,
            confidence: 0.7,
            lastUpdated: Date.now()
          });
        } else {
          tags.push({
            id: `tag-${Date.now()}-3`,
            name: '理论型',
            dimension,
            value: score,
            confidence: 0.6,
            lastUpdated: Date.now()
          });
        }
        break;

      case 'personality':
        if (score >= 3.5) {
          tags.push({
            id: `tag-${Date.now()}-4`,
            name: '谨慎型',
            dimension,
            value: score,
            confidence: 0.8,
            lastUpdated: Date.now()
          });
        } else if (score >= 2.5) {
          tags.push({
            id: `tag-${Date.now()}-5`,
            name: '灵活型',
            dimension,
            value: score,
            confidence: 0.7,
            lastUpdated: Date.now()
          });
        } else {
          tags.push({
            id: `tag-${Date.now()}-6`,
            name: '果断型',
            dimension,
            value: score,
            confidence: 0.6,
            lastUpdated: Date.now()
          });
        }
        break;

      case 'socialAdaptability':
        if (score >= 3.5) {
          tags.push({
            id: `tag-${Date.now()}-7`,
            name: '协作型',
            dimension,
            value: score,
            confidence: 0.8,
            lastUpdated: Date.now()
          });
        } else if (score >= 2.5) {
          tags.push({
            id: `tag-${Date.now()}-8`,
            name: '独立型',
            dimension,
            value: score,
            confidence: 0.7,
            lastUpdated: Date.now()
          });
        } else {
          tags.push({
            id: `tag-${Date.now()}-9`,
            name: '内向型',
            dimension,
            value: score,
            confidence: 0.6,
            lastUpdated: Date.now()
          });
        }
        break;
    }

    return tags;
  }

  // 生成推荐
  private generateRecommendations(dimension: AssessmentDimension, tags: AssessmentTag[]): string[] {
    const recommendations: string[] = [];

    switch (dimension) {
      case 'knowledgeStructure':
        if (tags.some(tag => tag.name === '实践型')) {
          recommendations.push('推荐使用案例库和工具教程');
          recommendations.push('开启一键执行模式，减少冗余步骤');
        } else if (tags.some(tag => tag.name === '理论型')) {
          recommendations.push('推荐阅读学术文献和理论文章');
          recommendations.push('使用高级搜索功能，深入研究主题');
        }
        break;

      case 'personality':
        if (tags.some(tag => tag.name === '谨慎型')) {
          recommendations.push('添加预览步骤选项，仔细检查生成内容');
          recommendations.push('使用版本控制功能，追踪修改历史');
        } else if (tags.some(tag => tag.name === '果断型')) {
          recommendations.push('使用快捷操作，提高工作效率');
          recommendations.push('尝试自动化流程，减少手动操作');
        }
        break;

      case 'socialAdaptability':
        if (tags.some(tag => tag.name === '协作型')) {
          recommendations.push('参与多人协作项目，提升团队能力');
          recommendations.push('使用实时协作功能，与团队同步进度');
        } else if (tags.some(tag => tag.name === '独立型')) {
          recommendations.push('设置个人工作空间，专注独立任务');
          recommendations.push('使用离线模式，减少外界干扰');
        }
        break;
    }

    return recommendations;
  }

  // 获取用户测评结果
  getAssessmentResult(userId: string): AssessmentResult | null {
    return this.assessmentResults.get(userId) || null;
  }

  // 获取用户测评标签
  getUserTags(userId: string): AssessmentTag[] {
    const result = this.assessmentResults.get(userId);
    if (!result) return [];

    return Object.values(result.dimensions)
      .flatMap(dim => dim.tags);
  }

  // 更新测评标签
  updateTags(userId: string, newBehaviors: UserBehaviorData[]): void {
    const result = this.assessmentResults.get(userId);
    if (result) {
      // 基于新行为更新标签
      for (const behavior of newBehaviors) {
        const dimension = behavior.dimension;
        const tags = result.dimensions[dimension].tags;

        // 简单实现，实际需要更复杂的算法
        for (const tag of tags) {
          tag.confidence = Math.min(1, tag.confidence + 0.1);
        }
      }

      result.lastUpdated = Date.now();
    }
  }
}

// 导出单例实例
export const assessmentService = new AssessmentService();
