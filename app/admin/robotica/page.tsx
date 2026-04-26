"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Bot, 
  Wifi, 
  WifiOff, 
  Play, 
  Pause, 
  RotateCcw, 
  AlertTriangle,
  CheckCircle2,
  Settings,
  Activity,
  Thermometer,
  Zap,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Hand,
  Target,
  Home
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { PoweredByBadge } from "@/components/shared/powered-by-badge"

// Robot arm joint positions (simulated)
interface JointState {
  base: number
  shoulder: number
  elbow: number
  wrist: number
  gripper: number
}

// Training programs
const trainingPrograms = [
  { id: 1, name: "Saque Básico", difficulty: "Principiante", duration: "15 min", balls: 50 },
  { id: 2, name: "Revés Cruzado", difficulty: "Intermedio", duration: "20 min", balls: 75 },
  { id: 3, name: "Volea Rápida", difficulty: "Avanzado", duration: "25 min", balls: 100 },
  { id: 4, name: "Entrenamiento Mixto", difficulty: "Todos", duration: "30 min", balls: 120 },
]

export default function RoboticsPage() {
  const [connected, setConnected] = useState(true)
  const [isRunning, setIsRunning] = useState(false)
  const [currentProgram, setCurrentProgram] = useState<number | null>(null)
  const [ballsServed, setBallsServed] = useState(0)
  const [speed, setSpeed] = useState([50])
  const [autoMode, setAutoMode] = useState(false)
  
  // Simulated sensor data
  const [sensorData, setSensorData] = useState({
    temperature: 42,
    voltage: 24.1,
    current: 2.3,
    uptime: "4h 23m",
  })
  
  // Simulated joint positions
  const [joints, setJoints] = useState<JointState>({
    base: 0,
    shoulder: 45,
    elbow: 90,
    wrist: 0,
    gripper: 50,
  })

  // Simulate ball serving
  useEffect(() => {
    if (isRunning && currentProgram) {
      const program = trainingPrograms.find(p => p.id === currentProgram)
      if (program && ballsServed < program.balls) {
        const interval = setInterval(() => {
          setBallsServed(prev => {
            if (prev >= program.balls) {
              setIsRunning(false)
              return prev
            }
            return prev + 1
          })
        }, 2000)
        return () => clearInterval(interval)
      }
    }
  }, [isRunning, currentProgram, ballsServed])

  const handleStartProgram = (programId: number) => {
    setCurrentProgram(programId)
    setBallsServed(0)
    setIsRunning(true)
  }

  const handleStop = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setCurrentProgram(null)
    setBallsServed(0)
    setJoints({
      base: 0,
      shoulder: 45,
      elbow: 90,
      wrist: 0,
      gripper: 50,
    })
  }

  const moveJoint = (joint: keyof JointState, delta: number) => {
    setJoints(prev => ({
      ...prev,
      [joint]: Math.max(-180, Math.min(180, prev[joint] + delta)),
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-bold text-forest md:text-3xl">
              Módulo Robótica
            </h1>
            <Badge 
              variant="outline" 
              className={cn(
                "gap-1",
                connected ? "border-emerald-500 text-emerald-600" : "border-red-500 text-red-600"
              )}
            >
              {connected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
              {connected ? "Conectado" : "Desconectado"}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Control del brazo robótico AR4 — Coach Peralta Technology
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleReset}
            disabled={!connected}
          >
            <Home className="mr-2 h-4 w-4" />
            Posición Inicial
          </Button>
          <Button 
            variant="outline"
            disabled={!connected}
          >
            <Settings className="mr-2 h-4 w-4" />
            Configurar
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Robot Visualization */}
        <Card className="lg:col-span-2 overflow-hidden">
          <CardHeader className="border-b bg-forest/5">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-forest" />
                  AR4 Robot Arm
                </CardTitle>
                <CardDescription>Visualización en tiempo real</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Modo Auto</span>
                <Switch checked={autoMode} onCheckedChange={setAutoMode} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Robot SVG Visualization */}
            <div className="relative aspect-video bg-gradient-to-br from-forest/5 to-forest/10 flex items-center justify-center">
              <svg 
                viewBox="0 0 400 300" 
                className="w-full max-w-lg"
                style={{ filter: connected ? "none" : "grayscale(100%)" }}
              >
                {/* Base */}
                <motion.g
                  animate={{ rotate: joints.base }}
                  style={{ transformOrigin: "200px 250px" }}
                >
                  <rect 
                    x="170" y="230" width="60" height="40" rx="5" 
                    className="fill-forest"
                  />
                  
                  {/* Shoulder */}
                  <motion.g
                    animate={{ rotate: -joints.shoulder }}
                    style={{ transformOrigin: "200px 220px" }}
                  >
                    <rect 
                      x="190" y="140" width="20" height="80" rx="5" 
                      className="fill-gold"
                    />
                    <circle 
                      cx="200" cy="220" r="12" 
                      className="fill-forest stroke-gold stroke-2"
                    />
                    
                    {/* Elbow */}
                    <motion.g
                      animate={{ rotate: joints.elbow - 90 }}
                      style={{ transformOrigin: "200px 140px" }}
                    >
                      <rect 
                        x="195" y="80" width="10" height="60" rx="3" 
                        className="fill-cream stroke-forest stroke-2"
                      />
                      <circle 
                        cx="200" cy="140" r="8" 
                        className="fill-gold"
                      />
                      
                      {/* Wrist */}
                      <motion.g
                        animate={{ rotate: joints.wrist }}
                        style={{ transformOrigin: "200px 80px" }}
                      >
                        <rect 
                          x="192" y="50" width="16" height="30" rx="3" 
                          className="fill-forest"
                        />
                        
                        {/* Gripper */}
                        <motion.g
                          animate={{ scaleX: 0.5 + (joints.gripper / 200) }}
                          style={{ transformOrigin: "200px 50px" }}
                        >
                          <path 
                            d="M 185 50 L 185 35 L 190 30" 
                            className="stroke-gold stroke-2 fill-none"
                          />
                          <path 
                            d="M 215 50 L 215 35 L 210 30" 
                            className="stroke-gold stroke-2 fill-none"
                          />
                        </motion.g>
                      </motion.g>
                    </motion.g>
                  </motion.g>
                </motion.g>
                
                {/* Ball indicator */}
                {isRunning && (
                  <motion.circle
                    cx="300"
                    cy="100"
                    r="8"
                    className="fill-gold"
                    animate={{ 
                      cx: [300, 100],
                      cy: [100, 200],
                      opacity: [1, 0]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                )}
              </svg>
              
              {/* Status Overlay */}
              {isRunning && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute top-4 right-4 rounded-lg bg-forest/90 px-4 py-2 text-cream"
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="h-2 w-2 rounded-full bg-emerald-400"
                    />
                    <span className="font-mono text-sm">EN EJECUCIÓN</span>
                  </div>
                </motion.div>
              )}
              
              {!connected && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="text-center text-cream">
                    <WifiOff className="mx-auto h-12 w-12 mb-2" />
                    <p className="font-medium">Robot Desconectado</p>
                    <Button 
                      size="sm" 
                      className="mt-2 bg-gold text-forest"
                      onClick={() => setConnected(true)}
                    >
                      Reconectar
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Joint Controls */}
            <div className="border-t p-4">
              <p className="mb-3 text-sm font-medium text-forest">Control Manual de Articulaciones</p>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { key: "base", label: "Base", icon: RotateCw },
                  { key: "shoulder", label: "Hombro", icon: ArrowUp },
                  { key: "elbow", label: "Codo", icon: ArrowDown },
                  { key: "wrist", label: "Muñeca", icon: RotateCw },
                  { key: "gripper", label: "Pinza", icon: Hand },
                ].map(({ key, label, icon: Icon }) => (
                  <div key={key} className="text-center">
                    <p className="mb-1 text-xs text-muted-foreground">{label}</p>
                    <p className="mb-2 font-mono text-sm">{joints[key as keyof JointState]}°</p>
                    <div className="flex justify-center gap-1">
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="h-8 w-8"
                        onClick={() => moveJoint(key as keyof JointState, -5)}
                        disabled={!connected || isRunning}
                      >
                        <ArrowLeft className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="h-8 w-8"
                        onClick={() => moveJoint(key as keyof JointState, 5)}
                        disabled={!connected || isRunning}
                      >
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Sensor Data */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-4 w-4 text-forest" />
                Sensores
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-forest/5 p-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Thermometer className="h-4 w-4" />
                  <span className="text-xs">Temperatura</span>
                </div>
                <p className="mt-1 font-mono text-lg font-bold text-forest">
                  {sensorData.temperature}°C
                </p>
              </div>
              <div className="rounded-lg bg-forest/5 p-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Zap className="h-4 w-4" />
                  <span className="text-xs">Voltaje</span>
                </div>
                <p className="mt-1 font-mono text-lg font-bold text-forest">
                  {sensorData.voltage}V
                </p>
              </div>
              <div className="rounded-lg bg-forest/5 p-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Activity className="h-4 w-4" />
                  <span className="text-xs">Corriente</span>
                </div>
                <p className="mt-1 font-mono text-lg font-bold text-forest">
                  {sensorData.current}A
                </p>
              </div>
              <div className="rounded-lg bg-forest/5 p-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-xs">Tiempo Activo</span>
                </div>
                <p className="mt-1 font-mono text-lg font-bold text-forest">
                  {sensorData.uptime}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Speed Control */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Velocidad de Lanzamiento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Slider
                  value={speed}
                  onValueChange={setSpeed}
                  max={100}
                  step={5}
                  disabled={!connected}
                  className="w-full"
                />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Lento</span>
                  <span className="font-mono font-bold text-forest">{speed[0]}%</span>
                  <span className="text-muted-foreground">Rápido</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Session */}
          {currentProgram && (
            <Card className="border-gold/30 bg-gold/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-4 w-4 text-gold" />
                  Sesión Actual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-forest">
                  {trainingPrograms.find(p => p.id === currentProgram)?.name}
                </p>
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Pelotas servidas</span>
                    <span className="font-mono">
                      {ballsServed} / {trainingPrograms.find(p => p.id === currentProgram)?.balls}
                    </span>
                  </div>
                  <Progress 
                    value={(ballsServed / (trainingPrograms.find(p => p.id === currentProgram)?.balls || 1)) * 100} 
                  />
                </div>
                <div className="mt-4 flex gap-2">
                  <Button 
                    className={cn(
                      "flex-1",
                      isRunning 
                        ? "bg-red-500 hover:bg-red-600" 
                        : "bg-forest hover:bg-forest/90"
                    )}
                    onClick={isRunning ? handleStop : () => setIsRunning(true)}
                  >
                    {isRunning ? (
                      <>
                        <Pause className="mr-2 h-4 w-4" />
                        Pausar
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Continuar
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Training Programs */}
      <Card>
        <CardHeader>
          <CardTitle>Programas de Entrenamiento</CardTitle>
          <CardDescription>
            Selecciona un programa predefinido o crea uno personalizado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {trainingPrograms.map((program) => (
              <motion.div
                key={program.id}
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "rounded-lg border p-4 cursor-pointer transition-colors",
                  currentProgram === program.id 
                    ? "border-gold bg-gold/10" 
                    : "hover:border-forest/30 hover:bg-forest/5"
                )}
                onClick={() => !isRunning && handleStartProgram(program.id)}
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-medium text-forest">{program.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {program.difficulty}
                  </Badge>
                </div>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>Duración: {program.duration}</p>
                  <p>Pelotas: {program.balls}</p>
                </div>
                {currentProgram !== program.id && (
                  <Button 
                    size="sm" 
                    className="mt-3 w-full bg-forest text-cream hover:bg-forest/90"
                    disabled={!connected || isRunning}
                  >
                    <Play className="mr-2 h-3 w-3" />
                    Iniciar
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <p>AR4 Robot Arm — Firmware v2.1.0</p>
        <PoweredByBadge variant="dark" />
      </div>
    </div>
  )
}
