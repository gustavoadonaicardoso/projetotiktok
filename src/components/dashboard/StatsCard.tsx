import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn, formatNumber } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number;
  growth: number;
  icon: React.ReactNode;
  color: string;
  prefix?: string;
  suffix?: string;
}

export function StatsCard({ title, value, growth, icon, color, prefix = "", suffix = "" }: StatsCardProps) {
  const isPositive = growth >= 0;

  return (
    <Card className="relative overflow-hidden">
      <div className={cn("absolute inset-0 opacity-5", color)} />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={cn("p-2.5 rounded-xl", color.replace("bg-", "bg-") + "/20")}>
            {icon}
          </div>
          <span
            className={cn(
              "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
              isPositive
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            )}
          >
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(growth).toFixed(1)}%
          </span>
        </div>
        <p className="text-white/50 text-sm mb-1">{title}</p>
        <p className="text-2xl font-bold text-white">
          {prefix}{formatNumber(value)}{suffix}
        </p>
        <p className="text-xs text-white/30 mt-1">vs. mês passado</p>
      </div>
    </Card>
  );
}
