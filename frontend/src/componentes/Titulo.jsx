import React from 'react'
import Typography from '@mui/material/Typography';

export default function Titulo(props) {
    return (
        <Typography gutterBottom variant="h4" component="div" >
            {props.titulo}
        </Typography>
    )
}

