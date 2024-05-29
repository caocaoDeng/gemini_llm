'use client'

import { IProps } from './interface'

export default function Input(props: IProps) {
  const { handleSendMsg, children } = props
  const handlePrompt = (e: any) => {
    if (e.key !== 'Enter') return
    const value = e.target.value
    handleSendMsg(value)
  }

  return (
    <main className="flex items-center w-10/12 h-12 px-3 rounded-full bg-zinc-200">
      <div className="flex justify-center items-center w-8 h-8 border-dashed border border-indigo-300">
        <i className="iconfont icon-aislogo !text-2xl"></i>
      </div>
      <input
        className="flex-1 h-full outline-0 indent-2 text-sm font-normal bg-transparent"
        placeholder="发送消息"
        onKeyDown={handlePrompt}
      />
      <div className="flex justify-center items-center gap-2">
        {children}
        <div className="flex justify-center items-center w-8 h-8 rounded-full border-dashed border border-indigo-300 cursor-pointer">
          <i className="iconfont icon-send !text-xl"></i>
        </div>
      </div>
    </main>
  )
}
