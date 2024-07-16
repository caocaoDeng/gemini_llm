'use client'

import React, { useEffect, useReducer } from 'react'
import Sider from './components/Sider'
import ChatContent from './components/Content'
import Action from './components/Actions'
import {
  chatBotStateContext,
  chatBotDispatchContext,
  messageContext,
  messageDispatchContext,
} from './utils/context'
import { chatBotReducer, messageReducer } from './utils/reducer'
import { ChatbotActionType, ContentActionType } from './utils/interface'

export default function ChatBot() {
  const [chatbotState, chatbotDispatch] = useReducer(chatBotReducer, {
    active: 0,
    chatSession: [],
  })

  const [messageList, messageDispatch] = useReducer(messageReducer, [])

  // 获取 chatbot 历史消息
  const getMessageList = async () => {
    const { active, chatSession } = chatbotState
    const messages = (await chatSession[active]?.getHistory()) || []
    // 先清空消息
    messageDispatch({
      type: ContentActionType.CLEAR,
    })
    messageDispatch({
      type: ContentActionType.ADD,
      content: messages,
    })
  }

  // 初始化一个聊天机器人
  useEffect(() => {
    chatbotDispatch({ type: ChatbotActionType.ADD })
  }, [])

  // 监听聊天窗口切换
  useEffect(() => {
    getMessageList()
  }, [chatbotState.active])

  // 清空历史记录
  useEffect(() => {
    !chatbotState.chatSession.length &&
      messageDispatch({
        type: ContentActionType.CLEAR,
      })
  }, [chatbotState.chatSession])

  return (
    <chatBotStateContext.Provider value={chatbotState}>
      <chatBotDispatchContext.Provider value={chatbotDispatch}>
        <article className="flex h-screen">
          <Sider></Sider>
          <messageContext.Provider value={messageList}>
            <messageDispatchContext.Provider value={messageDispatch}>
              <div className="flex flex-col flex-1">
                <ChatContent></ChatContent>
                <Action></Action>
              </div>
            </messageDispatchContext.Provider>
          </messageContext.Provider>
        </article>
      </chatBotDispatchContext.Provider>
    </chatBotStateContext.Provider>
  )
}
