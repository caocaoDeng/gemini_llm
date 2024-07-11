import { createContext } from 'react'
import { IChatBotState, IAction } from './interface'
export const chatBotStateContext = createContext<IChatBotState>({
  active: 0,
  chatSession: [],
})

export const chatBotDispatchContext = createContext<React.Dispatch<IAction>>(
  () => {}
)
