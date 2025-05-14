"use client"

import { useState, useEffect } from "react"
import { TabelaAgendamentos } from "./table"
import { CalendarioAgendamentos } from "./calender"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DetalhesAgendamento } from "./details"
import { Calendar, LayoutList } from "lucide-react"
import  { select } from "@/action/appointment/select"



export interface Appointment {
  id: string
  name: string
  client_name: string
  user_name: string
  datetime_start: string
  category: string
  appointment_status: string
  value: string
  description: string
  quantity: number
  price: string
  details: string
}


export default function  AgendamentosView() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [busca, setBusca] = useState("")
  const [dataFiltro, setDataFiltro] = useState<Date | undefined>(undefined)
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState<Appointment | null>(null)
  const [sheetAberto, setSheetAberto] = useState(false)


  useEffect(() => {
    async function load() {
      const { message } = await select();
      console.log(message);
      setAppointments(Array.isArray(message) ? message : [])
    }
    load()
  }, [])

  
  const agendamentosFiltrados = appointments.filter((appointment) => {
    const correspondeABusca =
      appointment.name.toLowerCase().includes(busca.toLowerCase()) ||
      appointment.client_name.toLowerCase().includes(busca.toLowerCase()) ||
      appointment.description.toLowerCase().includes(busca.toLowerCase()) ||
      appointment.category.toLowerCase().includes(busca.toLowerCase())

    const dataAgendamento = new Date(appointment.datetime_start)

    const correspondeAData = dataFiltro
      ? dataAgendamento.getDate() === dataFiltro.getDate() &&
        dataAgendamento.getMonth() === dataFiltro.getMonth() &&
        dataAgendamento.getFullYear() === dataFiltro.getFullYear()
      : true

    return correspondeABusca && correspondeAData
  })


  const abrirDetalhes = (appointment: Appointment) => {
    setAgendamentoSelecionado(appointment)
    setSheetAberto(true)
  }

  return (
    <div className="container mx-auto py-4 h-[calc(100vh-2rem)]">
      <h1 className="text-3xl font-bold mb-4">Sistema de Agendamentos</h1>
      <Tabs defaultValue="tabela" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="tabela" className="flex items-center gap-2">
              <LayoutList className="h-4 w-4" />
              <span>Tabela</span>
            </TabsTrigger>
            <TabsTrigger value="calendario" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Calendário</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="tabela" className="mt-0">
          <TabelaAgendamentos
            appointments={agendamentosFiltrados}
            busca={busca}
            setBusca={setBusca}
            dataFiltro={dataFiltro}
            setDataFiltro={setDataFiltro}
            abrirDetalhes={abrirDetalhes}
          />
        </TabsContent>

        <TabsContent value="calendario" className="mt-0">
          <CalendarioAgendamentos
            appointments={agendamentosFiltrados}
            busca={busca}
            setBusca={setBusca}
            dataFiltro={dataFiltro}
            setDataFiltro={setDataFiltro}
            abrirDetalhes={abrirDetalhes}
          />
        </TabsContent>
      </Tabs>

      <DetalhesAgendamento appointment={agendamentoSelecionado} aberto={sheetAberto} setAberto={setSheetAberto} />
    </div>
  )
}
