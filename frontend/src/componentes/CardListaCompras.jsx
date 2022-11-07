import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ButtonBuy, CardListaComprasButtons, CardListaComprasContent, CardListaComprasContentColumn, CardListaComprasImage, CardListaComprasWrapper, Cores } from '../styles';
import Box from '@mui/material/Box';

import Span from './Span'
import CardHeader from '@mui/material/CardHeader';

export default function CardListaCompras(props) {
    return (
        <Card
            sx={CardListaComprasWrapper}
        >
            <CardHeader subheader="32 de Fevereiro de 3048" />

            <CardContent
                sx={CardListaComprasContent}
            >
                <Box
                    component="div"
                    sx={CardListaComprasImage}
                >
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        image={props.image}
                        sx={{ borderRadius: '8px' }}
                    />
                </Box>

                <Box
                    component="div"
                    sx={CardListaComprasContentColumn}
                >
                    <Typography gutterBottom variant="p" component="div" >
                        {props.titulo}
                    </Typography>

                    <Typography gutterBottom variant="p" component="div" >
                        R$ {props.preco}
                    </Typography>

                    <Typography gutterBottom variant="p" component="div" >
                        {props.status}
                    </Typography>

                </Box>
            </CardContent>

            <CardContent
                sx={CardListaComprasContent}
            >
                <Box
                    component="div"
                    sx={CardListaComprasImage}
                >
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        image={props.image}
                        sx={{ borderRadius: '8px' }}
                    />
                </Box>

                <Box
                    component="div"
                    sx={CardListaComprasContentColumn}
                >
                    <Typography gutterBottom variant="p" component="div" >
                        {props.titulo}
                    </Typography>

                    <Typography gutterBottom variant="p" component="div" >
                        R$ {props.preco}
                    </Typography>

                    <Typography gutterBottom variant="p" component="div" >
                        {props.status}
                    </Typography>

                </Box>
            </CardContent>

            <Box
                component="div"
                sx={CardListaComprasButtons}
            >
                <Button
                    size="small"
                    variant="contained"
                    sx={{ ...ButtonBuy, width: '30%', marginRight: '5px' }}
                >
                    Trocar
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    sx={{ ...ButtonBuy, width: '30%', marginLeft: '5px' }}
                >
                    Devolver
                </Button>
            </Box>
        </Card>
    );
}
