import React, { useState, useEffect } from 'react'
import Titulo from '../componentes/Titulo';
import { EstilosConteudo, StyledTableCell, StyledTableRow } from '../styles';
import Box from '@mui/material/Box';
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
import { useSelector } from 'react-redux';
import api from '../servicos/api';
import moment from 'moment'
import { Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/CheckBox';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    // Dados vindo do Redux
    const { signin } = useSelector(state => state)

    const confirmaEnvioPacote = async (idVenda) => {
        try {
            await api.put(`/venda/${idVenda}`, {
                dataEnvio: new Date(),
                statusEntrega: 'Enviado'
            }, {
                headers: {
                    Authorization: signin.token
                }
            })
            props.returnBotaoClicado(true)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <StyledTableCell align="center" component="th" scope="row">
                    {row.idVenda}
                </StyledTableCell>
                <StyledTableCell align="center">{row.usuario.nomeUsuario}</StyledTableCell>
                <StyledTableCell align="center">{moment(row.dataVenda).format("DD/MM/YYYY HH:mm")}</StyledTableCell>
                <StyledTableCell align="center">
                    {row.dataEnvio !== null
                        ? moment(row.dataEnvio).format("DD/MM/YYYY HH:mm")
                        : (
                            <Button onClick={() => confirmaEnvioPacote(row.idVenda)}>
                                <CheckIcon sx={{ background: 'green', borderRadius: '3px', color: "#fff" }} />
                            </Button>
                        )}
                </StyledTableCell>
                <StyledTableCell align="center">{row.troca ? "SIM" : "NÃO"}</StyledTableCell>
                <StyledTableCell align="center">{row.devolucao ? "SIM" : "NÃO"}</StyledTableCell>
                <StyledTableCell align="center">{row.subtotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</StyledTableCell>
                <StyledTableCell align="center">{row.valorFrete.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</StyledTableCell>
                <StyledTableCell align="center">{row.valorTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</StyledTableCell>
                <StyledTableCell align="center">{row.metodoPagamento}</StyledTableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
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
                                    {row.produtos.map((produto) => (
                                        <StyledTableRow key={produto.idProduto}>
                                            <StyledTableCell component="th" scope="row">
                                                {produto.idProduto}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{produto.nome}</StyledTableCell>
                                            <StyledTableCell align="center">{produto.desc}</StyledTableCell>
                                            <StyledTableCell align="center">{produto.qtdProduto}</StyledTableCell>
                                            <StyledTableCell align="center">{produto.valorProduto.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</StyledTableCell>
                                            <StyledTableCell align="center">{produto.subtotalProduto.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function Relatorio() {
    // Dados vindo do Redux
    const { signin } = useSelector(state => state)

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

        //4a consulta: Produtos
        apiVendaEspecifica.map(async (infoVenda) => {
            const temp = infoVenda.produtos.map(async (produto) => {
                const { data } = await api.get(`/produto/${produto.idProduto}`, {
                    headers: {
                        Authorization: signin.token
                    }
                })
                produto.nome = data.nomeProduto;
                produto.desc = data.descProduto;
                return produto;
            })

            // Armazena o que foi recebido
            const infoProduto = await Promise.all(temp)
            return {
                ...infoVenda,
                produtos: { ...infoVenda.produtos, infoProduto }
            }
        })
        //const apiProdutos = await Promise.all(apiProdutosPromise)

        // Armazena tudo no Estado
        setInfoVenda(apiVendaEspecifica)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            ConsultaApi()
        }, 3000);
        return () => clearInterval(interval);        
    }, [])

    //setInterval(() => {ConsultaApi()}, 3000)

    return (
        <Box sx={EstilosConteudo}>
            <Titulo titulo="Gerenciamento de Vendas" />

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
                        {infoVenda.map((row) => (
                            <Row key={row.idVenda} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    );
}