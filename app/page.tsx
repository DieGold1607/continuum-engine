"use client"

import { useState, useMemo } from "react"
import { TrendingDown, Activity, Beaker, Timer, Radio, Waves, Zap, Signal } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { HeroSection } from "@/components/hero-section"
import { ParameterSlider } from "@/components/parameter-slider"
import { ReactorChart } from "@/components/reactor-chart"
import { AntennaChart } from "@/components/antenna-chart"
import { MetricCard } from "@/components/metric-card"
import { MathFoundation } from "@/components/math-foundation"
import { OptimizationIndicator } from "@/components/optimization-indicator"

export default function ContinuumSimulator() {
  // Reactor Químico state
  const [initialConcentration, setInitialConcentration] = useState(50)
  const [decayRate, setDecayRate] = useState(0.1)
  const [extractionTime, setExtractionTime] = useState(20)

  // Antena Robótica state
  const [amplitude, setAmplitude] = useState(5)
  const [frequency, setFrequency] = useState(2.5)
  const [damping, setDamping] = useState(0.4)
  const [evaluationTime, setEvaluationTime] = useState(10)

  // Reactor calculations
  const reactorCalcs = useMemo(() => {
    const derivative = -decayRate * initialConcentration * Math.exp(-decayRate * extractionTime)
    const integral = (initialConcentration / decayRate) * (1 - Math.exp(-decayRate * extractionTime))
    const concentrationAtT = initialConcentration * Math.exp(-decayRate * extractionTime)
    const percentDegraded = ((initialConcentration - concentrationAtT) / initialConcentration) * 100
    
    return { derivative, integral, concentrationAtT, percentDegraded }
  }, [initialConcentration, decayRate, extractionTime])

  // Antenna calculations
  const antennaCalcs = useMemo(() => {
    const k = damping
    const w = frequency
    const s0 = amplitude
    const t = evaluationTime

    const intF = (time: number) => {
      return (s0 * Math.exp(-k * time) / (k * k + w * w)) * (w * Math.sin(w * time) - k * Math.cos(w * time))
    }
    
    const integralValue = intF(t) - intF(0)
    const derivativeAtT = s0 * Math.exp(-k * t) * (-k * Math.cos(w * t) - w * Math.sin(w * t))
    const signalAtT = s0 * Math.exp(-k * t) * Math.cos(w * t)
    const percentRetained = Math.abs(signalAtT / s0) * 100

    return { integralValue, derivativeAtT, signalAtT, percentRetained }
  }, [amplitude, frequency, damping, evaluationTime])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-12 space-y-8">
        {/* Tabs Navigation */}
        <Tabs defaultValue="reactor" className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="glass-card p-1.5 inline-flex">
              <TabsTrigger 
                value="reactor" 
                className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-400 px-8 py-2.5 rounded-lg transition-all"
              >
                <Beaker className="w-4 h-4 mr-2" />
                Reactor Químico
              </TabsTrigger>
              <TabsTrigger 
                value="antenna" 
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 px-8 py-2.5 rounded-lg transition-all"
              >
                <Radio className="w-4 h-4 mr-2" />
                Antena Robótica
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab 1: Reactor Químico */}
          <TabsContent value="reactor" className="mt-8 space-y-8">
            {/* Optimization Indicator */}
            <OptimizationIndicator 
              type="reactor" 
              params={{ C0: initialConcentration, k: decayRate, T: extractionTime }} 
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Panel - Controls */}
              <div className="lg:col-span-3 space-y-4">
                <div className="glass-card px-4 py-3 border-l-2 border-indigo-500">
                  <h2 className="text-sm font-medium text-zinc-200">
                    Parámetros del Reactor
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    Ajusta los valores para visualizar el comportamiento del sistema
                  </p>
                </div>

                <ParameterSlider
                  label="Concentración Inicial"
                  symbol="C₀"
                  value={initialConcentration}
                  min={10}
                  max={100}
                  step={1}
                  unit="mol/L"
                  description="Cantidad inicial de reactivo"
                  onChange={setInitialConcentration}
                />

                <ParameterSlider
                  label="Tasa de Decaimiento"
                  symbol="k"
                  value={decayRate}
                  min={0.01}
                  max={0.50}
                  step={0.01}
                  unit="min⁻¹"
                  description="Constante de velocidad de reacción"
                  onChange={setDecayRate}
                />

                <ParameterSlider
                  label="Tiempo de Extracción"
                  symbol="T"
                  value={extractionTime}
                  min={1}
                  max={50}
                  step={1}
                  unit="min"
                  description="Momento de evaluación"
                  onChange={setExtractionTime}
                />
              </div>

              {/* Main Content */}
              <div className="lg:col-span-9 space-y-8">
                {/* Chart with more breathing room */}
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Curva de Degradación Exponencial</h3>
                      <p className="text-sm text-zinc-500">Visualización de C(t) = C₀ · e⁻ᵏᵗ con integral definida</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-indigo-500" />
                        <span className="text-zinc-400">Concentración</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-indigo-500/30" />
                        <span className="text-zinc-400">Integral [0, T]</span>
                      </div>
                    </div>
                  </div>
                  <ReactorChart
                    c0={initialConcentration}
                    k={decayRate}
                    extractionTime={extractionTime}
                  />
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard
                    title="Tasa de Cambio"
                    value={`${reactorCalcs.derivative.toFixed(4)}`}
                    subtitle="mol/(L·min)"
                    icon={TrendingDown}
                    formula="dC/dt"
                    accentColor="blue"
                  />

                  <MetricCard
                    title="Rendimiento Acumulado"
                    value={`${reactorCalcs.integral.toFixed(2)}`}
                    subtitle="mol·min/L"
                    icon={Activity}
                    formula="∫₀ᵀ C(t)dt"
                    accentColor="indigo"
                  />

                  <MetricCard
                    title="Concentración en T"
                    value={`${reactorCalcs.concentrationAtT.toFixed(2)}`}
                    subtitle="mol/L"
                    icon={Beaker}
                    formula="C(T)"
                    accentColor="blue"
                  />

                  <MetricCard
                    title="Conversión Total"
                    value={`${reactorCalcs.percentDegraded.toFixed(1)}%`}
                    subtitle="Reactivo consumido"
                    icon={Timer}
                    formula="ΔC/C₀"
                    accentColor="indigo"
                  />
                </div>
              </div>
            </div>

            {/* Math Foundation - Full Width */}
            <MathFoundation 
              type="reactor" 
              params={{ C0: initialConcentration, k: decayRate, T: extractionTime }} 
            />
          </TabsContent>

          {/* Tab 2: Antena Robótica */}
          <TabsContent value="antenna" className="mt-8 space-y-8">
            {/* Optimization Indicator */}
            <OptimizationIndicator 
              type="antenna" 
              params={{ S0: amplitude, omega: frequency, k: damping, T: evaluationTime }} 
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Panel - Controls */}
              <div className="lg:col-span-3 space-y-4">
                <div className="glass-card px-4 py-3 border-l-2 border-blue-500">
                  <h2 className="text-sm font-medium text-zinc-200">
                    Parámetros de la Antena
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    Configura la señal y el amortiguamiento
                  </p>
                </div>

                <ParameterSlider
                  label="Amplitud Inicial"
                  symbol="S₀"
                  value={amplitude}
                  min={1}
                  max={10}
                  step={0.5}
                  unit="V"
                  description="Voltaje inicial de la señal"
                  onChange={setAmplitude}
                />

                <ParameterSlider
                  label="Frecuencia Angular"
                  symbol="ω"
                  value={frequency}
                  min={1.0}
                  max={5.0}
                  step={0.1}
                  unit="rad/s"
                  description="Frecuencia de oscilación"
                  onChange={setFrequency}
                />

                <ParameterSlider
                  label="Amortiguamiento"
                  symbol="k"
                  value={damping}
                  min={0.1}
                  max={1.0}
                  step={0.05}
                  unit="s⁻¹"
                  description="Coeficiente de atenuación"
                  onChange={setDamping}
                />

                <ParameterSlider
                  label="Tiempo de Evaluación"
                  symbol="T"
                  value={evaluationTime}
                  min={1}
                  max={20}
                  step={0.5}
                  unit="s"
                  description="Momento de análisis"
                  onChange={setEvaluationTime}
                />
              </div>

              {/* Main Content */}
              <div className="lg:col-span-9 space-y-8">
                {/* Chart with more breathing room */}
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Señal Amortiguada</h3>
                      <p className="text-sm text-zinc-500">Visualización de S(t) = S₀ · e⁻ᵏᵗ · cos(ωt)</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-zinc-400">Señal</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-0.5 bg-indigo-400 border-dashed" />
                        <span className="text-zinc-400">Envolvente</span>
                      </div>
                    </div>
                  </div>
                  <AntennaChart
                    s0={amplitude}
                    w={frequency}
                    k={damping}
                    evaluationTime={evaluationTime}
                  />
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard
                    title="Energía Acumulada"
                    value={`${antennaCalcs.integralValue.toFixed(4)}`}
                    subtitle="V·s"
                    icon={Waves}
                    formula="∫₀ᵀ S(t)dt"
                    accentColor="indigo"
                  />

                  <MetricCard
                    title="Tasa de Cambio"
                    value={`${antennaCalcs.derivativeAtT.toFixed(4)}`}
                    subtitle="V/s"
                    icon={TrendingDown}
                    formula="dS/dt"
                    accentColor="blue"
                  />

                  <MetricCard
                    title="Señal en T"
                    value={`${antennaCalcs.signalAtT.toFixed(4)}`}
                    subtitle="V"
                    icon={Signal}
                    formula="S(T)"
                    accentColor="indigo"
                  />

                  <MetricCard
                    title="Atenuación"
                    value={`${(100 - antennaCalcs.percentRetained).toFixed(1)}%`}
                    subtitle="Pérdida de señal"
                    icon={Zap}
                    formula="|ΔS/S₀|"
                    accentColor="blue"
                  />
                </div>
              </div>
            </div>

            {/* Math Foundation - Full Width */}
            <MathFoundation 
              type="antenna" 
              params={{ S0: amplitude, omega: frequency, k: damping, T: evaluationTime }} 
            />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="glass-card p-6 text-center border-t border-zinc-800/50">
          <p className="text-sm text-zinc-400 mb-2">
            Análisis Integral y Modelado Predictivo de Sistemas Dinámicos
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-zinc-500 mb-4">
            <span>Diego Patricio Sánchez</span>
            <span className="hidden sm:inline">·</span>
            <span>Sayab Gatica Trujillo</span>
            <span className="hidden sm:inline">·</span>
            <span>Angel</span>
          </div>
          <p className="text-xs text-zinc-600">
            CCH Azcapotzalco · UNAM · Cálculo II · 2025
          </p>
        </footer>
      </div>
    </div>
  )
}
