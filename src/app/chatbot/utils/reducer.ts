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
  const getIndex = () =>
    chatBotState.chatSession.findIndex(
      (sessionItem) => sessionItem.uid === sessId
    )
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
      return {
        ...chatBotState,
        active: getIndex(),
      }
    }

    case ChatbotActionType.DELETE: {
      const index = getIndex()
      const active =
        index > chatBotState.active
          ? chatBotState.active
          : (chatBotState.active || 1) - 1
      const chatSession = chatBotState.chatSession.filter(
        (sessionItem) => sessionItem.uid !== sessId
      )
      return {
        active,
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
