"use client"

import type React from "react"
import { useState } from "react"
import { Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface MessageInputProps {
  onSendMessage: (message: string) => void
  onTypingStatusChange: (isTyping: boolean) => void
}

export const MessageInput = ({ onSendMessage, onTypingStatusChange }: MessageInputProps) => {
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim()) return

    onSendMessage(message)
    setMessage("")

    if (isTyping) {
      setIsTyping(false)
      onTypingStatusChange(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMessage(value)

    if (value.length > 0 && !isTyping) {
      setIsTyping(true)
      onTypingStatusChange(true)
    } else if (value.length === 0 && isTyping) {
      setIsTyping(false)
      onTypingStatusChange(false)
    }
  }

  return (
    <div className="border-t border-gray-200 p-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input value={message} onChange={handleChange} placeholder="Digite sua mensagem..." />
        <Button type="submit">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
