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
            return data
        })

        const apiVendaEspecifica = await Promise.all(apiVendaPromise);

        // //3a consulta: Usuário
        // const apiUsuarioPromise = apiVendaEspecifica.map(async (item) => {
        //     const { data } = await api.get(`/usuario/${item.idUsuario}`, {
        //         headers: {
        //             Authorization: signin.token
        //         }
        //     })
        //     return {
        //         idVenda: item.idVenda,
        //         idUsuario: data.idUsuario,
        //         nomeUsuario: data.nomeUsuario,
        //         emailUsuario: data.emailUsuario,
        //         dataVenda: item.dataVenda,
        //         dataEnvio: item.dataEnvio,
        //         troca: item.troca,
        //         devolucao: item.devolucao,
        //         valorCompra: item.subtotal,
        //         valorFrete: item.valorFrete,
        //         valorTotal: item.valorTotal,
        //         metodoPagamento: item.metodoPagamento,
        //         produtos: item.produtos
        //     }
        // })
        // const apiUsuario = await Promise.all(apiUsuarioPromise)

        // 4a consulta: Produtos
        const apiProdutosPromise = apiVendaEspecifica.map(async (infoVenda) => {
            const temp = infoVenda.produtos.map(async (produto) => {
                const { data } = await api.get(`/produto/${produto.idProduto}`, {
                    headers: {
                        Authorization: signin.token
                    }
                })
                //console.log(infoVenda.produtos)
                return {                    
                    idProduto: data.idProduto,
                    qtdProduto: data.qtdProduto,
                    subtotalProduto: (data.qtdProduto * data.valorProduto).toFixed(2),
                    valorProduto: data.valorProduto,
                    nomeProduto: data.nomeProduto,
                    descProduto: data.descProduto,
                }
            })

            // Armazena o que foi recebido
            const infoProduto = await Promise.all(temp)
            return {
                ...infoVenda,
            }
        })
        const apiProdutos = await Promise.all(apiProdutosPromise)

        console.log(apiProdutos)
        // Armazena tudo no Estado
        setInfoVenda(apiVendaEspecifica)
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
                            <StyledTableCell align="center">Cliente</StyledTableCell>
                            <StyledTableCell align="center">Data da venda</StyledTableCell>
                            <StyledTableCell align="center">Data de envio</StyledTableCell>
                            <StyledTableCell align="center">Troca</StyledTableCell>
                            <StyledTableCell align="center">Devolução</StyledTableCell>
                            <StyledTableCell align="center">Valor da Compra</StyledTableCell>
                            <StyledTableCell align="center">Valor do Frete</StyledTableCell>
                            <StyledTableCell align="center">Valor Total</StyledTableCell>
                            <StyledTableCell align="center">Modalidade</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {infoVenda.map((venda) => {
                            return (
                                <>
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
                                            {venda.idVenda}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{venda.usuario.nomeUsuario}</StyledTableCell>
                                        <StyledTableCell align="center">{venda.dataVenda}</StyledTableCell>
                                        <StyledTableCell align="center">{venda.dataEnvio}</StyledTableCell>
                                        <StyledTableCell align="center">{venda.troca ? "SIM" : "NÃO"}</StyledTableCell>
                                        <StyledTableCell align="center">{venda.devolucao ? "SIM" : "NÃO"}</StyledTableCell>
                                        <StyledTableCell align="center">R$ {venda.subtotal}</StyledTableCell>
                                        <StyledTableCell align="center">R$ {venda.valorFrete}</StyledTableCell>
                                        <StyledTableCell align="center">R$ {venda.valorTotal}</StyledTableCell>
                                        <StyledTableCell align="center">{venda.metodoPagamento}</StyledTableCell>
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
                                                            {venda.produtos.map((produto) => {
                                                                return (
                                                                    <StyledTableRow>
                                                                        <StyledTableCell component="th" scope="row">
                                                                            {produto.idProduto}
                                                                        </StyledTableCell>
                                                                        <StyledTableCell align="center">{produto.nomeProduto}</StyledTableCell>
                                                                        <StyledTableCell align="center">{produto.descProduto}</StyledTableCell>
                                                                        <StyledTableCell align="center">{produto.qtdProduto}</StyledTableCell>
                                                                        <StyledTableCell align="center">{produto.valorProduto}</StyledTableCell>
                                                                        <StyledTableCell align="center">{produto.subtotalProduto}</StyledTableCell>
                                                                    </StyledTableRow>
                                                                )
                                                            })}


                                                            {/* <StyledTableRow>
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
                                                            </StyledTableRow> */}
                                                        </TableBody>
                                                    </Table>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </>
                            )
                        })}



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

