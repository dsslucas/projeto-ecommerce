# Projeto E-commerce: Marama Lingeries
Trabalho da Larissa Pires que consiste em um e-commerce da Marama Lingeries, um comércio já existente e que comercializa roupas íntimas.

## Funcionalidades
### Para o usuário (apenas quando estiver logado)
- Compra produtos
- Tem acesso ao carrinho, aonde pode incrementar, decrementar ou retirar o item da lista
- Tem acesso à lista de compras, ordenada de forma decrescente (as compras mais recentes são exibidas antes). Aqui, o usuário pode sinalizar troca ou devolução
- Consegue alterar os seus dados

### Para o administrador
- Tem acesso a um relatório simples
- Tem acesso ao controle de estoque, onde consegue cadastrar, deletar, editar e ter a listagem de um produto
- Tem acesso ao controle de usuários. Além da listagem, consegue editar os dados e deletar um usuário
- Tem acesso ao relatório de vendas, obtendo dados sobre o usuário, valores e a relação de produtos obtidos. Ao administrador, cabe apenas a sinalização de envio da compra
- Para todas as páginas, os dados são atualizadas a cada 30 segundos

## Recursos utilizados
### Backend
- Bcrypt (criptografia de senha)
- Body-Parser (criar um parse com base na requisição)
- Consign (carregador das funcionalidades)
- Express (serviço baseado em JS)
- Knex (ajuda nas consultas e na conexão com o banco de dados)
- Moment (para horários)
- Jwt
- Passport (credenciais)

### Frontend
- React.js (framework principal onde a aplicação foi realizada)
- Redux (gerenciador de estado, que armazena dados do login e itens do carrinho)
- Axios (realiza requisições para o servidor back-end da aplicação)
- Material UI (componentes estilizados)
- Moment (formata datas obtidas pelo backend, importante para as vendas)
- React Router Dom V6 (criação de rotas do site)

## Instalação
Antes, **é necessário ter o [Node](https://nodejs.org/en/) (versão LTS) e o [Postgres](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) (utilizamos a versão 14.6) instalados na máquina**.

Também é necessário **instalar o Npm de forma global em sua máquina**. Digite:
```
npm install -g npm
```

**Clone o repositório**:
```
git clone https://github.com/dsslucas/projeto-ecommerce.git
```

Dentro da pasta `backend`, **crie um arquivo `.env` e copie as seguintes linhas**:
```
module.exports = {
    segredoAutenticacao: 'MaramaLingeries2020'
}
```

Após clonar este repositório, **acesse três abas de um terminal** de sua preferência e siga os passos:
### Backend
- No primeiro terminal, acesse a pasta `backend` e digite `npm i` para instalação das dependências
- Após a instalação, digite `npm start`

### Frontend
- No segundo terminal, acesse a pasta `frontend` e digite `npm i` para instalação das dependências
- Após a instalação, digite `npm start`

### Banco de Dados
- No terceiro terminal, não é necessário acessar uma pasta. Digite `psql -U [USUARIO] (no nosso, criei com nome "postgres"` durante o ato de instalação do Postgres
- Crie um banco de dados: `CREATE DATABASE ecommerce`
- Conectar ao banco de dados (ou database): `\c ecommerce`
- Com isso, o banco de dados deve ser executado.

## Resultado final

### Acesso geral

Login
![Login](/prints/web/login.png)

Cadastro de usuário
![Cadastro de usuário](/prints/web/cadastro-usuario.png)

#### Produtos
Tela para Tablets e Desktops na horizontal
![Produtos-Desktop](/prints/web/produtos.png)

Tela para dispositivos Mobile
![Produtos-Mobile](/prints/mobile/produtos_mobile.png)

#### Carrinho
Tela para Tablets e Desktops na horizontal
![Carrinho-Desktop](/prints/web/carrinho.png)

Tela para dispositivos Mobile
![Carrinho-Mobile](/prints/mobile/carrinho.png)

#### Lista de compras
Tela para Tablets e Desktops na horizontal
![Lista de Compras-Desktop](/prints/web/historico-compras.png)

Tela para dispositivos Mobile
![Lista de Compras-Mobile](/prints/mobile/produtos_mobile.png)

#### Área para edição de dados do usuário
Tela para Tablets e Desktops na horizontal
![Usuario-Desktop](/prints/web/usuario.png)

Tela para dispositivos Mobile
![Usuario-Mobile](/prints/mobile/usuario.png)

### Acesso restrito ao Administrador

#### Relatório
Tela para Tablets e Desktops na horizontal
![Relatorio-Desktop](/prints/web/relatorio.png)

Tela para dispositivos Mobile
![Relatorio-Mobile](/prints/mobile/relatorio.gif)

#### Usuários
Tela para Tablets e Desktops na horizontal
![Usuarios-Desktop](/prints/web/usuarios.png)

Tela para dispositivos Mobile
![Usuarios-Mobile](/prints/mobile/usuarios.gif)

#### Estoque
Tela para Tablets e Desktops na horizontal
![Estoque-Desktop](/prints/web/estoque.png)

Tela para dispositivos Mobile
![Estoque-Mobile](/prints/mobile/estoque.gif)

##### Cadastro de produto
![Estoque-Cadastro](/prints/web/cadastro-produto.png)

#### Vendas
Tela para Tablets e Desktops na horizontal
![Vendas-Desktop](/prints/web/venda-detalhe.png)

Tela para dispositivos Mobile
![Vendas-Mobile](/prints/mobile/vendas.gif)

## Futuras melhorias 
- Identificação que o usuário está logado no topo da página
- Indicação para uma lista de produtos vazia
- Meios para que produtos indisponíveis e com 30 dias sem alteração não sejam exibidos. Com isso, podemos desabilitar a remoção
- Adição de imagens diretamente ao banco de dados sem o uso de URL
- Alterações na entrega (atualmente não existe meios para sinalizar isto)
- Sinalização para trocas e devoluções **apenas** quando a entrega for realizada e com prazo de 07 dias