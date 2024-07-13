import { useContext, useLayoutEffect, useRef } from 'react'
import { chatBotStateContext, messageContext } from '../utils/context'
import styles from './content.module.css'

export default function ChatContent() {
  const warp = useRef<HTMLDivElement>(null)
  const msgContainer = useRef<HTMLUListElement>(null)

  const messageList = useContext(messageContext)

  useLayoutEffect(() => {
    warp.current?.scrollTo(0, msgContainer.current?.offsetHeight || 0)
  })

  return (
    <div className="flex-1 h-0 p-4 overflow-y-scroll" ref={warp}>
      <ul className="flex flex-col" ref={msgContainer}>
        {messageList.map(({ role, parts }, index) => (
          <li
            key={index}
            className={`${styles['msg-item']} ${styles[role]}`}
          >
            <p
              className={`${styles.avatar} iconfont ${
                role === 'model' ? 'icon-aislogo' : 'icon-user'
              }`}
            ></p>
            <p className={styles.text}>{parts.map(part => part.text)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
