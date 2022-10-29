exports.up = function(knex) {
    return knex.schema.createTable('vendas', table => {
        // table.integer('idVenda').references('idVenda').inTable('produto_carrinho').notNull()
        table.increments('idVenda').primary()
        table.integer('idUsuario').references('idUsuario').inTable('usuarios').notNull()
        
        table.datetime('dataVenda').notNull()

        //entrega
        table.datetime('dataEnvio')
        table.datetime('dataEntrega')
        table.double('valorFrete').notNull()
        table.string('statusEntrega').default('EM_PROCESSAMENTO').notNull()

        //flags
        table.boolean('troca').default(false).notNull()
        table.boolean('devolucao').default(false).notNull()

        //pagamento
        table.string('metodoPagamento').notNull()
        table.double('valorTotal').notNull()
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('vendas')
};