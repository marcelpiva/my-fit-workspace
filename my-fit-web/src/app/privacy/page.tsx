'use client';

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>
        <p className="text-muted-foreground mb-8">
          Última atualização: Janeiro de 2025
        </p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introdução</h2>
            <p className="text-muted-foreground leading-relaxed">
              A myfitplatform (&quot;myfitplatform&quot;, &quot;nós&quot;, &quot;nosso&quot;) opera a plataforma myfitplatform.com
              e o aplicativo móvel myfitplatform. Esta página informa sobre nossas políticas relativas à
              coleta, uso e divulgação de dados pessoais quando você usa nosso Serviço.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Dados Coletados</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Coletamos vários tipos de informações para fornecer e melhorar nosso Serviço:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Dados Pessoais:</strong> Nome, email, telefone, data de nascimento</li>
              <li><strong>Dados de Saúde:</strong> Peso, altura, medidas corporais, fotos de progresso</li>
              <li><strong>Dados de Uso:</strong> Treinos realizados, dietas seguidas, progresso</li>
              <li><strong>Dados de Dispositivo:</strong> Tipo de dispositivo, sistema operacional, identificadores únicos</li>
              <li><strong>Dados de Pagamento:</strong> Informações de cobrança (processadas por terceiros seguros)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Uso dos Dados</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Usamos os dados coletados para:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Fornecer e manter nosso Serviço</li>
              <li>Notificar sobre mudanças em nosso Serviço</li>
              <li>Permitir participação em recursos interativos</li>
              <li>Fornecer suporte ao cliente</li>
              <li>Coletar análises para melhorar o Serviço</li>
              <li>Monitorar o uso do Serviço</li>
              <li>Detectar, prevenir e resolver problemas técnicos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Compartilhamento de Dados</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Podemos compartilhar suas informações pessoais nas seguintes situações:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Com Profissionais:</strong> Seus dados de treino são compartilhados com seu personal trainer ou coach</li>
              <li><strong>Provedores de Serviços:</strong> Usamos terceiros para processar pagamentos e hospedar dados</li>
              <li><strong>Requisitos Legais:</strong> Quando exigido por lei ou ordem judicial</li>
              <li><strong>Proteção de Direitos:</strong> Para proteger os direitos da myfitplatform ou segurança dos usuários</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Segurança dos Dados</h2>
            <p className="text-muted-foreground leading-relaxed">
              A segurança de seus dados é importante para nós. Usamos meios comercialmente aceitáveis
              para proteger seus dados pessoais, incluindo criptografia SSL/TLS, armazenamento seguro
              em nuvem e controles de acesso rigorosos. No entanto, nenhum método de transmissão pela
              Internet ou armazenamento eletrônico é 100% seguro.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Seus Direitos (LGPD)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Confirmar a existência de tratamento de dados</li>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar anonimização, bloqueio ou eliminação de dados</li>
              <li>Solicitar portabilidade dos dados</li>
              <li>Revogar consentimento a qualquer momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Retenção de Dados</h2>
            <p className="text-muted-foreground leading-relaxed">
              Manteremos seus dados pessoais apenas pelo tempo necessário para os fins estabelecidos
              nesta Política de Privacidade. Dados de conta são mantidos enquanto sua conta estiver ativa.
              Após exclusão da conta, dados são removidos em até 90 dias, exceto quando necessário para
              cumprir obrigações legais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Cookies e Rastreamento</h2>
            <p className="text-muted-foreground leading-relaxed">
              Usamos cookies e tecnologias de rastreamento similares para rastrear a atividade em
              nosso Serviço e manter certas informações. Você pode instruir seu navegador a recusar
              todos os cookies ou indicar quando um cookie está sendo enviado.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Integração com Wearables</h2>
            <p className="text-muted-foreground leading-relaxed">
              Se você conectar dispositivos wearables (Apple Health, Google Fit, Garmin, etc.),
              coletaremos dados de saúde como passos, frequência cardíaca e atividades. Esses dados
              são usados exclusivamente para melhorar sua experiência de fitness e compartilhados
              apenas com seu profissional de saúde na plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Alterações nesta Política</h2>
            <p className="text-muted-foreground leading-relaxed">
              Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos sobre
              quaisquer alterações publicando a nova Política nesta página e atualizando a data de
              &quot;última atualização&quot;.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Contato</h2>
            <p className="text-muted-foreground leading-relaxed">
              Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
              <li>Email: privacy@myfitplatform.com</li>
              <li>Website: myfitplatform.com/contact</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/" className="text-primary hover:underline">
            ← Voltar para a página inicial
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
