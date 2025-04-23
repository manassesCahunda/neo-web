"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { select } from "@/action/appointment/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

interface Appointment {
  id: string;
  name: string;
  client_name: string;
  user_name: string;
  datetime_start: string;
  category: string;
  appointment_status: string;
  value: string;
  description: string;
  quantity: number;
  price: string;
  details: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filtered, setFiltered] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [column, setColumn] = useState("");
  const [status, setStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Client-side date formatting
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function load() {
      const { message } = await select();
      setAppointments(Array.isArray(message) ? message : []);
    }
    load();
  }, []);

  useEffect(() => {
    const toDateEnd = dateTo ? new Date(new Date(dateTo).setHours(23, 59, 59, 999)) : null;

    const f = appointments.filter((app) => {
      if (searchTerm) {
        const hay = column
          ? ((app as any)[column]?.toString().toLowerCase() ?? "")
          : Object.values(app).join(" ").toLowerCase();
        if (!hay.includes(searchTerm.toLowerCase())) return false;
      }
      if (status && app.appointment_status !== status) return false;
      if (dateFrom && new Date(app.datetime_start) < new Date(dateFrom)) return false;
      if (toDateEnd && new Date(app.datetime_start) > toDateEnd) return false;
      return true;
    });

    setFiltered(f);
  }, [appointments, searchTerm, column, status, dateFrom, dateTo]);

  const getStatusColor = (s: string) =>
    ({
      pending: "bg-yellow-500",
      in_progress: "bg-blue-500",
      completed: "bg-green-500",
    })[s] || "bg-gray-500";

  const truncate = (t: string, n: number) => (!t ? "" : t.length > n ? t.slice(0, n) + "…" : t);

  return (
    <div className="flex flex-col min-h-screen w-full p-2 sm:p-4 md:p-6">
      <Card className="flex-grow border shadow-sm">
        <CardHeader className="bg-gray-50 border-b py-3 px-4">
          <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800">Todos os compromissos</CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-4">
          {/* Filters - Responsive layout */}
          <div className="space-y-3 mb-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <input
                type="text"
                placeholder="Buscar texto"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-full"
              />
              <select
                value={column}
                onChange={(e) => setColumn(e.target.value)}
                className="h-10 border rounded-md px-3 bg-white w-full sm:w-auto"
              >
                <option value="">Todas colunas</option>
                <option value="name">Nome</option>
                <option value="client_name">Cliente</option>
                <option value="user_name">Fornecedor</option>
                <option value="category">Categoria</option>
                <option value="appointment_status">Status</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <div className="flex gap-2 w-full sm:w-auto">
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="h-10 w-full"
                  placeholder="Data inicial"
                />
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="h-10 w-full"
                  placeholder="Data final"
                />
              </div>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-10 border rounded-md px-3 bg-white w-full sm:w-auto"
              >
                <option value="">Todos status</option>
                <option value="pending">Pendente</option>
                <option value="in_progress">Em andamento</option>
                <option value="completed">Concluído</option>
              </select>
            </div>
          </div>

          {/* Table with horizontal scroll on mobile */}
          <div className="border rounded-md overflow-hidden">
            <ScrollArea className="max-h-[550px] w-full">
              <div className="overflow-x-auto">
                <Table className="classic-table min-w-[800px]">
                  <TableHeader className="bg-gray-50 sticky top-0">
                    <TableRow>
                      <TableHead className="font-semibold text-gray-700 w-[180px]">Nome</TableHead>
                      <TableHead className="font-semibold text-gray-700 w-[150px]">Cliente</TableHead>
                      <TableHead className="font-semibold text-gray-700 w-[150px]">Fornecedor</TableHead>
                      <TableHead className="font-semibold text-gray-700 w-[150px]">Data e Hora</TableHead>
                      <TableHead className="font-semibold text-gray-700 w-[120px]">Categoria</TableHead>
                      <TableHead className="font-semibold text-gray-700 w-[120px]">Status</TableHead>
                      <TableHead className="font-semibold text-gray-700 w-[100px]">Valor</TableHead>
                      <TableHead className="font-semibold text-gray-700 w-[150px]">Descrição</TableHead>
                      <TableHead className="font-semibold text-gray-700 w-[80px]">Qtd</TableHead>
                      <TableHead className="font-semibold text-gray-700 w-[100px]">Preço</TableHead>
                      <TableHead className="font-semibold text-gray-700 w-[150px]">Detalhes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={11} className="text-center py-8 text-muted-foreground">
                          Nenhum compromisso encontrado
                        </TableCell>
                      </TableRow>
                    ) : (
                      filtered.map((app) => (
                        <TableRow
                          key={app.id}
                          onClick={() => setSelectedAppointment(app)}
                          className="cursor-pointer hover:bg-gray-50 border-b"
                        >
                          <TableCell className="font-medium">{app.name}</TableCell>
                          <TableCell>{app.client_name}</TableCell>
                          <TableCell>{app.user_name}</TableCell>
                          <TableCell>
                            {isClient ? format(new Date(app.datetime_start), "dd/MM/yyyy HH:mm") : ""}
                          </TableCell>
                          <TableCell>{app.category}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`${getStatusColor(app.appointment_status)} text-white`}>
                              {app.appointment_status.replace("_", " ")}
                            </Badge>
                          </TableCell>
                          <TableCell>R$ {Number.parseFloat(app.value || "0").toFixed(2)}</TableCell>
                          <TableCell>{truncate(app.description, 10)}</TableCell>
                          <TableCell>{app.quantity}</TableCell>
                          <TableCell>R$ {Number.parseFloat(app.price || "0").toFixed(2)}</TableCell>
                          <TableCell>{truncate(app.details, 10)}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>

      {/* Appointment Detail Sheet */}
      {selectedAppointment && (
        <Sheet open onOpenChange={() => setSelectedAppointment(null)}>
          <SheetContent side="right" className="w-full sm:w-[60vw] md:w-[50vw] lg:w-[35vw]">
            <SheetHeader>
              <SheetTitle>{selectedAppointment.name}</SheetTitle>
            </SheetHeader>
            <Separator />
            <div className="p-4">
              <p>{selectedAppointment.details}</p>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button>Fechar</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
