// Pega as datas e horários e formata
const moment = require('moment')

module.exports = app => {
    const venda = async (req, res) => {
        const compras = req.body.compras

        // Frete
        var valorFrete

        // Validação sobre o valor do frete
        // Norte
        if (req.user.estadoUsuario === 'AC') valorFrete = 38.50
        if (req.user.estadoUsuario === "AP") valorFrete = 38.50
        if (req.user.estadoUsuario === "AM") valorFrete = 34.20
        if (req.user.estadoUsuario === "PA") valorFrete = 33.50
        if (req.user.estadoUsuario === 'RO') valorFrete = 32.20
        if (req.user.estadoUsuario === "RR") valorFrete = 40.50
        if (req.user.estadoUsuario === "TO") valorFrete = 28.00

        // Nordeste
        if (req.user.estadoUsuario === 'AL') valorFrete = 40.50
        if (req.user.estadoUsuario === "BA") valorFrete = 32.40
        if (req.user.estadoUsuario === "CE") valorFrete = 38.50
        if (req.user.estadoUsuario === "MA") valorFrete = 38.50
        if (req.user.estadoUsuario === "PB") valorFrete = 39.10
        if (req.user.estadoUsuario === 'PE') valorFrete = 36.20
        if (req.user.estadoUsuario === "PI") valorFrete = 37.40
        if (req.user.estadoUsuario === "RN") valorFrete = 38.00
        if (req.user.estadoUsuario === 'SE') valorFrete = 36.60

        // Centro-Oeste
        if (req.user.estadoUsuario === 'DF') valorFrete = 12.00
        if (req.user.estadoUsuario === "GO") valorFrete = 16.50
        if (req.user.estadoUsuario === "MT") valorFrete = 20.40
        if (req.user.estadoUsuario === "MS") valorFrete = 21.50

        // Sudeste
        if (req.user.estadoUsuario === 'SP') valorFrete = 21.50
        if (req.user.estadoUsuario === "RJ") valorFrete = 25.00
        if (req.user.estadoUsuario === "MG") valorFrete = 20.40
        if (req.user.estadoUsuario === "ES") valorFrete = 25.00

        // Sul
        if (req.user.estadoUsuario === 'PR') valorFrete = 40.00
        if (req.user.estadoUsuario === "SC") valorFrete = 41.00
        if (req.user.estadoUsuario === "RS") valorFrete = 42.00

        if (compras.some(compra => compra.quantidade <= 0)) { //mínimo de produtos é 1
            res.status(404).json('Mínimo de compras.')
            return
        }

        if (compras.map(compra => compra.idProduto).length !== new Set(compras.map(compra => compra.idProduto)).size) { //não pode haver duplicatas
            res.status(404).json('ID do produto está duplicado.')
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
            res.status(404).json('Produto não encontrado.')
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
                subtotal: total,
                valorFrete: valorFrete,
                valorTotal: total + valorFrete,
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
                    valorProduto: produto.valorProduto,
                    subtotalProduto: (compra.quantidade * produto.valorProduto)
                })
        }))
        res.status(200).json('A venda foi realizada com sucesso!')
    }

    // Pega a lista dos detalhes da venda
    const getVendaEspecifica = async (req, res) => {
        const venda = await app.db('vendas')
            .where({ idVenda: req.params.id })
            .first()

        if (!venda) {
            res.status(404).json('A venda não foi encontrada')
            return
        }

        const produtos = await app.db('produto_carrinho')
            .where({ idVenda: req.params.id })

        const usuario = await app.db('usuarios')
            .where({ idUsuario: venda.idUsuario })
            .first()

        venda.produtos = produtos
        venda.usuario = usuario
        res.status(200).json(venda)
    }

    // Pega a lista das vendas
    const getVendasGerais = (req, res) => {
        // Pega a data que vem da requisição, caso contrário pega a data atual
        const date = req.query.date ? req.query.date : moment().endOf('day').toDate()

        app.db('vendas')
            .orderBy('idVenda')
            .then((vendasRealizadas) => res.json(vendasRealizadas))
            .catch((erro) => res.status(400).json(erro))
    }

    const getVendasPeloUsuario = (req, res) => {
        app.db('vendas')
            .where({ idUsuario: req.user.idUsuario })
            .then((vendasRealizadas) => res.json(vendasRealizadas))
            .catch((erro) => res.status(400).json(erro))
    }

    const editarVenda = (req, res) => {
        console.log(req.params.id)
        app.db('vendas')
            .where({ idVenda: req.params.id })
            .update(req.body)
            .then(() => res.status(200).send("Alteração realizada!"))
            .catch((erro) => res.status(400).json(erro))
    }

    const devolucaoCompra = (req, res) => {
        app.db('vendas')
            .orderBy({ idVenda: req.body.idVenda })
            .update(req.body)
            .then(() => res.status(200).send("Alteração realizada!"))
            .catch((erro) => res.status(400).json(erro))
    }

    const trocaCompra = (req, res) => {
        app.db('vendas')
            .orderBy({ idVenda: req.body.idVenda })
            .update(req.body)
            .then(() => res.status(200).send("Alteração realizada!"))
            .catch((erro) => res.status(400).json(erro))
    }

    return { venda, getVendaEspecifica, getVendasGerais, devolucaoCompra, trocaCompra, getVendasPeloUsuario, editarVenda }
}