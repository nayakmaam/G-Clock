
import { GoogleGenAI, Type } from "@google/genai";
import { GhaligeTime } from "../types";

export const getGhaligeInsight = async (time: GhaligeTime): Promise<{ explanation: string, reflection: string }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    The current time is ${time.normalTime}. 
    In the Ghalige timekeeping system (where 1 Ghalige = 20 minutes, starting at 6:00 AM), 
    we are currently in Ghalige #${time.ghalige} and ShatGhaliga #${time.shatGhaliga}.
    
    Briefly explain the quality or significance of this specific time period in the context of a 24-hour cycle. 
    Provide one short reflective thought or "mantra" for this moment.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            explanation: { type: Type.STRING, description: "A brief explanation of the current time segment." },
            reflection: { type: Type.STRING, description: "A short reflective thought or mantra." }
          },
          required: ["explanation", "reflection"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      explanation: "A segment of focus and transition in the cosmic cycle.",
      reflection: "Stay present in the current Ghalige."
    };
  }
};
