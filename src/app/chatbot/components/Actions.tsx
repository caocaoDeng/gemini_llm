import { useContext, useRef } from 'react'
import { chatBotStateContext, messageDispatchContext } from '../utils/context'
import { ContentActionType } from '../utils/interface'
import { createContent } from '@/utils/index'
import Input from '@/components/Input'
import Upload, { IUploadEmitEvent } from '@/components/Upload/upload'

export default function Action() {
  const uploadDom = useRef<IUploadEmitEvent>(null)

  const { active, chatSession } = useContext(chatBotStateContext)
  const messageDispatch = useContext(messageDispatchContext)

  const handleSendMsg = async (prompt: string) => {
    const userMsg = createContent('user', prompt)
    const modelMsg = createContent('model', '🤔思考中...')
    messageDispatch({
      type: ContentActionType.ADD,
      content: [userMsg, modelMsg],
    })
    const result = await chatSession[active].sendMessageStream(prompt)
    let streamText = ''
    for await (const chunk of result.stream) {
      streamText += chunk.text()
      messageDispatch({
        type: ContentActionType.STREAM,
        content: [createContent('model', streamText)],
      })
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-20">
      <Input handleSendMsg={handleSendMsg}>
        <Upload ref={uploadDom}>
          <i
            className="iconfont icon-shangchuan cursor-pointer text-theme-300 hover:text-theme-900"
            style={{ fontSize: 24, lineHeight: '16px' }}
            onClick={() => uploadDom.current?.click()}
          ></i>
        </Upload>
      </Input>
      <p className="text-xs leading-8 text-slate-500 scale-90">
        孩子会犯错，gemini也是
      </p>
    </div>
  )
}
