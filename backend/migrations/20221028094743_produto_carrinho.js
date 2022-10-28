exports.up = function(knex) {
    // return knex.schema.alterTable('produto_carrinho', table => {
    //     table.dropColumn('idVenda')
    //     table.string('first_name');
    //     // table.dropColumn('idProduto')
    //     // table.dropColumn('qtdProduto').notNull()
    //     // table.dropColumn('valorProduto').notNull()
    //     // table.dropColumn('subtotalProduto').notNull()
    //     // table.dropColumn('trocaProduto').notNull()
    //     // table.dropColumn('devolucaoProduto').notNull()
    //   })
};

exports.down = function(knex) {
    // return knex.schema.alterTable('produto_carrinho')
};
