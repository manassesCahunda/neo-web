export interface ServerMessage {
  type: "qr" | "allmessage" | "connection" | "error" | "typing" | "message" | "all" | "rating" | "send"
  data: any
}

export interface Conversation {
  id: string
  name: string
  date?: string
  status:boolean
  preview?: string
  messages: Message[]
  type?: string
  phone: string
  avatar?: string
  typingUsers?: string[]
}

export interface Message {
  id: string
  role: "user" | "assistent"
  content: string
  times: string | number
  raiting: "like" | "dislike" | ""
  name?: string
}

export interface TypingStatus {
  conversationId: string
  userId: string
  userName: string
  isTyping: boolean
}
