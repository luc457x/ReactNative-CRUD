# Skills da IA (SKILLS.md)

## Skill 1: Inicialização de Repositório Orientada a Contexto (`context_aware_init`)

**Quando usar:** 
No início de qualquer fase de fundação de um projeto, logo após a fase de planejamento (Fase 0), ou quando for explicitamente solicitado que se prepare o terreno para o versionamento.

**Objetivo:** 
Garantir que o versionamento e a blindagem de arquivos sejam feitos de forma inteligente e adaptada ao stack tecnológico definido na documentação, antes de começar a escrever código.

**Passo a passo que a IA deve executar:**
1. **Ler o Contexto:** Ler os arquivos `SPEC.md` e `HARNESS.md` (ambos em `docs/`) para identificar todas as tecnologias do projeto (ex: React Native, Expo, SQLite, Python, Node, etc.).
2. **Criar o `.gitignore` Personalizado:** Gerar um `.gitignore` robusto que exclua:
    - Pastas padrão de dependências (`node_modules/`, `venv/`, etc).
    - Diretórios de build/compilação (`dist/`, `build/`, `android/`, `ios/`, etc).
    - Arquivos de banco de dados locais caso não devam ser subidos (`*.db`, `*.sqlite`), exceto se o seeding for versionado.
    - Arquivos de configuração de ambiente e IDE (`.env`, `.DS_Store`, `.idea/`).
3. **Inicializar o Repositório:** Executar `git init` no terminal.
4. **Reportar:** Informar ao usuário que o repositório foi criado em sinergia com o stack tecnológico exigido.

---

## Skill 2: Protocolo de Commit Atômico Multiplataforma (`atomic_commit_cross`)

**Quando usar:** 
Ao concluir uma tarefa, subtarefa ou fase, seguindo as diretrizes de granularidade do `WORKFLOW.md`.

**Objetivo:** 
Garantir que as alterações sejam salvas de forma consistente, organizada por prioridade e compatível com qualquer Sistema Operacional (Windows, Linux, macOS).

**Passo a passo que a IA deve executar:**
1. **Análise de Prioridade:** Avaliar as mudanças e separá-las em blocos atômicos. Priorizar sempre o código funcional e regras de negócio (Core) antes de commits de infraestrutura, documentação meta ou skills.
2. **Listar Alterações:** Identificar quais arquivos pertencem a cada bloco de prioridade definido.
3. **Comando de Commit (Compatibilidade):**
   - **Padrão:** Utilizar o operador `&&` para encadear `git add` e `git commit`.
   - **Workaround PowerShell (Windows Legacy):** Caso o ambiente utilize PowerShell < 7 (onde `&&` não é reconhecido), utilizar o separador `;` ou executar os comandos de forma sequencial e independente.
   - Exemplo: `git add arquivo.js; git commit -m "feat: descrição"`
4. **Idioma:** Sempre redigir a mensagem de commit em **Português-br**, conforme a Diretriz Universal no `AGENTS.md`.
5. **Verificar Sucesso:** Confirmar a saída do comando para garantir que o commit foi criado com sucesso antes de iniciar o próximo bloco de prioridade.

---

## Skill 3: Validação de Qualidade QA (`qa_protocol`)

**Quando usar:** 
Obrigatoriamente antes de finalizar qualquer tarefa no `TASKS.md`, durante a fase de "Validação Técnica" do Protocolo de Conclusão de Tarefa.

**Objetivo:** 
Garantir que o código respeite os Critérios de Aceite Técnicos do `HARNESS.md` e as Regras de Negócio do `SPEC.md`.

**Passo a passo que a IA deve executar:**
1. **Check de Build:** Verificar se as alterações não geram erros de importação ou sintaxe.
2. **Sanitização de Código:** 
   - Identificar e remover `console.log()` de depuração.
   - Remover comentários de "TODO" ou rascunhos que não agregam à documentação.
3. **Inspeção Visual e Responsividade:** 
   - Verificar se novas telas usam `SafeAreaView`.
   - Garantir que layouts usem `flex` em vez de larguras/alturas fixas que quebrem em tablets (RNF03).
4. **Validação de Persistência (SQLite):**
   - Confirmar que todas as chamadas ao banco de dados estão protegidas por blocos `try/catch`.
   - Garantir que erros de banco sejam logados no terminal para debug.
5. **Cross-Check de Regras:** Validar se a lógica implementada não viola as Regras de Negócio (ex: ID único, validação de data, etc.).
6. **Registro:** Incluir a nota "Validação Técnica Concluída (Skill 3)" no log da sessão no `PROGRESS.md`.
