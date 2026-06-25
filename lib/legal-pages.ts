// lib/legal-pages.ts
//
// Conteúdo EDITÁVEL das páginas legais (Política de Privacidade e Termos).
// Pode ser alterado livremente sem mexer no layout — a apresentação é tratada
// por <LegalPage />. Os dados da empresa vêm de lib/legal.ts (fonte única).
//
// O texto é simples: cada secção tem `paragraphs` (parágrafos) e/ou `bullets`
// (lista). Emails e URLs no texto são automaticamente convertidos em links.

import type { Lang } from './i18n'
import { legal } from './legal'

export interface LegalSection {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export interface LegalDoc {
  title: string
  updatedLabel: string
  intro?: string
  sections: LegalSection[]
}

const UPDATED = { pt: 'Junho de 2026', en: 'June 2026' }
const CONTACT_EMAIL = 'info@casadenabais.pt'
const { denominacao, morada, nif } = legal.empresa
const { rnal } = legal.alojamento

/* ────────────────────────────  PRIVACIDADE  ──────────────────────────── */

export function getPrivacyDoc(lang: Lang, gaEnabled: boolean): LegalDoc {
  if (lang === 'en') {
    const transfers: LegalSection[] = gaEnabled
      ? [
          {
            heading: 'International data transfers',
            paragraphs: [
              'If you accept analytics cookies, Google Analytics may process data (such as your IP address, which is anonymised) on Google LLC servers located outside the European Economic Area, namely in the United States. These transfers are covered by the European Commission’s Standard Contractual Clauses and by the EU-U.S. Data Privacy Framework.',
              'You can withdraw your consent at any time through the “Cookie settings” link in the footer.',
            ],
          },
        ]
      : []

    return {
      title: 'Privacy Policy',
      updatedLabel: `Last updated: ${UPDATED.en}`,
      intro: `This Privacy Policy explains how ${denominacao} processes the personal data collected through this website, in accordance with the General Data Protection Regulation (GDPR).`,
      sections: [
        {
          heading: 'Data controller',
          paragraphs: [
            `${denominacao}, registered office at ${morada}, tax number ${nif}.`,
            `For any question regarding your personal data, you may contact us at ${CONTACT_EMAIL}.`,
          ],
        },
        {
          heading: 'What data we collect',
          paragraphs: ['We only collect the data you voluntarily provide through the website forms:'],
          bullets: [
            '“Stay at the House” form: name, email, phone (optional), check-in and check-out dates, number of guests and message.',
            '“Buy Wine” form: name, email, requested wine, quantity and delivery address.',
          ],
        },
        {
          heading: 'Purpose and legal basis',
          bullets: [
            'To respond to stay/booking requests and manage the commercial contact — legal basis: pre-contractual steps taken at the data subject’s request (Art. 6(1)(b) GDPR).',
            'To process wine purchase requests — legal basis: performance of a contract / pre-contractual steps (Art. 6(1)(b) GDPR).',
            'Analytics cookies (Google Analytics), only with your consent — legal basis: consent (Art. 6(1)(a) GDPR).',
          ],
        },
        {
          heading: 'How the data is processed',
          paragraphs: [
            'Form data is transmitted and stored through Google Apps Script / Google Sheets (Google), acting as a processor. We do not sell or share your data with third parties for marketing purposes.',
          ],
        },
        {
          heading: 'Retention period',
          paragraphs: [
            'We keep form data only for as long as necessary to respond to your request and to comply with applicable legal obligations. Booking/contact requests are kept for up to 24 months after the last contact; data related to purchases is kept for the applicable legal and tax periods (up to 10 years). After these periods, the data is deleted.',
          ],
        },
        ...transfers,
        {
          heading: 'Your rights',
          paragraphs: ['As a data subject, you have the right to:'],
          bullets: [
            'Access your personal data;',
            'Request rectification of inaccurate data;',
            'Request erasure (“right to be forgotten”);',
            'Request restriction of or object to processing;',
            'Request data portability;',
            'Withdraw consent at any time, without affecting the lawfulness of prior processing.',
          ],
        },
        {
          heading: 'How to exercise your rights',
          paragraphs: [
            `To exercise these rights, contact ${CONTACT_EMAIL}. You also have the right to lodge a complaint with the supervisory authority — the Portuguese Data Protection Authority (CNPD), https://www.cnpd.pt.`,
          ],
        },
        {
          heading: 'Cookies',
          paragraphs: [
            'This website uses analytics cookies only with consent. You can manage or revoke your choice at any time through the “Cookie settings” link in the footer.',
          ],
        },
        {
          heading: 'Changes to this policy',
          paragraphs: [
            'We may update this Privacy Policy. The date of the last update is shown at the top of this page.',
          ],
        },
      ],
    }
  }

  // PT (por defeito)
  const transfers: LegalSection[] = gaEnabled
    ? [
        {
          heading: 'Transferências para fora da UE',
          paragraphs: [
            'Se aceitar os cookies de análise, o Google Analytics pode tratar dados (como o endereço IP, que é anonimizado) em servidores da Google LLC localizados fora do Espaço Económico Europeu, nomeadamente nos Estados Unidos. Estas transferências estão cobertas pelas Cláusulas Contratuais-Tipo da Comissão Europeia e pelo EU-U.S. Data Privacy Framework.',
            'Pode retirar o consentimento a qualquer momento através do link “Definições de cookies”, no rodapé.',
          ],
        },
      ]
    : []

  return {
    title: 'Política de Privacidade',
    updatedLabel: `Última atualização: ${UPDATED.pt}`,
    intro: `Esta Política de Privacidade explica como a ${denominacao} trata os dados pessoais recolhidos através deste website, em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD).`,
    sections: [
      {
        heading: 'Responsável pelo tratamento',
        paragraphs: [
          `${denominacao}, com sede em ${morada}, NIF ${nif}.`,
          `Para qualquer questão relativa aos seus dados pessoais, pode contactar-nos através de ${CONTACT_EMAIL}.`,
        ],
      },
      {
        heading: 'Que dados recolhemos',
        paragraphs: ['Recolhemos apenas os dados que nos fornece voluntariamente através dos formulários do site:'],
        bullets: [
          'Formulário “Ficar na Casa”: nome, email, telefone (opcional), datas de entrada e saída, número de pessoas e mensagem.',
          'Formulário “Comprar Vinho”: nome, email, vinho pretendido, quantidade e morada de entrega.',
        ],
      },
      {
        heading: 'Finalidade e base legal',
        bullets: [
          'Responder a pedidos de estadia/reserva e gerir o contacto comercial — base legal: diligências pré-contratuais a pedido do titular (art. 6.º, n.º 1, al. b) do RGPD).',
          'Processar pedidos de compra de vinho — base legal: execução de contrato / diligências pré-contratuais (art. 6.º, n.º 1, al. b) do RGPD).',
          'Cookies de análise (Google Analytics), apenas com o seu consentimento — base legal: consentimento (art. 6.º, n.º 1, al. a) do RGPD).',
        ],
      },
      {
        heading: 'Como tratamos os dados',
        paragraphs: [
          'Os dados dos formulários são transmitidos e armazenados através do Google Apps Script / Google Sheets (Google), que atua como subcontratante. Não vendemos nem partilhamos os seus dados com terceiros para fins de marketing.',
        ],
      },
      {
        heading: 'Prazo de conservação',
        paragraphs: [
          'Conservamos os dados dos formulários apenas durante o tempo necessário para responder ao seu pedido e cumprir as obrigações legais aplicáveis. Os pedidos de reserva/contacto são conservados até 24 meses após o último contacto; os dados associados a compras são conservados pelos prazos legais e fiscais aplicáveis (até 10 anos). Findos estes prazos, os dados são eliminados.',
        ],
      },
      ...transfers,
      {
        heading: 'Os seus direitos',
        paragraphs: ['Enquanto titular dos dados, tem o direito de:'],
        bullets: [
          'Aceder aos seus dados pessoais;',
          'Solicitar a retificação de dados incorretos;',
          'Solicitar o apagamento (“direito a ser esquecido”);',
          'Solicitar a limitação ou opor-se ao tratamento;',
          'Solicitar a portabilidade dos dados;',
          'Retirar o consentimento a qualquer momento, sem afetar a licitude do tratamento anterior.',
        ],
      },
      {
        heading: 'Como exercer os seus direitos',
        paragraphs: [
          `Para exercer estes direitos, contacte ${CONTACT_EMAIL}. Tem ainda o direito de apresentar reclamação à autoridade de controlo — a Comissão Nacional de Proteção de Dados (CNPD), https://www.cnpd.pt.`,
        ],
      },
      {
        heading: 'Cookies',
        paragraphs: [
          'Este site utiliza cookies de análise apenas mediante consentimento. Pode gerir ou revogar a sua escolha a qualquer momento através do link “Definições de cookies” no rodapé.',
        ],
      },
      {
        heading: 'Alterações a esta política',
        paragraphs: [
          'Podemos atualizar esta Política de Privacidade. A data da última atualização encontra-se no topo desta página.',
        ],
      },
    ],
  }
}

/* ───────────────────────────────  TERMOS  ─────────────────────────────── */

export function getTermsDoc(lang: Lang): LegalDoc {
  if (lang === 'en') {
    return {
      title: 'Terms & Conditions',
      updatedLabel: `Last updated: ${UPDATED.en}`,
      intro: `These Terms & Conditions govern access to and use of the ${denominacao} website.`,
      sections: [
        {
          heading: 'Identification',
          paragraphs: [
            `${denominacao}, tax number ${nif}, registered office at ${morada}. National Local Accommodation Register (RNAL) no. ${rnal}.`,
          ],
        },
        {
          heading: 'Purpose',
          paragraphs: [
            'This website is informational and institutional, presenting the estate, the wines and the wine-tourism and accommodation services. The forms allow you to request contact for bookings and wine purchases; on their own they do not constitute a confirmed booking or purchase.',
          ],
        },
        {
          heading: 'Intellectual property',
          paragraphs: [
            `All content (texts, images, logos, trademarks) is the property of ${denominacao} or of third-party licensors and is protected by copyright and industrial property rights. Reproduction without authorisation is prohibited.`,
          ],
        },
        {
          heading: 'Requests and bookings',
          paragraphs: [
            'Requests made through the forms are subject to confirmation. The specific conditions of each booking or purchase (prices, availability, payment) will be communicated in the reply to your request.',
          ],
        },
        {
          heading: 'Liability',
          paragraphs: [
            `We make every effort to keep the information up to date and accurate, but we do not guarantee that it is error-free. ${denominacao} is not liable for damages resulting from the use of the website or its temporary unavailability.`,
          ],
        },
        {
          heading: 'Data protection',
          paragraphs: [
            'The processing of personal data is governed by our Privacy Policy, available on this website.',
          ],
        },
        {
          heading: 'Dispute resolution',
          paragraphs: [
            `In the event of a consumer dispute, the consumer may refer the matter to the Alternative Dispute Resolution entity: ${legal.ral.nome} — ${legal.ral.url}. The electronic Complaints Book is also available at https://www.livroreclamacoes.pt.`,
          ],
        },
        {
          heading: 'Governing law',
          paragraphs: [
            'These Terms are governed by Portuguese law. Any dispute shall be subject to the courts of the company’s registered office, without prejudice to mandatory consumer protection rules.',
          ],
        },
      ],
    }
  }

  // PT (por defeito)
  return {
    title: 'Termos e Condições',
    updatedLabel: `Última atualização: ${UPDATED.pt}`,
    intro: `Os presentes Termos e Condições regulam o acesso e a utilização do website da ${denominacao}.`,
    sections: [
      {
        heading: 'Identificação',
        paragraphs: [
          `${denominacao}, NIF ${nif}, com sede em ${morada}. Registo Nacional de Alojamento Local (RNAL) n.º ${rnal}.`,
        ],
      },
      {
        heading: 'Objeto',
        paragraphs: [
          'Este website tem caráter informativo e institucional, apresentando a quinta, os vinhos e os serviços de enoturismo e alojamento. Os formulários permitem solicitar contacto para reservas e compra de vinho; não constituem, por si só, uma reserva ou compra confirmada.',
        ],
      },
      {
        heading: 'Propriedade intelectual',
        paragraphs: [
          `Todos os conteúdos (textos, imagens, logótipos, marcas) são propriedade da ${denominacao} ou de terceiros licenciadores e estão protegidos por direitos de autor e de propriedade industrial. É proibida a reprodução sem autorização.`,
        ],
      },
      {
        heading: 'Pedidos e reservas',
        paragraphs: [
          'Os pedidos efetuados através dos formulários estão sujeitos a confirmação. As condições específicas de cada reserva ou compra (preços, disponibilidade, pagamento) serão comunicadas na resposta ao pedido.',
        ],
      },
      {
        heading: 'Responsabilidade',
        paragraphs: [
          `Envidamos os melhores esforços para manter a informação atualizada e correta, mas não garantimos a ausência de erros. A ${denominacao} não se responsabiliza por danos resultantes da utilização do site ou da sua indisponibilidade temporária.`,
        ],
      },
      {
        heading: 'Proteção de dados',
        paragraphs: [
          'O tratamento de dados pessoais rege-se pela nossa Política de Privacidade, disponível neste website.',
        ],
      },
      {
        heading: 'Resolução de litígios',
        paragraphs: [
          `Em caso de litígio de consumo, o consumidor pode recorrer à entidade de Resolução Alternativa de Litígios: ${legal.ral.nome} — ${legal.ral.url}. Disponibilizamos igualmente o Livro de Reclamações eletrónico em https://www.livroreclamacoes.pt.`,
        ],
      },
      {
        heading: 'Lei aplicável e foro',
        paragraphs: [
          'Os presentes Termos regem-se pela lei portuguesa. Para a resolução de qualquer litígio é competente o foro da comarca da sede da empresa, sem prejuízo das normas imperativas de defesa do consumidor.',
        ],
      },
    ],
  }
}
