import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { EstilosConteudo, GridWrapperItems } from '../styles';
// Card (do componente)
import CardProdutos from '../componentes/CardProdutos'
import Container from '@mui/material/Container';

import Titulo from '../componentes/Titulo';

//API onde está localizado o endereço.
import api from '../servicos/api';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

const Produtos = () => {
    // Dados vindo do Redux
    const { carrinho } = useSelector(state => state)

    // Salva o que vem da API de Produtos
    const [conteudoApi, setConteudoApi] = useState([])

    // IDs que estão no Catálogo
    const [idsProdutos, setIdsProdutos] = useState([])

    useEffect(() => {
        // Consulta a API
        async function respApi() {
            const { data } = await api.get('/produto')
            // setApiContent(data.products)
            setConteudoApi(data)
        }
        respApi()
    }, [])

    useEffect(() => {
        carrinho.forEach((item) => {
            setIdsProdutos(idsProdutos => [...idsProdutos, item.id])
        })
    }, [carrinho])

    return (
        <Box sx={EstilosConteudo}>
            <Titulo titulo="Produtos" />

            <Container
                sx={GridWrapperItems}
            >
                {conteudoApi.map((item => {
                    return (
                        <CardProdutos
                            key={item.idProduto}
                            id={item.idProduto}
                            titulo={item.nomeProduto}
                            descricao={item.descProduto}
                            imagem={item.imagemProduto}
                            preco={item.valorProduto}
                            qtd={item.qtdProduto}
                            isDisabled={idsProdutos.includes(item.idProduto)}
                        />
                    )
                }))}
            </Container>
        </Box>
    )
}

export default Produtos