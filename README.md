# 🌵 Raízes do Nordeste

### Tecnologia, tradição e escala em uma experiência digital para uma rede de lanchonetes nordestinas.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![Draw.io](https://img.shields.io/badge/Draw.io-F08705?style=for-the-badge&logo=diagrams.net&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

------------------------------------------------------------------------

## 🌵 Sobre o projeto

**Raízes do Nordeste** é um projeto acadêmico de desenvolvimento
Front-end que propõe uma experiência digital para uma rede fictícia de
lanchonetes especializada em produtos da culinária nordestina.

A proposta une elementos da tradição regional a uma jornada de compra
digital simples e intuitiva. O sistema apresenta cardápios organizados
por unidade, seleção de produtos, carrinho, finalização de pedidos,
acompanhamento e recursos de fidelização.

O projeto foi desenvolvido com **HTML5, CSS3 e JavaScript**, sem
utilização de frameworks Front-end. A aplicação tem caráter
demonstrativo e permite explorar os principais fluxos de navegação e
interação de um sistema de pedidos.

> **Conceito:** múltiplos canais, uma única jornada.

## 🎯 Objetivos

-   Desenvolver uma interface web responsiva e intuitiva.
-   Representar digitalmente a experiência de uma rede de lanchonetes
    com diferentes unidades.
-   Organizar a jornada do cliente desde a escolha dos produtos até a
    retirada do pedido.
-   Aplicar conceitos de estruturação, estilização e programação
    Front-end.
-   Demonstrar funcionalidades de pedido, acompanhamento, fidelização e
    privacidade em um protótipo navegável.
-   Documentar requisitos, casos de uso, wireframes, diagramas e testes
    do projeto.


## ✨ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| Página inicial | Apresentação da marca, proposta e acesso às principais áreas |
| Unidades | Seleção da unidade de atendimento |
| Cardápio | Visualização dos produtos e opções disponíveis |
| Carrinho | Inclusão, remoção e revisão dos itens selecionados |
| Checkout | Revisão dos dados e simulação da finalização do pedido |
| Acompanhamento | Visualização das etapas e do status do pedido demonstrativo |
| Login e perfil | Interface de acesso e identificação do cliente no protótipo |
| Fidelidade | Demonstração do programa de pontos |
| Administração | Interface administrativa demonstrativa |
| Gerenciamento | Painel gerencial demonstrativo |
| Privacidade | Informações sobre privacidade e tratamento de dados no contexto do protótipo |



## 🎨 Identidade visual

A identidade visual do **Raízes do Nordeste** foi desenvolvida para transmitir referências à culinária e à cultura nordestina, combinando tons escuros, dourado e vinho. A paleta foi aplicada para criar contraste, destacar elementos importantes e manter unidade visual entre as páginas.

| Cor | Amostra | Código | Aplicação conceitual |
|---|:---:|---|---|
| Preto profundo | ![#19171B](https://img.shields.io/badge/-%20-19171B?style=flat-square) | `#19171B` | Base e contraste |
| Dourado | ![#D29F22](https://img.shields.io/badge/-%20-D29F22?style=flat-square) | `#D29F22` | Destaques e elementos de identidade |
| Cinza escuro | ![#252628](https://img.shields.io/badge/-%20-252628?style=flat-square) | `#252628` | Superfícies e áreas de conteúdo |
| Vinho | ![#5D0018](https://img.shields.io/badge/-%20-5D0018?style=flat-square) | `#5D0018` | Destaques e personalidade visual |

A interface também utiliza imagens dos produtos, mockups e elementos gráficos desenvolvidos para a apresentação da marca.


## 📁 Estrutura do projeto

A estrutura atual do código-fonte está organizada da seguinte maneira:

``` text
Raizes-do-Nordeste/
│
├── assets/
│   ├── diagramas/        # Diagramas e Wireframes do projeto
│   ├── identidade/       # Elementos visuais da marca
│   ├── mockups/          # Imagens de apresentação e mockups
│   └── produtos/         # Imagens dos produtos do cardápio
│
├── css/
│   └── style.css         # Estilos gerais da aplicação
│
├── js/
│   ├── acompanhamento.js # Interações de acompanhamento
│   ├── checkout.js       # Lógica do checkout demonstrativo
│   ├── data.js           # Dados utilizados pela aplicação
│   ├── fidelidade.js     # Funcionalidades de fidelização
│   ├── login.js          # Interações de acesso e perfil
│   └── privacy.js        # Recursos relacionados à privacidade
│
├── acompanhamento.html
├── admin.html
├── cardapio.html
├── carrinho.html
├── checkout.html
├── fidelidade.html
├── gerente.html
├── index.html
├── login.html
├── privacidade.html
├── unidades.html
│
└── README.md
```

## 💻 Como executar localmente

O projeto utiliza tecnologias nativas da Web e não exige instalação de
frameworks ou dependências para sua execução básica.

1.  Clone o repositório:

``` bash
git clone https://github.com/Brunex-Alado/RU4961408-Projeto-Front-End
```

2.  Acesse a pasta do projeto:

``` bash
cd https://github.com/Brunex-Alado/RU4961408-Projeto-Front-End
```

3.  Abra a pasta no Visual Studio Code.

4.  Execute o arquivo `index.html` no navegador. Se preferir, utilize a
    extensão **Live Server** do Visual Studio Code para iniciar um
    servidor local.


## 💾 Persistência e funcionamento

O protótipo utiliza o **LocalStorage do navegador** para manter
informações necessárias à demonstração dos fluxos, como dados de
navegação, seleção de unidade, carrinho, pedido e recursos de
fidelização.

Esse armazenamento é local ao navegador e não representa uma base de
dados centralizada. Por isso, os dados não devem ser considerados
sincronizados entre diferentes dispositivos ou usuários.

## 🧩 Arquitetura e documentação

Além da implementação, o projeto possui materiais de análise e modelagem
que registram as decisões e os fluxos da solução.

A documentação técnica e acadêmica está organizada no repositório em uma
pasta própria, contemplando:

-   **Análise de requisitos:** requisitos funcionais e não funcionais.
-   **Wireframes:** representações de baixa fidelidade das interfaces
    mobile e desktop, elaboradas no Figma.
-   **Diagrama de Casos de Uso:** atores e funcionalidades previstas
    para o sistema.
-   **Diagrama da Jornada do Usuário:** etapas percorridas pelo cliente
    durante a experiência de compra.
-   **Descrição dos Casos de Uso:** detalhamento dos fluxos principais,
    pré-condições e possíveis exceções.
-   **Plano de testes:** cenários, procedimentos e resultados obtidos na
    validação do protótipo.
-   **Relatório final:** documento acadêmico consolidando análise,
    desenvolvimento, modelagem e resultados.



## 🧪 Plano de testes

A validação do protótipo está organizada em sete cenários principais. Os testes devem ser executados manualmente no navegador, registrando o resultado observado e, quando possível, uma captura de tela como evidência.

| Código | Cenário | O que verificar |
|---|---|---|
| CT01 | Navegação, seleção de unidade e cardápio | Acesso às páginas, seleção da unidade e apresentação dos produtos correspondentes |
| CT02 | Carrinho e validação do pedido | Inclusão, alteração e remoção de itens; revisão dos dados antes de avançar |
| CT03 | Pagamento simulado — sucesso e falha | Comportamento da interface nos cenários de confirmação e falha simulada |
| CT04 | Acompanhamento do pedido | Exibição das etapas e do status demonstrativo do pedido |
| CT05 | Perfil, consentimento, privacidade e fidelidade | Interações de perfil, escolha de consentimento, acesso às informações de privacidade e demonstração dos pontos |
| CT06 | Responsividade das telas principais | Adaptação do layout em diferentes larguras de tela, especialmente celular e desktop |
| CT07 | Usabilidade e compatibilidade básica | Clareza da navegação, legibilidade, funcionamento dos controles e abertura nos navegadores testados |

Os testes correspondem ao escopo demonstrativo do Front-end. Não representam validação de transações financeiras reais, autenticação segura no servidor, sincronização entre dispositivos ou atualização de pedidos em tempo real.


## ⚠️ Limitações do protótipo

Este projeto tem finalidade acadêmica e demonstrativa. Algumas
funcionalidades representam simulações de processos que, em um ambiente
comercial real, dependeriam de serviços externos e infraestrutura de
back-end.

-   O pagamento é simulado; não há transação financeira real nem
    integração efetiva com gateway de pagamento.
-   O armazenamento é feito localmente no navegador por meio do
    LocalStorage.
-   Não há autenticação segura com validação no servidor.
-   Não há banco de dados centralizado ou sincronização entre unidades e
    dispositivos.
-   O acompanhamento representa estados demonstrativos, sem atualização
    em tempo real por uma cozinha ou sistema externo.
-   As interfaces administrativas e gerenciais são demonstrativas.

Essas limitações delimitam o escopo da entrega Front-end e não devem ser
interpretadas como funcionalidades de uma plataforma comercial em
produção.

## 🚀 Deploy

**Demonstração online:** https://ru4961408-projeto-front-end.vercel.app

------------------------------------------------------------------------

## 📄 Licença

Este projeto está licenciado sob a licença MIT.

Consulte o arquivo [LICENSE](LICENSE) para obter mais informações.

------------------------------------------------------------------------
