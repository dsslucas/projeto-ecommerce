import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { ButtonBuy, Cores, EstilosConteudo, StyledTableCell, StyledTableRow } from '../styles';
import Input from '../componentes/Input'
import Titulo from '../componentes/Titulo';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

// Icones
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckIcon from '@mui/icons-material/CheckBox';
import ClearIcon from '@mui/icons-material/Clear';

function createData(id, nome, email, uf, isAdmin) {
    return { id, nome, email, uf, isAdmin };
}

const rows = [
    createData(1, 'Larissa Reis', "lareis@gmail.com", "DF", true),
    createData(2, 'Lucas Souza', "dsslucas@gmail.com", "GO", false),
    createData(3, 'João Ricardo', "joaorfc@gmail.com", "DF", false),
    createData(4, 'Beatriz Chiarelli', "biachiarelli@gmail.com", "DF", false),
    createData(5, 'Mateus Souza', "xxmattewxx@gmail.com", "GO", false),
    createData(6, 'Gil das Esfihas', "rogerio@gmail.com", "AM", true),
];

const GerenciaUsuario = () => {
    const [cadastroUsuario, setCadastroUsuario] = useState({
        nome: '',
        email: '',
        senha: '',
        endereco: '',
        cidade: '',
        uf: '',
        cep: '',
        isAdmin: false
    })

    return (
        <Box sx={{ ...EstilosConteudo, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Titulo titulo="Gerenciamento de usuários" />

            <Box component="div" sx={{ display: 'flex', justifyContent: 'right', marginBottom: '8px' }}>
                <Button sx={{ ...ButtonBuy, width: 'auto' }}>Cadastrar usuário</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="center">Nome</StyledTableCell>
                            <StyledTableCell align="center" sx={{ width: '400px' }}>E-mail</StyledTableCell>
                            <StyledTableCell align="center">UF</StyledTableCell>
                            <StyledTableCell align="center">Administrador</StyledTableCell>
                            <StyledTableCell align="center" sx={{ width: '160px' }}>Ações</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.nome}>
                                <StyledTableCell component="th" scope="row">
                                    {row.id}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.nome}</StyledTableCell>
                                <StyledTableCell align="center">{row.email}</StyledTableCell>
                                <StyledTableCell align="center">{row.uf}</StyledTableCell>
                                <StyledTableCell align="center">{row.isAdmin ? <CheckIcon sx={{background: 'green', borderRadius: '3px', color: "#fff"}}/> : <ClearIcon sx={{background: 'red', borderRadius: '3px', color: '#fff'}}/>}</StyledTableCell>
                                <StyledTableCell align="center" sx={{}}>
                                    <Button sx={{ ...ButtonBuy, background: 'yellow', color: Cores.fundoCabecalho, minWidth: '40px', maxWidth: '40px', minHeight: '40px', maxHeight: '40px' }}>
                                        <EditIcon />
                                    </Button>
                                    <Button sx={{ ...ButtonBuy, background: 'red', color: Cores.fundoCabecalho, minWidth: '40px', maxWidth: '40px', minHeight: '40px', maxHeight: '40px' }}>
                                        <DeleteForeverIcon />
                                    </Button>

                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default GerenciaUsuario