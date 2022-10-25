/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('usuarios', table => {
        table.increments('idUsuario').primary()
        table.string('emailUsuario').notNull().unique()
        table.string('nomeUsuario').notNull()
        table.string('senhaUsuario').notNull()
        table.string('enderecoUsuario').notNull()
        table.string('cepUsuario').notNull()
        table.boolean('isAdmin').notNull()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('usuarios')
};
