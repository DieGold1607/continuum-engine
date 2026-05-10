"use client"

import { Activity } from "lucide-react"

export function ApexHeader() {
  return (
    <header className="glass-card px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
            <Activity className="w-4.5 h-4.5 text-white" />
          </div>
          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-indigo-400 glow-dot" />
        </div>
        <div>
          <h1 className="text-base font-semibold tracking-tight text-foreground">
            Continuum <span className="text-muted-foreground/60 font-normal">//</span>{" "}
            <span className="text-indigo-400 font-medium">SISTEMAS DINÁMICOS</span>
          </h1>
          <p className="text-xs text-muted-foreground">
            Análisis Integral y Modelado Predictivo
          </p>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
        <span className="text-xs text-muted-foreground">En línea</span>
      </div>
    </header>
  )
}
