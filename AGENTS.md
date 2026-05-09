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
> Antes de concluir qualquer tarefa e atualizar o `TASKS.md`, você **DEVE OBRIGATORIAMENTE** seguir o Processo de Validação detalhado na seção 2 do **[`docs/HARNESS.md`](docs/HARNESS.md)**.
Ignorar essa regra causará regressões no projeto.
---

## 1. Agente Arquiteto e Backend (Sênior)
* **Complexidade/Prioridade:** Alta (Core do Sistema)
* **Modelo Sugerido:** Modelos de alto raciocínio / Maior Custo (ex: *Gemini 1.5 Pro*, *Claude 3.5 Sonnet*, *GPT-4o*).
* **Responsabilidades principais:** 
  * Estruturação inicial do projeto React Native.
  * Configuração do SQLite, criação do script de seeding (usuário admin) e criação das queries (CRUD).
  * Aplicação rigorosa das Regras de Negócio descritas no `docs/SPEC.md`.
* **Foco no [`docs/TASKS.md`](docs/TASKS.md):** 
  * **Fase 1** (Configuração e Infraestrutura)
  * **Fase 2** (Banco de Dados e Modelagem)

## 2. Agente Desenvolvedor UI/Frontend (Pleno)
* **Complexidade/Prioridade:** Média/Baixa (Trabalho repetitivo de Componentes)
* **Modelo Sugerido:** Modelos rápidos / Custo Baixo (ex: *Gemini 1.5 Flash*, *Claude 3.5 Haiku*, *GPT-4o-mini*).
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
* **Modelo Sugerido:** Modelos super baratos e rápidos (ex: *Gemini 1.5 Flash*, *Llama 3 8B*).
* **Responsabilidades principais:**
  * Revisar responsividade (testar lógica visual em Tablets e Celulares - RNF03).
  * Fazer polimento de cores e margens no `StyleSheet`.
  * Realizar check-list final verificando se não faltou nenhum item do `docs/SPEC.md`.
* **Foco no [`docs/TASKS.md`](docs/TASKS.md):**
  * **Fase 6** (Ajustes Finais e UX)

