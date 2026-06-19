"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";

interface ChartData {
  date: string;
  tiktok: number;
  instagram: number;
}

interface EngagementChartProps {
  data: ChartData[];
  metric: string;
  title: string;
}

export function EngagementChart({ data, metric, title }: EngagementChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="date"
            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => formatNumber(v)}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(0,0,0,0.8)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              color: "white",
            }}
            formatter={(value) => [formatNumber(Number(value)), ""]}
          />
          <Legend
            wrapperStyle={{ paddingTop: "16px", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}
          />
          <Line
            type="monotone"
            dataKey="tiktok"
            name="TikTok"
            stroke="#fe2c55"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="instagram"
            name="Instagram"
            stroke="#a855f7"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
