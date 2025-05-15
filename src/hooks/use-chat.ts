 "use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { Conversation, Message, ServerMessage, TypingStatus } from "@/type/chat"
import { connectWebSocket, sendWebSocketMessage, closeWebSocket } from "@/lib/ws"
import { formatConversations } from "@/lib/data"

export function useChat() {
  const [connected, setConnected] = useState(false)
  const [qrCode, setQrCode] = useState("")
  const [status, setStatus] = useState("Conectando...")
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null)
  const [currentUserTyping, setCurrentUserTyping] = useState(false)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMessage = useCallback((msg: ServerMessage) => {
    if (msg.type === "qr") {
      setQrCode(msg.data)
    }

    if (msg.type === "connection") {
      setConnected(msg.data)
      console.log("DATE CONNECTED",msg.data)
      setStatus(msg.data ? "Connected" : "Disconnected")
    }

    if (msg.type === "all") {
      const formattedData = formatConversations(msg.data)
      setConversations(formattedData)
    }

    if (msg.type === "typing") {
      handleTypingStatus(msg.data)
    }

    if (msg.type === "message") {
      handleNewMessage(msg.data)
    }
  }, [])

  const handleTypingStatus = useCallback((typingData: TypingStatus) => {
    const { conversationId, userId, userName, isTyping } = typingData

    setConversations((prevConversations) =>
      prevConversations.map((conv) => {
        if (conv.id === conversationId) {
          let updatedTypingUsers = conv.typingUsers || []

          if (isTyping && !updatedTypingUsers.includes(userName)) {
            updatedTypingUsers = [...updatedTypingUsers, userName]
          } else if (!isTyping && updatedTypingUsers.includes(userName)) {
            updatedTypingUsers = updatedTypingUsers.filter((name) => name !== userName)
          }

          return {
            ...conv,
            typingUsers: updatedTypingUsers,
          }
        }
        return conv
      }),
    )
  }, [])

  const handleNewMessage = useCallback((messageData: any) => {
    const { conversationId, message } = messageData

    setConversations((prevConversations) =>
      prevConversations.map((conv) => {
        if (conv.id === conversationId) {
          const updatedTypingUsers = (conv.typingUsers || []).filter((name) => name !== message.name)
          const updatedMessages = [...conv.messages, message]

          // Ensure the message has a valid timestamp
          const messageTime = message.times ? new Date(message.times).getTime() : Date.now()

          return {
            ...conv,
            messages: updatedMessages,
            typingUsers: updatedTypingUsers,
            preview: message.content,
            date: new Date(messageTime).toLocaleDateString(),
          }
        }
        return conv
      }),
    )
  }, [])


  const sendTypingStatus = useCallback(
    (isTyping: boolean) => {
      if (!selectedConversationId) return

      sendWebSocketMessage({
        type: "typing",
        data: {
          conversationId: selectedConversationId,
          isTyping,
        },
      })

      setCurrentUserTyping(isTyping)

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
        typingTimeoutRef.current = null
      }

      if (isTyping) {
        typingTimeoutRef.current = setTimeout(() => {
          sendTypingStatus(false)
        }, 3000)
      }
    },
    [selectedConversationId],
  )

  const sendMessage = useCallback(
    (content: string) => {
      if (!selectedConversationId || !content.trim()) return

      const timestamp = Date.now()
      const newMessage: Message = {
        id: timestamp.toString(),
        role: "assistent",
        content,
        times: timestamp,
        raiting: "",
      }

      setConversations((prevConversations) =>
        prevConversations.map((conv) => {
          if (conv.id === selectedConversationId) {
            return {
              ...conv,
              messages: [...conv.messages, newMessage],
              preview: content,
              date: new Date(timestamp).toLocaleDateString(),
            }
          }
          return conv
        }),
      )

      sendWebSocketMessage({
        type: "send",
        data: {
          remotejid: selectedConversationId,
          content
        },
      })

      sendTypingStatus(false)
    },
    [selectedConversationId, sendTypingStatus],
  )

  const rateMessage = useCallback((messageId: string, rating: "like" | "dislike") => {
    if (!selectedConversationId) return
  
    setConversations((prevConversations) =>
      prevConversations.map((conv) => ({
        ...conv,
        messages: conv.messages.map((msg) =>
          msg.id === messageId ? { ...msg, raiting: rating } : msg
        ),
      })),
    )
  
    sendWebSocketMessage({
      type: "rating",
      data: {
        messageId,
        remoteJid: selectedConversationId,
        feedback: rating,
      },
    })
  }, [selectedConversationId])
  

  const activeMessage = useCallback((status: boolean) => {
    if (!selectedConversationId) return;
  
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === selectedConversationId
          ? {
              ...conv,
            }
          : conv
      )
    );
  

    sendWebSocketMessage({
      type: "active",
      data: {
        remotejid: selectedConversationId,
        status, 
      },
    });
  }, [selectedConversationId]);
  

  useEffect(() => {
    const initConnection = async () => {
      await connectWebSocket(handleMessage)
    }

    initConnection()

    return () => {
      closeWebSocket()

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [handleMessage])

  const selectedConversation = conversations.find((c) => c.id === selectedConversationId) || null

  return {
    connected,
    qrCode,
    status,
    conversations,
    selectedConversationId,
    selectedConversation,
    currentUserTyping,
    setSelectedConversationId,
    sendTypingStatus,
    sendMessage,
    rateMessage,
    activeMessage
  }
}
