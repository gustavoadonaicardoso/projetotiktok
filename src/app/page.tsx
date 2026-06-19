import Link from "next/link";
import { BarChart3, Video, Calendar, Zap, ArrowRight,  TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050507] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <nav className="flex items-center justify-between mb-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">✝</span>
            </div>
            <span className="font-bold text-white text-lg">FéViral</span>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            Acessar Studio <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>

        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-purple-300 text-sm mb-6">
            <Zap className="w-3.5 h-3.5" />
            Conteúdo cristão que viraliza
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Leve sua{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              mensagem
            </span>
            <br />
            para o mundo
          </h1>

          <p className="text-white/50 text-xl max-w-2xl mx-auto mb-10">
            Crie, agende e analise seus conteúdos cristãos no TikTok e Instagram.
            Alcance milhares de almas com conteúdo dark e impactante.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white px-8 py-4 rounded-xl text-base font-semibold transition-opacity"
            >
              Começar agora <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/analytics"
              className="flex items-center gap-2 border border-white/20 hover:bg-white/5 text-white px-8 py-4 rounded-xl text-base font-medium transition-colors"
            >
              Ver métricas
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {[
            { icon: <Video className="w-6 h-6 text-purple-400" />, title: "Gestão de Conteúdo", desc: "Organize e gerencie todos os seus vídeos em um só lugar" },
            { icon: <Calendar className="w-6 h-6 text-pink-400" />, title: "Postagem Automática", desc: "Agende publicações para TikTok e Instagram simultaneamente" },
            { icon: <BarChart3 className="w-6 h-6 text-blue-400" />, title: "Métricas Reais", desc: "Acompanhe curtidas, seguidores e engajamento em tempo real" },
            { icon: <TrendingUp className="w-6 h-6 text-green-400" />, title: "Crescimento", desc: "Estratégias e análises para crescer seu público cristão" },
          ].map((f, i) => (
            <div key={i} className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-colors">
              <div className="mb-3">{f.icon}</div>
              <h3 className="text-white font-semibold text-sm mb-1">{f.title}</h3>
              <p className="text-white/40 text-xs">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 flex-wrap">
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <div className="w-6 h-6 bg-[#fe2c55] rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">T</span>
            </div>
            TikTok API
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">IG</span>
            </div>
            Instagram Graph API
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <div className="w-6 h-6 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">S</span>
            </div>
            Supabase
          </div>
        </div>
      </div>
    </main>
  );
}
