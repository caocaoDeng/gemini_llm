import Input from '@/components/Input'

export default function Action({
  handleSendMsg,
}: {
  handleSendMsg: (prompt: string) => void
}) {
  return (
    <div className="flex flex-col justify-center items-center h-20">
      <Input handleSendMsg={handleSendMsg}></Input>
      <p className="text-xs leading-8 text-slate-500 scale-90">
        孩子会犯错，gemini也是
      </p>
    </div>
  )
}
