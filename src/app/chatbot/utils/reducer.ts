import { ChatSession } from '@google/generative-ai'
import model from '@/utils/model'

export const chatBotReducer = (chatBot: ChatSession[]) => {
  const chat = model.startChat({
    history: new Array(30)
      .fill(0)
      .map(() => [
        {
          role: 'user',
          parts: [{ text: 'Hello, I have 2 dogs in my house.' }],
        },
        {
          role: 'model',
          parts: [{ text: 'Great to meet you. What would you like to know?' }],
        },
      ])
      .flat(),
    generationConfig: {
      maxOutputTokens: 100,
    },
  })
  return [...chatBot, chat]
}
