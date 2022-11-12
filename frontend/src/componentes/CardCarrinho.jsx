import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ButtonBuy, Cores, WrapperCarrinho, ConteudoCardCarrinho, ImageCardCarrinho, QtdPrecoCardCarrinho, DeletarProdutoCarrinho } from '../styles';
import Box from '@mui/material/Box';
import Span from './Span';
import { useDispatch, useSelector } from 'react-redux';
import { AdicionaQtdItemCarrinho, RetiraQtdItemCarrinho, RetiraItemCarrinho } from '../redux/actions/Carrinho';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function CardCarrinho(props) {
    // Dados vindo do Redux
    const { carrinho } = useSelector(state => state)

    // Dispara pro Redux
    const dispatch = useDispatch()

    // Dimensões, que é importante para a responsividade
    const width = window.innerWidth

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
                                    minWidth: '30px', minHeight: '30px',
                                    disabled: props.qtd <= 1 ? true : false,
                                    cursor: props.qtd <= 1 ? 'not-allowed' : 'pointer'
                                }}
                                onClick={props.qtd <= 1 ? () => null : () => dispatch(RetiraQtdItemCarrinho({ carrinho, id: props.id }))}
                            >
                                -
                            </Button>
                            <Span number={props.qtd} />
                            <Button
                                sx={{
                                    ...ButtonBuy,
                                    maxWidth: '30px', maxHeight: '30px',
                                    minWidth: '30px', minHeight: '30px'
                                }}
                                onClick={() => dispatch(AdicionaQtdItemCarrinho({ carrinho, id: props.id }))}
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
                        <Span number={`R$ ${props.preco.toFixed(2)}`} />
                    </Box>


                </Box>
            </CardContent>

            <Box
                component="div"
                sx={DeletarProdutoCarrinho}
            >
                <Button
                    sx={{
                        ...ButtonBuy,
                        color: Cores.textoCabecalho,
                        height: '100%',
                        // width: '50px',
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        minWidth: 'auto'
                    }}
                    onClick={() => dispatch(RetiraItemCarrinho({carrinho, id: props.id}))}
                >
                    <HighlightOffIcon size={'0.875rem'} sx={{ color: Cores.textoCabecalho }} />
                    {width < 600 ? "Remover item" : null}
                </Button>

            </Box>
        </Card >
    );
}
