'use client'

import React, { useEffect, useState, useReducer } from 'react'
import { Content } from '@google/generative-ai'
import Sider from './components/Sider'
import ChatContent from './components/Content'
import Action from './components/Actions'
import { chatBotStateContext, chatBotDispatchContext } from './utils/context'
import { chatBotReducer } from './utils/reducer'

export default function ChatBot() {
  const [chatBotState, dispatch] = useReducer(chatBotReducer, {
    active: 0,
    chatSession: [],
  })

  const [text, setText] = useState('')

  const handleSendMsg = async (prompt: string) => {
    const result = await chatBotState.chatSession[0]?.sendMessage(prompt)
    const response = await result.response
    const text = response.text()
    setText(text)
  }

  useEffect(() => {
    dispatch({ type: 'add' })
  }, [])

  return (
    <chatBotStateContext.Provider value={chatBotState}>
      <chatBotDispatchContext.Provider value={dispatch}>
        <article className="flex h-screen">
          <Sider></Sider>
          <div className="flex flex-col flex-1">
            <ChatContent></ChatContent>
            <Action handleSendMsg={handleSendMsg}></Action>
          </div>
        </article>
      </chatBotDispatchContext.Provider>
    </chatBotStateContext.Provider>
  )
}
