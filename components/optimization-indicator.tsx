"use client";

import { CheckCircle2, TrendingUp, Zap } from "lucide-react";
import { useMemo } from "react";

interface OptimizationIndicatorProps {
  type: "reactor" | "antenna";
  params: {
    C0?: number;
    k?: number;
    T?: number;
    S0?: number;
    omega?: number;
  };
}

export function OptimizationIndicator({ type, params }: OptimizationIndicatorProps) {
  const { score, message, status } = useMemo(() => {
    if (type === "reactor") {
      const { C0 = 50, k = 0.1, T = 20 } = params;
      
      // Optimal zone: ~90-95% conversion (when e^(-kT) is around 0.05-0.10)
      const decayFactor = Math.exp(-k * T);
      const conversion = 1 - decayFactor;
      
      // Calculate optimization score (0-100)
      // Optimal conversion is around 90-95%
      const optimalConversion = 0.92;
      const distance = Math.abs(conversion - optimalConversion);
      const score = Math.max(0, 100 - (distance * 200));
      
      if (score >= 85) {
        return { 
          score, 
          message: "Optimización Alcanzada", 
          status: "optimal" as const 
        };
      } else if (score >= 60) {
        return { 
          score, 
          message: "Aproximándose al Óptimo", 
          status: "approaching" as const 
        };
      } else {
        return { 
          score, 
          message: "Ajustar Parámetros", 
          status: "adjusting" as const 
        };
      }
    } else {
      const { S0 = 10, omega = 2, k = 0.15, T = 15 } = params;
      
      // Optimal: signal decays to about 5-10% (stable communication endpoint)
      const envelope = Math.exp(-k * T);
      const optimalEnvelope = 0.08;
      const distance = Math.abs(envelope - optimalEnvelope);
      const score = Math.max(0, 100 - (distance * 300));
      
      // Also check frequency stability
      const periods = (omega * T) / (2 * Math.PI);
      const isStable = periods >= 3 && periods <= 10;
      const adjustedScore = isStable ? score : score * 0.7;
      
      if (adjustedScore >= 85) {
        return { 
          score: adjustedScore, 
          message: "Señal Estabilizada", 
          status: "optimal" as const 
        };
      } else if (adjustedScore >= 60) {
        return { 
          score: adjustedScore, 
          message: "Calibrando Señal", 
          status: "approaching" as const 
        };
      } else {
        return { 
          score: adjustedScore, 
          message: "Ajustar Frecuencia", 
          status: "adjusting" as const 
        };
      }
    }
  }, [type, params]);

  const getGradient = () => {
    if (status === "optimal") {
      return "from-emerald-500 via-emerald-400 to-teal-400";
    } else if (status === "approaching") {
      return "from-amber-500 via-yellow-400 to-orange-400";
    }
    return "from-zinc-500 via-zinc-400 to-zinc-500";
  };

  const getBorderColor = () => {
    if (status === "optimal") return "border-emerald-500/50";
    if (status === "approaching") return "border-amber-500/50";
    return "border-zinc-700";
  };

  const getGlowColor = () => {
    if (status === "optimal") return "shadow-emerald-500/30";
    if (status === "approaching") return "shadow-amber-500/20";
    return "";
  };

  const getIcon = () => {
    if (status === "optimal") return <CheckCircle2 className="w-5 h-5" />;
    if (status === "approaching") return <TrendingUp className="w-5 h-5" />;
    return <Zap className="w-5 h-5" />;
  };

  return (
    <div 
      className={`
        relative overflow-hidden rounded-xl border p-4
        transition-all duration-700 ease-out
        ${getBorderColor()}
        ${status === "optimal" ? `shadow-lg ${getGlowColor()}` : ""}
        bg-zinc-900/50
      `}
    >
      {/* Background gradient effect */}
      <div 
        className={`
          absolute inset-0 opacity-10 transition-opacity duration-700
          bg-gradient-to-r ${getGradient()}
          ${status === "optimal" ? "opacity-20" : status === "approaching" ? "opacity-10" : "opacity-5"}
        `}
      />
      
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            className={`
              p-2 rounded-lg transition-colors duration-500
              ${status === "optimal" ? "bg-emerald-500/20 text-emerald-400" : 
                status === "approaching" ? "bg-amber-500/20 text-amber-400" : 
                "bg-zinc-800 text-zinc-500"}
            `}
          >
            {getIcon()}
          </div>
          <div>
            <p 
              className={`
                font-semibold text-sm transition-colors duration-500
                ${status === "optimal" ? "text-emerald-400" : 
                  status === "approaching" ? "text-amber-400" : 
                  "text-zinc-400"}
              `}
            >
              {message}
            </p>
            <p className="text-xs text-zinc-500">
              {type === "reactor" ? "Conversión del reactor" : "Estabilidad de señal"}
            </p>
          </div>
        </div>
        
        {/* Score indicator */}
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className={`
                h-full rounded-full transition-all duration-700 ease-out
                bg-gradient-to-r ${getGradient()}
              `}
              style={{ width: `${Math.min(100, score)}%` }}
            />
          </div>
          <span 
            className={`
              text-sm font-mono font-semibold min-w-[3ch] text-right
              transition-colors duration-500
              ${status === "optimal" ? "text-emerald-400" : 
                status === "approaching" ? "text-amber-400" : 
                "text-zinc-500"}
            `}
          >
            {Math.round(score)}%
          </span>
        </div>
      </div>

      {/* Optimal state animation */}
      {status === "optimal" && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent animate-pulse" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent animate-pulse" />
        </div>
      )}
    </div>
  );
}
