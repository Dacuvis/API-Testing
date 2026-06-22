import Groq from "groq-sdk"
import { GROQ_API_KEY } from "../../config/groq"

const groq = new Groq({
  apiKey: GROQ_API_KEY
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