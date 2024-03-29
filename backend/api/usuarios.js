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

    const getUnicoUsuario = (req, res) => {
        app.db('usuarios')
            .where({ idUsuario: req.params.id })
            .first()
            .then((resultado) => res.json(resultado))
            .catch((erro) => res.status(204).json(erro))
    }

    const salvarSenha = (req, res) => {
        obterHash(req.body.senhaUsuario, hash => {
            // Aqui, não é armazenado a senha limpa, mas sim um hash calculado
            const password = hash

            if (req.body.emailUsuario.includes('@') && req.body.emailUsuario.includes(".") && req.body.cepUsuario.length === 8) {
                if (req.body.emailUsuario === "larissapprs@gmail.com") {
                    app.db('usuarios').insert({
                        emailUsuario: req.body.emailUsuario.toLowerCase(),
                        nomeUsuario: req.body.nomeUsuario,
                        senhaUsuario: password,
                        enderecoUsuario: req.body.enderecoUsuario,
                        cidadeUsuario: req.body.cidadeUsuario,
                        estadoUsuario: req.body.estadoUsuario,
                        cepUsuario: req.body.cepUsuario,
                        isAdmin: true
                    })
                        .then(() => res.status(204).send("Usuário cadastrado"))
                        .catch(erro => res.status(400).json(erro))
                }
                else {
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
            }
            else {
                res.status(400).send("O e-mail informado não está formatado.")
            }
        })
    }

    const editarUsuario = (req, res) => {
        if (req.body.emailUsuario.includes('@') && req.body.emailUsuario.includes(".") && req.body.cepUsuario.length === 8) {
            app.db('usuarios')
                .where({ idUsuario: req.params.id })
                .update(req.body)
                .then(() => res.status(204).send("Alteração realizada"))
                .catch((erro) => res.status(400).json(erro))
        }
        else {
            res.status(400).send("Os dados informados estão incorretos.")
        }
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

    // PARTE DO ADMIN
    const adminConsultaUsuario = (req, res) => {
        app.db('usuarios')
            .where({ idUsuario: req.params.id })
            .first()
            .then((resultado) => res.json(resultado))
            .catch((erro) => res.status(204).json(erro))
    }

    // const adminEditaUsuario = (req, res) => {
    //     if (req.body.emailUsuario.includes('@') && req.body.emailUsuario.includes(".") && req.body.cepUsuario.length === 8) {
    //         app.db('usuarios')
    //             .where({ idUsuario: req.params.id })
    //             .update(req.body)
    //             .then(() => res.status(204).send("Alteração realizada"))
    //             .catch((erro) => res.status(400).json(erro))
    //     }
    //     else {
    //         res.status(400).send("Os dados informados estão incorretos.")
    //     }
    // }

    return { getUsuarios, salvarSenha, editarUsuario, deletarUsuario, getUnicoUsuario }
}