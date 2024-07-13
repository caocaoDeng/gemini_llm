import { useContext, useState } from 'react'
import { chatBotStateContext, messageDispatchContext } from '../utils/context'
import Input from '@/components/Input'

export default function Action() {

  const { active, chatSession } = useContext(chatBotStateContext)

  const messageDispatch = useContext(messageDispatchContext)

  const [resText, setResText] = useState<string>('')

  const handleSendMsg = async (prompt: string) => {
    const userMsg = {
      role: 'user',
      parts: [{ text: prompt }]
    }
    const modelMsg = {
      role: 'model',
      parts: [{ text: resText }]
    }
    messageDispatch([userMsg, modelMsg])
    const result = await chatSession[active].sendMessageStream(prompt)
    for await (const chunk of result.stream) {
      const chunkText = chunk.text()
      setResText(text => text += chunkText)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-20">
      <Input handleSendMsg={handleSendMsg}></Input>
      <p className="text-xs leading-8 text-slate-500 scale-90">
        孩子会犯错，gemini也是
      </p>
    </div>
  )
}
