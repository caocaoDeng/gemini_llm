import model from '@/utils/model'
import { IChatBotState, IAction } from './interface'

const createChatBot = () => {
  return model.startChat({
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
}

export const chatBotReducer = (
  chatBotState: IChatBotState,
  { type, chatBotIndex }: IAction
) => {
  switch (type) {
    case 'add': {
      const chat = createChatBot()
      return {
        ...chatBotState,
        chatSession: [...chatBotState.chatSession, chat],
      }
    }

    case 'active': {
      return {
        ...chatBotState,
        active: <number>chatBotIndex,
      }
    }

    default:
      return chatBotState
  }
}
