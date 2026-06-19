"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, BarChart3, Video, Calendar, Settings, Zap, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analytics", label: "Métricas", icon: BarChart3 },
  { href: "/content", label: "Conteúdos", icon: Video },
  { href: "/schedule", label: "Agendamento", icon: Calendar },
  { href: "/settings", label: "Configurações", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="sidebar">
      <Link href="/dashboard" className="sidebar-logo">
        <div className="sidebar-logo-icon">✝</div>
        <div className="sidebar-logo-text">
          <p>FéViral</p>
          <span>Content Studio</span>
        </div>
      </Link>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={`nav-item ${active ? "active" : ""}`}>
              <Icon />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-promo">
          <Zap />
          <div className="sidebar-promo-text">
            <p>Infoproduto</p>
            <span>Em breve</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="nav-item"
          style={{ width: "100%", background: "none", border: "none", cursor: "pointer", marginTop: 4 }}
        >
          <LogOut />
          Sair
        </button>
      </div>
    </aside>
  );
}
