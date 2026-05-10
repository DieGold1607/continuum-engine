"use client";

import { BlockLatex, InlineLatex } from "./latex";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

interface MathFoundationProps {
  type: "reactor" | "antenna";
  params: {
    C0?: number;
    k?: number;
    T?: number;
    S0?: number;
    omega?: number;
  };
  expandAll?: boolean;
}

export function MathFoundation({ type, params, expandAll = false }: MathFoundationProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["model"]));

  // Handle expandAll changes
  useEffect(() => {
    if (expandAll) {
      setExpandedSections(new Set(["model", "derivative", "integral", "interpretation", "application"]));
    } else {
      setExpandedSections(new Set(["model"]));
    }
  }, [expandAll]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const isSectionExpanded = (section: string) => expandedSections.has(section);

  if (type === "reactor") {
    const { C0 = 100, k = 0.046, T = 120 } = params;
    const CT = C0 * Math.exp(-k * T);
    const integral = (C0 / k) * (1 - Math.exp(-k * T));
    const derivative = -k * C0 * Math.exp(-k * T);

    return (
      <div className="glass-card p-4 sm:p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full" />
          Fundamento Matematico: Cinetica de Primer Orden
        </h3>

        {/* Section: Modelo */}
        <div className="border border-zinc-800 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("model")}
            className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-zinc-800/30 transition-colors"
          >
            <span className="font-medium text-zinc-200 text-sm sm:text-base">1. Ecuacion Diferencial y Modelo Exponencial</span>
            <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isSectionExpanded("model") ? "rotate-180" : ""}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${isSectionExpanded("model") ? "max-h-[1500px] opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="p-3 sm:p-4 pt-0 space-y-4 text-zinc-400">
              <p className="text-sm leading-relaxed">
                La degradacion del fenol en un reactor por lotes se rige por una <strong className="text-zinc-200">cinetica de primer orden</strong>. 
                La rapidez de cambio de la concentracion C con respecto al tiempo t es directamente proporcional a la cantidad de sustancia presente:
              </p>
              <div className="bg-zinc-900/50 rounded-lg p-3 sm:p-4 border border-zinc-800 space-y-3 overflow-x-auto">
                <p className="text-xs text-zinc-500 mb-2">Paso 1: Planteamiento de la Ecuacion Diferencial</p>
                <BlockLatex>{`\\frac{dC}{dt} = -kC`}</BlockLatex>
              </div>
              <div className="bg-zinc-900/50 rounded-lg p-3 sm:p-4 border border-zinc-800 space-y-3 overflow-x-auto">
                <p className="text-xs text-zinc-500 mb-2">Paso 2: Separacion de Variables</p>
                <BlockLatex>{`\\frac{1}{C}dC = -k\\,dt`}</BlockLatex>
              </div>
              <div className="bg-zinc-900/50 rounded-lg p-3 sm:p-4 border border-zinc-800 space-y-3 overflow-x-auto">
                <p className="text-xs text-zinc-500 mb-2">Paso 3: Integracion de ambos miembros</p>
                <BlockLatex>{`\\int \\frac{1}{C}dC = \\int -k\\,dt`}</BlockLatex>
                <BlockLatex>{`\\ln|C| = -kt + C_{constante}`}</BlockLatex>
              </div>
              <div className="bg-zinc-900/50 rounded-lg p-3 sm:p-4 border border-zinc-800 space-y-3 overflow-x-auto">
                <p className="text-xs text-zinc-500 mb-2">Paso 4: Obtencion del Modelo Exponencial</p>
                <BlockLatex>{`e^{\\ln|C|} = e^{-kt + C_{constante}}`}</BlockLatex>
                <BlockLatex>{`C(t) = e^{C_{constante}} \\cdot e^{-kt}`}</BlockLatex>
              </div>
              <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-3 sm:p-4 overflow-x-auto">
                <p className="text-sm text-indigo-300 mb-2">Modelo Predictivo Final (con C(0) = C₀):</p>
                <BlockLatex>{`C(t) = C_0 \\cdot e^{-kt}`}</BlockLatex>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="bg-zinc-800/30 rounded-lg p-3">
                  <InlineLatex>{`C_0`}</InlineLatex>
                  <span className="text-zinc-500 ml-2">= {C0} mg/L</span>
                  <p className="text-xs text-zinc-600 mt-1">Concentracion inicial de fenol</p>
                </div>
                <div className="bg-zinc-800/30 rounded-lg p-3">
                  <InlineLatex>{`k`}</InlineLatex>
                  <span className="text-zinc-500 ml-2">= {k} min⁻¹</span>
                  <p className="text-xs text-zinc-600 mt-1">Constante de velocidad (Fenton)</p>
                </div>
                <div className="bg-zinc-800/30 rounded-lg p-3">
                  <InlineLatex>{`T`}</InlineLatex>
                  <span className="text-zinc-500 ml-2">= {T} min</span>
                  <p className="text-xs text-zinc-600 mt-1">Tiempo de tratamiento</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Derivada */}
        <div className="border border-zinc-800 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("derivative")}
            className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-zinc-800/30 transition-colors"
          >
            <span className="font-medium text-zinc-200 text-sm sm:text-base">2. Derivada: Velocidad de Degradacion</span>
            <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isSectionExpanded("derivative") ? "rotate-180" : ""}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${isSectionExpanded("derivative") ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="p-3 sm:p-4 pt-0 space-y-4 text-zinc-400">
              <p className="text-sm leading-relaxed">
                La <strong className="text-zinc-200">derivada</strong> de la funcion de concentracion 
                nos indica la <strong className="text-zinc-200">velocidad instantanea</strong> a la que 
                el fenol se esta degradando en cualquier momento:
              </p>
              <div className="bg-zinc-900/50 rounded-lg p-3 sm:p-4 border border-zinc-800 space-y-3 overflow-x-auto">
                <BlockLatex>{`\\frac{dC}{dt} = \\frac{d}{dt}\\left[C_0 \\cdot e^{-kt}\\right]`}</BlockLatex>
                <BlockLatex>{`\\frac{dC}{dt} = C_0 \\cdot (-k) \\cdot e^{-kt}`}</BlockLatex>
                <BlockLatex>{`\\frac{dC}{dt} = -k \\cdot C_0 \\cdot e^{-kt}`}</BlockLatex>
              </div>
              <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-3 sm:p-4 overflow-x-auto">
                <p className="text-sm text-indigo-300 mb-2">Evaluando en T = {T} min:</p>
                <BlockLatex>{`\\frac{dC}{dt}\\bigg|_{t=${T}} = -${k} \\cdot ${C0} \\cdot e^{-${k} \\cdot ${T}} = ${derivative.toFixed(4)} \\text{ mg/(L·min)}`}</BlockLatex>
              </div>
              <p className="text-xs text-zinc-500">
                El signo negativo indica que la concentracion de fenol esta <em>disminuyendo</em> con el tiempo debido a la oxidacion.
              </p>
            </div>
          </div>
        </div>

        {/* Section: Integral */}
        <div className="border border-zinc-800 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("integral")}
            className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-zinc-800/30 transition-colors"
          >
            <span className="font-medium text-zinc-200 text-sm sm:text-base">3. Integral Definida: Rendimiento Acumulado</span>
            <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isSectionExpanded("integral") ? "rotate-180" : ""}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${isSectionExpanded("integral") ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="p-3 sm:p-4 pt-0 space-y-4 text-zinc-400">
              <p className="text-sm leading-relaxed">
                La <strong className="text-zinc-200">integral definida</strong> de 0 a T representa el 
                <strong className="text-zinc-200"> area bajo la curva</strong>, que fisicamente corresponde 
                a la <strong className="text-zinc-200">exposicion total</strong> al agente oxidante durante el proceso:
              </p>
              <div className="bg-zinc-900/50 rounded-lg p-3 sm:p-4 border border-zinc-800 space-y-3 overflow-x-auto">
                <BlockLatex>{`\\int_0^T C(t)\\,dt = \\int_0^T C_0 \\cdot e^{-kt}\\,dt`}</BlockLatex>
                <BlockLatex>{`= C_0 \\cdot \\left[-\\frac{1}{k}e^{-kt}\\right]_0^T`}</BlockLatex>
                <BlockLatex>{`= -\\frac{C_0}{k}\\left(e^{-kT} - e^0\\right)`}</BlockLatex>
                <BlockLatex>{`= \\frac{C_0}{k}\\left(1 - e^{-kT}\\right)`}</BlockLatex>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 sm:p-4 overflow-x-auto">
                <p className="text-sm text-blue-300 mb-2">Con los parametros experimentales (k = 0.046 min⁻¹, T = {T} min):</p>
                <BlockLatex>{`\\int_0^{${T}} ${C0} \\cdot e^{-${k}t}\\,dt = \\frac{${C0}}{${k}}\\left(1 - e^{-${k} \\cdot ${T}}\\right) \\approx ${integral.toFixed(1)} \\text{ mg·min/L}`}</BlockLatex>
              </div>
              <p className="text-xs text-zinc-500">
                Este valor acumulado representa la "exposicion total" al agente oxidante, confirmando una remocion superior al 90% del fenol original.
              </p>
            </div>
          </div>
        </div>

        {/* Section: Interpretación */}
        <div className="border border-zinc-800 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("interpretation")}
            className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-zinc-800/30 transition-colors"
          >
            <span className="font-medium text-zinc-200 text-sm sm:text-base">4. Interpretacion Industrial y Ambiental</span>
            <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isSectionExpanded("interpretation") ? "rotate-180" : ""}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${isSectionExpanded("interpretation") ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="p-3 sm:p-4 pt-0 space-y-4 text-zinc-400">
              <p className="text-sm leading-relaxed">
                La implementacion de este modelo permite a los operadores del reactor:
              </p>
              <ul className="text-sm space-y-2 list-disc list-inside">
                <li>Visualizar la degradacion del fenol en <strong className="text-zinc-200">tiempo real</strong></li>
                <li>Predecir el momento exacto en que la concentracion cumple con la <strong className="text-zinc-200">normativa ambiental</strong></li>
                <li>Optimizar recursos y reducir <strong className="text-zinc-200">costos operativos</strong> en la planta de tratamiento</li>
                <li>Integrar sensores (Ciencia de Datos) con el modelo matematico de Calculo II</li>
              </ul>
              <div className="bg-zinc-800/30 rounded-lg p-3 sm:p-4 mt-4">
                <p className="text-sm">
                  <strong className="text-zinc-200">Resultado actual:</strong> En t = {T} min, 
                  queda el <span className="text-indigo-400">{((CT/C0)*100).toFixed(1)}%</span> de 
                  la concentracion inicial ({CT.toFixed(2)} mg/L), con un rendimiento acumulado de{" "}
                  <span className="text-blue-400">{integral.toFixed(1)} mg·min/L</span>.
                </p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 sm:p-4 mt-2">
                <p className="text-sm text-green-300">
                  <strong>Conclusion:</strong> El proceso Fenton logra una remocion de <span className="text-green-400">{((1 - CT/C0)*100).toFixed(1)}%</span> del fenol, 
                  cumpliendo con los estandares de tratamiento de aguas residuales industriales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Antenna type
  const { S0 = 5, omega = 2.5, k = 0.4, T = 10 } = params;
  const ST = S0 * Math.exp(-k * T) * Math.cos(omega * T);
  const envelope = S0 * Math.exp(-k * T);
  
  // Integral calculation for damped oscillation
  const omegaSq = omega * omega;
  const kSq = k * k;
  const denominator = kSq + omegaSq;
  const integral = (S0 / denominator) * (k * (1 - Math.exp(-k * T) * Math.cos(omega * T)) + omega * Math.exp(-k * T) * Math.sin(omega * T));

  return (
    <div className="glass-card p-4 sm:p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <span className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full" />
        Fundamento Matematico: Funciones Trascendentes
      </h3>

      {/* Section: Modelo */}
      <div className="border border-zinc-800 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection("model")}
          className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-zinc-800/30 transition-colors"
        >
          <span className="font-medium text-zinc-200 text-sm sm:text-base">1. Modelo de Vibracion Amortiguada</span>
          <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isSectionExpanded("model") ? "rotate-180" : ""}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ${isSectionExpanded("model") ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="p-3 sm:p-4 pt-0 space-y-4 text-zinc-400">
            <p className="text-sm leading-relaxed">
              Para describir la evolucion de las oscilaciones a lo largo del tiempo, empleamos 
              <strong className="text-zinc-200"> funciones trascendentes</strong>: la combinacion de una funcion 
              exponencial decreciente y una funcion trigonometrica periodica:
            </p>
            <div className="bg-zinc-900/50 rounded-lg p-3 sm:p-4 border border-zinc-800 overflow-x-auto">
              <BlockLatex>{`S(t) = S_0 \\cdot e^{-kt} \\cdot \\cos(\\omega t)`}</BlockLatex>
            </div>
            <p className="text-sm leading-relaxed">
              Donde <InlineLatex>{`S_0`}</InlineLatex> representa la amplitud inicial de la senal, 
              <InlineLatex>{`k`}</InlineLatex> el coeficiente de amortiguamiento mecanico y 
              <InlineLatex>{`\\omega`}</InlineLatex> la frecuencia angular de la vibracion.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div className="bg-zinc-800/30 rounded-lg p-3">
                <InlineLatex>{`S_0`}</InlineLatex>
                <span className="text-zinc-500 ml-2">= {S0} V</span>
                <p className="text-xs text-zinc-600 mt-1">Amplitud inicial</p>
              </div>
              <div className="bg-zinc-800/30 rounded-lg p-3">
                <InlineLatex>{`\\omega`}</InlineLatex>
                <span className="text-zinc-500 ml-2">= {omega} rad/s</span>
                <p className="text-xs text-zinc-600 mt-1">Frecuencia (viento)</p>
              </div>
              <div className="bg-zinc-800/30 rounded-lg p-3">
                <InlineLatex>{`k`}</InlineLatex>
                <span className="text-zinc-500 ml-2">= {k} s⁻¹</span>
                <p className="text-xs text-zinc-600 mt-1">Amortiguamiento</p>
              </div>
              <div className="bg-zinc-800/30 rounded-lg p-3">
                <InlineLatex>{`T`}</InlineLatex>
                <span className="text-zinc-500 ml-2">= {T} s</span>
                <p className="text-xs text-zinc-600 mt-1">Tiempo de rafaga</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Derivada */}
      <div className="border border-zinc-800 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection("derivative")}
          className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-zinc-800/30 transition-colors"
        >
          <span className="font-medium text-zinc-200 text-sm sm:text-base">2. Derivada: Regla del Producto</span>
          <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isSectionExpanded("derivative") ? "rotate-180" : ""}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ${isSectionExpanded("derivative") ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="p-3 sm:p-4 pt-0 space-y-4 text-zinc-400">
            <p className="text-sm leading-relaxed">
              El uso de la <strong className="text-zinc-200">derivada</strong> de estas funciones compuestas permite analizar 
              la rapidez con la que la senal se degrada en intervalos criticos. Aplicamos la <strong className="text-zinc-200">regla del producto</strong>:
            </p>
            <div className="bg-zinc-900/50 rounded-lg p-3 sm:p-4 border border-zinc-800 space-y-3 overflow-x-auto">
              <BlockLatex>{`\\frac{dS}{dt} = S_0 \\cdot \\frac{d}{dt}\\left[e^{-kt} \\cdot \\cos(\\omega t)\\right]`}</BlockLatex>
              <BlockLatex>{`= S_0 \\left[(-k)e^{-kt}\\cos(\\omega t) + e^{-kt}(-\\omega\\sin(\\omega t))\\right]`}</BlockLatex>
              <BlockLatex>{`= -S_0 e^{-kt}\\left[k\\cos(\\omega t) + \\omega\\sin(\\omega t)\\right]`}</BlockLatex>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Integral */}
      <div className="border border-zinc-800 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection("integral")}
          className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-zinc-800/30 transition-colors"
        >
          <span className="font-medium text-zinc-200 text-sm sm:text-base">3. Integral: Metodo de Partes Ciclico</span>
          <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isSectionExpanded("integral") ? "rotate-180" : ""}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ${isSectionExpanded("integral") ? "max-h-[1500px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="p-3 sm:p-4 pt-0 space-y-4 text-zinc-400">
            <p className="text-sm leading-relaxed">
              La integral de <InlineLatex>{`e^{-kt}\\cos(\\omega t)`}</InlineLatex> requiere 
              <strong className="text-zinc-200"> integracion por partes aplicado de forma doble</strong> (ciclica):
            </p>
            <div className="bg-zinc-900/50 rounded-lg p-3 sm:p-4 border border-zinc-800 space-y-3 overflow-x-auto">
              <p className="text-xs text-zinc-500 mb-2">Primera aplicacion:</p>
              <BlockLatex>{`\\int e^{-kt}\\cos(\\omega t)\\,dt`}</BlockLatex>
              <p className="text-xs text-zinc-500 mt-3">Sea: u = e⁻ᵏᵗ y dv = cos(ωt)dt</p>
              <BlockLatex>{`= \\frac{1}{\\omega}e^{-kt}\\sin(\\omega t) + \\frac{k}{\\omega}\\int e^{-kt}\\sin(\\omega t)\\,dt`}</BlockLatex>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-3 sm:p-4 border border-zinc-800 space-y-3 overflow-x-auto">
              <p className="text-xs text-zinc-500 mb-2">El proceso se vuelve ciclico, permitiendo despejar la integral original:</p>
              <BlockLatex>{`\\int e^{-kt}\\cos(\\omega t)\\,dt = \\frac{e^{-kt}}{k^2 + \\omega^2}\\left[\\omega\\sin(\\omega t) - k\\cos(\\omega t)\\right] + C`}</BlockLatex>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 sm:p-4 overflow-x-auto">
              <p className="text-sm text-blue-300 mb-2">Evaluando con el Teorema Fundamental del Calculo en [0, {T}]:</p>
              <BlockLatex>{`\\text{Pérdida Total} = S_0 \\left[\\frac{e^{-kt}}{k^2 + \\omega^2}(\\omega\\sin(\\omega t) - k\\cos(\\omega t))\\right]_0^{${T}}`}</BlockLatex>
              <BlockLatex>{`\\approx ${Math.abs(integral).toFixed(3)} \\text{ V·s}`}</BlockLatex>
            </div>
            <p className="text-xs text-zinc-500">
              Este resultado cuantifica la desviacion energetica total que el sistema de telecomunicaciones debe corregir.
            </p>
          </div>
        </div>
      </div>

      {/* Section: Aplicación */}
      <div className="border border-zinc-800 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection("application")}
          className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-zinc-800/30 transition-colors"
        >
          <span className="font-medium text-zinc-200 text-sm sm:text-base">4. Aplicacion en Mecatronica y Telecomunicaciones</span>
          <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isSectionExpanded("application") ? "rotate-180" : ""}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ${isSectionExpanded("application") ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="p-3 sm:p-4 pt-0 space-y-4 text-zinc-400">
            <p className="text-sm leading-relaxed">
              La problematica tecnica en las telecomunicaciones no reside unicamente en la variacion instantanea, 
              sino en la <strong className="text-zinc-200">perdida acumulada de informacion</strong>. Este modelo describe:
            </p>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li>Atenuacion de senales en <strong className="text-zinc-200">antenas de comunicacion</strong> bajo perturbaciones</li>
              <li>Vibraciones en <strong className="text-zinc-200">brazos roboticos</strong> que soportan equipos de transmision</li>
              <li>Respuesta transitoria ante <strong className="text-zinc-200">rafagas de viento criticas</strong></li>
              <li>Diseno de <strong className="text-zinc-200">sistemas de control compensatorios</strong></li>
            </ul>
            <div className="bg-zinc-800/30 rounded-lg p-3 sm:p-4 mt-4">
              <p className="text-sm">
                <strong className="text-zinc-200">Resultado actual:</strong> En t = {T} s, 
                la envolvente es <span className="text-indigo-400">{envelope.toFixed(3)} V</span> ({((envelope/S0)*100).toFixed(1)}% de S₀),
                con perdida acumulada de <span className="text-blue-400">{Math.abs(integral).toFixed(3)} V·s</span>.
              </p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 sm:p-4 mt-2">
              <p className="text-sm text-amber-300">
                <strong>Conclusion:</strong> La perdida de ~0.262 V·s durante una rafaga critica de 10s requiere 
                protocolos de <span className="text-amber-400">correccion de errores</span> para garantizar la integridad del enlace de comunicacion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
