import { Content } from '@google/generative-ai'
import model from '@/utils/model'
import { IChatBotState, IAction } from './interface'

const createChatBot = () => {
  return model.startChat({
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

// TODO 添加清空逻辑
export const messageReducer = (messageList: Content[], action: Content[]) => {
  return [...messageList, ...action]
}
