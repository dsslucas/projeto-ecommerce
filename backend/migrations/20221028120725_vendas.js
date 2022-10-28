exports.up = function(knex) {
    return knex.schema.createTable('vendas', table => {
        // table.integer('idVenda').references('idVenda').inTable('produto_carrinho').notNull()
        table.increments('idVenda').primary()
        table.datetime('dataVenda').notNull()
        table.string('metodoPagamento').notNull()
        table.datetime('dataEnvio')
        table.datetime('dataEntrega')
        table.string('statusEntrega').notNull()
        table.integer('idProduto').references('idProduto').inTable('produtos').notNull()
        table.integer('qtdProduto').notNull()
        table.double('valorProduto').notNull()
        table.boolean('trocaProduto').notNull()
        table.boolean('devolucaoProduto').notNull()
        table.double('valorFrete').notNull()
        table.double('valorTotal').notNull()
        table.boolean('produtoEntregue').defaultTo(false).notNull()
        table.integer('idUsuario').references('idUsuario').inTable('usuarios').notNull()
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('vendas')
};