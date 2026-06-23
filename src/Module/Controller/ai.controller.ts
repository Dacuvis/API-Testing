import { chatWithAI, chatWithGemini } from "../Service/ai.services"

export const aiController = {
  chat: async ({ body }: { body: any }) => {
    const { message, provider } = body

    if (!message) {
      return {
        success: false,
        message: "Message is required"
      }
    }

    if (!provider) {
      return {
        success: false,
        message: "Provider is required"
      }
    }

    try {
      let reply
      if (provider === "gemini") {
        reply = await chatWithGemini(message)
      } else if (provider === "groq") {
        reply = await chatWithAI(message)
      }

      return {
        success: true,
        reply
      }
    } catch (err) {
      return {
        success: false,
        message: "AI error",
        error: String(err)
      }
    }
  }
}