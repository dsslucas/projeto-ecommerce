// Criptografa a senha do usuário
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    // Callback é necessário por ser assíncrono
    const obterHash = (password, callback) => {
        // Gera dez interações, QUE É O PADRÃO
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        })
    }

    const getUsuarios = (req, res) => {
        app.db('usuarios')
            .orderBy('idUsuario')
            .then((resultado) => res.json(resultado))
            .catch((erro) => res.status(400).json(erro))
    }

    const salvarSenha = (req, res) => {
        obterHash(req.body.senhaUsuario, hash => {
            // Aqui, não é armazenado a senha limpa, mas sim um hash calculado
            const password = hash

            if (req.body.emailUsuario.includes('@') && req.body.emailUsuario.includes(".")) {
                // Armazena no Banco
                app.db('usuarios').insert({
                    emailUsuario: req.body.emailUsuario.toLowerCase(),
                    nomeUsuario: req.body.nomeUsuario,
                    senhaUsuario: password,
                    enderecoUsuario: req.body.enderecoUsuario,
                    cidadeUsuario: req.body.cidadeUsuario,
                    estadoUsuario: req.body.estadoUsuario,
                    cepUsuario: req.body.cepUsuario,
                    isAdmin: req.body.isAdmin
                })
                    .then(() => res.status(204).send("Usuário cadastrado"))
                    .catch(erro => res.status(400).json(erro))
            }
            else {
                res.status(400).send("O e-mail informado não está formatado.")
            }
        })
    }

    const editarUsuario = (req, res) => {
        app.db('usuarios')
            .where({ idUsuario: req.user.idUsuario })
            .update(req.body)
            .then(() => res.status(204).send("Alteração realizada!"))
            .catch((erro) => res.status(204).json(erro))
    }

    const deletarUsuario = (req, res) => {
        app.db('usuarios')
            .where({ idUsuario: req.params.id })
            .del()
            .then((rowsDeleted) => {
                if (rowsDeleted > 0) {
                    res.status(204).send("O usuário foi excluído.")
                }
                else {
                    res.status(400).send("Usuário não foi encontrado em nossa base de dados.")
                }
            })
            .catch((erro) => res.status(400).json(erro))
    }

    return { getUsuarios, salvarSenha, editarUsuario, deletarUsuario }
}