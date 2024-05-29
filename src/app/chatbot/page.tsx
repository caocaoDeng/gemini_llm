'use client'

import { useState } from 'react'
import Input from '@/components/Input'
import model from '@/utils/model'

export default function ChatBot() {
  const [text, setText] = useState('')

  const handleSendMsg = async (prompt: string) => {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    setText(text)
  }

  return (
    <main className="flex h-screen">
      <nav className="w-64 bg-theme-100"></nav>
      <div className="flex flex-col flex-1">
        <div className="flex-1 p-2">{text}</div>
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
