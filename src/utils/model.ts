import { GoogleGenerativeAI } from '@google/generative-ai'
const genAI = new GoogleGenerativeAI(<string>process.env.NEXT_PUBLIC_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
export default model
