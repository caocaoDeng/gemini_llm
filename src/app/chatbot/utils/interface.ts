import { ChatSession } from '@google/generative-ai'

export interface IChatBotState {
  active: number
  chatSession: ChatSession[]
}

export interface IAction {
  type: string
  chatBotIndex?: number
}
