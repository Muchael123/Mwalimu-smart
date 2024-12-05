
type HistoryPart = {
  text: string;
};

type HistoryEntry = {
  role: "user" | "model";
  parts: HistoryPart[];
};

export type ChatHistory = HistoryEntry[];

export const initialHistory: ChatHistory = [
  {
    role: "user",
    parts: [
      {
        text: "Hello",
      },
    ],
  },
    {
        role: "model",
        parts: [
        {
            text: "Hello! I'm  Feddie, Your personal Tutor. How can I help you today?"
        }
        ]
    }
    ];
    


    export interface TokenCache {
      getToken: (key: string) => Promise<string | undefined | null>
      saveToken: (key: string, token: string) => Promise<void>
      clearToken?: (key: string) => void
    }

    export type Subject = {
      _id: string;
      name: string;
      lesson: string;
      __v: number;
    };
    
    export type SubjectResponse = {
      type: string;
      subjects: Subject[];
    };

    export interface Topic {
      __v: number;
      _id: string;
      description: string;
      name: string;
      subject: string;
    }
    
   export interface TopicResponse {
      topics: Topic[];
      type: string;
    }
export interface SubTopic {
  _id: string; 
  name: string; 
  description: string; 
  topic: string; 
  __v: number;
}


export interface SubTopicResponse {
  type: string; 
  subTopics: SubTopic[]; 
}

