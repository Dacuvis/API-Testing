import Groq from "groq-sdk"
import { GROQ_API_KEY } from "../../config/groq"
import { GEMINI_API_KEY } from "../../config/gemini"
import { GoogleGenAI } from "@google/genai"


const groq = new Groq({
  apiKey: GROQ_API_KEY
})

const gemini = new GoogleGenAI({
  apiKey: GEMINI_API_KEY
})

export const chatWithAI = async (message: string) => {
  const res = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant."
      },
      {
        role: "user",
        content: message
      }
    ]
  })

  return res.choices[0]?.message?.content ?? "No response"
}

export const chatWithGemini = async (message: string) => {
  if (!message) return "No message provided"

  const result = await gemini.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: [{ role: "user", parts: [{ text: message }] }]
  })

  return result.text
}