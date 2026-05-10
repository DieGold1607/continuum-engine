"use client"

import { useState } from "react"
import { ChevronDown, Award, FlaskConical, Radio, Cpu, BookOpen } from "lucide-react"

interface ConclusionsSectionProps {
  expandedByDefault?: boolean
}

export function ConclusionsSection({ expandedByDefault = false }: ConclusionsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(expandedByDefault)

  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-zinc-800/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
            <Award className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-semibold text-white">Conclusiones Generales</h2>
            <p className="text-sm text-zinc-500">Sintesis del proyecto Continuum</p>
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
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-4 sm:px-6 pb-6 space-y-6">
          {/* Main Conclusion */}
          <div className="p-4 rounded-lg bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              El desarrollo de este proyecto, materializado en el sistema <strong className="text-amber-400">Continuum</strong>, 
              permite validar la transicion conceptual del analisis de la variacion instantanea (Calculo I) hacia el modelado 
              de la acumulacion y la prospeccion sistemica (Calculo II). A traves de la integracion de cuatro disciplinas 
              —<span className="text-indigo-400">Ingenieria Mecatronica</span>, <span className="text-blue-400">Telecomunicaciones</span>, 
              <span className="text-green-400">Quimica</span> y <span className="text-purple-400">Ciencia de Datos</span>—, 
              se ha demostrado que el calculo integral no es un conjunto de algoritmos abstractos, sino el lenguaje fundamental 
              para resolver problemas de alta complejidad tecnica y social.
            </p>
          </div>

          {/* Chapter Conclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Antenna Conclusion */}
            <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50 space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-blue-500/20">
                  <Radio className="w-4 h-4 text-blue-400" />
                </div>
                <h3 className="text-sm font-semibold text-white">Capitulo I: Antena Robotica</h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                El analisis de la antena robotica evidencio la potencia de la <strong className="text-blue-300">integracion 
                por partes ciclica</strong>. Este metodo permitio cuantificar la perdida energetica total de una senal frente 
                a perturbaciones dinamicas, transformando un fenomeno fisico erratico en un dato preciso y accionable para 
                el diseno de protocolos de comunicacion robustos. La capacidad de sumar infinitesimales para hallar un area 
                total de &quot;error&quot; es lo que permite a la ingenieria pasar del diagnostico a la solucion.
              </p>
            </div>

            {/* Reactor Conclusion */}
            <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50 space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-indigo-500/20">
                  <FlaskConical className="w-4 h-4 text-indigo-400" />
                </div>
                <h3 className="text-sm font-semibold text-white">Capitulo II: Reactor Fenton</h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                La resolucion de ecuaciones diferenciales de <strong className="text-indigo-300">variables separables</strong> para 
                el reactor Fenton permitio establecer un modelo predictivo de degradacion quimica. La obtencion de la funcion 
                exponencial C(t) = C₀e⁻ᵏᵗ y su posterior evaluacion mediante la integral definida demostro ser la herramienta 
                definitiva para la optimizacion industrial. Este enfoque permite reducir costos operativos y garantizar la 
                sostenibilidad ambiental al determinar con exactitud los tiempos de tratamiento necesarios.
              </p>
            </div>
          </div>

          {/* Continuum Engine */}
          <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-purple-500/20">
                <Cpu className="w-4 h-4 text-purple-400" />
              </div>
              <h3 className="text-sm font-semibold text-white">Continuum Engine</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              La creacion del motor <strong className="text-purple-300">Continuum Engine</strong> representa la culminacion 
              del razonamiento digital y matematico del equipo. La sintesis de modelos matematicos puros con interfaces 
              interactivas de ultima generacion permite que la abstraccion del calculo se convierta en una herramienta de 
              control y visualizacion en tiempo real.
            </p>
          </div>

          {/* Final Statement */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
            <BookOpen className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-sm text-zinc-300 leading-relaxed italic">
              &quot;Este proyecto ratifica que el dominio del calculo integral y el modelado predictivo es indispensable 
              para cualquier profesional que aspire a liderar la innovacion tecnologica y la toma de decisiones basada 
              en datos en el siglo XXI.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
