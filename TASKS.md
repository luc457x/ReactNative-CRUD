# Plano de Tarefas (TASKS.md)

## Fase 1: Configuração do Projeto e Infraestrutura
- [ ] **T1.1:** Inicializar o projeto em React Native (com Expo ou Bare Workflow).
- [ ] **T1.2:** Configurar navegação base com `react-navigation`.
- [ ] **T1.3:** Instalar e configurar biblioteca do SQLite (`expo-sqlite` ou `react-native-sqlite-storage`).
- [ ] **T1.4:** Criar estrutura de pastas do projeto (ex: `/src/components`, `/src/screens`, `/src/database`, `/src/utils`).

## Fase 2: Banco de Dados e Modelagem (Ref: RNF02, Diagrama de Classes)
- [ ] **T2.1:** Criar script de inicialização do banco de dados (tabelas `Usuarios` e `Produtos`).
  - [ ] **T2.1.1:** Criar usuário `admin` padrão no SQLite (seed) caso a tabela esteja vazia. A senha será `admin` e ele terá permissão de `admin`, para ser autenticado normalmente pelo app.
- [ ] **T2.2:** Implementar repositório (CRUD) para Usuários.
- [ ] **T2.3:** Implementar repositório (CRUD) para Produtos.
- [ ] **T2.4:** Implementar regras de negócio no nível de dados:
  - [ ] Garantir ID único (Auto-increment/UUID).
  - [ ] Validar produtos com mesmo nome mas validades diferentes (Ref: Regras de Negócio).

## Fase 3: Telas de Acesso e Usuários
- [ ] **T3.1:** Desenvolver Tela de Login (Ref: RF01).
- [ ] **T3.2:** Desenvolver Tela de Cadastro de Usuários/Funcionários (Ref: RF05).
- [ ] **T3.3:** Integrar telas de acesso com o repositório SQLite.

## Fase 4: Gestão de Produtos (Ref: RF02)
- [ ] **T4.1:** Desenvolver Tela/Modal de Cadastro de Produto (Inputs: Nome, Categoria, Qtd, Preço, Validade).
- [ ] **T4.2:** Desenvolver lógica de Edição de Produto existente.
- [ ] **T4.3:** Integrar exclusão de Produto.

## Fase 5: Visão Geral e Controle de Estoque (Ref: RF03, RF04)
- [ ] **T5.1:** Desenvolver Tela Principal (Dashboard) com listagem dos produtos em estoque.
- [ ] **T5.2:** Implementar botões de incremento (+) e decremento (-) diretamente na listagem ou painel rápido.
- [ ] **T5.3:** Conectar a listagem ao banco para refletir as alterações "imediatamente" (Ref: Regra de Negócio).

## Fase 6: Ajustes Finais e UX (Ref: RNF03)
- [ ] **T6.1:** Refinar o estilo para garantir responsividade (celulares e tablets).
- [ ] **T6.2:** Testes de fluxo offline e persistência.
- [ ] **T6.3:** Validação final cruzada com `SPEC.md` e `use_case.puml`.
