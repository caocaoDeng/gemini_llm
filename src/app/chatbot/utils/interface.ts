import { ChatSession, Content } from '@google/generative-ai'

export interface IChatBotState {
  active: number
  chatSession: ChatSession[]
}

export interface IAction {
  type: string
  chatBotIndex?: number
  content?: Content[]
}

export enum ChatbotActionType {
  ADD = 'add',
  ACTIVE = 'active',
}

export enum ContentActionType {
  ADD = 'add',
  STREAM = 'stream',
  CLEAR = 'clear',
}
