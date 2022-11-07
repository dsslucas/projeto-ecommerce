import React from 'react'
import Box from '@mui/material/Box';
import { EstilosConteudo } from '../styles';
import Titulo from '../componentes/Titulo';

const Relatorio = () => {
    return (
        <Box sx={EstilosConteudo}>
            <Titulo titulo="Relatório" />
        </Box>
    )
}

export default Relatorio