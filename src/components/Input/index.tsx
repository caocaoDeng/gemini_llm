'use client'

import { IProps } from './interface'

export default function Input({ handleSendMsg }: IProps) {
  const handlePrompt = (e: any) => {
    if (e.key !== 'Enter') return
    const value = e.target.value
    handleSendMsg(value)
  }

  return (
    <main className="flex items-center w-10/12 h-12 px-3 rounded-full bg-zinc-200">
      <div className="w-8 h-8 border-dashed border border-indigo-300"></div>
      <input
        className="flex-1 h-full outline-0 indent-2 text-sm font-normal bg-transparent"
        placeholder="发送消息"
        onKeyDown={handlePrompt}
      />
      <div className="flex">
        <div className="w-8 h-8 rounded-full border-dashed border border-indigo-300"></div>
      </div>
    </main>
  )
}
