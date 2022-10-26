// Faz um parse no body da requisição
const bodyParser = require('body-parser')

// Habilita requisições de origens diferentes.
const cors = require('cors')

module.exports = app => {
    // Interpreta qualquer JSON que vier na requisição. App vem do Express, no Index
    app.use(bodyParser.json())

    app.use(cors({
        origin: '*'
    }))
}