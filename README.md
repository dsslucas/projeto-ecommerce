# Projeto E-commerce
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
    segredoAutenticacao: 'TesteTrabalhoProjecao'
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

## Futuras melhorias 
- Identificação que o usuário está logado no topo da página
- Indicação para uma lista de produtos vazia
- Meios para que produtos indisponíveis e com 30 dias sem alteração não sejam exibidos. Com isso, podemos desabilitar a remoção
- Adição de imagens diretamente ao banco de dados sem o uso de URL
- Alterações na entrega (atualmente não existe meios para sinalizar isto)
- Sinalização para trocas e devoluções **apenas** quando a entrega for realizada e com prazo de 07 dias