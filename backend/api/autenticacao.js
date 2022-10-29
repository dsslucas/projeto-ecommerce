// Chave de autenticação, que vem do .env
const { segredoAutenticacao } = require('../.env')

const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    // Assincronismo necessário pois necessita de consulta no Banco de Dados
    const login = async (req, res) => {
        // Caso não tenha e-mail ou senha
        if (!req.body.emailUsuario || !req.body.senhaUsuario) {
            return res.status(400).send("Dados incompletos.")
        }

        // Recebe o que vem da API de usuários, consultando o email (que é chave única)
        const usuario = await app.db('usuarios').where({ emailUsuario: req.body.emailUsuario }).first()

        console.log(usuario)

        // Se for válido...
        if (usuario) {
            // Recebe a senha da requisição e compara com a senha vinda da API. Se der certo, parte para uma callback.
            bcrypt.compare(req.body.senhaUsuario, usuario.senhaUsuario, (erro, match) => {
                // Caso a senha não seja válida
                if (erro || !match) {
                    return res.status(401).send("Senha inválida.")
                }

                // Deu certo.
                const payload = { idUsuario: usuario.idUsuario}

                res.json({
                    nomeUsuario: usuario.nomeUsuario,
                    emailUsuario: usuario.emailUsuario,
                    token: jwt.encode(payload, segredoAutenticacao)
                })
            })
        }

        // Caso contrário...
        else {
            res.status(400).send("O e-mail informado não está cadastrado em nosso site.")
        }
    }

    return {login}
}