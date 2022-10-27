
exports.up = function(knex) {
    return knex.schema.createTable('produtos', table => {
        table.increments('idProduto').primary()
        table.string('nomeProduto').unique().notNull()
        table.string('descProduto').notNull()
        table.integer('qtdProduto').notNull()
        table.double('valorProduto').notNull()
        table.datetime('dataAquisicaoProduto').notNull()
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('produtos')
};
