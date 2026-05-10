"use client"

import { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  subtitle: string
  icon: LucideIcon
  formula?: string
  accentColor?: "emerald" | "cyan"
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  formula,
  accentColor = "emerald",
}: MetricCardProps) {
  const colorClasses = {
    emerald: {
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      glow: "shadow-[0_0_30px_rgba(16,185,129,0.15)]",
      valueColor: "text-emerald-400",
    },
    cyan: {
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
      glow: "shadow-[0_0_30px_rgba(6,182,212,0.15)]",
      valueColor: "text-cyan-400",
    },
  }

  const colors = colorClasses[accentColor]

  return (
    <div className={`glass-card p-6 ${colors.glow} transition-all duration-300 hover:scale-[1.02]`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-lg ${colors.iconBg}`}>
          <Icon className={`w-5 h-5 ${colors.iconColor}`} />
        </div>
        {formula && (
          <span className="text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
            {formula}
          </span>
        )}
      </div>
      
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        {title}
      </p>
      
      <p className={`text-3xl font-bold font-mono tabular-nums ${colors.valueColor} mb-2`}>
        {value}
      </p>
      
      <p className="text-xs text-muted-foreground leading-relaxed">
        {subtitle}
      </p>
    </div>
  )
}
