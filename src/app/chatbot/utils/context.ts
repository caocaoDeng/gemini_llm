import { createContext } from 'react'
import { ChatSession } from '@google/generative-ai'
import { chatBotReducer } from './reducer'
export const chatBotStateContext = createContext<ChatSession[]>([])

export const chatBotDispatchContext =
  createContext<React.DispatchWithoutAction | null>(null)
