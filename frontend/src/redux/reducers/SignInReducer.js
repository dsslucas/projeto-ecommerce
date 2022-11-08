// Estado Inicial
const ESTADO_INICIAL = {
    email: undefined,
    senha: undefined,
    token: undefined
}

const signInReducer = (state = ESTADO_INICIAL, action) => {
    switch (action.type) {
        case 'SIGN_IN_USER':
            return console.log("Entrei no Sign In")
        default:
            return state
    }
}

export default signInReducer