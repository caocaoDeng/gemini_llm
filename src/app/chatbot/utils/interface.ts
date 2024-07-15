import { ChatSession, Content } from '@google/generative-ai'

export type ExtendChatSession = ChatSession & { uid?: string }

export interface IChatBotState {
  active: number
  chatSession: ExtendChatSession[]
}

export interface IAction {
  type: string
  uid?: string
  content?: Content[]
}

export enum ChatbotActionType {
  ADD = 'add',
  ACTIVE = 'active',
  DELETE = 'delete',
}

export enum ContentActionType {
  ADD = 'add',
  STREAM = 'stream',
  CLEAR = 'clear',
}
