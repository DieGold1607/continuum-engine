"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { RotateCcw, Beaker, Zap, AlertTriangle, CheckCircle2, Target, Info } from "lucide-react"

interface Preset {
  name: string
  description: string
  icon: React.ElementType
  values: Record<string, number>
  isOriginal?: boolean
}

interface PresetsPanelProps {
  type: "reactor" | "antenna"
  currentValues: Record<string, number>
  onApplyPreset: (values: Record<string, number>) => void
}

const REACTOR_PRESETS: Preset[] = [
  {
    name: "Valores Experimentales",
    description: "C₀=100 mg/L, k=0.046 min⁻¹, T=120 min",
    icon: Target,
    values: { C0: 100, k: 0.046, T: 120 },
    isOriginal: true,
  },
  {
    name: "Escenario Optimo",
    description: "Maxima eficiencia de remocion (>95%)",
    icon: CheckCircle2,
    values: { C0: 100, k: 0.046, T: 150 },
  },
  {
    name: "Alta Concentracion",
    description: "Efluente industrial concentrado",
    icon: AlertTriangle,
    values: { C0: 180, k: 0.046, T: 120 },
  },
  {
    name: "Reaccion Rapida",
    description: "Condiciones de reaccion acelerada",
    icon: Zap,
    values: { C0: 100, k: 0.08, T: 80 },
  },
]

const ANTENNA_PRESETS: Preset[] = [
  {
    name: "Valores Experimentales",
    description: "S₀=5V, ω=2.5 rad/s, k=0.4 s⁻¹, T=10s",
    icon: Target,
    values: { S0: 5, omega: 2.5, k: 0.4, T: 10 },
    isOriginal: true,
  },
  {
    name: "Escenario Optimo",
    description: "Atenuacion completa y estable",
    icon: CheckCircle2,
    values: { S0: 5, omega: 2.5, k: 0.5, T: 12 },
  },
  {
    name: "Rafaga Severa",
    description: "Viento de alta frecuencia",
    icon: AlertTriangle,
    values: { S0: 8, omega: 4.0, k: 0.3, T: 10 },
  },
  {
    name: "Sistema Rigido",
    description: "Alto amortiguamiento mecanico",
    icon: Zap,
    values: { S0: 5, omega: 2.5, k: 0.8, T: 6 },
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
  const accentColor = type === "reactor" ? "indigo" : "blue"
  const originalPreset = presets.find(p => p.isOriginal)
  const isAtOriginal = originalPreset ? areValuesEqual(currentValues, originalPreset.values) : false

  return (
    <div className="glass-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Beaker className={`w-4 h-4 text-${accentColor}-400`} />
          <span className="text-sm font-medium text-zinc-200">Escenarios Predefinidos</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
                <Info className="w-3.5 h-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[250px] bg-zinc-800 text-zinc-100 border-zinc-700">
              <p>Selecciona un escenario para cargar sus valores automaticamente en el simulador.</p>
            </TooltipContent>
          </Tooltip>
        </div>
        {!isAtOriginal && originalPreset && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onApplyPreset(originalPreset.values)}
            className="h-7 px-2 text-xs text-zinc-400 hover:text-white gap-1.5"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {presets.map((preset) => {
          const Icon = preset.icon
          const isActive = areValuesEqual(currentValues, preset.values)
          
          return (
            <button
              key={preset.name}
              onClick={() => onApplyPreset(preset.values)}
              className={`relative flex flex-col items-start p-3 rounded-lg border text-left transition-all duration-200 ${
                isActive
                  ? `bg-${accentColor}-500/20 border-${accentColor}-500/50 ring-1 ring-${accentColor}-500/30`
                  : "bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800 hover:border-zinc-600"
              }`}
            >
              {preset.isOriginal && (
                <span className={`absolute top-1.5 right-1.5 text-[10px] px-1.5 py-0.5 rounded ${
                  isActive ? `bg-${accentColor}-500/30 text-${accentColor}-300` : "bg-zinc-700/50 text-zinc-500"
                }`}>
                  Original
                </span>
              )}
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-3.5 h-3.5 ${isActive ? `text-${accentColor}-400` : "text-zinc-500"}`} />
                <span className={`text-xs font-medium ${isActive ? "text-white" : "text-zinc-300"}`}>
                  {preset.name}
                </span>
              </div>
              <span className="text-[10px] text-zinc-500 leading-tight">
                {preset.description}
              </span>
            </button>
          )
        })}
      </div>

      {isAtOriginal && (
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-${accentColor}-500/10 border border-${accentColor}-500/20`}>
          <CheckCircle2 className={`w-4 h-4 text-${accentColor}-400`} />
          <span className={`text-xs text-${accentColor}-300`}>
            Usando valores experimentales de la investigacion
          </span>
        </div>
      )}
    </div>
  )
}
