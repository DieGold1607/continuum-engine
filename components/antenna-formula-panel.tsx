"use client"

import { BookOpen, Sigma, TrendingDown } from "lucide-react"

interface AntennaFormulaPanelProps {
  s0: number
  w: number
  k: number
  t: number
}

export function AntennaFormulaPanel({ s0, w, k, t }: AntennaFormulaPanelProps) {
  // Helper function for the antiderivative
  const intF = (time: number) => {
    return (s0 * Math.exp(-k * time) / (k * k + w * w)) * (w * Math.sin(w * time) - k * Math.cos(w * time))
  }
  
  const integralValue = intF(t) - intF(0)

  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-4 h-4 text-blue-400" />
        <span className="text-sm font-medium text-foreground">Fundamento Matemático</span>
      </div>

      <div className="space-y-3">
        {/* Main model */}
        <div className="bg-secondary/40 rounded-lg p-3.5 border border-border/40">
          <p className="text-[10px] text-muted-foreground mb-1.5 flex items-center gap-1.5 uppercase tracking-wider">
            <Sigma className="w-3 h-3" />
            Modelo de Vibración Amortiguada
          </p>
          <p className="text-base font-mono text-foreground">
            S(t) = <span className="text-blue-400">{s0}</span> · e
            <sup className="text-indigo-400">-{k}t</sup> · cos(<span className="text-blue-400">{w}</span>t)
          </p>
        </div>

        {/* Derivative explanation */}
        <div className="bg-secondary/40 rounded-lg p-3.5 border border-border/40">
          <p className="text-[10px] text-muted-foreground mb-1.5 flex items-center gap-1.5 uppercase tracking-wider">
            <TrendingDown className="w-3 h-3" />
            Derivada (Regla del Producto)
          </p>
          <p className="text-xs font-mono text-foreground leading-relaxed">
            <span className="text-muted-foreground">dS/dt</span> = S₀e<sup>-kt</sup>[-k·cos(ωt) - ω·sin(ωt)]
          </p>
        </div>

        {/* Definite Integral */}
        <div className="bg-secondary/40 rounded-lg p-3.5 border border-border/40">
          <p className="text-[10px] text-muted-foreground mb-1.5 flex items-center gap-1.5 uppercase tracking-wider">
            <span className="text-base leading-none">∫</span>
            Integral (Por Partes Cíclica)
          </p>
          <p className="text-xs font-mono text-foreground leading-relaxed">
            <span className="text-muted-foreground">F(t)</span> = 
            <span className="block pl-4 mt-1">
              (S₀e<sup>-kt</sup>/(k²+ω²))·[ω·sin(ωt) - k·cos(ωt)]
            </span>
          </p>
          <p className="text-[10px] text-muted-foreground mt-2">
            De 0 a {t}s: <span className="text-blue-400 font-mono">{integralValue.toFixed(4)}</span> V·s
          </p>
        </div>
      </div>
    </div>
  )
}
