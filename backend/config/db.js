// Onde está a configuração para a conexão com o banco de dados
const config = require('../knexfile.js')

// Inicia o Knex
const knex = require('knex')(config)

knex.migrate.latest([config])

module.exports = knex