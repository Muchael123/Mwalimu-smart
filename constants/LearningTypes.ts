type MyLearningResponse = {
    type: string; 
    message: string; 
    myLearning: MyLearning;
  };
  
  type MyLearning = {
    learner: string;
    subTopic: string; 
    currentIndex: number;
    passedQuestions: number[]; 
    failedQuestions: number[]; 
    questions: Question[]; 
    _id: string; 
    __v: number; 
  };
  
  type Question = {
    question: string; 
    options: string[]; 
    correctAnswer: CorrectAnswer; 
    _id: string; 
  };
  
  type CorrectAnswer = {
    basicAnswer: string;
    detailedAnswer: string; 
  };
  export type { MyLearningResponse, MyLearning, Question, CorrectAnswer };
  