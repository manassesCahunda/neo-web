'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"
import { action } from "@/action/user/update"
import { useRouter } from "next/navigation"
import { SpinnerIcon } from "@/components/svg/loading"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { select } from "@/action/user/select"
import neo from "@/assets/logo.png"

export default function AIForm() {
  const router = useRouter()
  const [data, setData] = useState({ prompt: "", remoteJid: "", type: "" })
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      const result = await select()
      if (isMounted) {
        setData(result?.message || { prompt: "", remoteJid: "", type: "" })
        setDataLoaded(true)
      }
    })()
    return () => {
      isMounted = false
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setLoading(true)

    const formData = new FormData(e.target as HTMLFormElement)

    try {
      const result = await action(formData)

      if (result.success) {
        router.push('/chat')
      } else {
        setFormError(result.message || "Erro ao criar IA.")
      }
    } catch (error: any) {
      setFormError(error.message || "Erro inesperado.")
      console.error("Erro ao criar IA:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!dataLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SpinnerIcon className="w-10 h-10 animate-spin text-gray-500" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-10 bg-white  shadow">
      {formError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {formError}
        </div>
      )}
          <div className="flex flex-row items-center gap-4">
        <div className="w-10 h-10 bg-black flex items-center justify-center overflow-hidden">
          <Avatar style={{ width: 40, height: 40 }}>
            <AvatarImage src={neo.src} alt="@NEO" width={40} height={40} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Crie sua IA</h2>
          <p className="text-gray-500">Configure seu assistente de IA antes de acessar o chat</p>
        </div>
      </div>
      <div>
        <label className="block mb-1 font-semibold">Número (WhatsApp)</label>
        <Input
          type="number"
          name="remoteJid"
          defaultValue={data.remoteJid}
          placeholder="Ex: 55 11999999999"
          required
          autoComplete="off"
        />
           <p className="text-sm text-gray-500 mt-1">
          Insira o número com o código do país. Usaremos este WhatsApp para enviar os relatórios da IA.
        </p>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Tipo</label>
        <Select name="aiType" defaultValue={data.type}>
          <SelectTrigger>
            <SelectValue placeholder="Escolha o tipo de IA" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ENTERPRISE">Corporativo</SelectItem>
            <SelectItem value="SUPPORT">Suporte</SelectItem>
            <SelectItem value="BASIC">Básico</SelectItem>
            <SelectItem value="SINGULAR">Singular</SelectItem>
            <SelectItem value="CONSULTANCY">Consultoria</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-gray-500 mt-1">O tipo de IA define seu comportamento e capacidades.</p>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Instruções</label>
        <Textarea
          name="aiPrompt"
          defaultValue={data.prompt}
          placeholder="Digite as instruções para seu assistente de IA..."
          required
          autoComplete="off"
          className="min-h-[100px]"
        />
          <p className="text-sm text-gray-500 mt-1">Este prompt orienta como sua IA responderá às mensagens.</p>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? (
            <SpinnerIcon className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Salvar
        </Button>
      </div>
    </form>
  )
}
