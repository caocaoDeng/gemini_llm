import { createContext } from 'react'
import { Content } from '@google/generative-ai'
import { IChatBotState, IAction } from './interface'
export const chatBotStateContext = createContext<IChatBotState>({
  active: 0,
  chatSession: [],
})

export const chatBotDispatchContext = createContext<React.Dispatch<IAction>>(
  () => {}
)

export const messageContext = createContext<Content[]>([])

export const messageDispatchContext = createContext<React.Dispatch<IAction>>(
  () => {}
)
