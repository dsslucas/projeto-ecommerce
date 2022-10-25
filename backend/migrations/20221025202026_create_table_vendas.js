/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('vendas', table => {
    table.integer('idVenda').primary()
    table.datetime('dataVenda').notNull()
    table.string('metodoPagamento').notNull()
    table.datetime('dataEnvio')
    table.datetime('dataEntrega')
    table.string('statusEntrega').notNull()

    table.increments('idProduto').references('idProduto').inTable('produtos').notNull()
    table.string('nomeProduto').references('nomeProduto').inTable('produtos').notNull()
    table.integer('qtdProduto').references('qtdProduto').inTable('produtos').notNull()
    table.double('valorProduto').references('valorProduto').inTable('produtos').notNull()
    table.boolean('trocaProduto').notNull()
    table.boolean('devolucaoProduto').notNull()
    table.float('valorFrete').notNull()

    table.increments('idUsuario').references('idUsuario').inTable('usuarios').notNull()
    table.string('nomeUsuario').references('nomeUsuario').inTable('usuarios').notNull()
    table.string('cepUsuario').references('cepUsuario').inTable('usuarios').notNull()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('vendas')
};
