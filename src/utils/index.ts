export type RoleType = 'user' | 'model'

export const createContent = (role: RoleType, text: string) => {
  return {
    role,
    parts: [{ text }],
  }
}
