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
    const { C0 = 50, k = 0.1, T = 20 } = params;
    const CT = C0 * Math.exp(-k * T);
    const integral = (C0 / k) * (1 - Math.exp(-k * T));
    const derivative = -k * C0 * Math.exp(-k * T);

    return (
      <div className="glass-card p-4 sm:p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full" />
          Fundamento Matemático
        </h3>

        {/* Section: Modelo */}
        <div className="border border-zinc-800 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("model")}
            className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-zinc-800/30 transition-colors"
          >
            <span className="font-medium text-zinc-200 text-sm sm:text-base">1. Modelo de Degradación Exponencial</span>
            <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isSectionExpanded("model") ? "rotate-180" : ""}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${isSectionExpanded("model") ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="p-3 sm:p-4 pt-0 space-y-4 text-zinc-400">
              <p className="text-sm leading-relaxed">
                La concentración de un reactivo en un reactor de tanque agitado sigue una 
                <strong className="text-zinc-200"> cinética de primer orden</strong>, donde la tasa de 
                descomposición es proporcional a la concentración presente:
              </p>
              <div className="bg-zinc-900/50 rounded-lg p-3 sm:p-4 border border-zinc-800 overflow-x-auto">
                <BlockLatex>{`C(t) = C_0 \\cdot e^{-kt}`}</BlockLatex>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="bg-zinc-800/30 rounded-lg p-3">
                  <InlineLatex>{`C_0`}</InlineLatex>
                  <span className="text-zinc-500 ml-2">= {C0} mol/L</span>
                  <p className="text-xs text-zinc-600 mt-1">Concentración inicial</p>
                </div>
                <div className="bg-zinc-800/30 rounded-lg p-3">
                  <InlineLatex>{`k`}</InlineLatex>
                  <span className="text-zinc-500 ml-2">= {k} min⁻¹</span>
                  <p className="text-xs text-zinc-600 mt-1">Constante de velocidad</p>
                </div>
                <div className="bg-zinc-800/30 rounded-lg p-3">
                  <InlineLatex>{`T`}</InlineLatex>
                  <span className="text-zinc-500 ml-2">= {T} min</span>
                  <p className="text-xs text-zinc-600 mt-1">Tiempo de extracción</p>
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
            <span className="font-medium text-zinc-200 text-sm sm:text-base">2. Derivada: Velocidad de Reacción</span>
            <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isSectionExpanded("derivative") ? "rotate-180" : ""}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${isSectionExpanded("derivative") ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="p-3 sm:p-4 pt-0 space-y-4 text-zinc-400">
              <p className="text-sm leading-relaxed">
                La <strong className="text-zinc-200">derivada</strong> de la función de concentración 
                nos indica la <strong className="text-zinc-200">velocidad instantánea</strong> a la que 
                el reactivo se está consumiendo en cualquier momento:
              </p>
              <div className="bg-zinc-900/50 rounded-lg p-3 sm:p-4 border border-zinc-800 space-y-3 overflow-x-auto">
                <BlockLatex>{`\\frac{dC}{dt} = \\frac{d}{dt}\\left[C_0 \\cdot e^{-kt}\\right]`}</BlockLatex>
                <BlockLatex>{`\\frac{dC}{dt} = C_0 \\cdot (-k) \\cdot e^{-kt}`}</BlockLatex>
                <BlockLatex>{`\\frac{dC}{dt} = -k \\cdot C_0 \\cdot e^{-kt}`}</BlockLatex>
              </div>
              <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-3 sm:p-4 overflow-x-auto">
                <p className="text-sm text-indigo-300 mb-2">Evaluando en T = {T} min:</p>
                <BlockLatex>{`\\frac{dC}{dt}\\bigg|_{t=${T}} = -${k} \\cdot ${C0} \\cdot e^{-${k} \\cdot ${T}} = ${derivative.toFixed(4)} \\text{ mol/(L·min)}`}</BlockLatex>
              </div>
              <p className="text-xs text-zinc-500">
                El signo negativo indica que la concentración está <em>disminuyendo</em> con el tiempo.
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
            <span className="font-medium text-zinc-200 text-sm sm:text-base">3. Integral Definida: Rendimiento Total</span>
            <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isSectionExpanded("integral") ? "rotate-180" : ""}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${isSectionExpanded("integral") ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="p-3 sm:p-4 pt-0 space-y-4 text-zinc-400">
              <p className="text-sm leading-relaxed">
                La <strong className="text-zinc-200">integral definida</strong> de 0 a T representa el 
                <strong className="text-zinc-200"> área bajo la curva</strong>, que físicamente corresponde 
                a la cantidad total de reactivo disponible durante el proceso:
              </p>
              <div className="bg-zinc-900/50 rounded-lg p-3 sm:p-4 border border-zinc-800 space-y-3 overflow-x-auto">
                <BlockLatex>{`\\int_0^T C(t)\\,dt = \\int_0^T C_0 \\cdot e^{-kt}\\,dt`}</BlockLatex>
                <BlockLatex>{`= C_0 \\cdot \\left[-\\frac{1}{k}e^{-kt}\\right]_0^T`}</BlockLatex>
                <BlockLatex>{`= -\\frac{C_0}{k}\\left(e^{-kT} - e^0\\right)`}</BlockLatex>
                <BlockLatex>{`= \\frac{C_0}{k}\\left(1 - e^{-kT}\\right)`}</BlockLatex>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 sm:p-4 overflow-x-auto">
                <p className="text-sm text-blue-300 mb-2">Con los valores actuales:</p>
                <BlockLatex>{`\\int_0^{${T}} ${C0} \\cdot e^{-${k}t}\\,dt = \\frac{${C0}}{${k}}\\left(1 - e^{-${k} \\cdot ${T}}\\right) = ${integral.toFixed(2)} \\text{ mol·min/L}`}</BlockLatex>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Interpretación */}
        <div className="border border-zinc-800 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("interpretation")}
            className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-zinc-800/30 transition-colors"
          >
            <span className="font-medium text-zinc-200 text-sm sm:text-base">4. Interpretación Industrial</span>
            <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isSectionExpanded("interpretation") ? "rotate-180" : ""}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${isSectionExpanded("interpretation") ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="p-3 sm:p-4 pt-0 space-y-4 text-zinc-400">
              <p className="text-sm leading-relaxed">
                En la <strong className="text-zinc-200">optimización industrial</strong>, estos cálculos 
                permiten determinar el momento óptimo para extraer el producto:
              </p>
              <ul className="text-sm space-y-2 list-disc list-inside">
                <li>Si T es muy pequeño: Alta concentración residual, baja conversión</li>
                <li>Si T es muy grande: Baja concentración, pero mayor tiempo de proceso</li>
                <li>El <strong className="text-zinc-200">óptimo</strong> balancea conversión vs. tiempo de ciclo</li>
              </ul>
              <div className="bg-zinc-800/30 rounded-lg p-3 sm:p-4 mt-4">
                <p className="text-sm">
                  <strong className="text-zinc-200">Resultado actual:</strong> En t = {T} min, 
                  queda el <span className="text-indigo-400">{((CT/C0)*100).toFixed(1)}%</span> de 
                  la concentración inicial, con un rendimiento acumulado de{" "}
                  <span className="text-blue-400">{integral.toFixed(2)} mol·min/L</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Antenna type
  const { S0 = 10, omega = 2, k = 0.15, T = 15 } = params;
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
        <span className="w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full" />
        Fundamento Matemático
      </h3>

      {/* Section: Modelo */}
      <div className="border border-zinc-800 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection("model")}
          className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-zinc-800/30 transition-colors"
        >
          <span className="font-medium text-zinc-200 text-sm sm:text-base">1. Modelo de Vibración Amortiguada</span>
          <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isSectionExpanded("model") ? "rotate-180" : ""}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ${isSectionExpanded("model") ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="p-3 sm:p-4 pt-0 space-y-4 text-zinc-400">
            <p className="text-sm leading-relaxed">
              La señal en un sistema de comunicación robótica con <strong className="text-zinc-200">atenuación</strong> sigue 
              un modelo de <strong className="text-zinc-200">oscilación armónica amortiguada</strong>:
            </p>
            <div className="bg-zinc-900/50 rounded-lg p-3 sm:p-4 border border-zinc-800 overflow-x-auto">
              <BlockLatex>{`S(t) = S_0 \\cdot e^{-kt} \\cdot \\cos(\\omega t)`}</BlockLatex>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div className="bg-zinc-800/30 rounded-lg p-3">
                <InlineLatex>{`S_0`}</InlineLatex>
                <span className="text-zinc-500 ml-2">= {S0} V</span>
                <p className="text-xs text-zinc-600 mt-1">Amplitud inicial</p>
              </div>
              <div className="bg-zinc-800/30 rounded-lg p-3">
                <InlineLatex>{`\\omega`}</InlineLatex>
                <span className="text-zinc-500 ml-2">= {omega} rad/s</span>
                <p className="text-xs text-zinc-600 mt-1">Frecuencia angular</p>
              </div>
              <div className="bg-zinc-800/30 rounded-lg p-3">
                <InlineLatex>{`k`}</InlineLatex>
                <span className="text-zinc-500 ml-2">= {k} s⁻¹</span>
                <p className="text-xs text-zinc-600 mt-1">Coef. amortiguamiento</p>
              </div>
              <div className="bg-zinc-800/30 rounded-lg p-3">
                <InlineLatex>{`T`}</InlineLatex>
                <span className="text-zinc-500 ml-2">= {T} s</span>
                <p className="text-xs text-zinc-600 mt-1">Tiempo de análisis</p>
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
              Aplicando la <strong className="text-zinc-200">regla del producto</strong> para derivar 
              el producto de la exponencial y el coseno:
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
          <span className="font-medium text-zinc-200 text-sm sm:text-base">3. Integral: Método de Partes Cíclico</span>
          <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isSectionExpanded("integral") ? "rotate-180" : ""}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ${isSectionExpanded("integral") ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="p-3 sm:p-4 pt-0 space-y-4 text-zinc-400">
            <p className="text-sm leading-relaxed">
              La integral de <InlineLatex>{`e^{-kt}\\cos(\\omega t)`}</InlineLatex> requiere 
              <strong className="text-zinc-200"> integración por partes cíclica</strong>:
            </p>
            <div className="bg-zinc-900/50 rounded-lg p-3 sm:p-4 border border-zinc-800 space-y-3 overflow-x-auto">
              <BlockLatex>{`\\int e^{-kt}\\cos(\\omega t)\\,dt = \\frac{e^{-kt}}{k^2 + \\omega^2}\\left[-k\\cos(\\omega t) + \\omega\\sin(\\omega t)\\right]`}</BlockLatex>
            </div>
            <p className="text-sm">Para la integral definida de 0 a T:</p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 sm:p-4 overflow-x-auto">
              <BlockLatex>{`\\int_0^{T} S(t)\\,dt = \\frac{S_0}{k^2 + \\omega^2}\\left[k(1 - e^{-kT}\\cos(\\omega T)) + \\omega e^{-kT}\\sin(\\omega T)\\right]`}</BlockLatex>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Aplicación */}
      <div className="border border-zinc-800 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection("application")}
          className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-zinc-800/30 transition-colors"
        >
          <span className="font-medium text-zinc-200 text-sm sm:text-base">4. Aplicación en Robótica</span>
          <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isSectionExpanded("application") ? "rotate-180" : ""}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ${isSectionExpanded("application") ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="p-3 sm:p-4 pt-0 space-y-4 text-zinc-400">
            <p className="text-sm leading-relaxed">
              En sistemas de <strong className="text-zinc-200">telecomunicaciones robóticas</strong> y 
              <strong className="text-zinc-200"> mecatrónica</strong>, este modelo describe:
            </p>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li>Atenuación de señales en antenas de comunicación</li>
              <li>Vibraciones en actuadores y motores</li>
              <li>Respuesta transitoria de sensores</li>
              <li>Oscilaciones en sistemas de control</li>
            </ul>
            <div className="bg-zinc-800/30 rounded-lg p-3 sm:p-4 mt-4">
              <p className="text-sm">
                <strong className="text-zinc-200">Resultado actual:</strong> En t = {T} s, 
                la envolvente es <span className="text-indigo-400">{envelope.toFixed(3)} V</span> ({((envelope/S0)*100).toFixed(1)}% de S₀),
                con energía acumulada de <span className="text-blue-400">{Math.abs(integral).toFixed(3)} V·s</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
