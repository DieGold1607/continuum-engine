"use client"

import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

interface ParameterSliderProps {
  label: string
  symbol: string
  value: number
  min: number
  max: number
  step: number
  unit?: string
  description?: string
  tooltipInfo?: string
  onChange: (value: number) => void
}

export function ParameterSlider({
  label,
  symbol,
  value,
  min,
  max,
  step,
  unit = "",
  description,
  tooltipInfo,
  onChange,
}: ParameterSliderProps) {
  return (
    <div className="glass-card p-4 sm:p-5 space-y-3 sm:space-y-4 hover-lift">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-mono text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded shrink-0">
            {symbol}
          </span>
          <span className="text-sm font-medium text-foreground truncate">{label}</span>
          {tooltipInfo && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
                  <Info className="w-3.5 h-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[250px] bg-zinc-800 text-zinc-100 border-zinc-700">
                <p>{tooltipInfo}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <span className="text-base sm:text-lg font-mono font-bold text-foreground tabular-nums shrink-0">
          {value.toFixed(step < 1 ? 2 : 0)}
          {unit && <span className="text-muted-foreground text-xs sm:text-sm ml-1">{unit}</span>}
        </span>
      </div>
      
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(vals) => onChange(vals[0])}
        className="touch-pan-x"
      />
      
      <div className="flex justify-between text-xs text-muted-foreground font-mono">
        <span>{min}</span>
        <span>{max}</span>
      </div>
      
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
