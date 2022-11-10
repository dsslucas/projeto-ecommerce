// Estado Inicial
const ESTADO_INICIAL = {
    email: null,
    senha: null,
    token: null
}

const signInReducer = (state = ESTADO_INICIAL, action) => {
    switch (action.type) {
        case 'SIGN_IN_USER':
            return action.payload
        default:
            return state
    }
}

export default signInReducer