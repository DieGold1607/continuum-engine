"use client"

import { LucideIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface MetricCardProps {
  title: string
  value: string
  subtitle: string
  icon: LucideIcon
  formula?: string
  accentColor?: "indigo" | "blue"
  tooltipInfo?: string
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  formula,
  accentColor = "indigo",
  tooltipInfo,
}: MetricCardProps) {
  const colorClasses = {
    indigo: {
      iconBg: "bg-indigo-500/10",
      iconColor: "text-indigo-400",
      glow: "shadow-[0_0_20px_rgba(99,102,241,0.08)]",
      valueColor: "text-indigo-400",
    },
    blue: {
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      glow: "shadow-[0_0_20px_rgba(59,130,246,0.08)]",
      valueColor: "text-blue-400",
    },
  }

  const colors = colorClasses[accentColor]

  const cardContent = (
    <div className={`glass-card p-4 sm:p-5 ${colors.glow} transition-all duration-300 hover:border-white/10 hover-lift h-full`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${colors.iconBg}`}>
          <Icon className={`w-4 h-4 ${colors.iconColor}`} />
        </div>
        {formula && (
          <span className="text-xs font-mono text-muted-foreground bg-secondary/80 px-2 py-0.5 rounded">
            {formula}
          </span>
        )}
      </div>
      
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">
        {title}
      </p>
      
      <p className={`text-xl sm:text-2xl font-semibold font-mono tabular-nums ${colors.valueColor} mb-1.5 break-all`}>
        {value}
      </p>
      
      <p className="text-xs text-muted-foreground/80 leading-relaxed">
        {subtitle}
      </p>
    </div>
  )

  if (tooltipInfo) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-help">{cardContent}</div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[280px] bg-zinc-800 text-zinc-100 border-zinc-700">
          <p>{tooltipInfo}</p>
        </TooltipContent>
      </Tooltip>
    )
  }

  return cardContent
}
