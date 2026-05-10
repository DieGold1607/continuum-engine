"use client"

import { Atom, FlaskConical } from "lucide-react"

export function ApexHeader() {
  return (
    <header className="glass-card px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
            <Atom className="w-5 h-5 text-background" />
          </div>
          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 glow-dot" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-foreground">
            APEX V2 <span className="text-muted-foreground font-normal">//</span>{" "}
            <span className="text-emerald-400">OPTIMIZACIÓN INDUSTRIAL</span>
          </h1>
          <p className="text-xs text-muted-foreground">
            Simulador Predictivo de Reactor Químico
          </p>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <FlaskConical className="w-4 h-4 text-cyan-400" />
          <span>Modelo: Decaimiento Exponencial</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400 font-medium">Sistema Activo</span>
        </div>
      </div>
    </header>
  )
}
