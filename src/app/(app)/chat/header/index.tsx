import Image from "next/image"
import type { Conversation } from "@/type/chat"
import { Label } from "@/components/ui/label"
import { CustomSwitch } from "@/components/switch"

interface ChatHeaderProps {
  conversation: Conversation
  onButton: (status: boolean) => void 
}

export const ChatHeader = ({ conversation, onButton }: ChatHeaderProps) => {
  return (
    <div className="border-b border-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <Image
          src="https://icones.pro/wp-content/uploads/2021/03/avatar-de-personne-icone-homme.png"
          alt={conversation.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="ml-3">
          <h3 className="font-medium text-gray-900">{conversation.name}</h3>
          <p className="text-xs text-gray-500">{conversation.phone}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <CustomSwitch
          id="airplane-mode"
          checked={conversation.status}  
          onCheckedChange={(checked) => onButton(checked)} 
          className="hover:opacity-90"
          thumbClassName="hover:scale-105"
        />
        <Label htmlFor="airplane-mode">Estado do Assistente</Label>
      </div>
    </div>
  )
}
