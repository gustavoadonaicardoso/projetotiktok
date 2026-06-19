"use client";

import { Bell, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function Header({ title, subtitle, action }: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-white/50 text-sm mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {action}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}
