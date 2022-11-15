import React, { useState } from 'react'
import Box from '@mui/material/Box';

import { ButtonBuy, Cores, EstiloModal, EstilosConteudo, StyledTableCell, StyledTableRow } from '../styles';
import Titulo from '../componentes/Titulo';

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import api from '../servicos/api';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';


const Vendas = () => {
    // Dados vindo do Redux
    const { signin } = useSelector(state => state)

    const [open, setOpen] = useState(false);

    // Armazena as vendas com os usuários
    const [infoVenda, setInfoVenda] = useState([])

    // Consulta ao Banco de Dados
    const ConsultaApi = async () => {
        // 1a consulta: API de vendas
        const apiVenda = await api.get(`/venda`, {
            headers: {
                Authorization: signin.token
            }
        })

        // 2a consulta: API de Venda Específica
        const apiVendaPromise = apiVenda.data.map(async (item) => {
            const { data } = await api.get(`/venda/${item.idVenda}`, {
                headers: {
                    Authorization: signin.token
                }
            })
            //console.log(data.idVenda)
            //console.log(data)
            return data
        })

        const apiVendaEspecifica = await Promise.all(apiVendaPromise);

        //3a consulta: Usuário
        const apiUsuarioPromise = apiVendaEspecifica.map(async (item) => {
            const { data } = await api.get(`/usuario/${item.idUsuario}`, {
                headers: {
                    Authorization: signin.token
                }
            })
            return {
                idUsuario: data.idUsuario,
                nomeUsuario: data.nomeUsuario,
                emailUsuario: data.emailUsuario
            }
        })
        const apiUsuario = await Promise.all(apiUsuarioPromise)

        // //console.log("VENDA GERAL: ", apiVenda.data)
        console.log("VENDA ESPECÍFICA: ", apiVendaEspecifica)
        console.log("API de usuários: ", apiUsuario)

        setInfoVenda(apiVendaEspecifica)

        const teste = infoVenda.map((venda) => {
            
        })

        console.log(teste)

        // const venda = {
        //     idVenda: 1,
        //     idUsuario: 1,
        //     nomeUsuario: 'Larissa Reis',
        //     dataVenda: '20-01-2022',
        //     dataEnvio: '22-01-2022',
        //     troca: false,
        //     devolucao: false,
        //     valorCompra: 35.99,
        //     valorFrete: 12.50,
        //     valorTotal: 124.50,
        //     metodoPagamento: 'PIX',
        //     produtos: [{
        //         idProduto: 1,
        //         nomeProduto: 'Lingerie 1',
        //         descProduto: 'Seu moço eu já fui roceiro no triângulo mineiro',
        //         qtdProduto: 5,
        //         valorProduto: 35.99,
        //         subtotal: 143.50
        //     }]
        // }

        // console.log(venda)
    }

    useEffect(() => {
        ConsultaApi()
    }, [])

    return (
        <Box sx={EstilosConteudo}>
            <Titulo titulo="Gerenciamento de Vendas" />

            <Button onClick={() => console.log(infoVenda)}>Teste</Button>

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell />
                            <StyledTableCell align="center">#</StyledTableCell>
                            <StyledTableCell align="center">Nome do cliente</StyledTableCell>
                            <StyledTableCell align="center">Data da venda</StyledTableCell>
                            <StyledTableCell align="center">Data de envio</StyledTableCell>
                            <StyledTableCell align="center">Troca</StyledTableCell>
                            <StyledTableCell align="center">Devolução</StyledTableCell>
                            <StyledTableCell align="center">Valor da Compra</StyledTableCell>
                            <StyledTableCell align="center">Valor do Frete</StyledTableCell>
                            <StyledTableCell align="center">Valor total</StyledTableCell>
                            <StyledTableCell align="center">Modalidade</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                            <StyledTableCell align="center">
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => setOpen(!open)}
                                >
                                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </StyledTableCell>
                            <StyledTableCell align="center" component="th" scope="row">
                                1
                            </StyledTableCell>
                            <StyledTableCell align="center">Larissa Reis</StyledTableCell>
                            <StyledTableCell align="center">30/04/2022</StyledTableCell>
                            <StyledTableCell align="center">31/04/2022</StyledTableCell>
                            <StyledTableCell align="center">X</StyledTableCell>
                            <StyledTableCell align="center">X</StyledTableCell>
                            <StyledTableCell align="center">R$ 35.99</StyledTableCell>
                            <StyledTableCell align="center">R$ 12.50</StyledTableCell>
                            <StyledTableCell align="center">R$ 124,50</StyledTableCell>
                            <StyledTableCell align="center">PIX</StyledTableCell>
                        </StyledTableRow>

                        <TableRow>
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <Box sx={{ margin: 1 }}>
                                        <Typography variant="h6" gutterBottom component="div">
                                            Produtos
                                        </Typography>
                                        <Table size="small" aria-label="purchases">
                                            <TableHead>
                                                <StyledTableRow>
                                                    <StyledTableCell align="center">#</StyledTableCell>
                                                    <StyledTableCell align="center">Nome do produto</StyledTableCell>
                                                    <StyledTableCell align="center">Descrição</StyledTableCell>
                                                    <StyledTableCell align="center">Quantidade</StyledTableCell>
                                                    <StyledTableCell align="center">Preço unitário</StyledTableCell>
                                                    <StyledTableCell align="center">Subtotal</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>

                                            <TableBody>
                                                <StyledTableRow>
                                                    <StyledTableCell component="th" scope="row">
                                                        1
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">Lingerie 1</StyledTableCell>
                                                    <StyledTableCell align="center">Seu moço eu já fui roceiro no triângulo mineiro</StyledTableCell>
                                                    <StyledTableCell align="center">5</StyledTableCell>
                                                    <StyledTableCell align="center">35.99</StyledTableCell>
                                                    <StyledTableCell align="center">143.50</StyledTableCell>
                                                </StyledTableRow>

                                                <StyledTableRow>
                                                    <StyledTableCell component="th" scope="row">
                                                        2
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">Lingerie 2</StyledTableCell>
                                                    <StyledTableCell align="center">Onde eu tinha meu ranchinho</StyledTableCell>
                                                    <StyledTableCell align="center">5</StyledTableCell>
                                                    <StyledTableCell align="center">35.99</StyledTableCell>
                                                    <StyledTableCell align="center">260.00</StyledTableCell>
                                                </StyledTableRow>

                                                <StyledTableRow>
                                                    <StyledTableCell component="th" scope="row">
                                                        2
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">Lingerie 2</StyledTableCell>
                                                    <StyledTableCell align="center">Onde eu tinha meu ranchinho</StyledTableCell>
                                                    <StyledTableCell align="center">5</StyledTableCell>
                                                    <StyledTableCell align="center">35.99</StyledTableCell>
                                                    <StyledTableCell align="center">120.50</StyledTableCell>
                                                </StyledTableRow>
                                            </TableBody>
                                        </Table>
                                    </Box>
                                </Collapse>
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default Vendas
//     return (
//         <Box sx={EstilosConteudo}>
//             <Titulo titulo="Gerenciamento de Vendas" />

//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 700 }} aria-label="customized table">
//
//                 </Table>
//             </TableContainer>
//         </Box>
//     )
            // }

