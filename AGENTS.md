# Organização e Papéis da IA (AGENTS.md)

## Estrutura da Documentação de Engenharia de IA

> **Localização:** Todos os documentos de engenharia de IA (exceto este arquivo) estão centralizados em **`/docs`**. O `AGENTS.md` permanece na raiz para que ferramentas e sistemas de regras o encontrem automaticamente.

Este projeto é guiado por um conjunto de arquivos Markdown desenhados para instruir, restringir e guiar LLMs durante o desenvolvimento:
* **[`docs/SPEC.md`](docs/SPEC.md)**: O cérebro do escopo. Contém regras de negócio, RFs, RNFs e links para diagramas UML.
* **[`docs/TASKS.md`](docs/TASKS.md)**: O roadmap. Divide o `docs/SPEC.md` em passos granulares acionáveis.
* **[`docs/HARNESS.md`](docs/HARNESS.md)**: As "trilhos" técnicos. Define comandos de terminal permitidos, dependências homologadas e regras de teste.
* **[`docs/PROGRESS.md`](docs/PROGRESS.md)**: O diário de bordo. Mantém o histórico do que foi feito e registra pendências para preservar o contexto entre diferentes sessões.
* **`AGENTS.md`** (Este arquivo — raiz): O RH da IA. Define qual persona e modelo usar para diferentes partes do `docs/TASKS.md`.
* **[`docs/SKILLS.md`](docs/SKILLS.md)**: O livro de feitiços. Mapeia processos padrões passo a passo para que as IAs executem tarefas repetitivas (como inicialização ou deploys) sempre da mesma forma.
* **[`docs/UML/`](docs/UML/)**: Diagramas PlantUML do projeto (`use_case.puml`, `class.puml`).

## Diretriz Universal de Workflow (Obrigatória)
> **ATENÇÃO PARA TODOS OS AGENTES:**
1. **Sempre** escreva em Português-br (incluindo commits e logs), a menos que solicitado de outra forma. Seja o mais **conciso** possível para economizar tokens.
2. **Sempre** que for pedido para iniciar ou concluir uma tarefa ou fase de desenvolvimento, consulte o documento **[`docs/WORKFLOW.md`](docs/WORKFLOW.md)** para ler as diretrizes obrigatórias de workflow e conclusão de tarefas.
---

## 1. Agente Arquiteto e Backend (Sênior)
* **Complexidade/Prioridade:** Alta (Core do Sistema)
* **Modelo Sugerido:** Modelos de alto raciocínio / Maior Custo (ex: *Claude 4.6 Sonnet*, *Claude 4.6 Opus*).
* **Responsabilidades principais:** 
  * Estruturação inicial do projeto React Native.
  * Configuração do SQLite, criação do script de seeding (usuário admin) e criação das queries (CRUD).
  * Aplicação rigorosa das Regras de Negócio descritas no `docs/SPEC.md`.
* **Foco no [`docs/TASKS.md`](docs/TASKS.md):** 
  * **Fase 1** (Configuração e Infraestrutura)
  * **Fase 2** (Banco de Dados e Modelagem)

## 2. Agente Desenvolvedor UI/Frontend (Pleno)
* **Complexidade/Prioridade:** Média/Baixa (Trabalho repetitivo de Componentes)
* **Modelo Sugerido:** Modelos rápidos / Custo Baixo (ex: *Gemini 3.1 Pro (High)*,*Gemini 3 Flash*).
* **Responsabilidades principais:**
  * Desenvolver as telas (Login, Cadastro de Produtos, Dashboard).
  * Ligar as funções do banco de dados (já criadas pelo Arquiteto) aos botões e listas do React Native.
  * Desenvolver componentes como botões de incremento/decremento.
* **Foco no [`docs/TASKS.md`](docs/TASKS.md):**
  * **Fase 3** (Telas de Acesso e Usuários)
  * **Fase 4** (Gestão de Produtos - Interface)
  * **Fase 5** (Visão Geral e Controle de Estoque)

## 3. Agente QA e Polimento Visual (Júnior)
* **Complexidade/Prioridade:** Baixa (Revisão e Estética)
* **Modelo Sugerido:** Modelos super baratos e rápidos (ex: *Gemini 3.1 (Low)*, *Gemini 3 Flash*).
* **Responsabilidades principais:**
  * Revisar responsividade (testar lógica visual em Tablets e Celulares - RNF03).
  * Fazer polimento de cores e margens no `StyleSheet`.
  * Realizar check-list final verificando se não faltou nenhum item do `docs/SPEC.md`.
* **Foco no [`docs/TASKS.md`](docs/TASKS.md):**
  * **Fase 6** (Ajustes Finais e UX)

