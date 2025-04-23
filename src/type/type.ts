
export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  lastContact: string
}

export interface Conversation {
  id: string
  name: string
  date: string
  preview: string
}


export interface user {
  userId: string,
  prompt: string,
  type: string,
  remoteJid: string,
}



export type SessionUser = {
  id: string
  email: string
  name?: string
  avatar:string,
  type: string,
  prompt: string
}