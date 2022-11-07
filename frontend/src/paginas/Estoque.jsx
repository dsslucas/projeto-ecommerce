import React from 'react'
import Box from '@mui/material/Box';
import { EstilosConteudo } from '../styles';
import Titulo from '../componentes/Titulo';

const Estoque = () => {
    return (
        <Box sx={EstilosConteudo}>
            <Titulo titulo="Estoque" />
        </Box>
    )
}

export default Estoque