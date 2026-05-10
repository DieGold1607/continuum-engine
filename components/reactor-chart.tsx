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
  
  // Calculate optimization score for color gradient
  const decayFactor = Math.exp(-k * extractionTime)
  const conversion = 1 - decayFactor
  const optimalConversion = 0.92
  const distance = Math.abs(conversion - optimalConversion)
  const isOptimal = distance < 0.08
  const isApproaching = distance < 0.20

  // Dynamic colors based on optimization
  const strokeColor = isOptimal ? "#10b981" : isApproaching ? "#f59e0b" : "#6366f1"
  const fillColor = isOptimal ? "#10b981" : isApproaching ? "#f59e0b" : "#6366f1"

  return (
    <div className="h-[420px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 50 }}
        >
          <defs>
            <linearGradient id="integralGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={fillColor} stopOpacity={0.25} />
              <stop offset="100%" stopColor={fillColor} stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#27272a"
            vertical={false}
          />

          <XAxis
            dataKey="t"
            stroke="#52525b"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#3f3f46" }}
            label={{
              value: "Tiempo (min)",
              position: "insideBottom",
              offset: -35,
              fill: "#71717a",
              fontSize: 12,
            }}
          />

          <YAxis
            stroke="#52525b"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#3f3f46" }}
            label={{
              value: "Concentración (mol/L)",
              angle: -90,
              position: "insideLeft",
              fill: "#71717a",
              fontSize: 12,
              dx: 10,
            }}
            domain={[0, "auto"]}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0c0c0e",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
              fontSize: "12px",
              padding: "12px 16px",
            }}
            labelStyle={{ color: "#fafafa", fontWeight: 600, marginBottom: 8 }}
            formatter={(value: number, name: string) => {
              if (name === "concentration") return [`${value.toFixed(3)} mol/L`, "C(t)"]
              if (name === "integralArea") return [`${value.toFixed(3)} mol/L`, "Integral"]
              return [value, name]
            }}
            labelFormatter={(label) => `t = ${label} min`}
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
            stroke={strokeColor}
            strokeWidth={2.5}
            fill="none"
            dot={false}
            style={{ transition: "stroke 0.5s ease" }}
          />

          {/* Extraction time reference line */}
          <ReferenceLine
            x={extractionTime}
            stroke="#fafafa"
            strokeDasharray="6 4"
            strokeWidth={1.5}
            label={{
              value: `T = ${extractionTime} min`,
              position: "top",
              fill: "#fafafa",
              fontSize: 11,
              fontWeight: 600,
            }}
          />

          {/* Horizontal reference at C(T) */}
          <ReferenceLine
            y={concentrationAtT}
            stroke="#3b82f6"
            strokeDasharray="3 6"
            strokeOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
