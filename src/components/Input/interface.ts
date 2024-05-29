import React from 'react'

export interface IProps {
  handleSendMsg: (prompt: string) => void
  children?: React.ReactNode
}
