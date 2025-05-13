"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar, Tag, User, DollarSign, FileText, Briefcase, Hash } from "lucide-react"
import type { Appointment } from "./view"

interface DetalhesAgendamentoProps {
  appointment: Appointment | null
  aberto: boolean
  setAberto: (aberto: boolean) => void
}

export function DetalhesAgendamento({ appointment, aberto, setAberto }: DetalhesAgendamentoProps) {
  if (!appointment) return null

  // Função para obter a cor do status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmado":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "pendente":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "cancelado":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  // Função para formatar data e hora
  const formatarDataHora = (dataHora: string) => {
    const data = new Date(dataHora)
    return format(data, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })
  }

  // Função para formatar valor monetário
  const formatarValor = (valor: string) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(valor))
  }

  return (
    <Sheet open={aberto} onOpenChange={setAberto}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-xl">{appointment.name}</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="flex justify-between items-center">
            <Badge
              className={getStatusColor(appointment.appointment_status)}
              variant="outline"
              className="text-sm px-3 py-1"
            >
              {appointment.appointment_status.charAt(0).toUpperCase() + appointment.appointment_status.slice(1)}
            </Badge>
            <span className="text-sm text-muted-foreground">ID: {appointment.id}</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Data e Hora</p>
                <p className="text-muted-foreground">{formatarDataHora(appointment.datetime_start)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Cliente</p>
                <p className="text-muted-foreground">{appointment.client_name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Briefcase className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Profissional</p>
                <p className="text-muted-foreground">{appointment.user_name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Tag className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Categoria</p>
                <p className="text-muted-foreground">{appointment.category}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Valor</p>
                <p className="text-muted-foreground">{formatarValor(appointment.value)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Hash className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Quantidade</p>
                <p className="text-muted-foreground">{appointment.quantity}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Preço Unitário</p>
                <p className="text-muted-foreground">{formatarValor(appointment.price)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Descrição</p>
                <p className="text-muted-foreground">{appointment.description}</p>
              </div>
            </div>

            {appointment.details && (
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Detalhes</p>
                  <p className="text-muted-foreground">{appointment.details}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
