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

interface AntennaChartProps {
  s0: number
  w: number
  k: number
  evaluationTime: number
}

interface ChartDataPoint {
  t: number
  signal: number
  envelope: number
  integralArea: number | null
}

export function AntennaChart({ s0, w, k, evaluationTime }: AntennaChartProps) {
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
        integralArea: t <= evaluationTime ? Number(signal.toFixed(4)) : null,
      })
    }

    return points
  }, [s0, w, k, evaluationTime])

  return (
    <div className="glass-card p-6 mb-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-medium text-foreground mb-1">
            Señal con Amortiguamiento
          </h3>
          <p className="text-xs text-muted-foreground font-mono">
            {"S(t) = S₀ · e"}
            <sup>-kt</sup>
            {" · cos(ωt)"}
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-blue-500 rounded" />
            <span className="text-muted-foreground">Señal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-indigo-400/40 rounded" />
            <span className="text-muted-foreground">Envolvente</span>
          </div>
        </div>
      </div>

      <div className="h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 40 }}
          >
            <defs>
              <linearGradient id="antennaIntegralGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.02} />
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
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: "#27272a" }}
              label={{
                value: "Tiempo (s)",
                position: "insideBottom",
                offset: -25,
                fill: "#71717a",
                fontSize: 10,
              }}
            />

            <YAxis
              stroke="#52525b"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: "#27272a" }}
              label={{
                value: "Amplitud (V)",
                angle: -90,
                position: "insideLeft",
                fill: "#71717a",
                fontSize: 10,
              }}
              domain={["auto", "auto"]}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0c0c0e",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "6px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                fontSize: "11px",
              }}
              labelStyle={{ color: "#fafafa", fontWeight: 500, marginBottom: 4 }}
              formatter={(value: number, name: string) => {
                if (name === "signal") return [`${value.toFixed(3)} V`, "S(t)"]
                if (name === "envelope") return [`${value.toFixed(3)} V`, "Envolvente"]
                if (name === "integralArea") return [`${value.toFixed(3)} V`, "Área"]
                return [value, name]
              }}
              labelFormatter={(label) => `t = ${label}s`}
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
              strokeWidth={1}
              strokeDasharray="4 4"
              strokeOpacity={0.4}
              fill="none"
              dot={false}
            />

            {/* Main signal curve */}
            <Area
              type="monotone"
              dataKey="signal"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="none"
              dot={false}
            />

            {/* Evaluation time reference line */}
            <ReferenceLine
              x={evaluationTime}
              stroke="#fafafa"
              strokeDasharray="4 4"
              strokeWidth={1}
              label={{
                value: `T = ${evaluationTime}s`,
                position: "top",
                fill: "#fafafa",
                fontSize: 10,
                fontWeight: 500,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
