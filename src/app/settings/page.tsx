"use client";

import { useState } from "react";
import { ExternalLink, CheckCircle, AlertCircle, Key, Bell, Globe } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const [tiktokConnected, setTiktokConnected] = useState(false);
  const [igConnected, setIgConnected] = useState(false);
  const [notifications, setNotifications] = useState({
    publishSuccess: true,
    publishFail: true,
    weeklyReport: false,
    newFollowers: true,
  });

  return (
    <div>
      <Header title="Configurações" subtitle="Gerencie suas integrações e preferências" />

      <div className="max-w-2xl space-y-6">
        {/* TikTok */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#fe2c55] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">T</span>
                </div>
                <div>
                  <CardTitle>TikTok</CardTitle>
                  <p className="text-xs text-white/40">TikTok Content API v2</p>
                </div>
              </div>
              {tiktokConnected ? (
                <Badge variant="success">
                  <CheckCircle className="w-3 h-3 mr-1" />Conectado
                </Badge>
              ) : (
                <Badge variant="warning">
                  <AlertCircle className="w-3 h-3 mr-1" />Desconectado
                </Badge>
              )}
            </div>
          </CardHeader>

          {!tiktokConnected ? (
            <div className="space-y-3">
              <p className="text-sm text-white/50">
                Conecte sua conta TikTok para publicar vídeos automaticamente e acessar métricas reais.
              </p>
              <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-xs text-yellow-400">
                  Você precisará de um App Developer no TikTok. Acesse{" "}
                  <a href="https://developers.tiktok.com" target="_blank" rel="noopener" className="underline">
                    developers.tiktok.com
                  </a>{" "}
                  e crie um app com permissões de Content Posting API.
                </p>
              </div>
              <div className="space-y-2">
                <input type="text" placeholder="Client Key" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50" />
                <input type="password" placeholder="Client Secret" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50" />
              </div>
              <Button onClick={() => setTiktokConnected(true)} className="w-full">
                <ExternalLink className="w-4 h-4" />
                Conectar com TikTok
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">@seu_usuario_tiktok</p>
                <p className="text-xs text-white/40">Token expira em 60 dias</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setTiktokConnected(false)}>Desconectar</Button>
            </div>
          )}
        </Card>

        {/* Instagram */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-sm font-bold">IG</span>
                </div>
                <div>
                  <CardTitle>Instagram</CardTitle>
                  <p className="text-xs text-white/40">Meta Graph API v19.0</p>
                </div>
              </div>
              {igConnected ? (
                <Badge variant="success">
                  <CheckCircle className="w-3 h-3 mr-1" />Conectado
                </Badge>
              ) : (
                <Badge variant="warning">
                  <AlertCircle className="w-3 h-3 mr-1" />Desconectado
                </Badge>
              )}
            </div>
          </CardHeader>

          {!igConnected ? (
            <div className="space-y-3">
              <p className="text-sm text-white/50">
                Conecte via Meta for Developers para publicar Reels e acessar insights do Instagram.
              </p>
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-xs text-blue-400">
                  Necessário: Conta Business/Creator + App no{" "}
                  <a href="https://developers.facebook.com" target="_blank" rel="noopener" className="underline">
                    Meta for Developers
                  </a>
                  {" "}com permissões instagram_content_publish e instagram_manage_insights.
                </p>
              </div>
              <div className="space-y-2">
                <input type="text" placeholder="App ID (Meta)" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50" />
                <input type="password" placeholder="App Secret (Meta)" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50" />
              </div>
              <Button onClick={() => setIgConnected(true)} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90">
                <ExternalLink className="w-4 h-4" />
                Conectar com Instagram
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">@seu_usuario_instagram</p>
                <p className="text-xs text-white/40">Token de longa duração ativo</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIgConnected(false)}>Desconectar</Button>
            </div>
          )}
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-white/60" />
              </div>
              <CardTitle>Notificações</CardTitle>
            </div>
          </CardHeader>
          <div className="space-y-3">
            {[
              { key: "publishSuccess", label: "Publicação bem-sucedida", desc: "Aviso quando um vídeo for publicado" },
              { key: "publishFail", label: "Falha na publicação", desc: "Aviso quando uma publicação falhar" },
              { key: "newFollowers", label: "Novos seguidores", desc: "Resumo semanal de novos seguidores" },
              { key: "weeklyReport", label: "Relatório semanal", desc: "Resumo de métricas toda segunda-feira" },
            ].map((n) => (
              <div key={n.key} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div>
                  <p className="text-sm text-white">{n.label}</p>
                  <p className="text-xs text-white/40">{n.desc}</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, [n.key]: !prev[n.key as keyof typeof prev] }))}
                  className={`w-10 h-6 rounded-full transition-colors ${
                    notifications[n.key as keyof typeof notifications] ? "bg-purple-600" : "bg-white/10"
                  } relative`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    notifications[n.key as keyof typeof notifications] ? "translate-x-5" : "translate-x-1"
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Env vars guide */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Key className="w-5 h-5 text-white/60" />
              </div>
              <CardTitle>Variáveis de Ambiente</CardTitle>
            </div>
          </CardHeader>
          <p className="text-sm text-white/50 mb-3">
            Configure as seguintes variáveis no seu arquivo <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">.env.local</code>:
          </p>
          <div className="bg-black/50 rounded-lg p-4 font-mono text-xs space-y-1">
            {[
              "NEXT_PUBLIC_SUPABASE_URL=",
              "NEXT_PUBLIC_SUPABASE_ANON_KEY=",
              "TIKTOK_CLIENT_KEY=",
              "TIKTOK_CLIENT_SECRET=",
              "TIKTOK_REDIRECT_URI=",
              "INSTAGRAM_APP_ID=",
              "INSTAGRAM_APP_SECRET=",
              "INSTAGRAM_REDIRECT_URI=",
            ].map((v) => (
              <p key={v} className="text-green-400/70">{v}</p>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
