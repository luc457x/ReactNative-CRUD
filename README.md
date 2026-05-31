# Sistema de Controle de Estoque React Native

Este é um projeto acadêmico para estudar fundamentos de engenharia de IA - um sistema de controle de estoque digital construído com React Native, JavaScript e banco de dados SQLite.

## O que é
Uma aplicação móvel multiplataforma para gerenciamento de estoque com autenticação de usuário, registro de produtos com operações CRUD, controle de quantidade de estoque e persistência de dados usando banco de dados SQLite local.

## Como Executar
1. Instale as dependências: `npm install`
2. Inicie o servidor de desenvolvimento: `npm start`
3. Escolha sua plataforma:
    - Pressione 'w' para navegador web
    - Pressione 'a' para emulador Android
    - Pressione 'i' para simulador iOS
    - Use o aplicativo Expo Go em dispositivo físico (escaneie o código QR)

## Recursos Atuais
- **Autenticação Segura:** Fluxo completo de login/logout de usuários, suportando perfis de Administrador (seed padrão: `admin/admin`) e Funcionário. A interface possui um banner de erro inline moderno e limpo na tela de Login.
- **Gerenciamento Completo de Produtos (CRUD):** Registro, edição e visualização detalhada de produtos com atributos como nome, categoria, preço e validade.
- **Exclusão Avançada Multiplataforma:** Modal de confirmação de exclusão inline customizado para garantir funcionamento consistente tanto em dispositivos móveis quanto em navegadores Web, contornando limitações do `Alert` nativo.
- **Ajustes Rápidos de Estoque:** Controles dinâmicos de incremento e decremento de quantidade diretamente na tela de detalhes do produto.
- **Sistema de Notificações Toast:** Toasts integrados na Dashboard que mostram alertas de sucesso/erro (ex: "Produto cadastrado com sucesso!").
- **Atualização Automática:** Sincronização inteligente dos dados em tempo real nas telas por meio de ouvintes de foco da navegação (`focus listeners`), sem necessidade de recarregamento manual.
- **Responsividade e Design Premium:** Dashboard e cards totalmente otimizados e fluidos para telas de celulares, tablets e computadores, exibindo o número correto de lotes e a quantidade total acumulada.

## Homologação e Testes
O projeto conta com uma suíte de testes automatizados e critérios de aceitação para assegurar a confiabilidade e o correto funcionamento de todas as regras de negócio:

### Executando os Testes
Para rodar a suíte completa de testes unitários e de integração, utilize o comando:
```bash
npm test
```

### Escopo de Testes (31 Casos Cobertos)
- **Autenticação:** Validação de credenciais, controle de sessões e tratamento de erros visuais.
- **Repositório de Usuários (`UserRepository`):** Testes de inserção, busca e garantia de unicidade de credenciais.
- **Repositório de Produtos (`ProductRepository`):** CRUD completo de produtos, regras de movimentação de estoque (incremento/decremento) e agrupamento correto de lotes.
- **Integração:** Cenários de fluxo de ponta a ponta que simulam a experiência real do usuário com o banco de dados.

## Estrutura do Projeto
- `/src/screens` - Telas de Login, Registro, Dashboard, Formulários de Produto
- `/src/database` - Inicialização e conexão do SQLite com repositórios dedicados
- `/src/components` - Componentes de UI reutilizáveis (incluindo Toasts e Modais de Confirmação)
- `App.js` - Aplicação principal com navegação e contexto de autenticação
- `__tests__` - Suíte de testes unitários e de integração (Jest)

## Tecnologias Utilizadas
- React Native com Expo
- React Navigation para navegação entre telas
- Expo-SQLite para armazenamento de banco de dados local
- Jest & jest-expo para a suíte de testes
- JavaScript (ES6+)

## Engenharia de Software e IA
Engenharia de Software: arquitetura limpa, diagramas UML (.agents/UML/), separação de camadas e padrões de projeto.
Engenharia de IA: experimentação com workflows de IA - estrutura em .agents/ (AGENTS.md, TASKS.md, etc.) e .agentignore para otimização de contexto.
