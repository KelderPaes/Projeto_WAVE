# ConsentCare — Briefing do site (para o Claude Code)

> Coloque este arquivo na raiz da pasta do projeto com o nome `CLAUDE.md`.
> O Claude Code lê ele automaticamente em toda conversa.

## 1. O que estamos construindo

Um site institucional de **uma página (one-page)**, em português do Brasil, que apresenta o
**ConsentCare**: uma plataforma SaaS para criar, enviar, assinar, arquivar e consultar
**termos de consentimento em saúde**, integrada aos sistemas da instituição (HIS, RIS, LIS).

**Estágio real do negócio:** é uma IDEIA em validação. Ainda não existe produto pronto.
O objetivo do site é **conseguir instituições-piloto e conversas**, não vender um produto acabado.

### Regras de honestidade (obrigatórias)
- Nunca afirmar que o produto já está em operação, que temos clientes ou certificações.
- Telas do sistema são **protótipos** — rotular como "Protótipo de interface".
- Números de economia são **ilustrativos** ou vêm da calculadora do próprio visitante.
- Nada de depoimentos, logos de hospitais ou selos (LGPD, ISO, ICP-Brasil) que não temos.
- Usar verbos de intenção: "vai permitir", "estamos construindo", "previsto no MVP".

## 2. Públicos (o site precisa convencer os 4)

| Público | O que ele pergunta | O que mostrar |
|---|---|---|
| Médico / equipe assistencial | "Isso me protege juridicamente? Atrasa meu atendimento?" | Paciente chega com termo lido e assinado; evidências; recusa registrada |
| Gestor / administração | "Quanto economizo? Quanto custa? Quanto trabalho dá implantar?" | Calculadora de economia, espaço físico liberado, painel de pendências |
| TI da instituição | "É seguro? Onde ficam os dados? Integra com o que já temos?" | LGPD, hospedagem, controle de acesso, trilha de auditoria, modelo de integração |
| Desenvolvedor de integração | "Qual o contrato da API? Tem webhook? Tem sandbox?" | Fluxo técnico, exemplo de requisição/resposta, eventos, padrões (HL7/FHIR, DICOM MWL) |

## 3. Estrutura da página (ordem das seções)

1. **Topo (hero)**
   - Título: "Consentimento certo, no momento certo."
   - Subtítulo: "Termos de consentimento digitais, assinados pelo celular do paciente e
     conectados ao sistema da sua clínica. Menos papel, mais segurança, nenhum arquivo perdido."
   - Botões: "Quero ser instituição-piloto" (vai para o formulário) e "Ver como funciona".
   - Visual: mockup de celular (feito em HTML/CSS) mostrando um termo com botão "Assinar".
   - Faixa pequena: "Projeto em fase de validação com instituições parceiras."

2. **O problema** — 4 cartões com ícones:
   papel e impressão recorrentes · arquivo morto ocupando sala que poderia ser operacional ·
   tempo para localizar um termo · risco de termo ilegível, incompleto ou extraviado.
   Frase-destaque: "Arquivo digital cabe num pendrive. Arquivo morto ocupa uma sala."

3. **Como funciona** — linha do tempo em 5 passos (animar ao rolar):
   1 Solicitação (HIS/RIS/LIS identifica o exame) → 2 Regra (plataforma escolhe o termo e a versão
   vigente) → 3 Envio (link ou QR Code) → 4 Manifestação (leitura, dúvidas, assinatura ou recusa)
   → 5 Retorno (documento arquivado e status volta ao sistema).

4. **Para quem** — abas ou 4 cartões: Médicos · Gestão · TI · Desenvolvedores
   (conteúdo da tabela da seção 2, com 3–4 bullets cada).

5. **Experiência do paciente** — mockup de celular com 3 telas lado a lado:
   termo → "Li e compreendi" → assinatura → "Cópia enviada".
   Bullets: sem instalar aplicativo, lê com calma antes do exame, pode tirar dúvidas, recebe cópia.

6. **Segurança e conformidade** (para TI e jurídico)
   - Trilha de auditoria: data/hora, IP, dispositivo, versão do termo, hash do documento.
   - Assinatura eletrônica avançada por padrão; assinatura qualificada ICP-Brasil quando exigida.
   - Dados de saúde tratados como dados sensíveis (LGPD); controle de acesso por perfil.
   - Hospedagem prevista em nuvem no Brasil; criptografia em trânsito e em repouso.
   - Usar o selo "Em definição no MVP" onde algo ainda não está decidido.

7. **Integração** (para desenvolvedores)
   - Diagrama: HIS / RIS / LIS ⇄ ConsentCare ⇄ Paciente.
   - Opções: API REST + webhooks; Worklist para diagnóstico por imagem; HL7/FHIR como objetivo.
   - Bloco de código (tema escuro, com botão "copiar") com exemplo ILUSTRATIVO:
     ```http
     POST /v1/consents
     { "patient_id": "12345", "procedure_code": "TC-CONTRASTE", "channel": "whatsapp" }

     → 201 { "consent_id": "c_8f2a", "status": "sent", "link": "https://..." }

     Webhook: consent.signed | consent.refused | consent.expired
     ```
   - Legenda: "Contrato de API em desenho — queremos co-criar com o time técnico do piloto."

8. **Calculadora de economia** (interativa, a seção mais importante para o gestor)
   - Entradas: termos por mês; páginas por termo; custo por página (padrão R$ 0,25);
     minutos para arquivar/localizar cada termo (padrão 3); custo/hora da equipe (padrão R$ 30).
   - Saídas: folhas por ano, custo de impressão por ano, horas de equipe por ano,
     caixas de arquivo-morto evitadas (≈ 1.200 folhas por caixa padrão), árvores equivalentes (≈ 8.000 folhas por árvore).
   - Aviso: "Estimativa. No piloto medimos com os seus números reais."

9. **Sustentabilidade** — faixa curta e visual: folhas evitadas, espaço liberado, menos transporte de caixas.
   Tom: benefício extra, não argumento principal.

10. **Quem está por trás** — sem fotos inventadas. Texto: equipe com experiência em suporte a
    profissionais de diagnóstico por imagem e relacionamento com hospitais da região.
    (Preencher nomes/fotos reais depois.)

11. **Programa piloto** — o que a instituição ganha (condições especiais, influência no produto)
    e o que pedimos (acesso ao fluxo atual, um ponto focal, dados antes/depois).

12. **Perguntas frequentes** — sanfona (accordion):
    - Assinatura eletrônica tem validade jurídica? (citar MP 2.200-2/2001 e Lei 14.063/2020, sem prometer)
    - E se o paciente não tiver celular? (assina no tablet da recepção)
    - E se o paciente recusar? (recusa fica registrada com evidências)
    - Precisa trocar meu sistema? (não, integra ao existente)
    - Quanto custa? ("Planos em validação com as instituições-piloto.")

13. **Contato** — formulário: nome, instituição, cargo (Médico / Gestão / TI / Desenvolvimento / Outro),
    e-mail, telefone, mensagem. Envio via Formspree (gratuito). Checkbox de consentimento LGPD
    com link para a política de privacidade.

14. **Rodapé** — "ConsentCare · Projeto em validação · 2026", link para Política de Privacidade.

## 4. Identidade visual

- Cores (vindas da apresentação original):
  - Azul-marinho `#0F2D4A` (títulos)
  - Verde-água `#14A3A0` (destaques, botões)
  - Azul-claro de fundo `#EEF6F9`
  - Texto `#33475B`
- Fonte: "Inter" ou "Plus Jakarta Sans" (Google Fonts).
- Estilo: limpo, hospitalar sem ser frio, muito espaço em branco, cantos arredondados.
- Ícones: Lucide (SVG). Nada de emojis.
- Modo escuro: não é necessário na primeira versão.

## 5. Imagens

- **Não** usar as imagens da apresentação em PDF (são geradas por IA, baixa resolução,
  texto deformado).
- Mockups de tela (celular, painel) devem ser **construídos em HTML/CSS**, com dados fictícios
  e o rótulo "Protótipo".
- Fotos: apenas de bancos gratuitos com licença livre (Unsplash, Pexels). Temas: recepção de
  clínica, paciente com celular, sala de arquivo cheia de caixas, equipamento de tomografia.
  Salvar em `/assets/img/`, comprimir para WebP < 200 KB.
- Nunca mostrar dados reais de paciente.

## 6. Técnica

- HTML + CSS + JavaScript puro (sem framework), arquivos: `index.html`, `style.css`,
  `script.js`, `privacidade.html`, pasta `assets/`.
- Responsivo (celular primeiro). Testar em 375px de largura.
- Acessibilidade: contraste AA, textos alternativos, navegação por teclado.
- SEO básico: `<title>`, meta description, Open Graph (imagem de compartilhamento 1200×630).
- Sem cookies de rastreamento na primeira versão.
- Publicação: GitHub + Vercel (ou Netlify / GitHub Pages).

## 7. Como trabalhar comigo (instruções ao Claude Code)

- Explique em linguagem simples o que está fazendo — sou iniciante em VS Code.
- Construa uma seção por vez e me mostre antes de seguir.
- Antes de cada commit, me diga o que mudou.
- Se algo neste briefing parecer exagero de promessa, me avise.
