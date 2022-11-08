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

const Produtos = () => {
    // Salva o que vem da API de Produtos
    const [conteudoApi, setConteudoApi] = useState([])

    useEffect(() => {
        // Consulta a API
        async function respApi() {
            const { data } = await api.get('/produto')
            // setApiContent(data.products)
            setConteudoApi(data)
        }
        respApi()
    }, [])


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
                            image={Image1}
                            titulo={item.nomeProduto}
                            descricao={item.descProduto}
                            preco={item.valorProduto}
                        />
                    )
                }))}

                {/* <CardProdutos
                    image={Image3}
                    titulo="Conjunto Y"
                    descricao="Entendo tão bem do assunto quanto tocar uma viola 10 cordas."
                    preco={149.99}
                />
                <CardProdutos
                    image={Image2}
                    titulo="Conjunto Z"
                    descricao="Entendo tão bem do assunto quanto tocar uma viola 10 cordas."
                    preco={149.99}
                />
                <CardProdutos
                    image={Image4}
                    titulo="Conjunto W"
                    descricao="Entendo tão bem do assunto quanto tocar uma viola 10 cordas."
                    preco={149.99}
                />
                <CardProdutos
                    image={Image5}
                    titulo="Conjunto W"
                    descricao="Entendo tão bem do assunto quanto tocar uma viola 10 cordas."
                    preco={149.99}
                />
                <CardProdutos
                    image={Image6}
                    titulo="Conjunto Y"
                    descricao="Entendo tão bem do assunto quanto tocar uma viola 10 cordas."
                    preco={149.99}
                />
                <CardProdutos
                    image={Image7}
                    titulo="Conjunto X"
                    descricao="Entendo tão bem do assunto quanto tocar uma viola 10 cordas."
                    preco={149.99}
                />

                <CardProdutos
                    image={Image8}
                    titulo="Conjunto X"
                    descricao="Entendo tão bem do assunto quanto tocar uma viola 10 cordas."
                    preco={149.99}
                /> */}

            </Container>

            {/* <GridWrapper>

            </GridWrapper> */}


            {/* <ThemeProvider
                theme={createTheme({
                    breakpoints: {
                        values: {
                            laptop: 1024,
                            tablet: 640,
                            mobile: 0,
                            desktop: 1280,
                        },
                    },
                })}
            >
                <Grid container spacing={{ mobile: 1, tablet: 2, laptop: 3 }}>
                    {Array.from(Array(4)).map((_, index) => (
                        <Grid mobile={6} tablet={4} laptop={3} key={index}>
                            <div>{index + 1}</div>
                        </Grid>
                    ))}
                </Grid>
            </ThemeProvider> */}
        </Box>
    )
}

export default Produtos