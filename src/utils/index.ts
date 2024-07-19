import { model } from '@/utils/model'

// 获取数据类型
export const getDataType = (data: any): string => {
  return Object.prototype.toString.call(data).slice(8, -1).toLocaleLowerCase()
}

// 读取文件，转base64
export const readFile2Base64 = (file: File): Promise<string> => {
  return new Promise((res, rej) => {
    const reader = new FileReader()
    reader.addEventListener('load', (e: ProgressEvent<FileReader>) =>
      res(e.target?.result as string)
    )
    reader.addEventListener('error', rej)
    reader.addEventListener('abort', rej)
    reader.readAsDataURL(file)
  })
}

export const readFile2ArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((res, rej) => {
    const reader = new FileReader()
    reader.addEventListener('load', (e: ProgressEvent<FileReader>) =>
      res(e.target?.result as ArrayBuffer)
    )
    reader.addEventListener('error', rej)
    reader.addEventListener('abort', rej)
    reader.readAsArrayBuffer(file)
  })
}

// 创建新一轮聊天
export const createChatBot = () => {
  return model.startChat({
    generationConfig: {
      maxOutputTokens: Infinity,
    },
  })
}
