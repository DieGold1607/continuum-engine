"use client";

import { Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-transparent" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 mb-8">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-sm text-zinc-300">Proyecto Final de Cálculo II</span>
        </div>

        {/* Main Title - Serif Typography */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white mb-6 text-balance leading-[1.1]">
          Modelado Predictivo de{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-300 to-indigo-300">
            Sistemas Dinámicos
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed text-pretty">
          Análisis integral de funciones exponenciales y trigonométricas amortiguadas 
          aplicadas a reactores químicos y sistemas de comunicación robótica.
        </p>

        {/* Authors */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <span>Diego Patricio Sánchez</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Sayab Gatica Trujillo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-400" />
            <span>Angel</span>
          </div>
        </div>

        {/* Institution */}
        <div className="mt-8 pt-8 border-t border-zinc-800/50">
          <p className="text-xs text-zinc-600 uppercase tracking-widest">
            CCH Azcapotzalco &middot; UNAM &middot; 2025
          </p>
        </div>
      </div>
    </section>
  );
}
