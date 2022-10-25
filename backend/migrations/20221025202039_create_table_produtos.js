/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('produtos', table => {
        table.increments('idProduto').primary()
        table.string('nomeProduto').notNull()
        table.string('descProduto').notNull()
        table.integer('qtdProduto').notNull()
        table.double('valorProduto').notNull()
        table.datetime('dataAquisicaoProduto').notNull()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('produtos')
};
