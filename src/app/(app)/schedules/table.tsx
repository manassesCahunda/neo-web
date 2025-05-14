"use client"

import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Search } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { Appointment } from "./page"

interface TabelaAgendamentosProps {
  appointments: Appointment[]
  busca: string
  setBusca: (busca: string) => void
  dataFiltro: Date | undefined
  setDataFiltro: (data: Date | undefined) => void
  abrirDetalhes: (appointment: Appointment) => void
}

export function TabelaAgendamentos({
  appointments,
  busca,
  setBusca,
  dataFiltro,
  setDataFiltro,
  abrirDetalhes,
}: TabelaAgendamentosProps) {
  // Função para formatar a data
  const formatarData = (data: Date) => {
    return format(data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
  }

  // Função para formatar a data e hora
  const formatarDataHora = (dataHora: string) => {
    const data = new Date(dataHora)
    return format(data, "dd/MM/yyyy HH:mm")
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

  // Função para formatar valor monetário
  const formatarValor = (valor: string) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(valor))
  }

  return (
    <Card className="h-[calc(100vh-12rem)]">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título, cliente ou descrição..."
              className="pl-8"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full md:w-auto justify-start text-left font-normal ${
                  dataFiltro ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dataFiltro ? formatarData(dataFiltro) : "Selecionar data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={dataFiltro} onSelect={setDataFiltro} initialFocus />
            </PopoverContent>
          </Popover>

          {dataFiltro && (
            <Button variant="ghost" onClick={() => setDataFiltro(undefined)} className="w-full md:w-auto">
              Limpar filtro de data
            </Button>
          )}
        </div>

        <div className="rounded-md border flex-1 flex flex-col overflow-hidden">
          <div className="overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead className="hidden md:table-cell">Cliente</TableHead>
                  <TableHead className="hidden md:table-cell">Profissional</TableHead>
                  <TableHead className="hidden md:table-cell">Categoria</TableHead>
                  <TableHead className="hidden lg:table-cell">Valor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <TableRow
                      key={appointment.id}
                      className="cursor-pointer hover:bg-muted/80"
                      onClick={() => abrirDetalhes(appointment)}
                    >
                      <TableCell>{formatarDataHora(appointment.datetime_start)}</TableCell>
                      <TableCell className="font-medium">{appointment.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{appointment.client_name}</TableCell>
                      <TableCell className="hidden md:table-cell">{appointment.user_name}</TableCell>
                      <TableCell className="hidden md:table-cell">{appointment.category}</TableCell>
                      <TableCell className="hidden lg:table-cell">{formatarValor(appointment.value)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(appointment.appointment_status)} variant="outline">
                          {appointment.appointment_status.charAt(0).toUpperCase() +
                            appointment.appointment_status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Nenhum agendamento encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="text-sm text-muted-foreground mt-4">Total de agendamentos: {appointments.length}</div>
      </CardContent>
    </Card>
  )
}
