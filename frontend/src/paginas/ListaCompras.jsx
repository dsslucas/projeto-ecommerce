import React from 'react'
import Box from '@mui/material/Box';
import { EstilosConteudo } from '../styles';
import CardListaCompras from '../componentes/CardListaCompras';

// Imagens (temporárias)
import Image1 from '../assets/IMG-1310.jpg'
import Image2 from '../assets/IMG-1311.jpg'
import Image3 from '../assets/IMG-1313.jpg'
import Image4 from '../assets/IMG-1326.jpg'
import Image5 from '../assets/IMG-1327.jpg'
import Image6 from '../assets/IMG-1330.jpg'
import Image7 from '../assets/IMG-1334.jpg'
import Image8 from '../assets/IMG-1335.jpg'
import Titulo from '../componentes/Titulo';

const ListaCompras = () => {
    return (
        <Box sx={EstilosConteudo}>
            <Titulo titulo="Lista de Compras" />

            <CardListaCompras
                titulo="Conjunto X"
                preco={149.99}
                image={Image1}
                status="Em trânsito"
            />

            {/* <CardListaCompras
                titulo="Conjunto X"
                preco={149.99}
                image={Image1}
                status="Em trânsito"
            /> */}

            {/* <CardListaCompras
                titulo="Conjunto X"
                preco={149.99}
                image={Image1}
                status="Em trânsito"
            /> */}

        </Box>
    )
}

export default ListaCompras