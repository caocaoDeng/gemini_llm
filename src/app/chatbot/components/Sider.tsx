import { useContext } from 'react'
import model from '@/utils/model'
import { chatBotStateContext, chatBotDispatchContext } from '../utils/context'

export default function Sider() {
  const cb = useContext(chatBotStateContext)
  const dispatch = useContext(chatBotDispatchContext)

  const createChatBot = () => {
    dispatch && dispatch()
  }

  return (
    <article className="flex flex-col justify-between w-64 p-4 bg-theme-100">
      <div>333</div>
      <button
        className="w-full py-2 px-5 border border-dashed border-theme-600 rounded text-theme-600 bg-transparent shadow-md hover:border-theme-900 hover:text-theme-900"
        onClick={createChatBot}
      >
        <span className="text-2xl leading-none">+</span> chat bot
      </button>
    </article>
  )
}
