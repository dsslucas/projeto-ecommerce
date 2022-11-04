import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ButtonBuy, Cores, WrapperCarrinho, ConteudoCardCarrinho, ImageCardCarrinho, QtdPrecoCardCarrinho } from '../styles';
import Box from '@mui/material/Box';
import Span from './Span';

export default function CardCarrinho(props) {
    return (
        <Card sx={WrapperCarrinho}>
            <CardContent
                sx={ConteudoCardCarrinho}
            >
                <CardMedia
                    component="img"
                    alt="green iguana"
                    sx={ImageCardCarrinho}
                    image={props.image}
                />

                <Typography
                    gutterBottom
                    variant="h5" component="div"
                    sx={{ marginLeft: '10px', marginRight: '10px' }}
                >
                    {props.titulo}
                </Typography>

                <Box
                    component="div"
                    sx={QtdPrecoCardCarrinho}
                >
                    <Box
                        component="div"
                        sx={{
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        Quantidade
                        <Box
                            component="div"
                            sx={{
                                textAlign: 'center',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <Button
                                sx={{
                                    ...ButtonBuy,
                                    maxWidth: '30px', maxHeight: '30px',
                                    minWidth: '30px', minHeight: '30px'
                                }}
                            >
                                -
                            </Button>
                            <Span number={1} />
                            <Button
                                sx={{
                                    ...ButtonBuy,
                                    maxWidth: '30px', maxHeight: '30px',
                                    minWidth: '30px', minHeight: '30px'
                                }}
                            >
                                +
                            </Button>
                        </Box>
                    </Box>

                    <Box
                        component="div"
                        sx={{
                            textAlign: 'center',
                            width: '40%',
                            display: 'flex',
                            justifyContent: 'center',
                            background: Cores.fundoCabecalho,
                            color: Cores.textoCabecalho,
                            borderRadius: '8px'
                        }}
                    >
                        <Span number={`R$ ${props.preco}`} />
                    </Box>



                </Box>



            </CardContent>



        </Card >
    );
}
