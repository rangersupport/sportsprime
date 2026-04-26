"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Settings, 
  BarChart3, 
  CreditCard,
  Building2,
  Bot,
  UserCog,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronDown
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PoweredByBadge } from "@/components/shared/powered-by-badge"

const navigation = [
  { name: "Panel", href: "/admin", icon: LayoutDashboard },
  { name: "Reservas", href: "/admin/reservas", icon: Calendar, badge: 12 },
  { name: "Canchas", href: "/admin/canchas", icon: Building2 },
  { name: "Clientes", href: "/admin/clientes", icon: Users },
  { name: "Pagos", href: "/admin/pagos", icon: CreditCard },
  { name: "Analíticas", href: "/admin/analiticas", icon: BarChart3 },
  { name: "Robótica", href: "/admin/robotica", icon: Bot },
  { name: "Staff", href: "/admin/staff", icon: UserCog },
  { name: "Configuración", href: "/admin/configuracion", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-forest transition-transform duration-300 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-cream/10 px-4">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="font-display text-xl font-bold text-cream">
              <span className="text-gold">Sports</span>Prime
            </span>
          </Link>
          <Button
            size="icon"
            variant="ghost"
            className="text-cream lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Club Selector */}
        <div className="border-b border-cream/10 p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between text-cream hover:bg-cream/10"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold text-forest font-bold">
                    EC
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">El Campín</p>
                    <p className="text-xs text-cream/60">4 canchas</p>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-cream/60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Tus clubes</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-forest text-xs font-bold text-cream">
                    EC
                  </div>
                  <span>El Campín</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-forest text-xs font-bold text-cream">
                    CP
                  </div>
                  <span>Club Palermo</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Building2 className="mr-2 h-4 w-4" />
                Agregar club
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/admin" && pathname.startsWith(item.href))
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-gold text-forest font-medium"
                        : "text-cream/70 hover:bg-cream/10 hover:text-cream"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                    {item.badge && (
                      <Badge className="ml-auto bg-cream/20 text-cream text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-cream/10 p-4">
          <PoweredByBadge variant="light" className="mb-4" />
          <p className="text-xs text-cream/40 text-center">v1.0.0</p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between border-b px-4 lg:px-6">
          <Button
            size="icon"
            variant="ghost"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex-1 lg:flex-none" />

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Button size="icon" variant="ghost" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/images/admin-avatar.jpg" />
                    <AvatarFallback className="bg-forest text-cream">
                      JP
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">Juan Peralta</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserCog className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
