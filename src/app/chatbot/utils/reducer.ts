import { Content } from '@google/generative-ai'
import model from '@/utils/model'
import {
  IChatBotState,
  IAction,
  ChatbotActionType,
  ContentActionType,
} from './interface'

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
    case ChatbotActionType.ADD: {
      const chat = createChatBot()
      return {
        ...chatBotState,
        chatSession: [...chatBotState.chatSession, chat],
      }
    }

    case ChatbotActionType.ACTIVE: {
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
export const messageReducer = (
  messageList: Content[],
  { type = 'add', content = [] }: IAction
) => {
  switch (type) {
    case ContentActionType.ADD: {
      return [...messageList, ...content]
    }
    case ContentActionType.STREAM: {
      // 替换最后一个
      const preContent = messageList.slice(0, -1)
      return [...preContent, ...content]
    }
    case ContentActionType.CLEAR: {
      return []
    }

    default:
      return messageList
  }
}
