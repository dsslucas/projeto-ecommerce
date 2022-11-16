import React, { useState, useEffect } from 'react';
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
import moment from 'moment';

export default function CardListaCompras(props) {
    // Pega os dados do Redux
    const { signin } = useSelector(state => state)

    const [dadosApiVenda, setDadosApiVenda] = useState([])

    // Consulta de vendas específicas com base no ID da venda
    const consultaApiVenda = async () => {
        // Consulta das compras realizadas pelo usuário
        const { data } = await api.get(`/venda/${props.idVenda}`, {
            headers: {
                Authorization: signin.token
            }
        })

        await consultaApiProduto(data)
    }

    const consultaApiProduto = async (dadosVenda) => {
        // Consulta de vendas específicas com base no ID da venda
        const produtosPromise = dadosVenda.produtos.map(async (item) => {
            const { data } = await api.get(`produto/${item.idProduto}`, {
                headers: {
                    Authorization: signin.token
                }
            })
            return {
                id: item.idProduto,
                nome: data.nomeProduto,
                qtd: item.qtdProduto,
                valorProduto: item.valorProduto,
                imagem: data.imagemProduto
            }
        })

        const produtosDetalhados = await Promise.all(produtosPromise);
        setDadosApiVenda([{
            produtos: produtosDetalhados.sort((a, b) => a.id - b.id),
            subtotal: dadosVenda.subtotal,
            valorFrete: dadosVenda.valorFrete,
            valorTotal: dadosVenda.valorTotal,
            dataEnvio: dadosVenda.dataEnvio,
            dataEntrega: dadosVenda.dataEntrega,
            status: dadosVenda.statusEntrega,
            troca: dadosVenda.troca,
            devolucao: dadosVenda.devolucao
        }])
    }

    const sinalizaTroca = async (idVenda) => {
        try {
            await api.put(`/venda/${idVenda}`, {
                troca: true
            }, {
                headers: {
                    Authorization: signin.token
                }
            })
        } catch (e) {
            console.error(e)
        }
    }

    const sinalizaDevolucao = async (idVenda) => {
        try {
            await api.put(`/venda/${idVenda}`, {
                devolucao: true
            }, {
                headers: {
                    Authorization: signin.token
                }
            })
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        if (signin.email !== null) {
            const interval = setInterval(() => {
                consultaApiVenda()
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [])

    return (
        <Card
            sx={CardListaComprasWrapper}
            key={props.idVenda}
        >
            <CardHeader subheader={`Compra #${props.idVenda} - ${moment(props.dataVenda).format("DD/MM/YYYY HH:MM")}`} />

            <CardContent
                sx={CardListaComprasContent}
            >
                <Box sx={CardListaDivider}>
                    <Box sx={CardGridLista}>
                        {dadosApiVenda.map((item) => {
                            return item.produtos.map((produto) => {
                                return (
                                    <Box
                                        component="div"
                                        sx={CardListaComprasContentColumn}
                                        key={item.id}
                                    >
                                        <Box
                                            component="div"
                                            sx={CardListaComprasImage}
                                        >
                                            <CardMedia
                                                component="img"
                                                image={produto.imagem}
                                                sx={{ borderRadius: '8px' }}
                                            />
                                        </Box>
                                        <Typography gutterBottom variant="p" component="div" >
                                            {produto.nome}
                                        </Typography>
                                        <Typography gutterBottom variant="p" component="div" >
                                            {produto.qtd === 1 ? `${produto.qtd} unidade` : `${produto.qtd} unidades`}
                                        </Typography>
                                        <Typography gutterBottom variant="p" component="div" >
                                            {produto.valorProduto.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                        </Typography>
                                    </Box>
                                )
                            })
                        })}
                    </Box>
                </Box>

                {dadosApiVenda.map((info) => {
                    return (
                        <Box component="div" sx={CardListaInformacao}>
                            <Typography gutterBottom variant="p" component="div" >
                                Status: {info.status}
                            </Typography>
                            {info.dataEnvio !== null && (
                                <Typography gutterBottom variant="p" component="div" >
                                    Enviado em: {moment(info.dataEnvio).format("DD/MM/YYYY HH:mm")}
                                </Typography>
                            )}
                            {info.dataEntrega !== null && (
                                <Typography gutterBottom variant="p" component="div" >
                                    Enviado em: {moment(info.dataEntrega).format("DD/MM/YYYY HH:mm")}
                                </Typography>
                            )}
                            <Typography gutterBottom variant="p" component="div" >
                                Valor dos produtos: {info.subtotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                            </Typography>

                            <Typography gutterBottom variant="p" component="div" >
                                Valor do frete: {info.valorFrete.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                            </Typography>

                            <Typography gutterBottom variant="p" component="div" >
                                Valor total: {info.valorTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                            </Typography>

                            {info.troca && (
                                <Typography gutterBottom variant="p" component="div" >
                                    Troca solicitada
                                </Typography>
                            )}

                            {info.devolucao && (
                                <Typography gutterBottom variant="p" component="div" >
                                    Devolução solicitada
                                </Typography>
                            )}

                        </Box>
                    )
                })}

            </CardContent>

            <Box
                component="div"
                sx={CardListaComprasButtons}
            >
                <Button
                    size="small"
                    variant="contained"
                    sx={{ ...ButtonBuy, width: 'auto', marginRight: '5px' }}
                    onClick={() => sinalizaTroca(props.idVenda)}
                >
                    Trocar
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    sx={{ ...ButtonBuy, width: 'auto', marginLeft: '5px' }}
                    onClick={() => sinalizaDevolucao(props.idVenda)}
                >
                    Devolver
                </Button>
            </Box>
        </Card>
    );
}
