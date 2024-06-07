'use client'

import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { Content } from '@google/generative-ai'
import Input from '@/components/Input'
import model from '@/utils/model'
import styles from './page.module.css'

const chat = model.startChat({
  history: new Array(30)
    .fill(0)
    .map(() => [
      {
        role: 'user',
        parts: [{ text: 'Hello, I have 2 dogs in my house.' }],
      },
      {
        role: 'model',
        parts: [{ text: 'Great to meet you. What would you like to know?' }],
      },
    ])
    .flat(),
  generationConfig: {
    maxOutputTokens: 100,
  },
})

export default function ChatBot() {
  const warp = useRef<any>()
  const msgContainer = useRef<any>()

  const [msgData, setMsg] = useState<Content[]>([])
  const [text, setText] = useState('')

  const handleInitMsgData = async () => {
    const res = await chat.getHistory()
    setMsg(res)
  }

  const setScoll = () => {
    const offsetY = msgContainer.current.offsetHeight - warp.current.scrollTop
    if (offsetY <= 0) return
    warp.current.scrollTop++
    requestAnimationFrame(setScoll)
  }

  const handleSendMsg = async (prompt: string) => {
    const result = await chat.sendMessage(prompt)
    const response = await result.response
    const text = response.text()
    setText(text)
  }

  useEffect(() => {
    handleInitMsgData()
    setInterval(() => {
      setMsg((pre) => [
        ...pre,
        {
          role: 'user',
          parts: [{ text: 'Hello, I have 2 dogs in my house.' }],
        },
      ])
    }, 3000)
  }, [])

  useLayoutEffect(() => {
    setScoll()
  })

  return (
    <main className="flex h-screen">
      <nav className="w-64 bg-theme-100"></nav>
      <div className="flex flex-col flex-1">
        <div className="flex-1 h-0 p-4 overflow-y-scroll" ref={warp}>
          <ul className="flex flex-col" ref={msgContainer}>
            {msgData.map((item, index) => (
              <li
                key={index}
                className={`${styles['msg-item']} ${styles[item.role]}`}
              >
                <p
                  className={`${styles.avatar} iconfont ${
                    item.role === 'model' ? 'icon-aislogo' : 'icon-user'
                  }`}
                ></p>
                <p className={styles.text}>
                  {item.parts.map((part) => part.text)}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-center items-center h-20">
          <Input handleSendMsg={handleSendMsg}></Input>
          <p className="text-xs leading-8 text-slate-500 scale-90">
            孩子会犯错，gemini也是
          </p>
        </div>
      </div>
    </main>
  )
}
