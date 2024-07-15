import model from '@/utils/model'

export const createChatBot = () => {
  return model.startChat({
    generationConfig: {
      maxOutputTokens: 100,
    },
  })
}

export type RoleType = 'user' | 'model'

export const createContent = (role: RoleType, text: string) => {
  return {
    role,
    parts: [{ text }],
  }
}
