import { FileIcon, FileText, ImageIcon, VideoIcon } from "lucide-react"

export const MessageContent = ({ content }: { content: string }) => {
  if (content === "unsupported") {
    return (
      <div className="flex items-center text-gray-500">
        <FileIcon className="mr-2 h-4 w-4" />
        <span>Mídia não suportada</span>
      </div>
    )
  } else if (content === "document") {
    return (
      <div className="flex items-center text-gray-500">
        <FileText className="mr-2 h-4 w-4" />
        <span>Documento</span>
      </div>
    )
  } else if (content === "image") {
    return (
      <div className="flex items-center text-gray-500">
        <ImageIcon className="mr-2 h-4 w-4" />
        <span>Imagem</span>
      </div>
    )
  } else if (content === "video") {
    return (
      <div className="flex items-center text-gray-500">
        <VideoIcon className="mr-2 h-4 w-4" />
        <span>Vídeo</span>
      </div>
    )
  } else if (!content) {
    return (
      <div className="flex items-center text-gray-500">
        <FileIcon className="mr-2 h-4 w-4" />
        <span>Mídia</span>
      </div>
    )
  }

  return <span>{content}</span>
}
