import { ChatHistory } from "@/constants/Types";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
  
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY!;
  const genAI = new GoogleGenerativeAI(apiKey);
  

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  export default async function AskGemini(message: string, history: ChatHistory, field: string) {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
        systemInstruction: `You are  Freddie , a friendly and helpful AI ${field} tutor. Your job is to assist users with solving ${field} problems step-by-step. Respond clearly and encourage learning by explaining each step. When asked a question out of maths, dodge it cleverly. The actions available to be returned are, SOLVE_MATH_PROBLEM, EXPLAIN_MATH_CONCEPT, and DODGE_QUESTION.`,
      });
      
    const chatSession = model.startChat({
      generationConfig,
      history: history,
    });
  
    const result = await chatSession.sendMessage(message);
    console.log(result);
    return result;
  }
  