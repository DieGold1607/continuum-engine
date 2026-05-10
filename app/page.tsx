"use client"

import { useState, useMemo } from "react"
import { TrendingDown, Activity, Beaker, Timer, Radio, Waves, Zap, Signal, Presentation, X, FlaskConical, Antenna } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { ParameterSlider } from "@/components/parameter-slider"
import { ReactorChart } from "@/components/reactor-chart"
import { AntennaChart } from "@/components/antenna-chart"
import { MetricCard } from "@/components/metric-card"
import { MathFoundation } from "@/components/math-foundation"
import { OptimizationIndicator } from "@/components/optimization-indicator"
import { ContextSection } from "@/components/context-section"

export default function ContinuumSimulator() {
  // Reactor Químico state - Valores de la investigación: Fenol 100 mg/L, k=0.046 min⁻¹, T=120 min
  const [initialConcentration, setInitialConcentration] = useState(100)
  const [decayRate, setDecayRate] = useState(0.046)
  const [extractionTime, setExtractionTime] = useState(120)

  // Antena Robótica state - Valores de la investigación: S0=5V, ω=2.5 rad/s, k=0.4 s⁻¹, T=10s
  const [amplitude, setAmplitude] = useState(5)
  const [frequency, setFrequency] = useState(2.5)
  const [damping, setDamping] = useState(0.4)
  const [evaluationTime, setEvaluationTime] = useState(10)

  // Presentation mode
  const [presentationMode, setPresentationMode] = useState(false)

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
    <div className={`min-h-screen bg-background ${presentationMode ? 'presentation-mode' : ''}`}>
      {/* Presentation Mode Toggle */}
      <div className="fixed bottom-4 right-4 z-50 animate-fade-in delay-700">
        <Button
          onClick={() => setPresentationMode(!presentationMode)}
          variant={presentationMode ? "default" : "outline"}
          size="lg"
          className={`gap-2 shadow-lg transition-all duration-300 ${
            presentationMode 
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
              : 'bg-zinc-900/90 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600'
          }`}
        >
          {presentationMode ? (
            <>
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Salir</span>
            </>
          ) : (
            <>
              <Presentation className="w-4 h-4" />
              <span className="hidden sm:inline">Modo Presentacion</span>
            </>
          )}
        </Button>
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-12 space-y-6 sm:space-y-8">
        {/* Tabs Navigation */}
        <Tabs defaultValue="reactor" className="space-y-6 sm:space-y-8">
          <div className="flex justify-center animate-fade-in-up delay-500">
            <TabsList className="glass-card p-1 sm:p-1.5 inline-flex">
              <TabsTrigger 
                value="reactor" 
                className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-400 px-4 sm:px-8 py-2 sm:py-2.5 rounded-lg transition-all text-sm sm:text-base"
              >
                <Beaker className="w-4 h-4 mr-1.5 sm:mr-2" />
                <span className="hidden xs:inline">Reactor Quimico</span>
                <span className="xs:hidden">Reactor</span>
              </TabsTrigger>
              <TabsTrigger 
                value="antenna" 
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 px-4 sm:px-8 py-2 sm:py-2.5 rounded-lg transition-all text-sm sm:text-base"
              >
                <Radio className="w-4 h-4 mr-1.5 sm:mr-2" />
                <span className="hidden xs:inline">Antena Robotica</span>
                <span className="xs:hidden">Antena</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab 1: Reactor Químico */}
          <TabsContent value="reactor" className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
            {/* Context Section */}
            <div className="animate-fade-in-up delay-200">
              <ContextSection
                type="reactor"
                title="Contexto: Degradacion de Fenol mediante Reaccion Fenton"
                icon={FlaskConical}
                expandedByDefault={presentationMode}
              >
                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed">
                  <p>
                    El <strong className="text-zinc-200">fenol (C₆H₅OH)</strong> es un compuesto organico altamente toxico presente en las aguas residuales de industrias petroquimicas, farmaceuticas y de plasticos. Para su tratamiento, se emplea un <strong className="text-zinc-200">reactor quimico por lotes (batch)</strong> mediante el proceso de oxidacion avanzada conocido como <strong className="text-indigo-400">reaccion Fenton</strong>.
                  </p>
                  <p>
                    En este sistema, la adicion de peroxido de hidrogeno (H₂O₂) y iones de hierro (Fe²⁺) genera <strong className="text-zinc-200">radicales hidroxilo (·OH)</strong>, los cuales poseen un alto poder oxidante capaz de degradar el contaminante de forma acelerada.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                      <h4 className="text-zinc-200 font-medium mb-2">Parametros Experimentales</h4>
                      <ul className="space-y-1 text-xs">
                        <li><span className="text-zinc-500">Sustancia:</span> Fenol en agua residual sintetica</li>
                        <li><span className="text-zinc-500">Concentracion inicial:</span> <span className="text-indigo-400">100 mg/L</span></li>
                        <li><span className="text-zinc-500">Temperatura:</span> 25°C</li>
                        <li><span className="text-zinc-500">pH inicial:</span> 5.6</li>
                      </ul>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                      <h4 className="text-zinc-200 font-medium mb-2">Resultado Esperado</h4>
                      <ul className="space-y-1 text-xs">
                        <li><span className="text-zinc-500">Constante cinetica:</span> <span className="text-indigo-400">k = 0.046 min⁻¹</span></li>
                        <li><span className="text-zinc-500">Tiempo de tratamiento:</span> <span className="text-indigo-400">120 min</span></li>
                        <li><span className="text-zinc-500">Rendimiento acumulado:</span> <span className="text-blue-400">~2,165.2 mg·min/L</span></li>
                        <li><span className="text-zinc-500">Remocion de fenol:</span> <span className="text-green-400">{'>'}90%</span></li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500 mt-2">
                    <strong>Objetivo:</strong> Calcular el rendimiento total del reactor mediante la integral definida y determinar el momento optimo en que la concentracion cumple con la normativa ambiental.
                  </p>
                </div>
              </ContextSection>
            </div>

            {/* Optimization Indicator */}
            <div className="animate-fade-in-up delay-300">
              <OptimizationIndicator 
                type="reactor" 
                params={{ C0: initialConcentration, k: decayRate, T: extractionTime }} 
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Left Panel - Controls */}
              <div className="lg:col-span-3 space-y-4 animate-fade-in-up delay-400">
                <div className="glass-card px-4 py-3 border-l-2 border-indigo-500">
                  <h2 className="text-sm font-medium text-zinc-200">
                    Parametros del Reactor
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    Ajusta los valores para visualizar el comportamiento del sistema
                  </p>
                </div>

                <ParameterSlider
                  label="Concentracion Inicial"
                  symbol="C₀"
                  value={initialConcentration}
                  min={10}
                  max={200}
                  step={1}
                  unit="mg/L"
                  description="Concentracion de fenol inicial"
                  tooltipInfo="La concentracion inicial de fenol en el agua residual. El valor experimental es 100 mg/L, tipico en efluentes industriales."
                  onChange={setInitialConcentration}
                />

                <ParameterSlider
                  label="Constante de Velocidad"
                  symbol="k"
                  value={decayRate}
                  min={0.01}
                  max={0.10}
                  step={0.001}
                  unit="min⁻¹"
                  description="Constante cinetica de primer orden"
                  tooltipInfo="Constante de velocidad de la reaccion Fenton. k = 0.046 min⁻¹ es el valor experimental reportado para degradacion de fenol."
                  onChange={setDecayRate}
                />

                <ParameterSlider
                  label="Tiempo de Tratamiento"
                  symbol="T"
                  value={extractionTime}
                  min={10}
                  max={180}
                  step={5}
                  unit="min"
                  description="Duracion del proceso"
                  tooltipInfo="El tiempo total del tratamiento. 120 min es el limite tipico para alcanzar >90% de remocion de fenol."
                  onChange={setExtractionTime}
                />
              </div>

              {/* Main Content */}
              <div className="lg:col-span-9 space-y-6 sm:space-y-8">
                {/* Chart with more breathing room */}
                <div className="glass-card p-4 sm:p-6 animate-scale-in delay-500">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white">Curva de Degradacion del Fenol</h3>
                      <p className="text-xs sm:text-sm text-zinc-500">{"Visualizacion de C(t) = C₀ · e⁻ᵏᵗ con integral definida"}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-indigo-500" />
                        <span className="text-zinc-400">Concentracion</span>
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
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 animate-fade-in-up delay-600">
                  <MetricCard
                    title="Tasa de Degradacion"
                    value={`${reactorCalcs.derivative.toFixed(4)}`}
                    subtitle="mg/(L·min)"
                    icon={TrendingDown}
                    formula="dC/dt"
                    accentColor="blue"
                    tooltipInfo="La derivada indica que tan rapido se degrada el fenol en el tiempo T. El valor negativo confirma la disminucion de contaminante."
                  />

                  <MetricCard
                    title="Rendimiento Acumulado"
                    value={`${reactorCalcs.integral.toFixed(1)}`}
                    subtitle="mg·min/L"
                    icon={Activity}
                    formula="∫₀ᵀ C(t)dt"
                    accentColor="indigo"
                    tooltipInfo="La integral representa la exposicion total al agente oxidante. El valor teorico es ~2,165.2 mg·min/L para T=120 min."
                  />

                  <MetricCard
                    title="Concentracion en T"
                    value={`${reactorCalcs.concentrationAtT.toFixed(2)}`}
                    subtitle="mg/L"
                    icon={Beaker}
                    formula="C(T)"
                    accentColor="blue"
                    tooltipInfo="La concentracion residual de fenol al tiempo T. Debe estar por debajo del limite permitido por la normativa ambiental."
                  />

                  <MetricCard
                    title="Remocion Total"
                    value={`${reactorCalcs.percentDegraded.toFixed(1)}%`}
                    subtitle="Fenol degradado"
                    icon={Timer}
                    formula="ΔC/C₀"
                    accentColor="indigo"
                    tooltipInfo="Porcentaje del fenol que ha sido degradado. El objetivo es superar el 90% de remocion para cumplir normativas."
                  />
                </div>
              </div>
            </div>

            {/* Math Foundation - Full Width */}
            <div className="animate-fade-in-up delay-700">
              <MathFoundation 
                type="reactor" 
                params={{ C0: initialConcentration, k: decayRate, T: extractionTime }}
                expandAll={presentationMode}
              />
            </div>
          </TabsContent>

          {/* Tab 2: Antena Robótica */}
          <TabsContent value="antenna" className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
            {/* Context Section */}
            <div className="animate-fade-in-up delay-200">
              <ContextSection
                type="antenna"
                title="Contexto: Atenuacion de Senales en Sistemas Roboticos"
                icon={Antenna}
                expandedByDefault={presentationMode}
              >
                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed">
                  <p>
                    En el diseno de <strong className="text-zinc-200">sistemas mecatronicos</strong> destinados a la infraestructura de telecomunicaciones, la estabilidad fisica es un requisito indispensable para la integridad de los datos. Un <strong className="text-zinc-200">brazo robotico</strong> que soporta una antena de transmision esta sujeto a perturbaciones mecanicas, como <strong className="text-blue-400">rafagas de viento</strong> o vibraciones estructurales.
                  </p>
                  <p>
                    Estas variaciones no son lineales y requieren de un analisis avanzado mediante <strong className="text-zinc-200">funciones trascendentes</strong> (exponencial y trigonometrica) para garantizar que la orientacion de la antena no comprometa la calidad de la senal transmitida.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                      <h4 className="text-zinc-200 font-medium mb-2">Parametros del Sistema</h4>
                      <ul className="space-y-1 text-xs">
                        <li><span className="text-zinc-500">Amplitud inicial:</span> <span className="text-blue-400">S₀ = 5.0 V</span></li>
                        <li><span className="text-zinc-500">Frecuencia de oscilacion:</span> <span className="text-blue-400">ω = 2.5 rad/s</span></li>
                        <li><span className="text-zinc-500">Coef. amortiguamiento:</span> <span className="text-blue-400">k = 0.4 s⁻¹</span></li>
                        <li><span className="text-zinc-500">Tiempo de observacion:</span> <span className="text-blue-400">T = 10 s</span></li>
                      </ul>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                      <h4 className="text-zinc-200 font-medium mb-2">Resultado Esperado</h4>
                      <ul className="space-y-1 text-xs">
                        <li><span className="text-zinc-500">Perdida total (integral):</span> <span className="text-indigo-400">~0.262 V·s</span></li>
                        <li><span className="text-zinc-500">Escenario:</span> Rafaga de viento critica</li>
                        <li><span className="text-zinc-500">Aplicacion:</span> Correccion de errores</li>
                        <li><span className="text-zinc-500">Modelo:</span> Vibracion amortiguada</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500 mt-2">
                    <strong>Objetivo:</strong> Calcular la perdida acumulada de senal mediante la integral definida para determinar la viabilidad del enlace de comunicacion y la necesidad de sistemas de control compensatorios.
                  </p>
                </div>
              </ContextSection>
            </div>

            {/* Optimization Indicator */}
            <div className="animate-fade-in-up delay-300">
              <OptimizationIndicator 
                type="antenna" 
                params={{ S0: amplitude, omega: frequency, k: damping, T: evaluationTime }} 
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Left Panel - Controls */}
              <div className="lg:col-span-3 space-y-4 animate-fade-in-up delay-400">
                <div className="glass-card px-4 py-3 border-l-2 border-blue-500">
                  <h2 className="text-sm font-medium text-zinc-200">
                    Parametros de la Antena
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    Configura la senal y el amortiguamiento
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
                  description="Voltaje inicial de la senal"
                  tooltipInfo="El voltaje maximo de la senal al inicio (t=0). El valor experimental es 5.0 V, tipico en sistemas de comunicacion robotica."
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
                  description="Frecuencia de oscilacion (viento)"
                  tooltipInfo="Frecuencia de la vibracion inducida por el viento. ω = 2.5 rad/s corresponde a una rafaga critica tipica."
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
                  description="Coeficiente de atenuacion mecanica"
                  tooltipInfo="Que tan rapido decae la vibracion. k = 0.4 s⁻¹ es el valor experimental para el sistema mecanico analizado."
                  onChange={setDamping}
                />

                <ParameterSlider
                  label="Tiempo de Observacion"
                  symbol="T"
                  value={evaluationTime}
                  min={1}
                  max={20}
                  step={0.5}
                  unit="s"
                  description="Duracion de la rafaga"
                  tooltipInfo="El tiempo de la rafaga de viento critica. 10 segundos es el periodo de analisis experimental."
                  onChange={setEvaluationTime}
                />
              </div>

              {/* Main Content */}
              <div className="lg:col-span-9 space-y-6 sm:space-y-8">
                {/* Chart with more breathing room */}
                <div className="glass-card p-4 sm:p-6 animate-scale-in delay-500">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white">Senal Amortiguada por Vibracion</h3>
                      <p className="text-xs sm:text-sm text-zinc-500">{"Visualizacion de S(t) = S₀ · e⁻ᵏᵗ · cos(ωt)"}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-zinc-400">Senal</span>
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
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 animate-fade-in-up delay-600">
                  <MetricCard
                    title="Perdida Acumulada"
                    value={`${antennaCalcs.integralValue.toFixed(4)}`}
                    subtitle="V·s"
                    icon={Waves}
                    formula="∫₀ᵀ S(t)dt"
                    accentColor="indigo"
                    tooltipInfo="La integral representa la desviacion energetica total. El valor teorico es ~0.262 V·s, que el sistema debe corregir."
                  />

                  <MetricCard
                    title="Tasa de Cambio"
                    value={`${antennaCalcs.derivativeAtT.toFixed(4)}`}
                    subtitle="V/s"
                    icon={TrendingDown}
                    formula="dS/dt"
                    accentColor="blue"
                    tooltipInfo="La derivada indica la velocidad de cambio de la senal, combinando el decaimiento exponencial y la oscilacion."
                  />

                  <MetricCard
                    title="Senal en T"
                    value={`${antennaCalcs.signalAtT.toFixed(4)}`}
                    subtitle="V"
                    icon={Signal}
                    formula="S(T)"
                    accentColor="indigo"
                    tooltipInfo="El voltaje de la senal en el momento T. Incluye la atenuacion y la fase de la oscilacion coseno."
                  />

                  <MetricCard
                    title="Atenuacion"
                    value={`${(100 - antennaCalcs.percentRetained).toFixed(1)}%`}
                    subtitle="Perdida de senal"
                    icon={Zap}
                    formula="|ΔS/S₀|"
                    accentColor="blue"
                    tooltipInfo="Porcentaje de la senal perdida por amortiguamiento. En comunicaciones, se busca minimizar esta perdida."
                  />
                </div>
              </div>
            </div>

            {/* Math Foundation - Full Width */}
            <div className="animate-fade-in-up delay-700">
              <MathFoundation 
                type="antenna" 
                params={{ S0: amplitude, omega: frequency, k: damping, T: evaluationTime }}
                expandAll={presentationMode}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="glass-card p-4 sm:p-6 text-center border-t border-zinc-800/50 animate-fade-in delay-700">
          <p className="text-sm text-zinc-400 mb-2">
            Analisis Integral y Modelado Predictivo de Sistemas Dinamicos
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs text-zinc-500 mb-4">
            <span>Pastelin Rivas Cesar Edahi</span>
            <span className="hidden sm:inline">·</span>
            <span>Martinez de la Cruz Jose Angel</span>
            <span className="hidden sm:inline">·</span>
            <span>Pena Suarez Diego Alejandro</span>
            <span className="hidden sm:inline">·</span>
            <span>Sayab Gatica Trujillo</span>
          </div>
          <p className="text-xs text-zinc-600">
            CCH Azcapotzalco · UNAM · Calculo II · 2025
          </p>
        </footer>
      </div>
    </div>
  )
}
