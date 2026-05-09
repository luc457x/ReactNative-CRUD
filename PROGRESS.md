# Registro de Progresso (PROGRESS.md)

## Resumo do Status Atual
* **Fase Atual:** Fase 1 em andamento — T1.1 concluída. Próximo passo: T1.2 (react-navigation) e T1.3 (expo-sqlite).
* **Último Commit/Atualização:** Inicialização do projeto Expo (T1.1) + estrutura de pastas src/.

---

## Log de Sessões

### Sessão 0: Setup da Engenharia de Prompt/IA
* **Data:** 08 de Maio de 2026
* **Resumo das Ações:**
  * Refinamento do `SPEC.md`, corrigindo o escopo para Mobile, adicionando RNFs e linkando os diagramas `.puml`.
  * Criação do `TASKS.md` dividindo o projeto em 6 fases lógicas, com destaque para a injeção do usuário `admin` diretamente no SQLite.
  * Criação do `AGENTS.md` definindo papéis e delegando tarefas de acordo com o poder e custo do LLM (Sênior, Pleno, Júnior).
  * Criação do `HARNESS.md` padronizando os comandos do Expo e as bibliotecas fixas (ex: `@react-navigation/native` e `expo-sqlite`).
  * Criação do `.agentignore` para blindar o ambiente contra leitura de arquivos pesados (node_modules, builds).
  * Criação de `.gitignore` otimizado para o stack tecnológico (React Native/Expo e SQLite) e inicialização do repositório Git.
  * Criação do `SKILLS.md` para documentar procedimentos padrão da IA (ex: `context_aware_init`) e atualização do sumário no `AGENTS.md`.
* **Decisões Arquiteturais Tomadas:**
  * O projeto não terá backend em nuvem. Será puramente offline (SQLite embutido).
  * O usuário Admin deve passar pelo fluxo normal de login, validando-se no banco local.
* **Pendências (Bugs / Known Issues):**
  * Nenhuma no momento. A Fase 0 está concluída com excelência. Prontos para a tarefa T1.1.

---

### Sessão 1: Inicialização do Projeto Expo (T1.1)
* **Data:** 09 de Maio de 2026
* **Agente:** Arquiteto Sênior
* **Tarefas Concluídas:** T1.1
* **Resumo das Ações:**
  * Executado `npx create-expo-app@latest` com template `blank` (JavaScript puro, conforme RNF01).
  * Corrigido `app.json`: nome do app ajustado para `EstoqueApp`, slug para `estoque-app`.
  * `.gitignore` enriquecido com entradas do projeto original (SQLite `*.db/*.sqlite`, IDEs `.idea/.vscode`, `.env`).
  * Criada estrutura de pastas `src/` com subdiretórios: `components/`, `screens/`, `database/`, `utils/`.
  * Validação: Metro Bundler subiu em `http://localhost:8081` sem erros de compilação.
* **Decisões Arquiteturais Tomadas:**
  * Expo **Managed Workflow** escolhido (template `blank`) — facilita builds cross-platform sem ejection necessário para o escopo atual.
  * `newArchEnabled: true` mantido no `app.json` (nova arquitetura React Native habilitada por padrão no Expo SDK mais recente — melhor performance).
* **Pendências (Bugs / Known Issues):**
  * Nenhuma. Pronto para T1.2 (react-navigation) e T1.3 (expo-sqlite).
