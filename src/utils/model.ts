import { GoogleGenerativeAI } from '@google/generative-ai'
// import { GoogleAIFileManager } from '@google/generative-ai/files'

const genAI = new GoogleGenerativeAI(<string>process.env.NEXT_PUBLIC_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

// const fileManager = new GoogleAIFileManager(
//   <string>process.env.NEXT_PUBLIC_API_KEY
// )

export { model }
