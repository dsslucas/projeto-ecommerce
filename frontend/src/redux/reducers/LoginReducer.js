// Estado Inicial
const ESTADO_INICIAL = {
    email: undefined,
    nome: undefined,
    senha: undefined,
    endereco: undefined,
    cidade: undefined,
    estado: undefined,
    cep: undefined,
    isAdmin: false,

    login: [{
        email: undefined,
        senha: undefined,
        token: undefined
    }]
}

const loginReducer = (state = ESTADO_INICIAL, action) => {
    switch (action.type) {
        case 'SIGN_IN_USER':
            return console.log("Entrei no Sign In")
        case "SIGN_UP_USER":
            return console.log("Entrei no Sign Up")
        default:
            return state
    }
}

export default loginReducer