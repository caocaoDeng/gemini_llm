import { Content } from '@google/generative-ai'
import { v4 as uid } from 'uuid'
import { createChatBot } from '@/utils'
import {
  ExtendChatSession,
  IChatBotState,
  IAction,
  ChatbotActionType,
  ContentActionType,
} from './interface'

export const chatBotReducer = (
  chatBotState: IChatBotState,
  { type, uid: sessId }: IAction
) => {
  switch (type) {
    case ChatbotActionType.ADD: {
      // 为每个ChatSession创建唯一id
      const chatSession: ExtendChatSession = createChatBot()
      chatSession.uid = uid()
      return {
        ...chatBotState,
        chatSession: [...chatBotState.chatSession, chatSession],
      }
    }

    case ChatbotActionType.ACTIVE: {
      const active = chatBotState.chatSession.findIndex(
        (sessionItem) => sessionItem.uid === sessId
      )
      return {
        ...chatBotState,
        active,
      }
    }

    case ChatbotActionType.DELETE: {
      const chatSession = chatBotState.chatSession.filter(
        (sessionItem) => sessionItem.uid !== sessId
      )
      return {
        ...chatBotState,
        chatSession,
      }
    }

    default:
      return chatBotState
  }
}

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
