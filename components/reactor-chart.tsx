"use client"

import { useMemo } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

interface ReactorChartProps {
  c0: number
  k: number
  extractionTime: number
}

interface ChartDataPoint {
  t: number
  concentration: number
  integralArea: number | null
}

export function ReactorChart({ c0, k, extractionTime }: ReactorChartProps) {
  const data = useMemo(() => {
    const points: ChartDataPoint[] = []
    const maxTime = 50
    const numPoints = 200

    for (let i = 0; i <= numPoints; i++) {
      const t = (i / numPoints) * maxTime
      const concentration = c0 * Math.exp(-k * t)
      
      points.push({
        t: Number(t.toFixed(2)),
        concentration: Number(concentration.toFixed(4)),
        integralArea: t <= extractionTime ? Number(concentration.toFixed(4)) : null,
      })
    }

    return points
  }, [c0, k, extractionTime])

  const concentrationAtT = c0 * Math.exp(-k * extractionTime)

  return (
    <div className="glass-card p-6 h-[400px] lg:h-[450px]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-medium text-foreground mb-1">
            Curva de Degradación Exponencial
          </h3>
          <p className="text-xs text-muted-foreground font-mono">
            C(t) = C₀ · e<sup>-kt</sup>
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">Concentración</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500/30" />
            <span className="text-muted-foreground">Integral Definida</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
        >
          <defs>
            <linearGradient id="integralGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#27272a"
            vertical={false}
          />

          <XAxis
            dataKey="t"
            stroke="#71717a"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#27272a" }}
            label={{
              value: "Tiempo (s)",
              position: "insideBottom",
              offset: -20,
              fill: "#71717a",
              fontSize: 11,
            }}
          />

          <YAxis
            stroke="#71717a"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#27272a" }}
            label={{
              value: "Concentración",
              angle: -90,
              position: "insideLeft",
              fill: "#71717a",
              fontSize: 11,
            }}
            domain={[0, "auto"]}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0a0a0c",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
            }}
            labelStyle={{ color: "#fafafa", fontWeight: 600, marginBottom: 4 }}
            itemStyle={{ color: "#10b981" }}
            formatter={(value: number, name: string) => {
              if (name === "concentration") return [`${value.toFixed(2)} u`, "C(t)"]
              if (name === "integralArea") return [`${value.toFixed(2)} u`, "Área"]
              return [value, name]
            }}
            labelFormatter={(label) => `t = ${label}s`}
          />

          {/* Integral area (filled) */}
          <Area
            type="monotone"
            dataKey="integralArea"
            stroke="none"
            fill="url(#integralGradient)"
            connectNulls={false}
          />

          {/* Main concentration curve */}
          <Area
            type="monotone"
            dataKey="concentration"
            stroke="url(#lineGradient)"
            strokeWidth={2.5}
            fill="none"
            dot={false}
          />

          {/* Extraction time reference line */}
          <ReferenceLine
            x={extractionTime}
            stroke="#fafafa"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={{
              value: `T = ${extractionTime}s`,
              position: "top",
              fill: "#fafafa",
              fontSize: 11,
              fontWeight: 500,
            }}
          />

          {/* Horizontal reference at C(T) */}
          <ReferenceLine
            y={concentrationAtT}
            stroke="#06b6d4"
            strokeDasharray="2 4"
            strokeOpacity={0.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
