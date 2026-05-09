## 1. Comandos do Ambiente de Execução
Como este é um projeto React Native (preferencialmente utilizando Expo), os comandos oficiais para a IA ou para o desenvolvedor executarem no terminal são:

* **Iniciar o servidor (Metro Bundler):** `npx expo start`
* **Rodar no emulador Android:** (Com o expo rodando) Pressione `a`
* **Limpar cache do bundler (Resolver erros de build):** `npx expo start -c`
* **Instalar novas dependências:** `npx expo install <pacote>` (Sempre usar `expo install` no lugar de `npm install` para pacotes nativos).

## 2. Critérios de Aceite Técnicos (Checklist de Qualidade)
Todo código produzido deve passar por esta validação técnica antes da entrega:
1. **Build íntegro:** O código não pode quebrar o Metro Bundler ou o build do Expo.
2. **Limpeza:** Remoção de `console.log()` de debug e comentários de rascunho.
3. **Responsividade (RNF03):** Uso correto de Flexbox e `SafeAreaView` para compatibilidade com diferentes tamanhos de tela.
4. **Padrões de Erro:** Verificação se o tratamento de erros segue os padrões da Seção 4.

## 3. Dependências Homologadas (Stack Padrão)
Para evitar que diferentes Agentes instalem bibliotecas que fazem a mesma coisa (ex: um instala `axios` e outro instala `fetch`), o projeto usará estritamente:

* **Navegação:** `@react-navigation/native` e `@react-navigation/native-stack`
* **Banco de Dados:** `expo-sqlite`
* **Ícones:** `@expo/vector-icons`
* **Requisições externas:** `fetch` API nativo do JS (se aplicável no futuro).

## 4. Depuração do Banco de Dados SQLite
Como o banco rodará embutido no celular:
* Tratamento de Erros: Todas as funções de CRUD no repositório devem envolver queries em blocos `try/catch` e imprimir o erro no console para facilitar a depuração via Metro Bundler.
