import { DialogActions } from "@mui/material"

// Estado Inicial
const ESTADO_INICIAL = []

const carrinhoReducer = (state = ESTADO_INICIAL, action) => {
    var novaLista = undefined

    if(action.payload) var {carrinho, id} = action.payload

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
            // const {carrinho, id} = action.payload
            novaLista = carrinho.map((item) => {
                if (item.id === id) item.qtd = item.qtd + 1
                return item
            })
            return novaLista
        case 'RETIRA_ITEM_CARRINHO':
            // const {carrinho, id} = action.payload
            return state
        case "RETIRA_QTD_ITEM_CARRINHO":
            novaLista = carrinho.map((item) => {
                if (item.id === id) item.qtd = item.qtd - 1
                return item
            })
            return novaLista
        default:
            return state
    }
}

export default carrinhoReducer