export default function PrivacyPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#050507", color: "#fff", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#7c3aed,#db2777)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>✝</div>
            <span style={{ fontWeight: 700, fontSize: 15 }}>FéViral Content Studio</span>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Política de Privacidade</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>Última atualização: 19 de junho de 2026</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 36, fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.75)" }}>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>1. Introdução</h2>
            <p>O FéViral Content Studio ("nós", "nosso" ou "Plataforma") respeita sua privacidade e está comprometido em proteger seus dados pessoais. Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>2. Dados que Coletamos</h2>
            <p style={{ marginBottom: 12 }}><strong style={{ color: "#fff" }}>2.1 Dados de conta:</strong></p>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              <li>Endereço de e-mail (usado para autenticação);</li>
              <li>Dados de sessão e autenticação gerenciados pelo Supabase.</li>
            </ul>
            <p style={{ marginBottom: 12 }}><strong style={{ color: "#fff" }}>2.2 Dados de plataformas conectadas (TikTok / Instagram):</strong></p>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              <li>Tokens de acesso temporários fornecidos pelas plataformas (não armazenamos senhas);</li>
              <li>Dados públicos do perfil: nome de usuário, contagem de seguidores, curtidas;</li>
              <li>Métricas de desempenho dos conteúdos publicados (views, likes, comentários, compartilhamentos).</li>
            </ul>
            <p style={{ marginBottom: 12 }}><strong style={{ color: "#fff" }}>2.3 Dados de conteúdo:</strong></p>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>Títulos, descrições e metadados dos vídeos cadastrados;</li>
              <li>Agendamentos de publicação;</li>
              <li>URLs de arquivos de vídeo (armazenados no Supabase Storage).</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>3. Como Usamos seus Dados</h2>
            <p>Utilizamos seus dados exclusivamente para:</p>
            <ul style={{ paddingLeft: 20, marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>Autenticar e proteger o acesso à Plataforma;</li>
              <li>Publicar conteúdo nas plataformas autorizadas por você;</li>
              <li>Exibir métricas e análises de desempenho dos seus conteúdos;</li>
              <li>Manter o histórico de publicações e agendamentos;</li>
              <li>Melhorar o funcionamento da Plataforma.</li>
            </ul>
            <p style={{ marginTop: 12 }}>Não vendemos, alugamos nem compartilhamos seus dados com terceiros para fins comerciais.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>4. Acesso de Terceiros via API</h2>
            <p style={{ marginBottom: 12 }}><strong style={{ color: "#fff" }}>TikTok:</strong> Ao conectar sua conta TikTok, autorizamos o acesso às seguintes permissões via TikTok Content Posting API:</p>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              <li><code style={{ background: "rgba(255,255,255,0.08)", padding: "1px 6px", borderRadius: 4, fontSize: 13 }}>video.upload</code> — para publicar vídeos;</li>
              <li><code style={{ background: "rgba(255,255,255,0.08)", padding: "1px 6px", borderRadius: 4, fontSize: 13 }}>user.info.basic</code> — para obter informações básicas do perfil.</li>
            </ul>
            <p style={{ marginBottom: 12 }}><strong style={{ color: "#fff" }}>Instagram / Meta:</strong> Ao conectar sua conta Instagram, autorizamos o acesso às seguintes permissões via Meta Graph API:</p>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
              <li><code style={{ background: "rgba(255,255,255,0.08)", padding: "1px 6px", borderRadius: 4, fontSize: 13 }}>instagram_content_publish</code> — para publicar Reels;</li>
              <li><code style={{ background: "rgba(255,255,255,0.08)", padding: "1px 6px", borderRadius: 4, fontSize: 13 }}>instagram_manage_insights</code> — para acessar métricas;</li>
              <li><code style={{ background: "rgba(255,255,255,0.08)", padding: "1px 6px", borderRadius: 4, fontSize: 13 }}>pages_read_engagement</code> — para leitura de dados de engajamento.</li>
            </ul>
            <p style={{ marginTop: 12 }}>Você pode revogar o acesso a qualquer momento nas configurações de privacidade das respectivas plataformas.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>5. Armazenamento e Segurança</h2>
            <p>Seus dados são armazenados no <strong style={{ color: "#fff" }}>Supabase</strong> (infraestrutura em nuvem com criptografia em repouso e em trânsito). Utilizamos as seguintes medidas de segurança:</p>
            <ul style={{ paddingLeft: 20, marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>Autenticação segura com hashing de senhas (gerenciado pelo Supabase Auth);</li>
              <li>Comunicação via HTTPS/TLS em todas as transmissões;</li>
              <li>Tokens de acesso de plataformas armazenados de forma segura, não em texto plano;</li>
              <li>Acesso restrito por autenticação obrigatória.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>6. Retenção de Dados</h2>
            <p>Mantemos seus dados enquanto sua conta estiver ativa. Tokens de acesso de plataformas são mantidos apenas pelo período necessário para as integrações e respeitam os prazos de expiração definidos pelo TikTok e Instagram. Você pode solicitar a exclusão dos seus dados a qualquer momento.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>7. Seus Direitos (LGPD)</h2>
            <p>Nos termos da Lei Geral de Proteção de Dados, você tem direito a:</p>
            <ul style={{ paddingLeft: 20, marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              <li><strong style={{ color: "#fff" }}>Confirmação e acesso</strong> — saber quais dados temos sobre você;</li>
              <li><strong style={{ color: "#fff" }}>Correção</strong> — solicitar a correção de dados incompletos ou incorretos;</li>
              <li><strong style={{ color: "#fff" }}>Exclusão</strong> — solicitar a remoção dos seus dados pessoais;</li>
              <li><strong style={{ color: "#fff" }}>Portabilidade</strong> — receber seus dados em formato estruturado;</li>
              <li><strong style={{ color: "#fff" }}>Revogação do consentimento</strong> — revogar a qualquer momento.</li>
            </ul>
            <p style={{ marginTop: 12 }}>Para exercer seus direitos, entre em contato: <a href="mailto:rgadonai1109@gmail.com" style={{ color: "#a78bfa", textDecoration: "underline" }}>rgadonai1109@gmail.com</a></p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>8. Cookies</h2>
            <p>A Plataforma utiliza cookies de sessão estritamente necessários para manter o estado de autenticação. Não utilizamos cookies de rastreamento ou publicidade.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>9. Alterações nesta Política</h2>
            <p>Podemos atualizar esta Política periodicamente. Notificaremos sobre mudanças significativas. O uso continuado da Plataforma após as alterações representa sua aceitação da nova versão.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>10. Contato</h2>
            <p>Dúvidas, solicitações ou reclamações relacionadas à privacidade:</p>
            <p style={{ marginTop: 8 }}>
              <strong style={{ color: "#fff" }}>E-mail:</strong>{" "}
              <a href="mailto:rgadonai1109@gmail.com" style={{ color: "#a78bfa", textDecoration: "underline" }}>rgadonai1109@gmail.com</a>
            </p>
          </section>
        </div>

        <div style={{ marginTop: 56, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 24, flexWrap: "wrap" }}>
          <a href="/" style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>← Voltar ao início</a>
          <a href="/terms" style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Termos de Uso</a>
        </div>
      </div>
    </main>
  );
}
