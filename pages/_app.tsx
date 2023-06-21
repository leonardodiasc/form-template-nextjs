import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import EvaluationForm from "@/components/FormComponent";
import SecondEvaluationForm from "@/components/SecondFormComponent";


export default function Home() {
    const factors = {
        'I - Rendimento e Qualidade do Trabalho': ['1. Articula e coordena o trabalho coletivo para atingir os objetivos e metas da unidade de ensino demonstrando habilidades para negociar e resolver problemas.',
        '2. Executa as normas disciplinares da unidade de ensino de acordo com o Regimento Escolar atendendo à legislação vigente.',
        '3. Assegura o cumprimento e divulgação do Calendário Escolar (mínimo de 200 dias letivos e 800 horas), bem como horário dos servidores e funcionamento da unidade de ensino respeitando as diretrizes da Secretaria Municipal de Educação aprovadas pelo Conselho Municipal de Educação',
        '4. Demonstra habilidade no relacionamento com seus pares, educandos e famílias, funcionários e demais membros da comunidade escolar respeitando as diversidades.',
        '5. Coordena e articula o trabalho administrativo em todos os turnos.',
        '6. Cumpre as orientações do Programa Nacional de Alimentação Escolar na aquisição e armazenamento de gêneros alimentícios e higiene na manipulação dos alimentos propostos no cardápio apresentado pela equipe de nutrição da Secretaria Municipal de Educação garantindo a qualidade e divulgação do cardápio escolar.',
        '7. Planeja, juntamente com a comunidade escolar, a utilização dos recursos financeiros e sua execução priorizando as necessidades para melhoria da qualidade pedagógica e funcionamento da unidade de ensino submetendo ao Conselho Escolar',
        '8. Torna público à comunidade escolar o recebimento, aplicação dos recursos financeiros e prestação de contas mantendo toda documentação comprobatória na unidade de ensino.',
        '9. Cumpre os prazos estabelecidos para prestação de contas garantindo a veracidade dos documentos e das informações.',
        '10. Substitui o Diretor Pedagógico nas suas ausências e impedimentos.'
        ],
        'II - Gestão de Pessoas': ['1. Planeja, organiza e coordena o trabalho pedagógico e administrativo da unidade de ensino, garantindo a participação de todos os segmentos da comunidade escolar.',
        ]
      };
      const factorsData = {
        factor1: [
          {
            name: 'SubFactor1',
            criteria: [
              { name: 'Criteria1', mark: 10 },
              { name: 'Criteria2', mark: 8 },
              // Add more criteria as needed
            ]
          },
          // Add more sub-factors for factor1 as needed
        ],
        factor2: [
          {
            name: 'SubFactor2',
            criteria: [
              { name: 'Criteria3', mark: 5 },
              { name: 'Criteria4', mark: 7 },
              // Add more criteria as needed
            ]
          },
          // Add more sub-factors for factor2 as needed
        ],
        // Add more factors as needed
      };
      
    

    return (
      <ChakraProvider>
        <SecondEvaluationForm factors={factorsData} />
      </ChakraProvider>
    )
  }