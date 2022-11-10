export const AdicionaItemCarrinho = (event) => ({
    type: "ADICIONA_ITEM_CARRINHO",
    payload: event
})

export const AdicionaQtdItemCarrinho = (event) => ({
    type: "ADICIONA_QTD_ITEM_CARRINHO",
    payload: event
})

export const RetiraItemCarrinho = (event) => ({
    type: "RETIRA_ITEM_CARRINHO",
    payload: event
})

export const RetiraQtdItemCarrinho = (event) => ({
    type: "RETIRA_QTD_ITEM_CARRINHO",
    payload: event
})