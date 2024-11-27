
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
