"use client"

import { useState, useEffect } from "react"
import { TabelaAgendamentos } from "@/components/tabela-agendamentos"
import { CalendarioAgendamentos } from "@/components/calendario-agendamentos"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DetalhesAgendamento } from "@/components/detalhes-agendamento"
import { Calendar, LayoutList } from "lucide-react"

// Interface para os agendamentos conforme recebido da API
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

// Função para selecionar agendamentos da API
async function select() {
  // Esta função seria substituída pela implementação real
  // Por enquanto, retornamos dados de exemplo
  return {
    message: [
      {
        id: "1",
        name: "Consulta Médica",
        client_name: "João Silva",
        user_name: "Dr. Carlos Mendes",
        datetime_start: "2025-05-10T09:00:00",
        category: "Médica",
        appointment_status: "confirmado",
        value: "150.00",
        description: "Consulta de rotina",
        quantity: 1,
        price: "150.00",
        details: "Trazer exames anteriores",
      },
      {
        id: "2",
        name: "Exame de Sangue",
        client_name: "Maria Santos",
        user_name: "Dra. Ana Oliveira",
        datetime_start: "2025-05-10T11:30:00",
        category: "Exame",
        appointment_status: "pendente",
        value: "80.00",
        description: "Hemograma completo",
        quantity: 1,
        price: "80.00",
        details: "Jejum de 8 horas",
      },
      {
        id: "3",
        name: "Fisioterapia",
        client_name: "Carlos Oliveira",
        user_name: "Ft. Roberto Almeida",
        datetime_start: "2025-05-12T14:00:00",
        category: "Terapia",
        appointment_status: "confirmado",
        value: "120.00",
        description: "Sessão de reabilitação",
        quantity: 1,
        price: "120.00",
        details: "Trazer roupas confortáveis",
      },
      {
        id: "4",
        name: "Consulta Cardiológica",
        client_name: "Ana Ferreira",
        user_name: "Dra. Juliana Costa",
        datetime_start: "2025-05-13T10:15:00",
        category: "Médica",
        appointment_status: "confirmado",
        value: "200.00",
        description: "Avaliação cardiológica",
        quantity: 1,
        price: "200.00",
        details: "Trazer exames anteriores",
      },
      {
        id: "5",
        name: "Exame de Vista",
        client_name: "Pedro Almeida",
        user_name: "Dr. Marcos Vieira",
        datetime_start: "2025-05-14T16:30:00",
        category: "Exame",
        appointment_status: "cancelado",
        value: "100.00",
        description: "Renovação de receita",
        quantity: 1,
        price: "100.00",
        details: "Cancelado pelo paciente",
      },
      {
        id: "6",
        name: "Consulta Nutricionista",
        client_name: "Juliana Martins",
        user_name: "Nt. Fernanda Lima",
        datetime_start: "2025-05-15T13:00:00",
        category: "Nutrição",
        appointment_status: "pendente",
        value: "120.00",
        description: "Plano alimentar",
        quantity: 1,
        price: "120.00",
        details: "Primeira consulta",
      },
      {
        id: "7",
        name: "Terapia",
        client_name: "Roberto Souza",
        user_name: "Psi. Camila Rocha",
        datetime_start: "2025-05-17T18:00:00",
        category: "Psicologia",
        appointment_status: "confirmado",
        value: "180.00",
        description: "Sessão regular",
        quantity: 1,
        price: "180.00",
        details: "Sessão semanal",
      },
      {
        id: "8",
        name: "Dentista",
        client_name: "Fernanda Lima",
        user_name: "Dr. Paulo Santos",
        datetime_start: "2025-05-20T09:30:00",
        category: "Odontologia",
        appointment_status: "pendente",
        value: "150.00",
        description: "Limpeza e revisão",
        quantity: 1,
        price: "150.00",
        details: "Confirmação pendente",
      },
    ],
  }
}

export function AgendamentosView() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [busca, setBusca] = useState("")
  const [dataFiltro, setDataFiltro] = useState<Date | undefined>(undefined)
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState<Appointment | null>(null)
  const [sheetAberto, setSheetAberto] = useState(false)

  // Carrega os agendamentos da API
  useEffect(() => {
    async function load() {
      const { message } = await select()
      setAppointments(Array.isArray(message) ? message : [])
    }
    load()
  }, [])

  // Filtra os agendamentos com base na busca e na data selecionada
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

  // Função para abrir o sheet com os detalhes do agendamento
  const abrirDetalhes = (appointment: Appointment) => {
    setAgendamentoSelecionado(appointment)
    setSheetAberto(true)
  }

  return (
    <>
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
    </>
  )
}
