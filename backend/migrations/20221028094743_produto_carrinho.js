
exports.up = function(knex) {
    return knex.schema.createTable('produto_carrinho', table => {
        table.increments('id').primary()
        table.integer('idVenda')
        table.integer('idProduto')
        table.integer('qtdProduto').notNull()
        table.double('valorProduto').notNull()
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('produto_carrinho')
};
