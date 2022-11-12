import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { EstilosConteudo, GridWrapperItems } from '../styles';
// Card (do componente)
import CardProdutos from '../componentes/CardProdutos'
import Container from '@mui/material/Container';

// Imagens
import Image1 from '../assets/IMG-1310.jpg'
import Image2 from '../assets/IMG-1311.jpg'
import Image3 from '../assets/IMG-1313.jpg'
import Image4 from '../assets/IMG-1326.jpg'
import Image5 from '../assets/IMG-1327.jpg'
import Image6 from '../assets/IMG-1330.jpg'
import Image7 from '../assets/IMG-1334.jpg'
import Image8 from '../assets/IMG-1335.jpg'
import Titulo from '../componentes/Titulo';

//API onde está localizado o endereço.
import api from '../servicos/api';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

const Produtos = () => {
    // Dados vindo do Redux
    const { carrinho } = useSelector(state => state)

    //console.log(carrinho)

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
            <Titulo titulo="Catálogo" />

            <Container
                sx={GridWrapperItems}
            >
                {conteudoApi.map((item => {
                    return (
                        <CardProdutos
                            key={item.idProduto}
                            id={item.idProduto}
                            image={Image1}
                            titulo={item.nomeProduto}
                            descricao={item.descProduto}
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