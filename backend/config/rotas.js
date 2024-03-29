module.exports = app => {
    //app.post('/cadastro/usuario', app.api.usuarios.salvarSenha)
    //app.post('/cadastro/produto', app.api.produtos.cadastroProdutos)
    app.post('/login', app.api.autenticacao.login)

    app.route('/usuario')
        .post(app.api.usuarios.salvarSenha)
        .all(app.config.passaporte.authenticate())
        .get(app.api.usuarios.getUsuarios)

    app.route('/usuario/:id')
        .all(app.config.passaporte.authenticate())
        .delete(app.api.usuarios.deletarUsuario)
        .put(app.api.usuarios.editarUsuario)
        .get(app.api.usuarios.getUnicoUsuario)

    app.route('/produto')
        .get(app.api.produtos.getProdutos)
        .all(app.config.passaporte.authenticate())
        .post(app.api.produtos.cadastroProdutos)

    app.route('/produto/:id')
        .get(app.api.produtos.getProdutoId)
        .all(app.config.passaporte.authenticate())
        .put(app.api.produtos.editarProduto)
        .delete(app.api.produtos.deletarProduto)

    app.route('/venda')
        .all(app.config.passaporte.authenticate())
        .get(app.api.vendas.getVendasGerais)
        .post(app.api.vendas.venda)

    app.route('/venda/:id')
        .all(app.config.passaporte.authenticate())
        .get(app.api.vendas.getVendaEspecifica)
        .put(app.api.vendas.editarVenda)

    app.route('/venda/usuario/:id')
        .all(app.config.passaporte.authenticate())
        .get(app.api.vendas.getVendasPeloUsuario)
}