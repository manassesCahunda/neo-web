"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarClock, Clock, Search, User } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { Appointment } from "./agendamentos-view"

interface CalendarioAgendamentosProps {
  appointments: Appointment[]
  busca: string
  setBusca: (busca: string) => void
  dataFiltro: Date | undefined
  setDataFiltro: (data: Date | undefined) => void
  abrirDetalhes: (appointment: Appointment) => void
}

export function CalendarioAgendamentos({
  appointments,
  busca,
  setBusca,
  dataFiltro,
  setDataFiltro,
  abrirDetalhes,
}: CalendarioAgendamentosProps) {
  const [dataSelecionada, setDataSelecionada] = useState<Date | undefined>(dataFiltro || new Date())

  // Atualiza o filtro de data quando a data selecionada muda
  const handleDataSelecionada = (data: Date | undefined) => {
    setDataSelecionada(data)
    setDataFiltro(data)
  }

  // Filtra agendamentos para a data selecionada
  const agendamentosDoDia = appointments.filter((appointment) => {
    if (!dataSelecionada) return false

    const dataAgendamento = new Date(appointment.datetime_start)
    return (
      dataAgendamento.getDate() === dataSelecionada.getDate() &&
      dataAgendamento.getMonth() === dataSelecionada.getMonth() &&
      dataAgendamento.getFullYear() === dataSelecionada.getFullYear()
    )
  })

  // Função para verificar se uma data tem agendamentos
  const temAgendamento = (date: Date) => {
    return appointments.some((appointment) => {
      const dataAgendamento = new Date(appointment.datetime_start)
      return (
        dataAgendamento.getDate() === date.getDate() &&
        dataAgendamento.getMonth() === date.getMonth() &&
        dataAgendamento.getFullYear() === date.getFullYear()
      )
    })
  }

  // Função para extrair apenas a hora
  const extrairHora = (dataHora: string) => {
    const data = new Date(dataHora)
    return format(data, "HH:mm")
  }

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
      <Card>
        <CardHeader>
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título, cliente ou descrição..."
              className="pl-8"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={dataSelecionada}
            onSelect={handleDataSelecionada}
            className="rounded-md border"
            modifiers={{
              booked: (date) => temAgendamento(date),
            }}
            modifiersClassNames={{
              booked: "bg-primary/10 font-bold text-primary",
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {dataSelecionada ? (
              <div className="flex items-center">
                <CalendarClock className="mr-2 h-5 w-5" />
                {format(dataSelecionada, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </div>
            ) : (
              "Selecione uma data"
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {agendamentosDoDia.length > 0 ? (
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {agendamentosDoDia
                  .sort((a, b) => a.datetime_start.localeCompare(b.datetime_start))
                  .map((appointment) => (
                    <div
                      key={appointment.id}
                      className="border rounded-lg p-3 cursor-pointer hover:bg-muted/50"
                      onClick={() => abrirDetalhes(appointment)}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{appointment.name}</h3>
                        <Badge className={getStatusColor(appointment.appointment_status)} variant="outline">
                          {appointment.appointment_status.charAt(0).toUpperCase() +
                            appointment.appointment_status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{appointment.description}</p>
                      <div className="flex items-center mt-2 text-sm">
                        <Clock className="mr-1 h-3.5 w-3.5" />
                        <span>{extrairHora(appointment.datetime_start)}</span>
                      </div>
                      <div className="flex items-center mt-1 text-sm">
                        <User className="mr-1 h-3.5 w-3.5" />
                        <span>{appointment.client_name}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-8 text-muted-foreground">Nenhum agendamento para esta data</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
