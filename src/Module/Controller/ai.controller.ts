import { chatWithAI } from "../Service/ai.services"

export const aiController = {
  chat: async ({ body }: { body: any }) => {
    const { message } = body

    if (!message) {
      return {
        success: false,
        message: "Message is required"
      }
    }

    try {
      const reply = await chatWithAI(message)

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