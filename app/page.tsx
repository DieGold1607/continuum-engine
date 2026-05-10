"use client"

import { useState, useMemo } from "react"
import { TrendingDown, Activity, Beaker, Timer, Radio, Waves, Zap, Signal } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ApexHeader } from "@/components/apex-header"
import { ParameterSlider } from "@/components/parameter-slider"
import { ReactorChart } from "@/components/reactor-chart"
import { AntennaChart } from "@/components/antenna-chart"
import { MetricCard } from "@/components/metric-card"
import { FormulaPanel } from "@/components/formula-panel"
import { AntennaFormulaPanel } from "@/components/antenna-formula-panel"

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

    // Helper for antiderivative: F(t) = (S0 * e^(-kt) / (k² + ω²)) * (ω·sin(ωt) - k·cos(ωt))
    const intF = (time: number) => {
      return (s0 * Math.exp(-k * time) / (k * k + w * w)) * (w * Math.sin(w * time) - k * Math.cos(w * time))
    }
    
    // Definite integral from 0 to T
    const integralValue = intF(t) - intF(0)
    
    // Derivative using product rule: S'(t) = S0 * e^(-kt) * [-k·cos(ωt) - ω·sin(ωt)]
    const derivativeAtT = s0 * Math.exp(-k * t) * (-k * Math.cos(w * t) - w * Math.sin(w * t))
    
    // Signal at T
    const signalAtT = s0 * Math.exp(-k * t) * Math.cos(w * t)
    
    // Percentage of signal retained
    const percentRetained = Math.abs(signalAtT / s0) * 100

    return { integralValue, derivativeAtT, signalAtT, percentRetained }
  }, [amplitude, frequency, damping, evaluationTime])

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <ApexHeader />

        {/* Tabs Navigation */}
        <Tabs defaultValue="reactor" className="space-y-6">
          <TabsList className="glass-card p-1 w-full sm:w-auto">
            <TabsTrigger 
              value="reactor" 
              className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-400 px-6"
            >
              <Beaker className="w-4 h-4 mr-2" />
              Reactor Químico
            </TabsTrigger>
            <TabsTrigger 
              value="antenna" 
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 px-6"
            >
              <Radio className="w-4 h-4 mr-2" />
              Antena Robótica
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Reactor Químico */}
          <TabsContent value="reactor" className="mt-6">
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
                  <FormulaPanel c0={initialConcentration} k={decayRate} t={extractionTime} />
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
                    title="Tasa de Cambio"
                    value={`${reactorCalcs.derivative.toFixed(4)} u/s`}
                    subtitle="Rapidez de degradación en T"
                    icon={TrendingDown}
                    formula="dC/dt"
                    accentColor="blue"
                  />

                  <MetricCard
                    title="Rendimiento Acumulado"
                    value={`${reactorCalcs.integral.toFixed(2)} u`}
                    subtitle="Área bajo la curva [0, T]"
                    icon={Activity}
                    formula="∫₀ᵀ C(t)dt"
                    accentColor="indigo"
                  />

                  <MetricCard
                    title="Concentración en T"
                    value={`${reactorCalcs.concentrationAtT.toFixed(2)} u`}
                    subtitle="Sustancia restante"
                    icon={Beaker}
                    formula="C(T)"
                    accentColor="blue"
                  />

                  <MetricCard
                    title="Degradación Total"
                    value={`${reactorCalcs.percentDegraded.toFixed(1)}%`}
                    subtitle="Sustancia consumida"
                    icon={Timer}
                    formula="ΔC/C₀"
                    accentColor="indigo"
                  />
                </div>

                {/* Formula Panel - Mobile */}
                <div className="lg:hidden">
                  <FormulaPanel c0={initialConcentration} k={decayRate} t={extractionTime} />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 2: Antena Robótica */}
          <TabsContent value="antenna" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Panel - Controls */}
              <div className="lg:col-span-3 space-y-4">
                <div className="glass-card px-4 py-3">
                  <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Parámetros de la Antena
                  </h2>
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
                  label="Frecuencia"
                  symbol="ω"
                  value={frequency}
                  min={1.0}
                  max={5.0}
                  step={0.1}
                  unit="rad/s"
                  description="Frecuencia angular de oscilación"
                  onChange={setFrequency}
                />

                <ParameterSlider
                  label="Amortiguamiento"
                  symbol="k"
                  value={damping}
                  min={0.1}
                  max={1.0}
                  step={0.05}
                  unit="/s"
                  description="Coeficiente de amortiguamiento mecánico"
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
                  description="Momento de análisis del sistema"
                  onChange={setEvaluationTime}
                />

                {/* Formula Panel - Desktop */}
                <div className="hidden lg:block">
                  <AntennaFormulaPanel s0={amplitude} w={frequency} k={damping} t={evaluationTime} />
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-9 space-y-6">
                {/* Chart */}
                <AntennaChart
                  s0={amplitude}
                  w={frequency}
                  k={damping}
                  evaluationTime={evaluationTime}
                />

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard
                    title="Pérdida Total"
                    value={`${antennaCalcs.integralValue.toFixed(4)} V·s`}
                    subtitle="Integral definida [0, T]"
                    icon={Waves}
                    formula="∫₀ᵀ S(t)dt"
                    accentColor="indigo"
                  />

                  <MetricCard
                    title="Tasa de Cambio"
                    value={`${antennaCalcs.derivativeAtT.toFixed(4)} V/s`}
                    subtitle="Derivada en T"
                    icon={TrendingDown}
                    formula="dS/dt"
                    accentColor="blue"
                  />

                  <MetricCard
                    title="Señal en T"
                    value={`${antennaCalcs.signalAtT.toFixed(4)} V`}
                    subtitle="Amplitud instantánea"
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

                {/* Formula Panel - Mobile */}
                <div className="lg:hidden">
                  <AntennaFormulaPanel s0={amplitude} w={frequency} k={damping} t={evaluationTime} />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="glass-card p-4 text-center">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">Análisis Integral y Modelado Predictivo de Sistemas Dinámicos</span>
            <br />
            <span className="text-muted-foreground/80">
              César Edahi Pastelin Rivas · José Ángel Martínez de la Cruz · Sayab Gatica Trujillo · Diego Alejandro Peña Suárez
            </span>
            <br />
            <span className="text-indigo-400/70">CCH Azcapotzalco · UNAM · Cálculo II · 2025</span>
          </p>
        </footer>
      </div>
    </div>
  )
}
