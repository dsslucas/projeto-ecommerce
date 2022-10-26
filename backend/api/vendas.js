// Pega as datas e horários e formata
const moment = require('moment')

module.exports = app => {
    const venda = (req, res) => {
        // if(!req.body.metodoPagamento.trim()) return res.status(400).send("O método de pagamento é obrigatório!")

        app.db('vendas').insert(req.body)
            .then(() => res.status(204).send("Venda efetuada"))
            .catch(erro => res.status(400).json(erro))
    }

    // Pega a lista das vendas
    const getVendas = (req, res) => {
        // Pega a data que vem da requisição, caso contrário pega a data atual
        const date = req.query.date ? req.query.date : moment().endOf('day').toDate()

        console.log(req.usuario.idUsuario)
        // Consulta no banco de dados
        app.db('vendas')
            .where({ idUsuario: req.usuario.idUsuario })
            .orderBy('dataEnvio')
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