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

    const salvarSenha = (req, res) => {
        obterHash(req.body.senhaUsuario, hash => {
            // Aqui, não é armazenado a senha limpa, mas sim um hash calculado
            const password = hash

            // Armazena no Banco
            app.db('usuarios').insert({
                emailUsuario: req.body.emailUsuario,
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
        })
    }

    return { salvarSenha }
}