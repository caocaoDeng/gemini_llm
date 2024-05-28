import { GoogleGenerativeAI } from '@google/generative-ai';
console.log(process.env.API_KEY, 999)
// const genAI = new GoogleGenerativeAI(<string>process.env.API_KEY);
const genAI = new GoogleGenerativeAI('AIzaSyAuGQVmC2UQW7RxK6AsW2JBJ_4jd8TYixM');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
export default model;
