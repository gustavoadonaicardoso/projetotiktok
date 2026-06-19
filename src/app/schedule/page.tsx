"use client";

import { useState } from "react";
import { Calendar, Clock, ChevronLeft, ChevronRight, Video } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const scheduledPosts = [
  { date: "2024-02-01", title: "Salmos 23 - Reflexão Diária", platform: "tiktok", time: "18:00" },
  { date: "2024-02-03", title: "A Fé Move Montanhas", platform: "both", time: "12:00" },
  { date: "2024-02-07", title: "Versículo da Semana", platform: "instagram", time: "09:00" },
  { date: "2024-02-10", title: "Testemunho de Vida", platform: "both", time: "19:00" },
  { date: "2024-02-14", title: "Amor de Deus", platform: "tiktok", time: "15:00" },
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function SchedulePage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const getPostsForDate = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return scheduledPosts.filter((p) => p.date === dateStr);
  };

  const selectedPosts = selectedDate ? scheduledPosts.filter((p) => p.date === selectedDate) : [];

  const upcomingPosts = scheduledPosts
    .filter((p) => new Date(p.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div>
      <Header title="Agendamento" subtitle="Gerencie o calendário de publicações" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">
                {MONTHS[currentMonth]} {currentYear}
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={prevMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={nextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS.map((d) => (
                <div key={d} className="text-center text-xs text-white/30 py-2">{d}</div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const posts = getPostsForDate(day);
                const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                const isSelected = selectedDate === dateStr;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                    className={`relative aspect-square flex flex-col items-center justify-start pt-1.5 rounded-lg text-sm transition-colors ${
                      isSelected
                        ? "bg-purple-600 text-white"
                        : isToday
                        ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                        : "hover:bg-white/5 text-white/60"
                    }`}
                  >
                    <span>{day}</span>
                    {posts.length > 0 && (
                      <div className="flex gap-0.5 mt-0.5">
                        {posts.slice(0, 3).map((p, j) => (
                          <div
                            key={j}
                            className={`w-1.5 h-1.5 rounded-full ${
                              p.platform === "tiktok"
                                ? "bg-[#fe2c55]"
                                : p.platform === "instagram"
                                ? "bg-purple-400"
                                : "bg-gradient-to-r from-[#fe2c55] to-purple-400"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-white/40">
                <div className="w-2 h-2 rounded-full bg-[#fe2c55]" />TikTok
              </div>
              <div className="flex items-center gap-1.5 text-xs text-white/40">
                <div className="w-2 h-2 rounded-full bg-purple-400" />Instagram
              </div>
            </div>
          </Card>

          {/* Selected date posts */}
          {selectedDate && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>
                  Postagens em {new Date(selectedDate + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "long" })}
                </CardTitle>
              </CardHeader>
              {selectedPosts.length === 0 ? (
                <p className="text-white/30 text-sm">Nenhuma postagem agendada</p>
              ) : (
                <div className="space-y-2">
                  {selectedPosts.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                      <Clock className="w-4 h-4 text-white/30" />
                      <span className="text-sm text-white/60">{p.time}</span>
                      <span className="text-sm text-white flex-1">{p.title}</span>
                      <Badge variant={p.platform === "tiktok" ? "error" : p.platform === "instagram" ? "info" : "success"}>
                        {p.platform === "both" ? "Ambos" : p.platform === "tiktok" ? "TikTok" : "Instagram"}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Upcoming */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Próximas Postagens</CardTitle>
            </CardHeader>
            <div className="space-y-3">
              {upcomingPosts.map((p, i) => (
                <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Video className="w-3.5 h-3.5 text-white/30" />
                    <span className="text-xs text-white font-medium truncate">{p.title}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/30">
                      {new Date(p.date + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })} às {p.time}
                    </span>
                    <Badge variant={p.platform === "tiktok" ? "error" : p.platform === "instagram" ? "info" : "success"} className="text-xs">
                      {p.platform === "both" ? "Ambos" : p.platform === "tiktok" ? "TT" : "IG"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Melhores Horários</CardTitle>
            </CardHeader>
            <div className="space-y-2">
              {[
                { time: "18:00 - 20:00", engagement: "Alta", note: "Pós trabalho" },
                { time: "12:00 - 13:00", engagement: "Média", note: "Almoço" },
                { time: "08:00 - 09:00", engagement: "Média", note: "Manhã" },
                { time: "21:00 - 22:00", engagement: "Alta", note: "Noite" },
              ].map((h, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white/5">
                  <div>
                    <p className="text-sm text-white">{h.time}</p>
                    <p className="text-xs text-white/30">{h.note}</p>
                  </div>
                  <Badge variant={h.engagement === "Alta" ? "success" : "warning"}>{h.engagement}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
