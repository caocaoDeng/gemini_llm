import { useContext, useRef } from 'react'
import { Part } from '@google/generative-ai'
import { chatBotStateContext, messageDispatchContext } from '../utils/context'
import { Content, ContentActionType } from '../utils/interface'
import { readFile2ArrayBuffer } from '@/utils/index'
import Input from '@/components/Input'
import Upload, { IUploadEmitEvent } from '@/components/Upload/upload'

let inlineData: Part[] = []

export default function Action() {
  const uploadDom = useRef<IUploadEmitEvent>(null)

  const { active, chatSession } = useContext(chatBotStateContext)
  const messageDispatch = useContext(messageDispatchContext)

  const handleSendMsg = async (prompt: string) => {
    const userMsg: Content = {
      role: 'user',
      parts: [{ text: prompt }],
    }
    const modelMsg: Content = {
      role: 'model',
      parts: [{ text: '🤔思考中...' }],
    }
    messageDispatch({
      type: ContentActionType.ADD,
      content: [userMsg, modelMsg],
    })
    try {
      const result = await chatSession[active].sendMessageStream([
        prompt,
        ...inlineData,
      ])
      inlineData = []
      let streamText = ''
      for await (const chunk of result.stream) {
        streamText += chunk.text()
        messageDispatch({
          type: ContentActionType.STREAM,
          content: [
            {
              role: 'model',
              parts: [{ text: streamText }],
            },
          ],
        })
      }
    } catch (error) {
      alert('我也是会出错的')
    }
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files as FileList
    const currentMediaPrompt: Part[] = []
    for (const f of fileList) {
      // 需移除base64前缀 data:image/png;base64,
      // const base64 = await readFile2Base64(f)
      // nodejs 将ArrayBuffer转Buffer，然后转base64 没有前缀
      const arrayBuffer = await readFile2ArrayBuffer(f)
      const base64 = Buffer.from(arrayBuffer).toString('base64')
      // 文件转生成对象
      const promptObj = {
        inlineData: {
          data: base64,
          mimeType: f.type,
        },
      }
      messageDispatch({
        type: ContentActionType.ADD,
        content: [{
          role: 'user',
          parts: [promptObj],
        }],
      })
      currentMediaPrompt.push(promptObj)
    }
    inlineData = [...inlineData, ...currentMediaPrompt]
    currentMediaPrompt.forEach(async mediaPrompt => await chatSession[active].sendMessageStream([mediaPrompt]))
  }

  return (
    <div className="flex flex-col justify-center items-center h-20">
      <Input handleSendMsg={handleSendMsg}>
        <Upload ref={uploadDom} onChange={handleChange}>
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
