"use client"

import { useState, useMemo } from "react"
import { TrendingDown, Activity, Beaker, Timer } from "lucide-react"
import { ApexHeader } from "@/components/apex-header"
import { ParameterSlider } from "@/components/parameter-slider"
import { ReactorChart } from "@/components/reactor-chart"
import { MetricCard } from "@/components/metric-card"
import { FormulaPanel } from "@/components/formula-panel"

export default function ApexSimulator() {
  const [initialConcentration, setInitialConcentration] = useState(50)
  const [decayRate, setDecayRate] = useState(0.1)
  const [extractionTime, setExtractionTime] = useState(20)

  const calculations = useMemo(() => {
    // Derivative at time T: dC/dt = -k * C0 * e^(-k*T)
    const derivative = -decayRate * initialConcentration * Math.exp(-decayRate * extractionTime)
    
    // Definite integral from 0 to T: (C0/k) * (1 - e^(-k*T))
    const integral = (initialConcentration / decayRate) * (1 - Math.exp(-decayRate * extractionTime))
    
    // Concentration at time T
    const concentrationAtT = initialConcentration * Math.exp(-decayRate * extractionTime)
    
    // Percentage degraded
    const percentDegraded = ((initialConcentration - concentrationAtT) / initialConcentration) * 100
    
    return {
      derivative,
      integral,
      concentrationAtT,
      percentDegraded,
    }
  }, [initialConcentration, decayRate, extractionTime])

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <ApexHeader />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-3 space-y-4">
            <div className="glass-card px-4 py-3">
              <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Parámetros del Reactor
              </h2>
            </div>

            <ParameterSlider
              label="Concentración Inicial"
              symbol="C₀"
              value={initialConcentration}
              min={10}
              max={100}
              step={1}
              unit="u"
              description="Cantidad inicial de sustancia en el reactor"
              onChange={setInitialConcentration}
            />

            <ParameterSlider
              label="Tasa de Decaimiento"
              symbol="k"
              value={decayRate}
              min={0.01}
              max={0.50}
              step={0.01}
              unit="/s"
              description="Velocidad de degradación química"
              onChange={setDecayRate}
            />

            <ParameterSlider
              label="Tiempo de Extracción"
              symbol="T"
              value={extractionTime}
              min={1}
              max={50}
              step={1}
              unit="s"
              description="Momento de evaluación del sistema"
              onChange={setExtractionTime}
            />

            {/* Formula Panel - Desktop */}
            <div className="hidden lg:block">
              <FormulaPanel
                c0={initialConcentration}
                k={decayRate}
                t={extractionTime}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6">
            {/* Chart */}
            <ReactorChart
              c0={initialConcentration}
              k={decayRate}
              extractionTime={extractionTime}
            />

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Tasa de Cambio Instantánea"
                value={`${calculations.derivative.toFixed(4)} u/s`}
                subtitle="Rapidez de degradación en el momento T de extracción"
                icon={TrendingDown}
                formula="dC/dt"
                accentColor="cyan"
              />

              <MetricCard
                title="Rendimiento Acumulado"
                value={`${calculations.integral.toFixed(2)} u`}
                subtitle="Área bajo la curva - Producto útil total"
                icon={Activity}
                formula="∫₀ᵀ C(t)dt"
                accentColor="emerald"
              />

              <MetricCard
                title="Concentración en T"
                value={`${calculations.concentrationAtT.toFixed(2)} u`}
                subtitle="Concentración restante al tiempo de extracción"
                icon={Beaker}
                formula="C(T)"
                accentColor="cyan"
              />

              <MetricCard
                title="Degradación Total"
                value={`${calculations.percentDegraded.toFixed(1)}%`}
                subtitle="Porcentaje de sustancia consumida en el proceso"
                icon={Timer}
                formula="ΔC/C₀"
                accentColor="emerald"
              />
            </div>

            {/* Formula Panel - Mobile */}
            <div className="lg:hidden">
              <FormulaPanel
                c0={initialConcentration}
                k={decayRate}
                t={extractionTime}
              />
            </div>

            {/* Credits */}
            <div className="glass-card p-4 text-center">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Análisis Integral y Modelado Predictivo de Sistemas Dinámicos</span>
                <br />
                César Edahi Pastelin Rivas · José Ángel Martínez de la Cruz · Diego Alejandro Peña Suárez
                <br />
                <span className="text-emerald-400/80">CCH Azcapotzalco · UNAM · Cálculo II · 2025</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
