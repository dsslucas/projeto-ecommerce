import React from 'react'
import Box from '@mui/material/Box';
import { EstilosConteudo, GridWrapper } from '../styles';
// Card (do componente)
import Card from '../componentes/Card'

import Container from '@mui/material/Container';
const Produtos = () => {
    return (
        <Box sx={EstilosConteudo}>
            <h1>Produtos</h1>

            <Container
                sx={GridWrapper}
            >
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
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