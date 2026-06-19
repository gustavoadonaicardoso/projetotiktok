import { TrendingUp, TrendingDown } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number;
  growth: number;
  icon: React.ReactNode;
  color: string;
  prefix?: string;
  suffix?: string;
}

export function StatsCard({ title, value, growth, icon, prefix = "", suffix = "" }: StatsCardProps) {
  const isPositive = growth >= 0;

  return (
    <div className="card">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ padding: "8px", borderRadius: 10, background: "rgba(124,58,237,0.15)" }}>
          {icon}
        </div>
        <span className={isPositive ? "growth-chip growth-pos" : "growth-chip growth-neg"}>
          {isPositive ? <TrendingUp style={{ width: 12, height: 12 }} /> : <TrendingDown style={{ width: 12, height: 12 }} />}
          {Math.abs(growth).toFixed(1)}%
        </span>
      </div>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 4 }}>{title}</p>
      <p style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>{prefix}{formatNumber(value)}{suffix}</p>
      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>vs. mês passado</p>
    </div>
  );
}
