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
