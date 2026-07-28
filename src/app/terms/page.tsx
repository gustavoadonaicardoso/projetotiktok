export default function TermsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#050507", color: "#fff", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#7c3aed,#db2777)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>✝</div>
            <span style={{ fontWeight: 700, fontSize: 15 }}>FéViral Content Studio</span>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Termos de Uso</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>Última atualização: 19 de junho de 2026</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 36, fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.75)" }}>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>1. Aceitação dos Termos</h2>
            <p>Ao acessar e utilizar o FéViral Content Studio ("Plataforma"), você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar a Plataforma.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>2. Descrição do Serviço</h2>
            <p>O FéViral Content Studio é uma ferramenta de gerenciamento de conteúdo para criadores cristãos, permitindo:</p>
            <ul style={{ paddingLeft: 20, marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>Gerenciar e organizar vídeos e conteúdos digitais;</li>
              <li>Agendar e publicar conteúdo no TikTok e Instagram via APIs oficiais;</li>
              <li>Visualizar métricas de desempenho e engajamento;</li>
              <li>Gerenciar conexões com plataformas de mídia social.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>3. Conta e Acesso</h2>
            <p>O acesso à Plataforma é restrito e requer autenticação. Você é responsável por manter a confidencialidade das suas credenciais de acesso e por todas as atividades que ocorram sob sua conta. Notifique-nos imediatamente sobre qualquer uso não autorizado.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>4. Integração com Plataformas de Terceiros</h2>
            <p>A Plataforma integra-se com TikTok e Instagram através de suas APIs oficiais. Ao conectar suas contas:</p>
            <ul style={{ paddingLeft: 20, marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>Você autoriza a Plataforma a publicar conteúdo em seu nome;</li>
              <li>Você concorda com os Termos de Serviço do TikTok e do Instagram/Meta;</li>
              <li>Você é responsável por todo o conteúdo publicado através da Plataforma;</li>
              <li>A Plataforma não armazena suas senhas das redes sociais — apenas tokens de acesso temporários fornecidos pelas próprias plataformas.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>5. Conteúdo do Usuário</h2>
            <p>Você mantém todos os direitos sobre o conteúdo que publica através da Plataforma. Você declara e garante que:</p>
            <ul style={{ paddingLeft: 20, marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>Possui todos os direitos necessários para publicar o conteúdo;</li>
              <li>O conteúdo não viola direitos autorais, marcas registradas ou outros direitos de terceiros;</li>
              <li>O conteúdo não viola leis aplicáveis ou as políticas das plataformas de destino.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>6. Uso Aceitável</h2>
            <p>Você concorda em não utilizar a Plataforma para:</p>
            <ul style={{ paddingLeft: 20, marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>Publicar conteúdo ilegal, difamatório, discriminatório ou que incite violência;</li>
              <li>Violar direitos de privacidade de terceiros;</li>
              <li>Realizar engenharia reversa ou tentativas de acesso não autorizado;</li>
              <li>Usar a Plataforma de forma que viole as políticas das APIs do TikTok ou Instagram.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>7. Privacidade</h2>
            <p>O tratamento dos seus dados pessoais é regido pela nossa <a href="/privacy" style={{ color: "#a78bfa", textDecoration: "underline" }}>Política de Privacidade</a>, que é parte integrante destes Termos de Uso.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>8. Limitação de Responsabilidade</h2>
            <p>A Plataforma é fornecida "como está". Não nos responsabilizamos por interrupções nas APIs de terceiros (TikTok, Instagram), perda de dados decorrente de falhas de rede, ou por conteúdo publicado pelo usuário que viole políticas das plataformas.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>9. Modificações</h2>
            <p>Reservamo-nos o direito de modificar estes Termos a qualquer momento. Alterações significativas serão comunicadas. O uso continuado da Plataforma após as alterações constitui aceitação dos novos termos.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>10. Lei Aplicável</h2>
            <p>Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de domicílio do usuário para dirimir quaisquer controvérsias.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>11. Contato</h2>
            <p>Para dúvidas sobre estes Termos, entre em contato pelo e-mail: <a href="mailto:rgadonai1109@gmail.com" style={{ color: "#a78bfa", textDecoration: "underline" }}>rgadonai1109@gmail.com</a></p>
          </section>
        </div>

        <div style={{ marginTop: 56, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 24, flexWrap: "wrap" }}>
          <a href="/" style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>← Voltar ao início</a>
          <a href="/privacy" style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Política de Privacidade</a>
        </div>
      </div>
    </main>
  );
}
