# Registro de Progresso (PROGRESS.md)

## Resumo do Status Atual
* **Fase Atual:** **Fase 1 CONCLUÍDA** ✅ — Toda a infraestrutura base está pronta. Próximo passo: Fase 2 (Banco de Dados).
* **Último Commit/Atualização:** T1.2 + T1.3 + T1.4 — react-navigation, expo-sqlite e estrutura src/ finalizados.

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

### Sessão 1: Infraestrutura Completa (T1.1 → T1.4)
* **Data:** 09 de Maio de 2026
* **Agente:** Arquiteto Sênior
* **Tarefas Concluídas:** T1.1, T1.2, T1.3, T1.4

#### T1.1 — Inicialização Expo
  * Executado `npx create-expo-app@latest` com template `blank` (JavaScript puro, conforme RNF01).
  * Corrigido `app.json`: nome `EstoqueApp`, slug `estoque-app`.
  * `.gitignore` enriquecido (SQLite, IDEs, `.env`).

#### T1.2 — React Navigation
  * Instalados via `npx expo install`:
    * `@react-navigation/native` v7
    * `@react-navigation/native-stack` v7
    * `react-native-screens` (peer dep SDK 54 compatível)
    * `react-native-safe-area-context` (peer dep SDK 54 compatível)
  * `App.js` configurado com `NavigationContainer` + `createNativeStackNavigator` como raiz.
  * Stack Navigator com `headerShown: false` — cada tela gerencia seu próprio header.
  * Tela `PlaceholderScreen` temporária adicionada (será removida na Fase 3).

#### T1.3 — expo-sqlite
  * Instalado `expo-sqlite` ~16.0.10 (SDK 54 compatível).
  * Config plugin registrado automaticamente no `app.json` pelo `expo install`.
  * Criado `src/database/database.js` com `SQLite.openDatabaseSync('estoque.db')` — API síncrona moderna (sem callbacks legados).

#### T1.4 — Estrutura de Pastas
  * `src/components/`, `src/screens/`, `src/database/`, `src/utils/` criados.
  * `src/database/.gitkeep` removido (substituído pelo `database.js` real).

* **Validação:** Metro Bundler subiu em `http://localhost:8081` sem erros após todas as instalações.
* **Decisões Arquiteturais Tomadas:**
  * `openDatabaseSync` (API síncrona do expo-sqlite v16) escolhida em vez da API assíncrona antiga — mais limpa e compatível com o padrão de hooks que usaremos nas telas.
  * `headerShown: false` no Stack raiz — todas as telas implementarão seus próprios headers customizados para consistência visual.
* **Pendências (Bugs / Known Issues):**
  * Nenhuma. **Fase 1 concluída.** Prontos para iniciar a Fase 2 (T2.1 — criação das tabelas SQLite + seed do admin).

---

### Sessão 2: Banco de Dados Inicial (T2.1)
* **Data:** 08 de Maio de 2026
* **Agente:** Arquiteto Sênior
* **Tarefas Concluídas:** T2.1, T2.1.1

#### T2.1 — Script de Inicialização
  * Criada a função `initDatabase` em `src/database/database.js`.
  * Configurada a criação das tabelas `Usuarios` (id, nome, senha, permissao) e `Produtos` (id, nome, categoria, quantidade, precoUnitario, dataValidade).

#### T2.1.1 — Usuário Admin
  * Adicionada regra de seed: se a tabela `Usuarios` estiver vazia, injetamos automaticamente um usuário admin.
  * O `App.js` foi refatorado para utilizar o `useEffect` e aguardar o `initDatabase()` antes de renderizar a navegação.

* **Validação:** 
  * Checado o fluxo de negócio (banco instanciado).
  * **Correção de Build Web:** Durante a validação de compilação web (`npx expo export -p web`), o módulo `expo-sqlite` falhou por não conseguir resolver arquivos `.wasm` nativos da dependência no navegador. Para corrigir isso e manter o ambiente de desenvolvimento funcionando também na web, foi criado um `metro.config.js` adicionando `wasm` aos `assetExts` do bundler.
* **Pendências:** 
---

### Sessão 3: Refinamento de Workflow (Documentação)
* **Data:** 09 de Maio de 2026
* **Resumo das Ações:**
  * Atualização do `docs/WORKFLOW.md` para incluir a regra de **Comunicação Explicativa**. Agora a IA deve declarar explicitamente quando está consultando diretrizes de workflow, assumindo personas ou realizando validações.
  * Reestruturação do `docs/HARNESS.md` e `docs/WORKFLOW.md`:
    * `HARNESS.md` agora foca exclusivamente em **Critérios Técnicos** (Build, Limpeza, Responsividade, Padrões de Código).
    * `WORKFLOW.md` agora centraliza o **Protocolo de Conclusão de Tarefa**, focando em garantir que o código **respeite as especificações** técnicas e de negócio pertinentes.
* **Pendências:** 
---

### Sessão 4: Padronização de Commits (Regras de Workflow)
* **Data:** 09 de Maio de 2026
* **Resumo das Ações:**
  * Inclusão do **Protocolo de Commit e Granularidade** no `docs/WORKFLOW.md`.
  * Definição da obrigatoriedade de **Commits Atômicos** (separação de alterações em funcionalidades existentes vs. novas implementações).
  * Padronização das mensagens de commit (assunto informativo de ~50 caracteres).
* **Decisões Arquiteturais Tomadas:**
  * Adoção de uma política de Git mais rigorosa para facilitar o rastreamento de mudanças e auditoria de código, especialmente em fluxos de trabalho colaborativos assistidos por IA.
* **Pendências:** 
  * Retomar a Fase 2 (T2.2 — Repositório CRUD para Usuários).

---

### Sessão 5: Manutenção de Ambiente (Otimização IA)
* **Data:** 09 de Maio de 2026
* **Resumo das Ações:**
  * Atualização do `.agentignore` para incluir `.git/`, `dist/` e extensões de banco de dados (`.db`, `.sqlite`).
  * Objetivo: Melhorar a performance de leitura da IA e economizar tokens de contexto, evitando a varredura de metadados do Git e binários de build.
* **Validação:**
  * O arquivo `.agentignore` agora reflete os padrões de exclusão recomendados para projetos React Native assistidos por agentes.
* **Pendências:**
  * Retomar a Fase 2 (T2.2 — Repositório CRUD para Usuários).
