'use client'

import { useEffect } from 'react'
import { redirect, RedirectType } from 'next/navigation'
export default function Home() {
  useEffect(() => {
    redirect('/chatbot', RedirectType.replace)
  }, [])

  return <main></main>
}
