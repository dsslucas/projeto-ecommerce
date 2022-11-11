import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ButtonBuy, CardGridLista, CardListaComprasButtons, CardListaComprasContent, CardListaComprasContentColumn, CardListaComprasImage, CardListaComprasWrapper, CardListaDivider, CardListaInformacao } from '../styles';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import { useSelector } from 'react-redux';
import api from '../servicos/api';

export default function CardListaCompras(props) {
    // Pega os dados do Redux
    const { signin } = useSelector(state => state)

    const [dadosApiVenda, setDadosApiVenda] = React.useState([])

    // Consulta de vendas específicas com base no ID da venda
    const consultaApiVenda = async () => {
        // Consulta das compras realizadas pelo usuário
        const { data } = await api.get(`/venda/${props.idVenda}`, {
            headers: {
                Authorization: signin.token
            }
        })
        console.log("VENDA: ", data)
        setDadosApiVenda(data.produtos)
    }

    // Consulta de vendas específicas com base no ID da venda
    const consultaApiProduto = async () => {
        // Consulta das compras realizadas pelo usuário
        const { data } = await api.get(`produto/`, {
            headers: {
                Authorization: signin.token
            }
        })
        //console.log("PRODUTO:", data)
        //setDadosApiVenda({...dadosApiVenda, nomeProduto: data.nomeProduto})
        //setDadosApiVenda({...dadosApiVenda, produtos: data.produtos})
    }

    React.useEffect(() => {
        if (signin.email !== null) {
            consultaApiVenda()
            consultaApiProduto()
        }
    }, [])

    return (
        <Card
            sx={CardListaComprasWrapper}
            key={props.key}
        >
            <CardHeader subheader={props.dataVenda} />

            {/* {dadosApiVenda.map((item) => {
                return (
                    console.log(item)
                )
            })} */}

            <CardContent
                sx={CardListaComprasContent}
            >
                <Box sx={CardListaDivider}>
                    <Box sx={CardGridLista}>
                        <Box
                            component="div"
                            sx={CardListaComprasContentColumn}
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
                            <Typography gutterBottom variant="p" component="div" >
                                {props.titulo}
                            </Typography>

                            <Typography gutterBottom variant="p" component="div" >
                                3 unidades
                            </Typography>

                            <Typography gutterBottom variant="p" component="div" >
                                R$ {props.preco}
                            </Typography>
                        </Box>

                        <Box
                            component="div"
                            sx={CardListaComprasContentColumn}
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
                            <Typography gutterBottom variant="p" component="div" >
                                {props.titulo}
                            </Typography>

                            <Typography gutterBottom variant="p" component="div" >
                                3 unidades
                            </Typography>

                            <Typography gutterBottom variant="p" component="div" >
                                R$ {props.preco}
                            </Typography>
                        </Box>

                        <Box
                            component="div"
                            sx={CardListaComprasContentColumn}
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
                            <Typography gutterBottom variant="p" component="div" >
                                {props.titulo}
                            </Typography>

                            <Typography gutterBottom variant="p" component="div" >
                                3 unidades
                            </Typography>

                            <Typography gutterBottom variant="p" component="div" >
                                R$ {props.preco}
                            </Typography>
                        </Box>

                        <Box
                            component="div"
                            sx={CardListaComprasContentColumn}
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
                            <Typography gutterBottom variant="p" component="div" >
                                {props.titulo}
                            </Typography>

                            <Typography gutterBottom variant="p" component="div" >
                                3 unidades
                            </Typography>

                            <Typography gutterBottom variant="p" component="div" >
                                R$ {props.preco}
                            </Typography>
                        </Box>

                        <Box
                            component="div"
                            sx={CardListaComprasContentColumn}
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
                            <Typography gutterBottom variant="p" component="div" >
                                {props.titulo}
                            </Typography>

                            <Typography gutterBottom variant="p" component="div" >
                                3 unidades
                            </Typography>

                            <Typography gutterBottom variant="p" component="div" >
                                R$ {props.preco}
                            </Typography>
                        </Box>
                    </Box>

                </Box>

                <Box component="div" sx={CardListaInformacao}>
                    <Typography gutterBottom variant="p" component="div" >
                        Valor dos produtos: R$ {250.00}
                    </Typography>

                    <Typography gutterBottom variant="p" component="div" >
                        Valor do frete: R$ {250.00}
                    </Typography>

                    <Typography gutterBottom variant="p" component="div" >
                        Valor total: R$ {250.00}
                    </Typography>
                </Box>
            </CardContent>

            {/* <CardContent
                sx={CardListaComprasContent}
            >
                <Box sx={CardListaDivider}>
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
                            3 unidades
                        </Typography>

                        <Typography gutterBottom variant="p" component="div" >
                            R$ {props.preco}
                        </Typography>
                    </Box>
                </Box>

                <Box component="div" sx={CardListaInformacao}>
                    <Typography gutterBottom variant="p" component="div" >
                        Valor dos produtos: R$ {250.00}
                    </Typography>

                    <Typography gutterBottom variant="p" component="div" >
                        Valor do frete: R$ {250.00}
                    </Typography>
                    
                    <Typography gutterBottom variant="p" component="div" >
                        Valor total: R$ {250.00}
                    </Typography>
                </Box>
            </CardContent> */}


            <Box
                component="div"
                sx={CardListaComprasButtons}
            >
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => console.log(dadosApiVenda)}
                >
                    TESTE
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    sx={{ ...ButtonBuy, width: 'auto', marginRight: '5px' }}
                >
                    Trocar
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    sx={{ ...ButtonBuy, width: 'auto', marginLeft: '5px' }}
                >
                    Devolver
                </Button>
            </Box>
        </Card>
    );
}
