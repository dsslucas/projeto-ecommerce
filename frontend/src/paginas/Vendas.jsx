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


const Vendas = () => {
    const [open, setOpen] = useState(false);
    return (
        <Box sx={EstilosConteudo}>
            <Titulo titulo="Gerenciamento de Vendas" />

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
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
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
                                                </StyledTableRow>

                                                <StyledTableRow>
                                                    <StyledTableCell component="th" scope="row">
                                                        2
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">Lingerie 2</StyledTableCell>
                                                    <StyledTableCell align="center">Onde eu tinha meu ranchinho</StyledTableCell>
                                                    <StyledTableCell align="center">5</StyledTableCell>
                                                    <StyledTableCell align="center">35.99</StyledTableCell>
                                                </StyledTableRow>

                                                <StyledTableRow>
                                                    <StyledTableCell component="th" scope="row">
                                                        2
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">Lingerie 2</StyledTableCell>
                                                    <StyledTableCell align="center">Onde eu tinha meu ranchinho</StyledTableCell>
                                                    <StyledTableCell align="center">5</StyledTableCell>
                                                    <StyledTableCell align="center">35.99</StyledTableCell>
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

