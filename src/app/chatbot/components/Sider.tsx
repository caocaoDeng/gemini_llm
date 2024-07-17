import { useContext } from 'react'
import { chatBotStateContext, chatBotDispatchContext } from '../utils/context'
import { ChatbotActionType } from '../utils/interface'
import styles from './styles/sider.module.css'

export default function Sider() {
  const chatBotState = useContext(chatBotStateContext)
  const chatbotDispatch = useContext(chatBotDispatchContext)

  const createChatBot = () => chatbotDispatch({ type: ChatbotActionType.ADD })

  const switchChatBot = (uid: string) =>
    chatbotDispatch({ type: ChatbotActionType.ACTIVE, uid })

  const delChatbot = (e: React.MouseEvent, uid: string) => {
    e.stopPropagation()
    chatbotDispatch({ type: ChatbotActionType.DELETE, uid })
  }

  return (
    <article className="flex flex-col items-center justify-between w-64 bg-theme-100">
      <h1
        style={{
          backgroundImage:
            'linear-gradient(90deg, #217BFE 0%, #078EFB 33.53%, #AC87EB 67.74%, #EE4D5D 100%)',
        }}
        className="w-max mt-4 text-3xl font-bold text-transparent bg-clip-text"
      >
        Gemini
      </h1>
      <ul className="w-full flex-1 flex flex-col gap-2 my-4 px-4 overflow-y-auto">
        {chatBotState.chatSession.map((sessionItem, index) => (
          <li
            key={sessionItem.uid}
            className={`${styles['chat-bot-item']} ${
              chatBotState.active === index ? styles['active'] : ''
            }`}
            onClick={() => switchChatBot(sessionItem.uid as string)}
          >
            <span className="text-sm font-medium text-theme-900">
              Gemini_{sessionItem.uid?.slice(-6)}
            </span>
            <span
              className={`${styles['icon-del']} iconfont icon-shanchu`}
              style={{ fontSize: 22, lineHeight: '16px' }}
              onClick={(e) => delChatbot(e, sessionItem.uid as string)}
            ></span>
          </li>
        ))}
      </ul>
      <div className="w-full px-4 mb-2">
        <button
          className="flex items-center justify-center gap-2 w-full py-2 px-5 rounded text-theme-600 bg-theme-200 shadow hover:text-theme-900 hover:bg-theme-300"
          onClick={createChatBot}
        >
          <span
            className="iconfont icon-add"
            style={{ fontSize: 20, lineHeight: 1 }}
          ></span>
          <span>New Chatbot</span>
        </button>
      </div>
    </article>
  )
}
