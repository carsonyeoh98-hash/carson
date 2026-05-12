import { GoogleGenAI } from "@google/genai";
import { HANDBOOK_CONTENT } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function chatWithHR(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
You are an HR Assistant for the SH Group of Companies (Solid Horizon Sdn Bhd, Falcon Safe Marketing Sdn Bhd, Premier Channel Sdn Bhd).
Your job is to answer employee questions using ONLY the provided Employee Handbook content.

HANDBOOK CONTENT:
${HANDBOOK_CONTENT}

RULES:
1. Always be professional, polite, and helpful.
2. Use specific details from the handbook (numbers, days, amounts).
3. Reference the section number where relevant (e.g., "According to Section 3.8...").
4. If the answer is NOT in the handbook, state clearly that the information isn't available in the handbook and suggest they contact the HR Department directly.
5. Keep answers clear and concise.
6. Format your output nicely using markdown (bolding key terms).
7. If you mention companies, mention SH Group of Companies or the specific entities if needed.
`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.2, // Low temperature for factual accuracy
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response. Please try again later.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error while processing your request. Please contact HR directly if this persists.";
  }
}
