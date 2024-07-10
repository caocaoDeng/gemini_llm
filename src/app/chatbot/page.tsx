'use client'

import React, { useEffect, useState, useReducer } from 'react'
import { Content } from '@google/generative-ai'
import Sider from './components/Sider'
import ChatContent from './components/Content'
import Action from './components/Actions'
import { chatBotStateContext, chatBotDispatchContext } from './utils/context'
import { chatBotReducer } from './utils/reducer'

export default function ChatBot() {
  const [chatBotData, dispatch] = useReducer(chatBotReducer, [])
  const [msgData, setMsg] = useState<Content[]>([])
  const [text, setText] = useState('')

  const handleInitMsgData = async () => {
    const res = await chatBotData[0].getHistory()
    setMsg(res)
  }

  const handleSendMsg = async (prompt: string) => {
    const result = await chatBotData[0].sendMessage(prompt)
    const response = await result.response
    const text = response.text()
    setText(text)
  }

  useEffect(() => {
    dispatch()
    handleInitMsgData()
  }, [])

  return (
    <chatBotStateContext.Provider value={chatBotData}>
      <chatBotDispatchContext.Provider value={dispatch}>
        <article className="flex h-screen">
          <Sider></Sider>
          <div className="flex flex-col flex-1">
            <ChatContent msgData={msgData}></ChatContent>
            <Action handleSendMsg={handleSendMsg}></Action>
          </div>
        </article>
      </chatBotDispatchContext.Provider>
    </chatBotStateContext.Provider>
  )
}
