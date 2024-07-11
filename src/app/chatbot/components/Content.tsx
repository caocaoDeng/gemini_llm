import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Content } from '@google/generative-ai'
import { chatBotStateContext } from '../utils/context'
import styles from './content.module.css'

export default function ChatContent() {
  const warp = useRef<HTMLDivElement>(null)
  const msgContainer = useRef<HTMLUListElement>(null)

  const { active, chatSession } = useContext(chatBotStateContext)

  const [messageList, setMessageList] = useState<Content[]>([])

  const getMessageList = async () => {
    const msg = (await chatSession[active]?.getHistory()) || []
    setMessageList(msg)
  }

  useEffect(() => {
    getMessageList()
  }, [chatSession])

  useLayoutEffect(() => {
    warp.current?.scrollTo(0, msgContainer.current?.offsetHeight || 0)
  })

  return (
    <div className="flex-1 h-0 p-4 overflow-y-scroll" ref={warp}>
      <ul className="flex flex-col" ref={msgContainer}>
        {messageList.map((item, index) => (
          <li
            key={index}
            className={`${styles['msg-item']} ${styles[item.role]}`}
          >
            <p
              className={`${styles.avatar} iconfont ${
                item.role === 'model' ? 'icon-aislogo' : 'icon-user'
              }`}
            ></p>
            <p className={styles.text}>{item.parts.map((part) => part.text)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
