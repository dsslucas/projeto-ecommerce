module.exports = app => {
    const cadastroProdutos = (req, res) => {
        app.db('produtos').insert({
            nomeProduto: req.body.nomeProduto,
            descProduto: req.body.descProduto,
            qtdProduto: req.body.qtdProduto,
            valorProduto: req.body.valorProduto,
            dataAquisicaoProduto: req.body.dataAquisicaoProduto
        })
    }

    return {cadastroProdutos}
}