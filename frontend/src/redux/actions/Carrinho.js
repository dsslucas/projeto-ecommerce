export const AdicionaItemCarrinho = (event) => ({
    type: "ADICIONA_ITEM_CARRINHO",
    payload: event.target.value
})

export const AdicionaQtdItemCarrinho = (event) => ({
    type: "ADICIONA_QTD_ITEM_CARRINHO",
    payload: event.target.value
})

export const RetiraItemCarrinho = (event) => ({
    type: "RETIRA_ITEM_CARRINHO",
    payload: event.target.value
})

export const RetiraQtdItemCarrinho = (event) => ({
    type: "RETIRA_QTD_ITEM_CARRINHO",
    payload: event.target.value
})