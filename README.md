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
- Sistema de login/logout de usuários (usuário admin seedado: admin/admin)
- Registro de produtos com nome, categoria, quantidade, preço, data de validade
- Visão geral de estoque com listagem de produtos
- Controles de incremento/decremento de quantidade
- Funcionalidade de edição de produtos

## Próximos Passos (Backlog)
- Corrigir a funcionalidade do botão de exclusão para produtos
- Implementar mensagens de sucesso/erro após adicionar itens/usuários
- Adicionar atualização automática da tela após modificações de dados
- Melhorar a responsividade da interface para tablets e celulares

## Estrutura do Projeto
- `/src/screens` - Telas de Login, Registro, Dashboard, Formulários de Produto
- `/src/database` - Inicialização e conexão do SQLite
- `/src/components` - Componentes de UI reutilizáveis
- `App.js` - Aplicação principal com navegação e contexto de autenticação

## Tecnologias Utilizadas
- React Native com Expo
- React Navigation para navegação entre telas
- Expo-SQLite para armazenamento de banco de dados local
- JavaScript (ES6+)

## Engenharia de Software e IA
Engenharia de Software: arquitetura limpa, diagramas UML (.agents/UML/), separação de camadas e padrões de projeto.
Engenharia de IA: experimentação com workflows de IA - estrutura em .agents/ (AGENTS.md, TASKS.md, etc.) e .agentignore para otimização de contexto.
