"use client"

import { useState } from "react"
import { ChevronDown, ArrowDownRight, ArrowUpRight, Sigma, GitBranch } from "lucide-react"

interface MethodsComparisonProps {
  expandedByDefault?: boolean
}

export function MethodsComparison({ expandedByDefault = false }: MethodsComparisonProps) {
  const [isExpanded, setIsExpanded] = useState(expandedByDefault)

  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-zinc-800/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/30">
            <GitBranch className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-semibold text-white">Comparativa de Metodos</h2>
            <p className="text-sm text-zinc-500">Derivada vs Integral: roles complementarios</p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[1500px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-4 sm:px-6 pb-6">
          {/* Visual Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Derivative */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <ArrowDownRight className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-white">Derivada</h3>
                <span className="text-xs text-zinc-500 font-mono">f&apos;(x)</span>
              </div>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">→</span>
                  <span>Mide la <strong className="text-zinc-200">tasa de cambio instantanea</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">→</span>
                  <span>Responde: <em className="text-blue-300">&quot;Que tan rapido cambia?&quot;</em></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">→</span>
                  <span>Usado para encontrar <strong className="text-zinc-200">puntos criticos y optimizar</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">→</span>
                  <span>En el reactor: velocidad de degradacion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">→</span>
                  <span>En la antena: tasa de cambio de senal</span>
                </li>
              </ul>
            </div>

            {/* Integral */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Sigma className="w-5 h-5 text-indigo-400" />
                <h3 className="font-semibold text-white">Integral Definida</h3>
                <span className="text-xs text-zinc-500 font-mono">∫f(x)dx</span>
              </div>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">→</span>
                  <span>Mide la <strong className="text-zinc-200">acumulacion total</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">→</span>
                  <span>Responde: <em className="text-indigo-300">&quot;Cuanto se acumulo en total?&quot;</em></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">→</span>
                  <span>Usado para calcular <strong className="text-zinc-200">areas, volumenes y totales</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">→</span>
                  <span>En el reactor: rendimiento acumulado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">→</span>
                  <span>En la antena: perdida total de senal</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-700/50">
                  <th className="text-left py-3 px-4 text-zinc-400 font-medium">Aspecto</th>
                  <th className="text-left py-3 px-4 text-blue-400 font-medium">Derivada</th>
                  <th className="text-left py-3 px-4 text-indigo-400 font-medium">Integral</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-zinc-800/50">
                  <td className="py-3 px-4 text-zinc-500">Operacion</td>
                  <td className="py-3 px-4">Diferenciacion</td>
                  <td className="py-3 px-4">Antiderivacion</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-3 px-4 text-zinc-500">Notacion</td>
                  <td className="py-3 px-4 font-mono text-blue-300">dC/dt, f&apos;(x)</td>
                  <td className="py-3 px-4 font-mono text-indigo-300">∫₀ᵀ f(x)dx</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-3 px-4 text-zinc-500">Interpretacion geometrica</td>
                  <td className="py-3 px-4">Pendiente de tangente</td>
                  <td className="py-3 px-4">Area bajo la curva</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-3 px-4 text-zinc-500">Aplicacion Reactor</td>
                  <td className="py-3 px-4">Velocidad de reaccion</td>
                  <td className="py-3 px-4">Masa total tratada</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-3 px-4 text-zinc-500">Aplicacion Antena</td>
                  <td className="py-3 px-4">Tasa de atenuacion</td>
                  <td className="py-3 px-4">Error acumulado</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-zinc-500">Metodo usado</td>
                  <td className="py-3 px-4">Regla de la cadena</td>
                  <td className="py-3 px-4">Int. por partes ciclica</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Relationship Note */}
          <div className="mt-4 p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-white">Teorema Fundamental del Calculo</span>
            </div>
            <p className="text-xs text-zinc-400">
              La derivada y la integral son operaciones inversas. Si <span className="font-mono text-emerald-300">F(x) = ∫f(x)dx</span>, 
              entonces <span className="font-mono text-emerald-300">F&apos;(x) = f(x)</span>. Esto conecta el estudio del cambio 
              instantaneo con la acumulacion total, formando el nucleo del calculo.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
