// Type for individual lesson
interface Lesson {
    _id: string;
    name: string;
    description: string;
    __v: number;
  }
  
  // Type for the entire response
  interface LessonResponse {
    type: string;
    lessons: Lesson[];
  }

  // Type for individual subject
interface Subject {
    _id: string;
    name: string;
    lesson: string; // This refers to the ID of a lesson
    __v: number;
  }
  
  // Type for the entire response
  interface SubjectResponse {
    type: string;
    subjects: Subject[];
  }

  // Type for individual topic
interface Topic {
    _id: string;
    name: string;
    description: string;
    subject: string; // This refers to the ID of a subject
    __v: number;
  }
  
  // Type for the entire response
  interface TopicResponse {
    type: string;
    topics: Topic[];
  }
  
  // Type for individual sub-topic
interface SubTopic {
    _id: string;
    name: string;
    description: string;
    topic: string; // This refers to the ID of a topic
    __v: number;
  }
  
  // Type for the entire response
  interface SubTopicResponse {
    type: string;
    subTopics: SubTopic[];
  }
  

  export type { Lesson, LessonResponse, Subject, SubjectResponse, Topic, TopicResponse, SubTopic, SubTopicResponse };
  