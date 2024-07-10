import { useLayoutEffect, useRef } from 'react'
import { Content } from '@google/generative-ai'
import styles from '../page.module.css'

export default function ChatContent({ msgData }: { msgData: Content[] }) {
  const warp = useRef<HTMLDivElement>(null)
  const msgContainer = useRef<HTMLUListElement>(null)

  useLayoutEffect(() => {
    warp.current?.scrollTo(0, msgContainer.current?.offsetHeight || 0)
  })

  return (
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
            <p className={styles.text}>{item.parts.map((part) => part.text)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
