import React, { useState, useEffect } from 'react'
import api from '../servicos/api'
import { useSelector } from 'react-redux'

import Box from '@mui/material/Box';
import { Cores, EstilosConteudo } from '../styles';
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

        const valorInicial = 0
        const valorTotal = data.reduce((valorInicial, item) => {
            return valorInicial + (item.subtotal)
        }, valorInicial)

        setApiVendas({data, total: valorTotal})
    }

    useEffect(() => {
        ConsultaApiProdutos()
        ConsultaApiUsuarios()
        ConsultaApiVenda()
    }, [])

    return (
        <Box sx={EstilosConteudo}>
            <Titulo titulo="Relatório" />

            <Container maxWidth="lg" sx={{ mt: 4, ml: 0, mr: 0 }}>
                <Grid container spacing={2}>
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 'calc(100vh - 226px)',
                                background: Cores.fundoAbaixoConteudo
                            }}
                        >
                            <Titulo titulo="Vendas Recentes" />

                            <TableContainer component={Paper}>
                                <Table size="small" sx={{ minWidth: 650, height: 'calc(100vh - 312px)', overflowY: 'hidden' }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Data da venda</TableCell>
                                            <TableCell align="right">Nome do cliente</TableCell>
                                            <TableCell align="right">Subtotal</TableCell>
                                            <TableCell align="right">Frete</TableCell>
                                            <TableCell align="right">Total</TableCell>
                                            <TableCell align="right">Forma de pagamento</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                20-02-2022
                                            </TableCell>
                                            <TableCell align="right">Larissa Reis</TableCell>
                                            <TableCell align="right">R$ 135,50</TableCell>
                                            <TableCell align="right">R$ 12,50</TableCell>
                                            <TableCell align="right">R$ 170,00</TableCell>
                                            <TableCell align="right">PIX</TableCell>
                                        </TableRow>

                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                20-02-2022
                                            </TableCell>
                                            <TableCell align="right">Larissa Reis</TableCell>
                                            <TableCell align="right">R$ 135,50</TableCell>
                                            <TableCell align="right">R$ 12,50</TableCell>
                                            <TableCell align="right">R$ 170,00</TableCell>
                                            <TableCell align="right">PIX</TableCell>
                                        </TableRow>

                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                20-02-2022
                                            </TableCell>
                                            <TableCell align="right">Larissa Reis</TableCell>
                                            <TableCell align="right">R$ 135,50</TableCell>
                                            <TableCell align="right">R$ 12,50</TableCell>
                                            <TableCell align="right">R$ 170,00</TableCell>
                                            <TableCell align="right">PIX</TableCell>
                                        </TableRow>

                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                20-02-2022
                                            </TableCell>
                                            <TableCell align="right">Larissa Reis</TableCell>
                                            <TableCell align="right">R$ 135,50</TableCell>
                                            <TableCell align="right">R$ 12,50</TableCell>
                                            <TableCell align="right">R$ 170,00</TableCell>
                                            <TableCell align="right">PIX</TableCell>
                                        </TableRow>

                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                20-02-2022
                                            </TableCell>
                                            <TableCell align="right">Larissa Reis</TableCell>
                                            <TableCell align="right">R$ 135,50</TableCell>
                                            <TableCell align="right">R$ 12,50</TableCell>
                                            <TableCell align="right">R$ 170,00</TableCell>
                                            <TableCell align="right">PIX</TableCell>
                                        </TableRow>

                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                20-02-2022
                                            </TableCell>
                                            <TableCell align="right">Larissa Reis</TableCell>
                                            <TableCell align="right">R$ 135,50</TableCell>
                                            <TableCell align="right">R$ 12,50</TableCell>
                                            <TableCell align="right">R$ 170,00</TableCell>
                                            <TableCell align="right">PIX</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={4} lg={3}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: 'calc(100vh - 226px)',
                        }}
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
                            <Titulo titulo="Faturamento" />

                            <Typography component="p" variant="h4">
                                {apiVendas.total !== undefined ? apiVendas.total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}) : ''}
                            </Typography>

                            <Typography color="text.secondary">
                                PIX: 60%
                            </Typography>

                            <Typography color="text.secondary" sx={{ flex: 1 }}>
                                Boleto: 60%
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
                            <Titulo titulo="Produtos" />

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
                            <Titulo titulo="Usuários" />

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