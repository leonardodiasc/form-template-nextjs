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
      const factorsCophep = {
        'III - Registros Funcionais': ['DRH Referencial: Ficha Funcional 1. Permanece no exercício de suas funções sem registro de devoluções.',
        '2. Permanece no exercício de suas funções sem registro de penalidades',
        'DEF/DEI Referencial: Registros do DEF e DEI. <br>1. Participa dos Encontros de Formação promovidos pela SME.',
        '2. Mantém registros pedagógicos atualizados do CMEI contribuindo para o trabalho de assessoramento do DEI.',
        ],
      };
      const factorsData = {
        'IV Exercício da Docência': [
          {
            name: 'Permanece na docência durante o período avaliado.',
            criteria: [
              { name: 'Durante dois anos letivos.', mark: 1 },
              { name: 'Durante um ano letivo.', mark: 0.5 },
              // Add more criteria as needed
            ]
          },
          // Add more sub-factors for factor1 as needed
        ],
        'V Contribuição no Campo da Educação': [
          {
            name: '1. Publica trabalhos no campo da educação',
            criteria: [
              { name: 'Livro e artigo', mark: 1 },
              { name: 'Cartilha', mark: 0.5 },
              // Add more criteria as needed
            ]
          },
          {
            name: '2. Ministra cursos e oficinas em eventos promovidos pela SME.',
            criteria:[
              {name: 'Cursos a cada 20 horas', mark: 1},
              {name: 'Oficinas', mark: 0.5},
            ]

          },
          {
            name: '3. Apresenta trabalhos em congressos, colóquios, seminários ou similares.',
            criteria:[
              {name: 'Curso, Palestra, Mesa Redonda, Oficina', mark: 1},
              {name: 'Comunicação oral, Pôster', mark: 0.5},
            ]

          },
          // Add more sub-factors for factor2 as needed
        ],
        'VI Participação em Colegiados': [
          {
            name: 'Participa como membro efetivo de Colegiados.',
            criteria: [
              { name: 'Conselhos e Comissões Permanentes.', mark: 1 },
              { name: 'Unidade Executora', mark: 1 },
              { name: 'Outras Comissões e Grupos de Trabalho', mark: 0.5 },
            ]
          },
        ],
        'VII Qualificação no Campo da Educação': [
          {
            name: '1. Comprova com certidão participação nos encontros de Formação oferecidos pela SME.',
            criteria: [
              { name: 'Carga mínima de 20 horas.', mark: 0.5 },
            ]
          },
          {
            name: '2. Comprova, com certidão, a conclusão de cursos de atualização, seminários, congressos, simpósios, jornadas',
            criteria: [
              { name: 'Carga horária a partir de 180 horas.', mark: 1 },
              { name: 'A cada 40h de curso com carga horária mínima de 20h.', mark: 0.5 },
              // Add more criteria as needed
            ]
          },
          // Add more sub-factors for factor1 as needed
        ],
        // Add more factors as needed
      };
      
    

    return (
      <ChakraProvider>
        <SecondEvaluationForm factors={factorsData} totalScores={[1,1,2,1]} />
        <EvaluationForm factors={factorsCophep} yesValue={0.25} formType={2}/>
      </ChakraProvider>
    )
  }