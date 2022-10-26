module.exports = app => {
    app.post('/cadastro/usuario', app.api.usuarios.salvarSenha)
    //app.post('/cadastro/produto', app.api.produtos.cadastroProdutos)
    app.post('/login', app.api.autenticacao.login)

    app.route('/produto')
        .all(app.config.passaporte.authenticate())
        .post(app.api.produtos.cadastroProdutos)

    app.route('/venda')
        .all(app.config.passaporte.authenticate())
        .get(app.api.vendas.getVendas)
        .post(app.api.vendas.venda)

    // Rota para edição
    // app.route('/venda/sinalizaEntrega/:idVenda')
    //     .all(app.config.passaporte.authenticate())
    //     .put(app.api.vendas.sinalizaEnvio)
}