// Pega as datas e horários e formata
const moment = require('moment')

module.exports = app => {
    const venda = (req, res) => {
        // if(!req.body.metodoPagamento.trim()) return res.status(400).send("O método de pagamento é obrigatório!")
        console.log(req.user)
        // if(req.body.produtos){
            // app.db('produto_carrinho')
            //     .insert(...req.body.produtos)
            //     .then(() => res.status(204).send("Produtos do carrinho cadastrados!"))
            //     .catch((erro) => res.status(400).json(erro))
        // }

        // app.db('vendas')
        //     .insert({
        //         idVenda: req.body.idVenda,
        //         dataVenda: req.body.dataVenda,
        //         metodoPagamento: req.body.metodoPagamento,
        //         statusVenda: req.body.statusVenda,
        //         valorFrete: req.body.valorFrete,
        //         valorTotal: req.body.valorTotal,
        //         produtoEntregue: req.body.produtoEntregue
        //     })
        //     .then(() => res.status(204).send("Venda efetuada"))
        //     .catch((erro) => res.status(400).json(erro))

        app.db('vendas')
            .insert({
                ...req.body,
                idUsuario: req.user.idUsuario
            })
            .then(() => res.status(204).send("Venda efetuada"))
            .catch((erro) => res.status(400).json(erro))

    }

    // Pega a lista das vendas
    const getVendas = (req, res) => {
        // Pega a data que vem da requisição, caso contrário pega a data atual
        const date = req.query.date ? req.query.date : moment().endOf('day').toDate()

        // console.log(req)
        // Consulta no banco de dados
        app.db('vendas')
            .orderBy('idVenda')
            .then((vendasRealizadas) => res.json(vendasRealizadas))
            .catch((erro) => res.status(400).json(erro))
    }

    const editaDataEnvioVenda = (req, res, dataEnvio) => {
        app.db('vendas')
            .where({ idVenda: req.params.idVenda })
            .update({ dataEnvio })
            .then(() => res.status(204).send("A data de envio do produto foi definida"))
            .catch((erro) => res.status(400).json(erro))
    }

    const sinalizaEnvio = (req, res) => {
        app.db('vendas')
            .where({ idVenda: req.params.idVenda, idUsuario: req.user.idUsuario })
    }

    // Sinaliza se o produto foi entregue, finalizando a venda
    const sinalizaEntrega = (req, res, entregue) => {
        app.db('vendas')
            .where({ idVenda: req.params.idVenda, idUsuario: req.user.idUsuario })
            .first()
            .then((venda) => {
                if (!venda) return res.status(400).send("Não existe nenhuma compra para que você possa confirmar a entrega.")

                entregue = venda.produtoEntregue ? true : false
            })
            .catch((erro) => res.status(400).json(erro))
    }

    return { venda, getVendas, sinalizaEntrega }
}