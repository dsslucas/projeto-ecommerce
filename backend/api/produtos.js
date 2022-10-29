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

    const getProduto = (req, res) => {
        // console.log(req.user)
        app.db('produtos')
            .where({ idProduto: req.params.id })
            .first()
            .then((resultado) => res.json(resultado))
            .catch((erro) => res.status(400).json(erro))
    }

    const getProdutos = (req, res) => {
        // console.log(req.user)
        app.db('produtos')
            .orderBy('idProduto')
            .then((resultado) => res.json(resultado))
            .catch((erro) => res.status(400).json(erro))
    }

    const editarProduto = (req, res) => {
        app.db('produtos')
            .where({idProduto: req.params.id})
            .update(req.body)
            .then(() => res.status(204).send("Alteração realizada!"))
            .catch((erro) => res.status(204).json(erro))
    }

    const deletarProduto = (req, res) => {
        app.db('produtos')
        .where({idProduto: req.params.id})
        .del()
        .then((rowsDeleted) => {
            if (rowsDeleted > 0) {
                res.status(204).send("O produto foi excluído.")
            }
            else {
                res.status(400).send("O produto não foi encontrado em nossa base de dados.")
            }
        })
        .catch((erro) => res.status(400).json(erro))
    }

    return { cadastroProdutos, getProduto, getProdutos, editarProduto, deletarProduto }
}