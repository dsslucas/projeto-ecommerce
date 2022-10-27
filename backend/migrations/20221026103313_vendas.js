
exports.up = function(knex) {
    return knex.schema.createTable('vendas', table => {
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
        table.boolean('produtoEntregue').notNull()
        table.integer('idUsuario').references('idUsuario').inTable('usuarios').notNull()
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('vendas')
};
