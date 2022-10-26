module.exports = app => {
    app.post('/cadastro/usuario', app.api.usuarios.salvarSenha)
    app.post('/cadastro/produto', app.api.produtos.cadastroProdutos)

    app.post('/login', app.api.autenticacao.login)
}