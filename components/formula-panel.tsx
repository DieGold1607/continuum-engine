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
        <BookOpen className="w-4 h-4 text-cyan-400" />
        <span className="text-sm font-medium text-foreground">Fundamento Matemático</span>
      </div>

      <div className="space-y-4">
        {/* Main model */}
        <div className="bg-secondary/30 rounded-lg p-4 border border-border/50">
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
            <Sigma className="w-3 h-3" />
            Modelo de Degradación
          </p>
          <p className="text-lg font-mono text-foreground">
            C(t) = <span className="text-emerald-400">{c0}</span> · e
            <sup className="text-cyan-400">-{k}t</sup>
          </p>
        </div>

        {/* Derivative */}
        <div className="bg-secondary/30 rounded-lg p-4 border border-border/50">
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
            <TrendingDown className="w-3 h-3" />
            Derivada (Tasa de Cambio)
          </p>
          <p className="text-base font-mono text-foreground">
            <span className="text-muted-foreground">dC/dt</span> = -k · C₀ · e
            <sup>-kt</sup>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            En t = {t}s → <span className="text-cyan-400 font-mono">{(-k * c0 * Math.exp(-k * t)).toFixed(4)}</span> u/s
          </p>
        </div>

        {/* Definite Integral */}
        <div className="bg-secondary/30 rounded-lg p-4 border border-border/50">
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
            <span className="text-lg leading-none">∫</span>
            Integral Definida (Área)
          </p>
          <p className="text-base font-mono text-foreground">
            <span className="text-muted-foreground">∫₀ᵀ C(t)dt</span> = (C₀/k)(1 - e
            <sup>-kT</sup>)
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            De 0 a {t}s → <span className="text-emerald-400 font-mono">{((c0 / k) * (1 - Math.exp(-k * t))).toFixed(4)}</span> u
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-border/50">
        <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
          Proyecto Final Cálculo II · CCH Azcapotzalco · UNAM
        </p>
      </div>
    </div>
  )
}
