import { useContext, useLayoutEffect, useRef } from 'react'
import { Part } from '@google/generative-ai'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'
import 'katex/dist/katex.min.css'
import { messageContext } from '../utils/context'
import 'github-markdown-css'
import styles from './content.module.css'

export default function ChatContent() {
  const warp = useRef<HTMLDivElement>(null)
  const msgContainer = useRef<HTMLUListElement>(null)

  const messageList = useContext(messageContext)

  const getResult = (parts: Part[]): string =>
    parts.map((item) => item.text).join('')

  useLayoutEffect(() => {
    warp.current?.scrollTo(0, msgContainer.current?.offsetHeight || 0)
  })

  return (
    <div className="flex-1 h-0 p-4 overflow-y-scroll" ref={warp}>
      <ul className="flex flex-col" ref={msgContainer}>
        {messageList.map(({ role, parts }, index) => (
          <li key={index} className={`${styles['msg-item']} ${styles[role]}`}>
            <div
              className={`${styles.avatar} iconfont ${
                role === 'model' ? 'icon-aislogo' : 'icon-user'
              }`}
            ></div>
            <div
              className={`${styles.text} markdown-body ${styles['markdown-body']}`}
            >
              {role === 'user' ? (
                <span>{getResult(parts)}</span>
              ) : (
                <Markdown
                  remarkPlugins={[remarkGfm, remarkMath, remarkUnwrapImages]}
                  rehypePlugins={[rehypeKatex, rehypeRaw]}
                  // eslint-disable-next-line react/no-children-prop
                  children={getResult(parts)}
                  components={{
                    code(props) {
                      const { children, className, node, ...rest } = props
                      const match = /language-(\w+)/.exec(className || '')
                      return match ? (
                        <SyntaxHighlighter
                          {...rest}
                          PreTag="div"
                          // eslint-disable-next-line react/no-children-prop
                          children={String(children).replace(/\n$/, '')}
                          language={match[1]}
                          style={dark}
                        />
                      ) : (
                        <code {...rest} className={className}>
                          {children}
                        </code>
                      )
                    },
                  }}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
