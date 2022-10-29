// Pega as datas e horários e formata
const moment = require('moment')

module.exports = app => {
    const venda = async (req, res) => {
        const compras = req.body.compras

        if (compras.some(compra => compra.quantidade <= 0)) { //mínimo de produtos é 1
            res.status(404).json('min compras')
            return
        }

        if(compras.map(compra => compra.idProduto).length !== new Set(compras.map(compra => compra.idProduto)).size) { //não pode haver duplicatas
            res.status(404).json('id produto duplicado')
            return
        }

        //Busca todos os produtos listados no BD e garante que há estoque.
        const produtosPromises = await compras.map(async compra => {
            return await app.db('produtos')
                .where({ idProduto: compra.idProduto })
                .where('qtdProduto', '>=', compra.quantidade)
                .first()
                .catch((erro) => res.status(400).json(erro))
        })

        const produtos = await Promise.all(produtosPromises)
        if (produtos.some(produto => !produto)) { //produto precisa existir
            res.status(404).json('produto nao encontrado')
            return
        }

        //Calcula a soma total de todos os produtos
        const total = produtos.reduce((previousValue, produto) => {
            const compra = compras.find(x => x.idProduto == produto.idProduto)
            return previousValue + produto.valorProduto * compra.quantidade
        }, 0.0)

        //Cria uma venda
        const vendas = await app.db('vendas')
            .insert({
                idUsuario: req.user.idUsuario,
                dataVenda: new Date(),
                valorFrete: 25.99,
                valorTotal: total,
                metodoPagamento: req.body.metodoPagamento
            })
            .returning('idVenda')
        
        await Promise.all(produtos.map(async produto => {
            const compra = compras.find(x => x.idProduto == produto.idProduto)
            await app.db('produtos')
                .where({ idProduto: produto.idProduto })
                .decrement('qtdProduto', compra.quantidade)

            await app.db('produto_carrinho')
                .insert({
                    idVenda: vendas[0],
                    idProduto: compra.idProduto,
                    qtdProduto: compra.quantidade,
                    valorProduto: produto.valorProduto
                })
        }))
        res.status(200).json('kdopqwkjgnf')
    }

    // Pega a lista dos detalhes da venda
    const getVendaEspecifica = async (req, res) => {
        const venda = await app.db('vendas')
            .where({ idVenda: req.params.id })
            .first()

        if(!venda) {
            res.status(404).json('venda nao encontrada')
            return
        }

        const produtos = await app.db('produto_carrinho')
            .where({ idVenda: req.params.id })
        
        venda.produtos = produtos
        res.status(200).json(venda)
    }

    // Pega a lista das vendas
    const getVendasGerais = (req, res) => {
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

    return { venda, getVendaEspecifica, getVendasGerais, sinalizaEntrega }
}