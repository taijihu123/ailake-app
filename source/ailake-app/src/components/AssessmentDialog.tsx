import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from './ui/dialog';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { AssessmentQuestion, AssessmentAnswer, AssessmentDimension } from '../types/assessment';
import { assessmentService } from '../services/assessmentService';

// 添加CSS动画样式
const styles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;

interface AssessmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dimension: AssessmentDimension;
  userId: string;
  onComplete?: () => void;
}

const AssessmentDialog: React.FC<AssessmentDialogProps> = ({
  open,
  onOpenChange,
  dimension,
  userId,
  onComplete
}) => {
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sessionId, setSessionId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 初始化测评会话和问题
  useEffect(() => {
    if (open) {
      // 开始测评会话
      const id = assessmentService.startAssessmentSession(userId, dimension);
      setSessionId(id);
      
      // 获取测评问题
      const assessmentQuestions = assessmentService.getAssessmentQuestions(dimension, 3);
      setQuestions(assessmentQuestions);
      setCurrentQuestionIndex(0);
      setAnswers({});
    }
  }, [open, dimension, userId]);

  // 处理答案选择
  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // 处理下一步
  const handleNext = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!answers[currentQuestion.id]) {
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  // 处理上一步
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // 处理提交
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // 提交所有答案
      for (const [questionId, answer] of Object.entries(answers)) {
        const assessmentAnswer: AssessmentAnswer = {
          questionId,
          answer,
          timestamp: Date.now()
        };
        assessmentService.submitAnswer(sessionId, assessmentAnswer);
      }

      // 完成测评
      assessmentService.completeSession(sessionId);

      // 关闭对话框
      onOpenChange(false);

      // 调用完成回调
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('测评提交失败:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 处理跳过
  const handleSkip = () => {
    onOpenChange(false);
  };

  if (!open || questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <>
      <style>{styles}</style>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>智能测评</DialogTitle>
          </DialogHeader>
        
        {/* 进度指示器 */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>问题 {currentQuestionIndex + 1}/{questions.length}</span>
            <span>仅需{30 + currentQuestionIndex * 5}秒</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* 维度标题 */}
        <div className="mb-4">
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            {currentQuestion.dimension === 'knowledgeStructure' ? '知识结构' : 
             currentQuestion.dimension === 'personality' ? '人格特点' : '社会适应能力'}
          </div>
        </div>

        {/* 问题内容 */}
        <div className="mb-6 animate-fadeIn">
          <h3 className="text-lg font-semibold mb-4 transition-all duration-300">{currentQuestion.text}</h3>
          
          {currentQuestion.options && (
            <RadioGroup 
              value={answers[currentQuestion.id] || ''}
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200">
                  <RadioGroupItem 
                    value={option.id} 
                    id={`option-${option.id}`}
                    className="text-green-500 focus:ring-green-500"
                  />
                  <Label 
                    htmlFor={`option-${option.id}`}
                    className="flex-1 cursor-pointer transition-colors duration-200 hover:text-green-600"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>

        {/* 操作按钮 */}
        <DialogFooter className="flex justify-between">
          <Button 
            variant="ghost" 
            onClick={handleSkip}
            disabled={isSubmitting}
          >
            跳过
          </Button>
          
          <div className="flex space-x-2">
            {currentQuestionIndex > 0 && (
              <Button 
                variant="secondary" 
                onClick={handlePrevious}
                disabled={isSubmitting}
              >
                上一步
              </Button>
            )}
            <Button 
              onClick={handleNext}
              disabled={!answers[currentQuestion.id] || isSubmitting}
              className="relative"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  处理中...
                </>
              ) : (
                isLastQuestion ? '完成' : '下一步'
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default AssessmentDialog;
