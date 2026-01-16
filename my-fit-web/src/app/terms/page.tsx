'use client';

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        <h1 className="text-4xl font-bold mb-8">Termos de Uso</h1>
        <p className="text-muted-foreground mb-8">
          Última atualização: Janeiro de 2025
        </p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ao acessar ou usar a plataforma myfitplatform (&quot;Serviço&quot;), você concorda em ficar vinculado
              a estes Termos de Uso. Se você não concordar com qualquer parte dos termos, não poderá
              acessar o Serviço.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Descrição do Serviço</h2>
            <p className="text-muted-foreground leading-relaxed">
              myfitplatform é uma plataforma white-label que permite a profissionais de fitness
              (personal trainers, coaches, academias) criar e gerenciar suas próprias plataformas
              de treinamento, incluindo criação de treinos, planos alimentares, acompanhamento de
              progresso, comunicação com clientes e processamento de pagamentos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Cadastro e Conta</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Para usar o Serviço, você deve:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Ter pelo menos 18 anos de idade</li>
              <li>Fornecer informações precisas e completas</li>
              <li>Manter a segurança de sua senha</li>
              <li>Notificar imediatamente sobre uso não autorizado</li>
              <li>Ser responsável por todas as atividades em sua conta</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Tipos de Usuários</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              O Serviço distingue entre dois tipos principais de usuários:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Profissionais:</strong> Personal trainers, coaches, nutricionistas e academias que criam e gerenciam conteúdo</li>
              <li><strong>Clientes:</strong> Usuários finais que recebem treinos, dietas e acompanhamento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Responsabilidades dos Profissionais</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Profissionais que usam a plataforma concordam em:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Possuir qualificações adequadas para prestar serviços de fitness</li>
              <li>Criar conteúdo seguro e apropriado para seus clientes</li>
              <li>Não fornecer aconselhamento médico sem qualificação</li>
              <li>Manter confidencialidade dos dados dos clientes</li>
              <li>Cumprir todas as leis aplicáveis à sua atividade</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Planos e Pagamentos</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Oferecemos os seguintes planos:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Gratuito:</strong> Funcionalidades limitadas, até 5 clientes</li>
              <li><strong>Pro:</strong> Assinatura mensal com funcionalidades completas</li>
              <li><strong>Enterprise:</strong> Soluções customizadas para grandes operações</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Pagamentos são processados através de provedores terceiros seguros (Stripe, PagSeguro, Asaas).
              Ao fornecer informações de pagamento, você autoriza cobranças recorrentes conforme seu plano.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Cancelamento e Reembolso</h2>
            <p className="text-muted-foreground leading-relaxed">
              Você pode cancelar sua assinatura a qualquer momento. O cancelamento será efetivo ao
              final do período de cobrança atual. Não oferecemos reembolsos proporcionais, exceto
              quando exigido por lei. Após o cancelamento, você terá acesso limitado para exportar
              seus dados por 30 dias.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Propriedade Intelectual</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong>Conteúdo da myfitplatform:</strong> A plataforma, marca, logo e software são propriedade
              da myfitplatform e estão protegidos por leis de propriedade intelectual.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Seu Conteúdo:</strong> Você mantém a propriedade do conteúdo que cria
              (treinos, dietas, etc.). Ao publicar na plataforma, você nos concede uma licença
              limitada para exibir e distribuir esse conteúdo conforme necessário para operar o Serviço.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Uso Aceitável</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Você concorda em NÃO:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Usar o Serviço para fins ilegais</li>
              <li>Publicar conteúdo ofensivo, difamatório ou prejudicial</li>
              <li>Tentar acessar contas de outros usuários</li>
              <li>Interferir na operação do Serviço</li>
              <li>Coletar dados de outros usuários sem consentimento</li>
              <li>Revender ou redistribuir o Serviço sem autorização</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Isenção de Garantias</h2>
            <p className="text-muted-foreground leading-relaxed">
              O Serviço é fornecido &quot;como está&quot; e &quot;conforme disponível&quot;. Não garantimos que o
              Serviço será ininterrupto, seguro ou livre de erros. Não somos responsáveis por
              resultados de saúde ou fitness obtidos através do uso da plataforma. Sempre consulte
              um profissional de saúde qualificado antes de iniciar qualquer programa de exercícios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Limitação de Responsabilidade</h2>
            <p className="text-muted-foreground leading-relaxed">
              Em nenhuma circunstância a myfitplatform, seus diretores, funcionários ou afiliados serão
              responsáveis por danos indiretos, incidentais, especiais ou consequentes decorrentes
              do uso ou incapacidade de usar o Serviço.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Encerramento</h2>
            <p className="text-muted-foreground leading-relaxed">
              Podemos suspender ou encerrar sua conta imediatamente, sem aviso prévio, por qualquer
              motivo, incluindo violação destes Termos. Após o encerramento, seu direito de usar o
              Serviço cessará imediatamente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Alterações nos Termos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Reservamo-nos o direito de modificar ou substituir estes Termos a qualquer momento.
              Mudanças materiais serão notificadas com pelo menos 30 dias de antecedência. O uso
              continuado do Serviço após alterações constitui aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">14. Lei Aplicável</h2>
            <p className="text-muted-foreground leading-relaxed">
              Estes Termos serão regidos e interpretados de acordo com as leis do Brasil,
              independentemente de conflitos de disposições legais. Qualquer disputa será
              resolvida nos tribunais competentes de São Paulo, SP.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">15. Contato</h2>
            <p className="text-muted-foreground leading-relaxed">
              Para questões sobre estes Termos de Uso, entre em contato:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
              <li>Email: legal@myfitplatform.com</li>
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
