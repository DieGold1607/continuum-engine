"use client"

import { Slider } from "@/components/ui/slider"

interface ParameterSliderProps {
  label: string
  symbol: string
  value: number
  min: number
  max: number
  step: number
  unit?: string
  description?: string
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
  onChange,
}: ParameterSliderProps) {
  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
            {symbol}
          </span>
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        <span className="text-lg font-mono font-bold text-foreground tabular-nums">
          {value.toFixed(step < 1 ? 2 : 0)}
          {unit && <span className="text-muted-foreground text-sm ml-1">{unit}</span>}
        </span>
      </div>
      
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(vals) => onChange(vals[0])}
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
