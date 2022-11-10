// Estado Inicial
const ESTADO_INICIAL = []

const carrinhoReducer = (state = ESTADO_INICIAL, action) => {
    switch (action.type) {
        case 'ADICIONA_ITEM_CARRINHO':
            return [...state, {
                id: action.payload.id,
                titulo: action.payload.titulo,
                descricao: action.payload.descricao,
                preco: action.payload.preco,
                qtd: action.payload.qtd
            }]
        case "ADICIONA_QTD_ITEM_CARRINHO":
            return console.log("Incrementei um item ao carrinho")
        case 'RETIRA_ITEM_CARRINHO':
            return console.log("Retirei um item ao carrinho")
        case "RETIRA_QTD_ITEM_CARRINHO":
            return console.log("Retirei uma unidade do item do carrinho")
        default:
            return state
    }
}

export default carrinhoReducer