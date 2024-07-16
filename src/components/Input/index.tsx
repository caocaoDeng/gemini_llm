'use client'

import { useState } from 'react'
import { IProps } from './interface'

export default function Input(props: IProps) {
  const { handleSendMsg, children } = props

  const [isEmpty, setIsEmpty] = useState(true)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setIsEmpty(!e.target.value)

  const handlePrompt = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value
    if (e.key !== 'Enter' || !value) return
    handleSendMsg(value)
    ;(e.target as HTMLInputElement).value = ''
    setIsEmpty(true)
  }

  return (
    <main className="flex items-center w-10/12 h-12 px-3 rounded-full bg-theme-100">
      <div className="flex justify-center items-center w-8 h-8">
        <i className="iconfont icon-aislogo text-theme-950 !text-2xl"></i>
      </div>
      <input
        className="flex-1 h-full outline-0 indent-2 text-sm font-normal bg-transparent"
        placeholder="发送消息"
        onChange={handleChange}
        onKeyDown={handlePrompt}
      />
      <div className="flex justify-center items-center gap-2">
        {children}
        <div
          className={`flex justify-center items-center w-8 h-8 rounded-full cursor-pointer ${
            isEmpty ? 'bg-theme-300' : 'bg-theme-950'
          }`}
        >
          <i className="iconfont icon-gengxin text-white !text-xl"></i>
        </div>
      </div>
    </main>
  )
}
