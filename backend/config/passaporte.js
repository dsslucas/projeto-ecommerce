const { segredoAutenticacao } = require('../.env')

// Arquivo de segurança
const passaporte = require('passport')
const passaporteJwt = require('passport-jwt')

// Destructuring do passport JWT
// ExtractJwt é o responsável por extrair do cabeçalho da requisição, incluindo o token
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const parametros = {
        segredoChave: segredoAutenticacao,

        // Onde está o JWT a partir do Request? (Header, body...)
        requisicaoJwt: ExtractJwt.fromAuthHeaderAsBearerToken
    }

    const estrategia = new Strategy(parametros, (payload, concluido) => {
        // Acessa o usuário no BD
        app.db('usuarios').where({ idUsuario: payload.idUsuario }).first()
            .then((usuario) => {
                if (usuario) {
                    // O usuário está presente
                    concluido(null, {
                        idUsuario: usuario.idUsuario,
                        emailUsuario: usuario.emailUsuario
                    })
                }
                else {
                    // Barra o usuário por não estar autenticado
                    concluido(null, false)
                }
            })
            .catch((erro) => concluido(erro, false))
    })

    passaporte.use(estrategia)

    return {
        initialize: () => passaporte.initialize(),
        authenticate: () => passaport.authenticate('jwt', { session: false })
    }
}