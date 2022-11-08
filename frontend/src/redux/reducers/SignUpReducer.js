const ESTADO_INICIAL = {
    email: undefined,
    nome: undefined,
    senha: undefined,
    endereco: undefined,
    cidade: undefined,
    estado: undefined,
    cep: undefined,
    isAdmin: false,
}

const signUpReducer = (state = ESTADO_INICIAL, action) => {
    switch (action.type) {
        case 'SIGN_UP_USER':
            return console.log("Entrei no Sign Up")
        default:
            return state
    }
}

export default signUpReducer