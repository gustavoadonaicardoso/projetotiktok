"use client";

import { useState } from "react";
import { ExternalLink, CheckCircle, AlertCircle, Key, Bell } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const [tiktokConnected, setTiktokConnected] = useState(false);
  const [igConnected, setIgConnected] = useState(false);
  const [notifications, setNotifications] = useState({ publishSuccess: true, publishFail: true, weeklyReport: false, newFollowers: true });

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button onClick={onToggle} className={`toggle ${on ? "toggle-on" : "toggle-off"}`}>
      <div className="toggle-thumb" />
    </button>
  );

  return (
    <div>
      <Header title="Configurações" subtitle="Gerencie suas integrações e preferências" />

      <div className="settings-section">
        {/* TikTok */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: tiktokConnected ? 12 : 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, background: "#fe2c55", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff" }}>T</div>
              <div>
                <CardTitle>TikTok</CardTitle>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>TikTok Content API v2</p>
              </div>
            </div>
            <Badge variant={tiktokConnected ? "success" : "warning"}>
              {tiktokConnected ? <><CheckCircle style={{ width: 11, height: 11 }} /> Conectado</> : <><AlertCircle style={{ width: 11, height: 11 }} /> Desconectado</>}
            </Badge>
          </div>

          {!tiktokConnected ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Conecte sua conta TikTok para publicar vídeos automaticamente e acessar métricas reais.</p>
              <div style={{ padding: "10px 12px", borderRadius: 8, background: "rgba(234,179,8,0.08)", border: "1px solid rgba(234,179,8,0.2)" }}>
                <p style={{ fontSize: 12, color: "#facc15" }}>Você precisará de um App Developer no TikTok com permissões de Content Posting API.</p>
              </div>
              <input type="text" placeholder="Client Key" className="input" />
              <input type="password" placeholder="Client Secret" className="input" />
              <Button onClick={() => setTiktokConnected(true)}>
                <ExternalLink style={{ width: 14, height: 14 }} /> Conectar com TikTok
              </Button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: 13, color: "#fff" }}>@seu_usuario_tiktok</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Token expira em 60 dias</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setTiktokConnected(false)}>Desconectar</Button>
            </div>
          )}
        </Card>

        {/* Instagram */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: igConnected ? 12 : 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, background: "linear-gradient(135deg,#7c3aed,#db2777)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 13 }}>IG</div>
              <div>
                <CardTitle>Instagram</CardTitle>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Meta Graph API v19.0</p>
              </div>
            </div>
            <Badge variant={igConnected ? "success" : "warning"}>
              {igConnected ? <><CheckCircle style={{ width: 11, height: 11 }} /> Conectado</> : <><AlertCircle style={{ width: 11, height: 11 }} /> Desconectado</>}
            </Badge>
          </div>

          {!igConnected ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Conecte via Meta for Developers para publicar Reels e acessar insights do Instagram.</p>
              <div style={{ padding: "10px 12px", borderRadius: 8, background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}>
                <p style={{ fontSize: 12, color: "#60a5fa" }}>Necessário: Conta Business/Creator + App no Meta for Developers com permissões instagram_content_publish.</p>
              </div>
              <input type="text" placeholder="App ID (Meta)" className="input" />
              <input type="password" placeholder="App Secret (Meta)" className="input" />
              <Button onClick={() => setIgConnected(true)} style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)" }}>
                <ExternalLink style={{ width: 14, height: 14 }} /> Conectar com Instagram
              </Button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: 13, color: "#fff" }}>@seu_usuario_instagram</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Token de longa duração ativo</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIgConnected(false)}>Desconectar</Button>
            </div>
          )}
        </Card>

        {/* Notifications */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, background: "rgba(255,255,255,0.08)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Bell style={{ width: 18, height: 18, color: "rgba(255,255,255,0.5)" }} />
            </div>
            <CardTitle>Notificações</CardTitle>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { key: "publishSuccess", label: "Publicação bem-sucedida", desc: "Aviso quando um vídeo for publicado" },
              { key: "publishFail", label: "Falha na publicação", desc: "Aviso quando uma publicação falhar" },
              { key: "newFollowers", label: "Novos seguidores", desc: "Resumo semanal de novos seguidores" },
              { key: "weeklyReport", label: "Relatório semanal", desc: "Resumo de métricas toda segunda-feira" },
            ].map((n) => (
              <div key={n.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)" }}>
                <div>
                  <p style={{ fontSize: 13, color: "#fff" }}>{n.label}</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{n.desc}</p>
                </div>
                <Toggle on={notifications[n.key as keyof typeof notifications]} onToggle={() => setNotifications(prev => ({ ...prev, [n.key]: !prev[n.key as keyof typeof prev] }))} />
              </div>
            ))}
          </div>
        </Card>

        {/* Env vars */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ width: 40, height: 40, background: "rgba(255,255,255,0.08)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Key style={{ width: 18, height: 18, color: "rgba(255,255,255,0.5)" }} />
            </div>
            <CardTitle>Variáveis de Ambiente</CardTitle>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>Configure no arquivo <code style={{ background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>.env.local</code>:</p>
          <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 8, padding: 16 }}>
            {["NEXT_PUBLIC_SUPABASE_URL=", "NEXT_PUBLIC_SUPABASE_ANON_KEY=", "TIKTOK_CLIENT_KEY=", "TIKTOK_CLIENT_SECRET=", "TIKTOK_REDIRECT_URI=", "INSTAGRAM_APP_ID=", "INSTAGRAM_APP_SECRET=", "INSTAGRAM_REDIRECT_URI="].map((v) => (
              <p key={v} style={{ fontFamily: "monospace", fontSize: 12, color: "rgba(74,222,128,0.7)", lineHeight: 1.8 }}>{v}</p>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
