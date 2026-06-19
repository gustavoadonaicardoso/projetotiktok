"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Video,
  Calendar,
  Settings,
  Zap,
  Cross,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analytics", label: "Métricas", icon: BarChart3 },
  { href: "/content", label: "Conteúdos", icon: Video },
  { href: "/schedule", label: "Agendamento", icon: Calendar },
  { href: "/settings", label: "Configurações", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-black/50 backdrop-blur-xl border-r border-white/10 flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <Cross className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">FéViral</p>
            <p className="text-xs text-white/40">Content Studio</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                active
                  ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/20">
          <Zap className="w-4 h-4 text-yellow-400" />
          <div>
            <p className="text-xs font-medium text-white">Infoproduto</p>
            <p className="text-xs text-white/40">Em breve</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
