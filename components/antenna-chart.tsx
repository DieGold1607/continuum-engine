"use client"

import { useMemo, useState, useEffect } from "react"
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

interface AntennaChartProps {
  s0: number
  w: number
  k: number
  evaluationTime: number
  animateIntegral?: boolean
}

interface ChartDataPoint {
  t: number
  signal: number
  envelope: number
  negEnvelope: number
  integralArea: number | null
}

export function AntennaChart({ s0, w, k, evaluationTime, animateIntegral = true }: AntennaChartProps) {
  const [animatedTime, setAnimatedTime] = useState(0)
  
  // Animate the integral filling
  useEffect(() => {
    if (!animateIntegral) {
      setAnimatedTime(evaluationTime)
      return
    }
    
    setAnimatedTime(0)
    const duration = 1500 // 1.5 seconds animation
    const steps = 60
    const increment = evaluationTime / steps
    const intervalTime = duration / steps
    
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= evaluationTime) {
        setAnimatedTime(evaluationTime)
        clearInterval(timer)
      } else {
        setAnimatedTime(current)
      }
    }, intervalTime)
    
    return () => clearInterval(timer)
  }, [evaluationTime, animateIntegral])

  const data = useMemo(() => {
    const points: ChartDataPoint[] = []
    const maxTime = 20
    const numPoints = 400

    for (let i = 0; i <= numPoints; i++) {
      const t = (i / numPoints) * maxTime
      const signal = s0 * Math.exp(-k * t) * Math.cos(w * t)
      const envelope = s0 * Math.exp(-k * t)
      
      points.push({
        t: Number(t.toFixed(3)),
        signal: Number(signal.toFixed(4)),
        envelope: Number(envelope.toFixed(4)),
        negEnvelope: Number((-envelope).toFixed(4)),
        integralArea: t <= animatedTime ? Number(signal.toFixed(4)) : null,
      })
    }

    return points
  }, [s0, w, k, evaluationTime, animatedTime])

  // Calculate optimization score for color gradient
  const envelope = Math.exp(-k * evaluationTime)
  const optimalEnvelope = 0.08
  const distance = Math.abs(envelope - optimalEnvelope)
  const periods = (w * evaluationTime) / (2 * Math.PI)
  const isStable = periods >= 3 && periods <= 10
  const score = isStable ? Math.max(0, 100 - (distance * 300)) : Math.max(0, 100 - (distance * 300)) * 0.7
  
  const isOptimal = score >= 85
  const isApproaching = score >= 60

  // Dynamic colors based on optimization
  const strokeColor = isOptimal ? "#10b981" : isApproaching ? "#f59e0b" : "#3b82f6"
  const fillColor = isOptimal ? "#10b981" : isApproaching ? "#f59e0b" : "#3b82f6"

  return (
    <div className="h-[420px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 50 }}
        >
          <defs>
            <linearGradient id="antennaIntegralGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={fillColor} stopOpacity={0.2} />
              <stop offset="50%" stopColor={fillColor} stopOpacity={0.05} />
              <stop offset="100%" stopColor={fillColor} stopOpacity={0.2} />
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
              value: "Tiempo (s)",
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
              value: "Amplitud (V)",
              angle: -90,
              position: "insideLeft",
              fill: "#71717a",
              fontSize: 12,
              dx: 10,
            }}
            domain={["auto", "auto"]}
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
              if (name === "signal") return [`${value.toFixed(4)} V`, "S(t)"]
              if (name === "envelope") return [`${value.toFixed(4)} V`, "Envolvente +"]
              if (name === "negEnvelope") return [`${Math.abs(value).toFixed(4)} V`, "Envolvente -"]
              if (name === "integralArea") return [`${value.toFixed(4)} V`, "Integral"]
              return [value, name]
            }}
            labelFormatter={(label) => `t = ${label} s`}
          />

          {/* Integral area (filled) */}
          <Area
            type="monotone"
            dataKey="integralArea"
            stroke="none"
            fill="url(#antennaIntegralGradient)"
            connectNulls={false}
          />

          {/* Envelope curve (upper bound) */}
          <Area
            type="monotone"
            dataKey="envelope"
            stroke="#6366f1"
            strokeWidth={1.5}
            strokeDasharray="6 4"
            strokeOpacity={0.5}
            fill="none"
            dot={false}
          />

          {/* Negative envelope curve (lower bound) */}
          <Area
            type="monotone"
            dataKey="negEnvelope"
            stroke="#6366f1"
            strokeWidth={1.5}
            strokeDasharray="6 4"
            strokeOpacity={0.5}
            fill="none"
            dot={false}
          />

          {/* Main signal curve */}
          <Area
            type="monotone"
            dataKey="signal"
            stroke={strokeColor}
            strokeWidth={2.5}
            fill="none"
            dot={false}
            style={{ transition: "stroke 0.5s ease" }}
          />

          {/* Zero reference line */}
          <ReferenceLine
            y={0}
            stroke="#3f3f46"
            strokeWidth={1}
          />

          {/* Evaluation time reference line */}
          <ReferenceLine
            x={evaluationTime}
            stroke="#fafafa"
            strokeDasharray="6 4"
            strokeWidth={1.5}
            label={{
              value: `T = ${evaluationTime} s`,
              position: "top",
              fill: "#fafafa",
              fontSize: 11,
              fontWeight: 600,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
