"use client"

import { ThumbsUp, ThumbsDown } from "lucide-react"
import type { Message } from "@/type/chat"
import { MessageContent } from "./content"

interface MessageListProps {
  messages: Message[]
  onRateMessage: (messageId: string, rating: "like" | "dislike") => void
}


const formatMessageDate = (timestamp: string | number) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}


const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export const MessageList = ({ messages, onRateMessage }: MessageListProps) => {
  const sortedMessages = [...messages].sort((a, b) => {
    const aTime = new Date(a.times).getTime()
    const bTime = new Date(b.times).getTime()
    return aTime - bTime
  })


  const messagesByDate: { [date: string]: Message[] } = {}
  let currentDate: Date | null = null

  sortedMessages.forEach((msg) => {
    const msgDate = new Date(msg.times)

    if (!currentDate || !isSameDay(currentDate, msgDate)) {
      currentDate = msgDate
      const dateStr = formatMessageDate(msg.times)
      messagesByDate[dateStr] = [msg]
    } else {
      const dateStr = formatMessageDate(currentDate)
      messagesByDate[dateStr].push(msg)
    }
  })

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50">
      {Object.entries(messagesByDate).map(([date, dateMessages]) => (
        <div key={date} className="space-y-4">
          <div className="flex justify-center">
            <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">{date}</div>
          </div>

          {dateMessages.map((msg) => (
            <div key={msg.id} className={`flex pl-6 pr-6 pb-10 ${msg.role === "user" ? "justify-start" : "justify-end"}`}>
              {msg.role === "user" && (
                <div className="flex-shrink-0 mr-2 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs"  >
                {typeof msg.name === "string" ? msg.name.charAt(0) : "U"}
                </div>
              )}
              <div className="max-w-[90%] md:max-w-[80%]">
                <div
                  className={`rounded-lg px-4 py-2 ${
                    msg.role === "user" ? "bg-black text-white" : "bg-white border border-gray-200"
                  }`}
                >
                  <MessageContent content={msg.content} />
                </div>
                <div className="text-xs text-gray-500 mt-1 px-2 flex justify-between">
                  <span className="pr-2">
                    {new Date(msg.times).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span className="text-xs">{msg.name}</span>
                </div>
                {/* {msg.role === "assistent" && (
                  <div className="flex gap-2 mt-1 px-2">
                    <button
                      onClick={() => onRateMessage(msg.id, "like")}
                      className={`hover:text-green-800 ${
                        msg.raiting === "like" ? "text-green-800 font-bold" : "text-gray-500"
                      }`}
                      title="Gostei"
                    >
                      <ThumbsUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRateMessage(msg.id, "dislike")}
                      className={`hover:text-red-800 ${
                        msg.raiting === "dislike" ? "text-red-600 font-bold" : "text-gray-500"
                      }`}
                      title="Não gostei"
                    >
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                  </div>
                )} */}
              </div>
              {msg.role === "assistent" && (
                <div  className="flex-shrink-0 ml-2 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs">
                  A
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
