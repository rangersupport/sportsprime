"use client"

import { useState } from "react"
import { 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  Eye
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCOP, formatTime, cn } from "@/lib/utils"
import { StatusDot } from "@/components/shared/status-dot"
import { SportIcon } from "@/components/shared/sport-icon"

// Mock data
const stats = [
  {
    title: "Reservas Hoy",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: Calendar,
  },
  {
    title: "Ingresos del Día",
    value: formatCOP(2450000),
    change: "+8%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Clientes Activos",
    value: "1,234",
    change: "+5%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Tasa de Ocupación",
    value: "78%",
    change: "-3%",
    trend: "down",
    icon: TrendingUp,
  },
]

const courtStatus = [
  { id: 1, name: "Cancha 1", sport: "padel", status: "occupied", player: "Juan Pérez", timeLeft: 25 },
  { id: 2, name: "Cancha 2", sport: "tenis", status: "available", player: null, timeLeft: null },
  { id: 3, name: "Cancha 3", sport: "futbol", status: "occupied", player: "María García", timeLeft: 45 },
  { id: 4, name: "Cancha 4", sport: "padel", status: "maintenance", player: null, timeLeft: null },
]

const recentBookings = [
  { id: "SP-2024-A1B2C3", client: "Carlos López", sport: "Pádel", court: "Cancha 1", time: "10:00", status: "confirmed", amount: 85000 },
  { id: "SP-2024-D4E5F6", client: "Ana Martínez", sport: "Tenis", court: "Cancha 2", time: "11:30", status: "pending", amount: 120000 },
  { id: "SP-2024-G7H8I9", client: "Luis Rodríguez", sport: "Fútbol", court: "Cancha 3", time: "14:00", status: "confirmed", amount: 180000 },
  { id: "SP-2024-J0K1L2", client: "Sofía Hernández", sport: "Pádel", court: "Cancha 1", time: "16:00", status: "cancelled", amount: 85000 },
  { id: "SP-2024-M3N4O5", client: "Diego Vargas", sport: "Pádel", court: "Cancha 4", time: "18:00", status: "pending", amount: 85000 },
]

const statusConfig = {
  confirmed: { label: "Confirmada", color: "bg-emerald-500", icon: CheckCircle2 },
  pending: { label: "Pendiente", color: "bg-gold", icon: Clock },
  cancelled: { label: "Cancelada", color: "bg-red-500", icon: XCircle },
}

export default function AdminDashboard() {
  const [selectedPeriod] = useState("today")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest md:text-3xl">
            Panel de Control
          </h1>
          <p className="text-muted-foreground">
            Bienvenido de vuelta. Aquí está el resumen de hoy.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Exportar</Button>
          <Button className="bg-forest text-cream hover:bg-forest/90">
            Nueva Reserva
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest/10">
                  <stat.icon className="h-5 w-5 text-forest" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  stat.trend === "up" ? "text-emerald-600" : "text-red-600"
                )}>
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Court Status */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Estado de Canchas</CardTitle>
            <CardDescription>Disponibilidad en tiempo real</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {courtStatus.map((court) => (
              <div
                key={court.id}
                className={cn(
                  "flex items-center justify-between rounded-lg border p-3",
                  court.status === "available" && "border-emerald-200 bg-emerald-50",
                  court.status === "occupied" && "border-gold/30 bg-gold/5",
                  court.status === "maintenance" && "border-red-200 bg-red-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <SportIcon sport={court.sport} className="h-5 w-5 text-forest" />
                  <div>
                    <p className="font-medium text-sm">{court.name}</p>
                    {court.player ? (
                      <p className="text-xs text-muted-foreground">{court.player}</p>
                    ) : court.status === "maintenance" ? (
                      <p className="text-xs text-red-600">En mantenimiento</p>
                    ) : (
                      <p className="text-xs text-emerald-600">Disponible</p>
                    )}
                  </div>
                </div>
                {court.timeLeft && (
                  <div className="text-right">
                    <p className="font-mono text-sm font-bold text-forest">
                      {court.timeLeft}min
                    </p>
                    <Progress 
                      value={(court.timeLeft / 60) * 100} 
                      className="mt-1 h-1 w-16" 
                    />
                  </div>
                )}
                {court.status === "available" && (
                  <Button size="sm" variant="outline" className="text-xs">
                    Reservar
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Reservas Recientes</CardTitle>
              <CardDescription>Últimas 5 reservas del día</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Ver todas
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Deporte</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBookings.map((booking) => {
                  const statusInfo = statusConfig[booking.status as keyof typeof statusConfig]
                  return (
                    <TableRow key={booking.id}>
                      <TableCell className="font-mono text-xs">
                        {booking.id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {booking.client}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <SportIcon 
                            sport={booking.sport.toLowerCase()} 
                            className="h-4 w-4 text-forest" 
                          />
                          {booking.sport}
                        </div>
                      </TableCell>
                      <TableCell>{booking.time}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary"
                          className={cn(
                            "gap-1",
                            booking.status === "confirmed" && "bg-emerald-100 text-emerald-700",
                            booking.status === "pending" && "bg-gold/20 text-gold-dark",
                            booking.status === "cancelled" && "bg-red-100 text-red-700"
                          )}
                        >
                          <StatusDot status={booking.status as "confirmed" | "pending" | "cancelled"} />
                          {statusInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCOP(booking.amount, false)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Confirmar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <XCircle className="mr-2 h-4 w-4" />
                              Cancelar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      <Card className="border-gold/30 bg-gold/5">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20">
            <AlertCircle className="h-5 w-5 text-gold" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-forest">3 reservas pendientes de confirmación</p>
            <p className="text-sm text-muted-foreground">
              Hay pagos por verificar antes de las 15:00
            </p>
          </div>
          <Button variant="outline" className="border-gold text-forest hover:bg-gold/10">
            Revisar ahora
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
