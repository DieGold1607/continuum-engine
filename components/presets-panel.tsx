"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { RotateCcw, Beaker, Radio, Zap, AlertTriangle, CheckCircle2, Target, Info, Gauge, Clock } from "lucide-react"

interface Preset {
  name: string
  description: string
  icon: React.ElementType
  values: Record<string, number>
  isOriginal?: boolean
  badge?: string
}

interface PresetsPanelProps {
  type: "reactor" | "antenna"
  currentValues: Record<string, number>
  onApplyPreset: (values: Record<string, number>) => void
}

// Valores experimentales de la investigación (verificados con el PDF)
// Reactor: C0=100 mg/L, k=0.046 min⁻¹, T=120 min → Resultado: ~2,165.2 mg·min/L
// Antena: S0=5.0 V, ω=2.5 rad/s, k=0.4 s⁻¹, T=10 s → Resultado: ~0.262 V·s

const REACTOR_PRESETS: Preset[] = [
  {
    name: "Valores Experimentales",
    description: "Parametros de la investigacion: C₀=100 mg/L, k=0.046 min⁻¹, T=120 min. Resultado esperado: ~2,165.2 mg·min/L",
    icon: Target,
    values: { C0: 100, k: 0.046, T: 120 },
    isOriginal: true,
    badge: "Investigacion",
  },
  {
    name: "Remocion Maxima",
    description: "Tiempo extendido para alcanzar >95% de remocion de fenol",
    icon: CheckCircle2,
    values: { C0: 100, k: 0.046, T: 180 },
    badge: ">95% remocion",
  },
  {
    name: "Efluente Concentrado",
    description: "Simulacion de aguas residuales industriales con alta carga de fenol",
    icon: AlertTriangle,
    values: { C0: 200, k: 0.046, T: 150 },
    badge: "Alta carga",
  },
  {
    name: "Reaccion Acelerada",
    description: "Condiciones optimizadas con mayor concentracion de reactivo Fenton",
    icon: Zap,
    values: { C0: 100, k: 0.08, T: 90 },
    badge: "Rapido",
  },
]

const ANTENNA_PRESETS: Preset[] = [
  {
    name: "Valores Experimentales",
    description: "Parametros de la investigacion: S₀=5V, ω=2.5 rad/s, k=0.4 s⁻¹, T=10s. Resultado esperado: ~0.262 V·s",
    icon: Target,
    values: { S0: 5, omega: 2.5, k: 0.4, T: 10 },
    isOriginal: true,
    badge: "Investigacion",
  },
  {
    name: "Estabilizacion Completa",
    description: "Tiempo extendido para observar la atenuacion total de la señal",
    icon: CheckCircle2,
    values: { S0: 5, omega: 2.5, k: 0.4, T: 15 },
    badge: "Estable",
  },
  {
    name: "Rafaga Severa",
    description: "Perturbacion de viento intenso con mayor amplitud y frecuencia",
    icon: AlertTriangle,
    values: { S0: 8, omega: 4.0, k: 0.3, T: 12 },
    badge: "Critico",
  },
  {
    name: "Alta Rigidez",
    description: "Sistema mecanico con mayor coeficiente de amortiguamiento",
    icon: Gauge,
    values: { S0: 5, omega: 2.5, k: 0.7, T: 8 },
    badge: "Rigido",
  },
]

function areValuesEqual(a: Record<string, number>, b: Record<string, number>): boolean {
  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  if (keysA.length !== keysB.length) return false
  return keysA.every(key => Math.abs(a[key] - b[key]) < 0.001)
}

export function PresetsPanel({ type, currentValues, onApplyPreset }: PresetsPanelProps) {
  const presets = type === "reactor" ? REACTOR_PRESETS : ANTENNA_PRESETS
  const originalPreset = presets.find(p => p.isOriginal)
  const isAtOriginal = originalPreset ? areValuesEqual(currentValues, originalPreset.values) : false

  const accentClasses = type === "reactor" 
    ? {
        icon: "text-indigo-400",
        activeBg: "bg-indigo-500/20",
        activeBorder: "border-indigo-500/50",
        activeRing: "ring-indigo-500/30",
        badgeBg: "bg-indigo-500/30",
        badgeText: "text-indigo-300",
        statusBg: "bg-indigo-500/10",
        statusBorder: "border-indigo-500/20",
        statusIcon: "text-indigo-400",
        statusText: "text-indigo-300",
      }
    : {
        icon: "text-blue-400",
        activeBg: "bg-blue-500/20",
        activeBorder: "border-blue-500/50",
        activeRing: "ring-blue-500/30",
        badgeBg: "bg-blue-500/30",
        badgeText: "text-blue-300",
        statusBg: "bg-blue-500/10",
        statusBorder: "border-blue-500/20",
        statusIcon: "text-blue-400",
        statusText: "text-blue-300",
      }

  const HeaderIcon = type === "reactor" ? Beaker : Radio

  return (
    <div className="glass-card p-5 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-zinc-800/80 ${accentClasses.icon}`}>
            <HeaderIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-100">Escenarios Predefinidos</h3>
            <p className="text-xs text-zinc-500">Selecciona una configuracion</p>
          </div>
        </div>
        
        {!isAtOriginal && originalPreset && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onApplyPreset(originalPreset.values)}
            className="h-8 px-3 text-xs bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-700 gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restaurar Original
          </Button>
        )}
      </div>

      {/* Presets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {presets.map((preset) => {
          const Icon = preset.icon
          const isActive = areValuesEqual(currentValues, preset.values)
          
          return (
            <button
              key={preset.name}
              onClick={() => onApplyPreset(preset.values)}
              className={`group relative flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-200 hover-lift ${
                isActive
                  ? `${accentClasses.activeBg} ${accentClasses.activeBorder} ring-1 ${accentClasses.activeRing}`
                  : "bg-zinc-800/40 border-zinc-700/50 hover:bg-zinc-800/70 hover:border-zinc-600"
              }`}
            >
              {/* Badge */}
              {preset.badge && (
                <span className={`absolute top-3 right-3 text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  isActive 
                    ? `${accentClasses.badgeBg} ${accentClasses.badgeText}` 
                    : "bg-zinc-700/70 text-zinc-400"
                }`}>
                  {preset.badge}
                </span>
              )}
              
              {/* Icon and Title */}
              <div className="flex items-center gap-2.5 mb-2">
                <div className={`p-1.5 rounded-lg transition-colors ${
                  isActive 
                    ? `${accentClasses.activeBg} ${accentClasses.icon}` 
                    : "bg-zinc-700/50 text-zinc-400 group-hover:text-zinc-300"
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-sm font-medium ${isActive ? "text-white" : "text-zinc-200"}`}>
                  {preset.name}
                </span>
              </div>
              
              {/* Description */}
              <p className="text-[11px] leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors pr-8">
                {preset.description}
              </p>
              
              {/* Active Indicator */}
              {isActive && (
                <div className="absolute bottom-3 right-3">
                  <CheckCircle2 className={`w-4 h-4 ${accentClasses.icon}`} />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Status Bar */}
      {isAtOriginal && (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${accentClasses.statusBg} border ${accentClasses.statusBorder}`}>
          <CheckCircle2 className={`w-5 h-5 ${accentClasses.statusIcon}`} />
          <div>
            <p className={`text-sm font-medium ${accentClasses.statusText}`}>
              Valores experimentales activos
            </p>
            <p className="text-xs text-zinc-500">
              Configuracion original de la investigacion
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
