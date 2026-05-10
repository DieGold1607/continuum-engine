"use client"

import { BookOpen, Sigma, TrendingDown } from "lucide-react"

interface FormulaPanelProps {
  c0: number
  k: number
  t: number
}

export function FormulaPanel({ c0, k, t }: FormulaPanelProps) {
  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-4 h-4 text-indigo-400" />
        <span className="text-sm font-medium text-foreground">Fundamento Matemático</span>
      </div>

      <div className="space-y-3">
        {/* Main model */}
        <div className="bg-secondary/40 rounded-lg p-3.5 border border-border/40">
          <p className="text-[10px] text-muted-foreground mb-1.5 flex items-center gap-1.5 uppercase tracking-wider">
            <Sigma className="w-3 h-3" />
            Modelo de Degradación
          </p>
          <p className="text-base font-mono text-foreground">
            C(t) = <span className="text-indigo-400">{c0}</span> · e
            <sup className="text-blue-400">-{k}t</sup>
          </p>
        </div>

        {/* Derivative */}
        <div className="bg-secondary/40 rounded-lg p-3.5 border border-border/40">
          <p className="text-[10px] text-muted-foreground mb-1.5 flex items-center gap-1.5 uppercase tracking-wider">
            <TrendingDown className="w-3 h-3" />
            Derivada (Tasa de Cambio)
          </p>
          <p className="text-sm font-mono text-foreground">
            <span className="text-muted-foreground">dC/dt</span> = -k · C₀ · e
            <sup>-kt</sup>
          </p>
          <p className="text-[10px] text-muted-foreground mt-1.5">
            En t = {t}s: <span className="text-blue-400 font-mono">{(-k * c0 * Math.exp(-k * t)).toFixed(4)}</span> u/s
          </p>
        </div>

        {/* Definite Integral */}
        <div className="bg-secondary/40 rounded-lg p-3.5 border border-border/40">
          <p className="text-[10px] text-muted-foreground mb-1.5 flex items-center gap-1.5 uppercase tracking-wider">
            <span className="text-base leading-none">∫</span>
            Integral Definida
          </p>
          <p className="text-sm font-mono text-foreground">
            <span className="text-muted-foreground">∫₀ᵀ C(t)dt</span> = (C₀/k)(1 - e
            <sup>-kT</sup>)
          </p>
          <p className="text-[10px] text-muted-foreground mt-1.5">
            De 0 a {t}s: <span className="text-indigo-400 font-mono">{((c0 / k) * (1 - Math.exp(-k * t))).toFixed(4)}</span> u
          </p>
        </div>
      </div>
    </div>
  )
}
