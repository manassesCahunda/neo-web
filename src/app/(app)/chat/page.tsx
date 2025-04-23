"use client"

import { useChat } from "@/hooks/use-chat"
import { Qrcode } from "./qrcode"
import { ConversationList } from "./conversation"
import { ChatHeader } from "./header"
import { MessageList } from "./message/list"
import { MessageInput } from "./message/input"

export default function ChatPage() {
  const {
    connected,
    qrCode,
    status,
    conversations,
    selectedConversationId,
    selectedConversation,
    sendTypingStatus,
    sendMessage,
    setSelectedConversationId,
    rateMessage,
    activeMessage
  } = useChat()
  
  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen">
        {qrCode ? <Qrcode qr={qrCode} /> : null}
        <p className="text-center mt-4">{status}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      <ConversationList
        conversations={conversations}
        selectedConversationId={selectedConversationId}
        onSelectConversation={setSelectedConversationId}
      />

      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <ChatHeader  onButton={activeMessage} conversation={selectedConversation} />
            <MessageList messages={selectedConversation.messages} onRateMessage={rateMessage} />
            <MessageInput onSendMessage={sendMessage} onTypingStatusChange={sendTypingStatus} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Selecione uma conversa para visualizar as mensagens
          </div>
        )}
      </div>
    </div>
  )
}
