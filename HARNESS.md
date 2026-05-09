## 1. Comandos do Ambiente de Execução
Como este é um projeto React Native (preferencialmente utilizando Expo), os comandos oficiais para a IA ou para o desenvolvedor executarem no terminal são:

* **Iniciar o servidor (Metro Bundler):** `npx expo start`
* **Rodar no emulador Android:** (Com o expo rodando) Pressione `a`
* **Limpar cache do bundler (Resolver erros de build):** `npx expo start -c`
* **Instalar novas dependências:** `npx expo install <pacote>` (Sempre usar `expo install` no lugar de `npm install` para pacotes nativos).

## 2. Processo de Validação (Obrigatório antes de concluir uma Task)
Antes de ir no `TASKS.md` e marcar uma tarefa como `[x]`, o agente responsável DEVE seguir este roteiro de verificação:
1. **Nenhum erro no terminal:** O código não pode quebrar o build do Expo.
2. **Checagem de Regras de Negócio:** A tela/função obedece às restrições do `SPEC.md`? (Ex: o botão de incremento de estoque respeita o limite do banco de dados?)
3. **Limpeza de Código:** Foram removidos os `console.log()` de debug excessivos?
4. **Responsividade (RNF03):** Utilizou Flexbox corretamente para que a tela não quebre em dispositivos de tamanhos diferentes?

## 3. Dependências Homologadas (Stack Padrão)
Para evitar que diferentes Agentes instalem bibliotecas que fazem a mesma coisa (ex: um instala `axios` e outro instala `fetch`), o projeto usará estritamente:

* **Navegação:** `@react-navigation/native` e `@react-navigation/native-stack`
* **Banco de Dados:** `expo-sqlite`
* **Ícones:** `@expo/vector-icons`
* **Requisições externas:** `fetch` API nativo do JS (se aplicável no futuro).

## 4. Depuração do Banco de Dados SQLite
Como o banco rodará embutido no celular:
* Tratamento de Erros: Todas as funções de CRUD no repositório devem envolver queries em blocos `try/catch` e imprimir o erro no console para facilitar a depuração via Metro Bundler.
