"use client";

import { useState, useEffect } from "react";
import { Clock, ChevronLeft, ChevronRight, Video, Calendar } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase-browser";

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

type ScheduledPost = { id: string; title: string; platform: string; scheduled_at: string };

function getDaysInMonth(year: number, month: number) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDayOfMonth(year: number, month: number) { return new Date(year, month, 1).getDay(); }

export default function SchedulePage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [posts, setPosts] = useState<ScheduledPost[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase.from("videos").select("id,title,platform,scheduled_at").eq("status", "scheduled").then(({ data }) => {
      setPosts((data as ScheduledPost[]) ?? []);
    });
  }, []);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => { if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); } else setCurrentMonth(m => m - 1); };
  const nextMonth = () => { if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); } else setCurrentMonth(m => m + 1); };

  const getPostsForDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return posts.filter((p) => p.scheduled_at?.startsWith(dateStr));
  };

  const selectedPosts = selectedDate ? posts.filter((p) => p.scheduled_at?.startsWith(selectedDate)) : [];
  const upcomingPosts = posts.filter((p) => p.scheduled_at && new Date(p.scheduled_at) >= today).sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()).slice(0, 5);

  return (
    <div>
      <Header title="Agendamento" subtitle="Gerencie o calendário de publicações" />

      <div className="schedule-grid">
        <div>
          <Card>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>{MONTHS[currentMonth]} {currentYear}</h2>
              <div style={{ display: "flex", gap: 4 }}>
                <Button variant="ghost" size="sm" onClick={prevMonth}><ChevronLeft style={{ width: 16, height: 16 }} /></Button>
                <Button variant="ghost" size="sm" onClick={nextMonth}><ChevronRight style={{ width: 16, height: 16 }} /></Button>
              </div>
            </div>

            <div className="calendar-grid" style={{ marginBottom: 8 }}>
              {DAYS.map((d) => (
                <div key={d} style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.3)", padding: "4px 0" }}>{d}</div>
              ))}
            </div>

            <div className="calendar-grid">
              {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const dayPosts = getPostsForDay(day);
                const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                const isSelected = selectedDate === dateStr;
                return (
                  <button key={day} onClick={() => setSelectedDate(isSelected ? null : dateStr)} className={`cal-day${isSelected ? " selected" : isToday ? " today" : ""}`}>
                    <span>{day}</span>
                    {dayPosts.length > 0 && (
                      <div className="cal-dots">
                        {dayPosts.slice(0, 3).map((p, j) => (
                          <div key={j} className="cal-dot" style={{ background: p.platform === "tiktok" ? "#fe2c55" : p.platform === "instagram" ? "#a78bfa" : "#7c3aed" }} />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: 16, marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fe2c55" }} /> TikTok
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#a78bfa" }} /> Instagram
              </div>
            </div>
          </Card>

          {selectedDate && (
            <div className="card" style={{ marginTop: 16 }}>
              <p className="card-title">
                {new Date(selectedDate + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "long" })}
              </p>
              {selectedPosts.length === 0 ? (
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>Nenhuma postagem agendada neste dia</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {selectedPosts.map((p) => (
                    <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)" }}>
                      <Clock style={{ width: 14, height: 14, color: "rgba(255,255,255,0.3)" }} />
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{new Date(p.scheduled_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
                      <span style={{ fontSize: 13, color: "#fff", flex: 1 }}>{p.title}</span>
                      <Badge variant={p.platform === "tiktok" ? "error" : p.platform === "instagram" ? "info" : "success"}>
                        {p.platform === "both" ? "Ambos" : p.platform === "tiktok" ? "TikTok" : "Instagram"}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card>
            <CardTitle>Próximas Postagens</CardTitle>
            {upcomingPosts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <Calendar style={{ width: 32, height: 32, color: "rgba(255,255,255,0.12)", margin: "0 auto 10px" }} />
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>Nenhuma postagem agendada</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
                {upcomingPosts.map((p) => (
                  <div key={p.id} style={{ padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                      <Video style={{ width: 12, height: 12, color: "rgba(255,255,255,0.3)" }} />
                      <span style={{ fontSize: 12, fontWeight: 500, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                        {new Date(p.scheduled_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })} às {new Date(p.scheduled_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <Badge variant={p.platform === "tiktok" ? "error" : p.platform === "instagram" ? "info" : "success"}>
                        {p.platform === "both" ? "Ambos" : p.platform === "tiktok" ? "TT" : "IG"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card>
            <CardTitle>Melhores Horários</CardTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
              {[
                { time: "18:00 - 20:00", note: "Pós trabalho", eng: "success" as const },
                { time: "21:00 - 22:00", note: "Noite", eng: "success" as const },
                { time: "12:00 - 13:00", note: "Almoço", eng: "warning" as const },
                { time: "08:00 - 09:00", note: "Manhã", eng: "warning" as const },
              ].map((h, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)" }}>
                  <div>
                    <p style={{ fontSize: 13, color: "#fff" }}>{h.time}</p>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{h.note}</p>
                  </div>
                  <Badge variant={h.eng}>{h.eng === "success" ? "Alta" : "Média"}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
