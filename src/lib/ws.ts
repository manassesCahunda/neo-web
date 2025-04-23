import { cookies } from "@/lib/cookie"
import { sessionStore } from "@/lib/session"
import type { ServerMessage } from "@/type/chat"

let socket: WebSocket | null = null

export async function connectWebSocket(onMessage: (msg: ServerMessage) => void) {
  try {
    const token = cookies["token"]
    const user = await sessionStore({ tokenCookie: token })

    if (user?.id) {
      socket = new WebSocket(`${process.env.WEB_SOCKET}?session=${user.id}`)

      socket.onmessage = (event) => {
        onMessage(JSON.parse(event.data))
      }

      return true
    }

    return false
  } catch (error) {
    console.error("Erro ao conectar ao WebSocket:", error)
    return false
  }
}

export function sendWebSocketMessage(data: any) {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data))
    return true
  }
  return false
}

export function closeWebSocket() {
  if (socket) {
    socket.close()
    socket = null
  }
}
