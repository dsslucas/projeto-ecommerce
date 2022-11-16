import React, { useState, useEffect } from 'react'
import api from '../servicos/api'
import { useSelector } from 'react-redux'
import moment from 'moment'

import Box from '@mui/material/Box';
import { Cores, EstilosConteudo, GridRelatorio, GridTabelaRelatorio, TableRelatorio } from '../styles';
import Titulo from '../componentes/Titulo';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

const Relatorio = () => {
    // Dados do Redux
    const { signin } = useSelector(state => state)

    // Estados
    const [apiProdutos, setApiProdutos] = useState([])
    const [apiUsuarios, setApiUsuarios] = useState([])
    const [apiVendas, setApiVendas] = useState([])
    const [contadorApiVendas, setContadorApiVendas] = useState([])
    const [contadorPix, setContadorPix] = useState(0)
    const [contadorBoleto, setContadorBoleto] = useState(0)

    const ConsultaApiProdutos = async () => {
        const { data } = await api.get(`/produto`)
        setApiProdutos(data)
    }

    const ConsultaApiUsuarios = async () => {
        const { data } = await api.get('/usuario', {
            headers: {
                Authorization: signin.token
            }
        })
        setApiUsuarios(data)
    }

    const ConsultaApiVenda = async () => {
        const { data } = await api.get('/venda', {
            headers: {
                Authorization: signin.token
            }
        })

        setContadorApiVendas(data)

        // Consulta do usuário (por Id)
        const apiUsuarioPromise = data.map(async (usuario) => {
            const teste = await api.get(`/usuario/${usuario.idUsuario}`, {
                headers: {
                    Authorization: signin.token
                }
            })

            return {
                idVenda: usuario.dataVenda,
                dataVenda: usuario.dataVenda,
                nomeUsuario: teste.data.nomeUsuario,
                subtotal: usuario.subtotal,
                valorFrete: usuario.valorFrete,
                valorTotal: usuario.valorTotal,
                metodoPagamento: usuario.metodoPagamento
            }
        })

        const apiUsuarioId = await Promise.all(apiUsuarioPromise)

        const valorInicial = 0
        const valorTotal = data.reduce((valorInicial, item) => {
            return valorInicial + (item.subtotal)
        }, valorInicial)

        const posicaoArray = apiUsuarioId.reverse().slice(0, 6)

        setApiVendas({ data: posicaoArray, total: valorTotal })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            ConsultaApiProdutos()
            ConsultaApiUsuarios()
            ConsultaApiVenda()
        }, 3000);
        return () => clearInterval(interval);
    }, [])

    return (
        <Box sx={{ ...EstilosConteudo, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box component="div" sx={{ display: 'flex', width: '100%' }}>
                <Titulo titulo="Relatório" />
            </Box>

            <Container maxWidth="xl" sx={{ mt: 2, ml: 0, mr: 0 }}>
                <Grid container spacing={2}>
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}
                    >
                        <Paper
                            sx={GridTabelaRelatorio}
                        >
                            <Titulo titulo={`Vendas Recentes`} />

                            <TableContainer component={Paper}>
                                <Table size="small" sx={TableRelatorio} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Data da venda</TableCell>
                                            <TableCell align="center">Nome do cliente</TableCell>
                                            <TableCell align="center">Subtotal</TableCell>
                                            <TableCell align="center">Frete</TableCell>
                                            <TableCell align="center">Total</TableCell>
                                            <TableCell align="center">Forma de pagamento</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {apiVendas.data !== undefined
                                            ? (
                                                apiVendas.data.map((venda) => {
                                                    return (
                                                        <TableRow
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            key={venda.idVenda}
                                                        >
                                                            <TableCell align="center" component="th" scope="row">
                                                                {moment(venda.dataVenda).format("DD/MM/YYYY HH:mm")}
                                                            </TableCell>
                                                            <TableCell align="center">{venda.nomeUsuario}</TableCell>
                                                            <TableCell align="center">{venda.subtotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</TableCell>
                                                            <TableCell align="center">{venda.valorFrete.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</TableCell>
                                                            <TableCell align="center">{venda.valorTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</TableCell>
                                                            <TableCell align="center">{venda.metodoPagamento}</TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            )
                                            : (
                                                ''
                                            )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={4} lg={3}
                        sx={GridRelatorio}
                    >
                        <Paper
                            sx={{
                                p: 2,
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                height: 'auto',
                                background: Cores.fundoAbaixoConteudo
                            }}
                        >
                            <Titulo titulo="Faturamento" marginBottom />

                            <Typography component="p" variant="h5">
                                {apiVendas.total !== undefined ? apiVendas.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''}
                            </Typography>
                        </Paper>

                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 'auto',
                                width: '100%',
                                background: Cores.fundoAbaixoConteudo
                            }}
                        >
                            <Titulo titulo="Vendas" marginBottom />

                            <Typography component="p" variant="h5">
                                {contadorApiVendas.length}
                            </Typography>

                        </Paper>

                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 'auto',
                                width: '100%',
                                background: Cores.fundoAbaixoConteudo
                            }}
                        >
                            <Titulo titulo="Produtos" marginBottom/>

                            <Typography component="p" variant="h5">
                                {apiProdutos.length}
                            </Typography>

                        </Paper>

                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 'auto',
                                width: '100%',
                                background: Cores.fundoAbaixoConteudo
                            }}
                        >
                            <Titulo titulo="Usuários" marginBottom/>

                            <Typography component="p" variant="h5">
                                {apiUsuarios.length}
                            </Typography>

                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Relatorio