# Diretriz de Workflow Para Desenvolvimento do Projeto

1. **Antes de iniciar uma tarefa** sempre verifique no arquivo `AGENTS.md` (na raiz) qual agente é responsável pela Fase em que a tarefa se encontra, e adote as diretrizes/persona dele para a execução.
2. **Gerenciamento de Conflitos:** Se você cometer um erro ou precisar alterar um fluxo já definido no `docs/TASKS.md`, crie uma nova tarefa de "Correção" ou "Refatoração" com um título claro (ex: "[FIX] Ajuste no fluxo de Login") e marque a tarefa antiga como **Bloqueada** ou **Resolvida** com uma nota explicativa.
3. **Protocolo de Conclusão de Tarefa:** Antes de marcar uma tarefa como concluída no `TASKS.md`, você deve obrigatoriamente:
   - **Fase 1: Validação Técnica:** Verificar se o código **respeita as especificações técnicas** definidas nos *Critérios de Aceite Técnicos* do **[`docs/HARNESS.md`](docs/HARNESS.md)**.
   - **Fase 2: Validação de Escopo:** Validar se o código **respeita as especificações de negócio** (Requisitos Funcionais e Regras de Negócio do **[`docs/SPEC.md`](docs/SPEC.md)**) pertinentes a esta tarefa específica.
   - **Fase 3: Registro de Progresso:** Atualizar o status da tarefa no `TASKS.md` e registrar o log da atividade no **[`docs/PROGRESS.md`](docs/PROGRESS.md)** para preservar o contexto.
4. **Comunicação de Workflow (Explicitação):** Você deve sempre declarar explicitamente quando está seguindo uma regra deste workflow. Exemplos:
   - "Para iniciar a [Tarefa X], estou consultando o `WORKFLOW.md` e assumindo a persona do [Agente] conforme definido no `AGENTS.md`."
   - "De acordo com o workflow, vou criar uma nova tarefa de correção com o título '[FIX] Ajuste em [...]' para tratar a alteração na tarefa concluída."
   - "Seguindo o Processo de Validação do `HARNESS.md`, estou concluindo a [Tarefa X] e atualizando os documentos de progresso."
5. **Protocolo de Commit e Granularidade:** Sempre que uma fase, tarefa ou subtarefa for concluída, o trabalho deve ser commitado seguindo estas diretrizes:
   - **Commits Atômicos:** Separe commits para cada alteração específica. Se para adicionar uma funcionalidade for necessário alterar outra existente, comite primeiro a alteração na funcionalidade existente (documentando o motivo técnico para a mudança em função da nova implementação) e depois comite a nova funcionalidade.
   - **Mensagens de Commit:** A linha de assunto deve ter cerca de 50 caracteres, sendo breve, significativa e informativa sobre o objetivo principal do commit.