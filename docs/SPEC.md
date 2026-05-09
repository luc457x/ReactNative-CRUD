Objetivos do Projeto
    • Entregar um sistema de controle de estoque digital desenvolvido em React Native com JS e banco de dados SQLite.
    • Permitir login de usuários, cadastro de produtos, controle de quantidades e visão geral do estoque.

Escopo
    • Desenvolvimento de um aplicativo mobile multiplataforma (Android e iOS).
    • Integração com banco de dados SQLite.
    • Interface simples e intuitiva para funcionários.
    • Funcionalidades de login, cadastro, exclusão e atualização de produtos.
    • Controle de quantidade de estoque com botões de incremento/decremento.

Descrição do Problema
O controle de estoque atual é feito manualmente em papel, sujeito a erros e perdas de informação. Não há relatórios claros, dificultando a reposição e aumentando perdas por vencimento. O projeto busca resolver essas falhas com uma solução digital.

Descrição da Solução Proposta
Será desenvolvido um aplicativo em React Native com JS e com banco de dados SQLite. O sistema terá:
    • Tela de login para usuários cadastrados.
    • Cadastro de produtos com atributos: ID, nome, categoria, quantidade, preço unitário e validade.
    • Visão geral do estoque com listagem de produtos.
    • Botões para aumentar/diminuir quantidade.
    • Exclusão e atualização de produtos.
    • Interface simples e intuitiva para uso em tablets ou celulares.

Requisitos Funcionais
    • RF01: Permitir o login de usuários cadastrados.
    • RF02: Permitir o cadastro, atualização e exclusão de produtos (CRUD completo).
    • RF03: Exibir visão geral do estoque com listagem de todos os produtos.
    • RF04: Oferecer botões de acesso rápido para incrementar/decrementar a quantidade de um produto.
    • RF05: Permitir o cadastro de usuários administradores/funcionários para acesso ao sistema.

Regras de Negócio
    • Cada produto deve ter ID único.
    • Produtos com mesmo nome mas validade diferente devem ser registrados separadamente.
    • Usuários devem estar cadastrados para acessar o sistema.
    • Alterações no estoque devem ser registradas imediatamente no banco de dados.

Diagrama de Casos de Uso (Visão Geral)
*(Veja o arquivo `UML/use_case.puml` para o diagrama detalhado)*

Diagrama de Classes
*(Veja o arquivo `UML/class.puml` para o diagrama de classes detalhado)*

Requisitos Não Funcionais
    • RNF01: O sistema deve ser desenvolvido em React Native utilizando JavaScript.
    • RNF02: O banco de dados deve ser SQLite embutido (funcionamento local/offline).
    • RNF03: A interface deve ser multiplataforma (Android e iOS) e adaptável a tablets e celulares.

Restrições do Projeto
    • Não haverá integração externa com sistemas de fornecedores ou emissão de notas fiscais.