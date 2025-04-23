"use client"

import { useState } from "react"
import type { Conversation } from "@/type/chat"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

interface ConversationListProps {
  conversations: Conversation[]
  selectedConversationId: string | null
  onSelectConversation: (id: string) => void
}

export const ConversationList = ({
  conversations,
  selectedConversationId,
  onSelectConversation,
}: ConversationListProps) => {
  const [searchInput, setSearchInput] = useState("")

  // Sort conversations by date (most recent first)
  const sortedConversations = [...conversations].sort((a, b) => {
    const aTime = a.messages.length > 0 
      ? new Date(a.messages[a.messages.length - 1].times).getTime() 
      : 0;
    const bTime = b.messages.length > 0 
      ? new Date(b.messages[b.messages.length - 1].times).getTime() 
      : 0;
    return bTime - aTime; // Descending order (newest first)
  });

  const filteredConversations = !searchInput
    ? sortedConversations
    : sortedConversations.filter((c) => {
        const searchTerm = searchInput.toLowerCase().replace(/\D/g, "")
        return c.phone.toLowerCase().includes(searchTerm) || c.name.toLowerCase().includes(searchInput.toLowerCase())
      })

  return (
    <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-gray-200 bg-white flex flex-col">
      <div className="p-4 border-b border-gray-200 relative">
        <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Pesquisar..."
          className="pl-9"
        />
      </div>
      <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
        {filteredConversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => onSelectConversation(conv.id)}
            className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedConversationId === conv.id ? "bg-gray-50" : ""}`}
          >
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium text-gray-900">{conv.name}</h3>
              <span className="text-xs text-gray-500">
                {conv.date ||
                  (conv.messages.length > 0
                    ? new Date(conv.messages[conv.messages.length - 1].times).toLocaleDateString()
                    : "")}
              </span>
            </div>
            <p className="text-sm text-gray-500 truncate">{conv.preview || "(Mídia)"}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
