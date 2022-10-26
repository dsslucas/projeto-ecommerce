module.exports = app => {
    const cadastroProdutos = (req, res) => {
        app.db('produtos').insert({
            nomeProduto: req.body.nomeProduto,
            descProduto: req.body.descProduto,
            qtdProduto: req.body.qtdProduto,
            valorProduto: req.body.valorProduto,
            dataAquisicaoProduto: req.body.dataAquisicaoProduto
        })
            .then(() => res.status(204).send("Produto cadastrado"))
            .catch(erro => res.status(400).json(erro))
    }

    return { cadastroProdutos }
}