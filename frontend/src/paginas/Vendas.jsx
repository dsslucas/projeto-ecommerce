// import React from 'react'
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';

// import { ButtonBuy, Cores, EstiloModal, EstilosConteudo, StyledTableCell, StyledTableRow } from '../styles';
// import Titulo from '../componentes/Titulo';

// const Vendas = () => {
//     return (
//         <Box sx={EstilosConteudo}>
//             <Titulo titulo="Gerenciamento de Vendas" />

//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 700 }} aria-label="customized table">
//                     <TableHead>
//                         <TableRow>
//                             <StyledTableCell align="center">#</StyledTableCell>
//                             <StyledTableCell align="center">Nome do cliente</StyledTableCell>
//                             <StyledTableCell align="center">Data da venda</StyledTableCell>
//                             <StyledTableCell align="center">Data de envio</StyledTableCell>
//                             <StyledTableCell align="center">Data de entrega</StyledTableCell>
//                             <StyledTableCell align="center">Troca</StyledTableCell>
//                             <StyledTableCell align="center">Devolução</StyledTableCell>
//                             <StyledTableCell align="center">Método de Pagamento</StyledTableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         <StyledTableRow>
//                             <StyledTableCell
//                                 component="th" scope="row" align="center"
//                             >
//                                 01
//                             </StyledTableCell>
//                             <StyledTableCell align="center">Larissa Reis</StyledTableCell>
//                             <StyledTableCell align="center">30/04/2022</StyledTableCell>
//                             <StyledTableCell align="center">31/04/2022</StyledTableCell>
//                             <StyledTableCell align="center">-</StyledTableCell>
//                             <StyledTableCell align="center">X</StyledTableCell>
//                             <StyledTableCell align="center">X</StyledTableCell>
//                             <StyledTableCell align="center">PIX</StyledTableCell>
//                         </StyledTableRow>

//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Box>
//     )
// }

// export default Vendas

import * as React from 'react';
import PropTypes from 'prop-types';
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

function createData(idVenda, nomeCliente, dataEnvio, dataVenda, dataEntrega, troca, devolucao, valorCompra, valorFrete, valorTotal, metodoPagamento,) {
    return {
        idVenda,
        nomeCliente,
        dataVenda,
        dataEnvio,
        dataEntrega,
        troca,
        devolucao,
        valorCompra,
        valorFrete,
        valorTotal,
        metodoPagamento,
        produtos: [
            {
                id: 1,
                nome: 'Lingerie 1',
                descricao: 'Eu não entendo nada disso aqui',
                qtd: 3,
                valorUnitario: 35.99
            }
        ],
    };
}

function Row(props) {
    //const { row } = props;
    const [open, setOpen] = React.useState(false);

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
                <TableCell component="th" scope="row">
                    {row.idVenda}
                </TableCell>
                <TableCell align="right">{row.nomeCliente}</TableCell>
                <TableCell align="right">{row.dataEnvio}</TableCell>
                <TableCell align="right">{row.dataVenda}</TableCell>
                <TableCell align="right">{row.dataEntrega}</TableCell>
                <TableCell align="right">{row.troca}</TableCell>
                <TableCell align="right">{row.devolucao}</TableCell>
                <TableCell align="right">{row.valorCompra}</TableCell>
                <TableCell align="right">{row.valorFrete}</TableCell>
                <TableCell align="right">{row.valorTotal}</TableCell>
                <TableCell align="right">{row.metodoPagamento}</TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Produtos
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Nome do produto</TableCell>
                                        <TableCell align="right">Descrição</TableCell>
                                        <TableCell align="right">Quantidade</TableCell>
                                        <TableCell align="right">Preço unitário</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.produtos.map((produtosRow) => (
                                        <TableRow key={produtosRow.id}>
                                            <TableCell component="th" scope="row">
                                                {produtosRow.id}
                                            </TableCell>
                                            <TableCell>{produtosRow.nome}</TableCell>
                                            <TableCell align="right">{produtosRow.descricao}</TableCell>
                                            <TableCell align="right">{produtosRow.qtd}</TableCell>
                                            <TableCell align="right">{produtosRow.valorUnitario}</TableCell>
                                        </TableRow>
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

Row.propTypes = {
    row: PropTypes.shape({
        idVenda: PropTypes.number.isRequired,
        nomeCliente: PropTypes.number.isRequired,
        dataVenda: PropTypes.number.isRequired,
        dataEnvio: PropTypes.number.isRequired,
        dataEnvio: PropTypes.number.isRequired,
        produtos: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};

const rows = [
    createData(1, 'Larissa Reis', '30/04/2022', '31/04/2022', '-', 'X', 'X', 135.47, 12.50, 242.50, 'PIX'),
];

export default function CollapsibleTable() {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>#</TableCell>
                        <TableCell>Nome do cliente</TableCell>
                        <TableCell align="right">Data da venda</TableCell>
                        <TableCell align="right">Data de envio</TableCell>
                        <TableCell align="right">Data de entrega</TableCell>
                        <TableCell align="right">Troca</TableCell>
                        <TableCell align="right">Devolução</TableCell>
                        <TableCell align="right">Valor da Compra</TableCell>
                        <TableCell align="right">Valor do Frete</TableCell>
                        <TableCell align="right">Valor total</TableCell>
                        <TableCell align="right">Modalidade</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}