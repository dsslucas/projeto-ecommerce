import React from 'react'
import Box from '@mui/material/Box';
import { EstilosConteudo, WrapperCarrinho } from '../styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CardCarrinho from '../componentes/CardCarrinho';

// Imagens
import Image1 from '../assets/IMG-1310.jpg'
import Image2 from '../assets/IMG-1311.jpg'
import Image3 from '../assets/IMG-1313.jpg'
import Image4 from '../assets/IMG-1326.jpg'
import Image5 from '../assets/IMG-1327.jpg'
import Image6 from '../assets/IMG-1330.jpg'
import Image7 from '../assets/IMG-1334.jpg'
import Image8 from '../assets/IMG-1335.jpg'


const Carrinho = () => {
    return (
        <Box sx={{...EstilosConteudo}}>
            <h1>Carrinho</h1>

            <Grid container spacing={1}>
                <Grid item xs={12} md={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'yellow'}}>
                    <CardCarrinho
                        image={Image1}
                        titulo="Conjunto X"
                        preco={149.99}
                    />
                    <CardCarrinho
                        image={Image2}
                        titulo="Conjunto Y"
                        preco={10.99}
                    />
                    <CardCarrinho
                        image={Image3}
                        titulo="Conjunto Z"
                        preco={54.99}
                    />
                    <CardCarrinho
                        image={Image4}
                        titulo="Conjunto Y"
                        preco={10.99}
                    />
                </Grid>
                <Grid item xs={12} md={6} sx={{ background: 'blue' }}>
                    
                </Grid>
            </Grid>
        </Box>
    )
}

export default Carrinho