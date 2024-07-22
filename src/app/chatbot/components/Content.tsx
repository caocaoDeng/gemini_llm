import React, { useContext, useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import { Part, GenerativeContentBlob } from '@google/generative-ai'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia as codeTheme } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'
import 'katex/dist/katex.min.css'
import { messageContext } from '../utils/context'
import 'github-markdown-css'
import styles from './styles/content.module.css'

export default function ChatContent() {
  const warp = useRef<HTMLDivElement>(null)
  const msgContainer = useRef<HTMLUListElement>(null)

  const messageList = useContext(messageContext)

  const getResult = (parts: Part[]): string =>
    parts.map(({ text }) => text).join('')

  const ComContent = ({ part, ...rest }: { key: number; part: Part }) => {
    const { text, inlineData } = part
    // 根据mime类型渲染不同媒体标签
    const renderMediaElm = (
      inlineData: GenerativeContentBlob
    ): React.ReactElement => {
      const { mimeType, data } = inlineData
      const uri = `data:${mimeType};base64,${data}`
      const type = mimeType.split('/').at(0)
      switch (type) {
        case 'audio': {
          return (
            <audio controls>
              <source src={uri} type={mimeType} />
              Your browser does not support HTML5 audio.
            </audio>
          )
        }

        case 'video': {
          return (
            <video width="320" height="240" controls preload="auto">
              <source src={uri} type={mimeType} />
              Your browser does not support the video tag.
            </video>
          )
        }

        default:
          return <Image width={200} height={200} src={uri} alt="prompt img" />
      }
    }
    return text ? (
      <div>{text}</div>
    ) : (
      <div className={styles['prompt-media']} {...rest}>
        {renderMediaElm(inlineData as GenerativeContentBlob)}
      </div>
    )
  }

  useLayoutEffect(() => {
    warp.current?.scrollTo(0, msgContainer.current?.offsetHeight || 0)
  })

  return (
    <div className="flex-1 h-0 p-4 overflow-y-auto" ref={warp}>
      <ul className="flex flex-col" ref={msgContainer}>
        {messageList.map(({ role, parts }, index) => (
          <li key={index} className={`${styles['msg-item']} ${styles[role]}`}>
            <div
              className={`${styles.avatar} iconfont ${
                role === 'model' ? 'icon-aislogo' : 'icon-user'
              }`}
            ></div>
            <div
              className={`${styles.text} markdown-body ${
                styles['markdown-body']
              } ${parts[0]?.text ? '' : styles.clear}`}
            >
              {role === 'user' ? (
                parts.map((part) => <ComContent key={index} part={part} />)
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
                          PreTag="div"
                          customStyle={{ marginTop: 0 }}
                          // eslint-disable-next-line react/no-children-prop
                          children={String(children).replace(/\n$/, '')}
                          language={match[1]}
                          style={codeTheme}
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
