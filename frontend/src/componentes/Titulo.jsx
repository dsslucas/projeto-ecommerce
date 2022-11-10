import React from 'react'
import Typography from '@mui/material/Typography';
import { Cores } from '../styles';

export default function Titulo(props) {
    return (
        <Typography gutterBottom variant="h4" component="div" sx={{color: Cores.fundoCabecalho}}>
            {props.titulo}
        </Typography>
    )
}

