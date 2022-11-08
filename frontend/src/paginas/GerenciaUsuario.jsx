import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { ButtonBuy, Cores, EstiloModal, EstilosConteudo, StyledTableCell, StyledTableRow } from '../styles';
import Titulo from '../componentes/Titulo';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import Input from '../componentes/Input'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

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

    const [modal, setModal] = useState(false)

    return (

        <Box sx={{ ...EstilosConteudo, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {modal && (
                <Modal
                    open={modal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={EstiloModal}>
                        <Titulo titulo="Cadastro de usuário" />

                        <Input
                            id="nome-usuario"
                            label="Nome do usuário"
                            defaultValue={cadastroUsuario.nome}
                            returnValue={(e) => setCadastroUsuario({ ...cadastroUsuario, nome: e })}
                            disabled
                        />

                        <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box component="div" sx={{ width: '48%' }}>
                                <Input
                                    id="email-usuario"
                                    label="E-mail"
                                    defaultValue={cadastroUsuario.email}
                                    returnValue={(e) => setCadastroUsuario({ ...cadastroUsuario, email: e })}
                                />
                            </Box>
                            <Box component="div" sx={{ width: '48%' }}>
                                <Input
                                    id="senha-usuario"
                                    label="Senha"
                                    type="password"
                                    defaultValue={cadastroUsuario.senha}
                                    returnValue={(e) => setCadastroUsuario({ ...cadastroUsuario, senha: e })}
                                />
                            </Box>
                        </Box>

                        <Input
                            id="endereco-usuario"
                            label="Endereço"
                            defaultValue={cadastroUsuario.endereco}
                            returnValue={(e) => setCadastroUsuario({ ...cadastroUsuario, endereco: e })}
                        />

                        <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <Box component="div"
                                sx={theme => ({
                                    width: '60%',
                                    [theme.breakpoints.down('sm')]: {
                                        width: '50%'
                                    }
                                })}
                            >
                                <Input
                                    id="cidade-usuario"
                                    label="Cidade"
                                    defaultValue={cadastroUsuario.cidade}
                                    returnValue={(e) => setCadastroUsuario({ ...cadastroUsuario, cidade: e })}
                                />
                            </Box>

                            <Box component="div"
                                sx={theme => ({
                                    width: '25%',
                                    [theme.breakpoints.down('sm')]: {
                                        width: '30%'
                                    }
                                })}
                            >
                                <InputLabel id="uf-usuario-label" required>UF</InputLabel>
                                <Select
                                    labelId="uf-usuario-label"
                                    id="uf_usuario"
                                    value={cadastroUsuario.uf}
                                    label="Estado"
                                    onChange={(e) => setCadastroUsuario({ ...cadastroUsuario, uf: e.target.value })}
                                    sx={{ color: 'black', width: '100%' }}
                                    required
                                >
                                    <MenuItem value="AC">Acre</MenuItem>
                                    <MenuItem value="AL">Alagoas</MenuItem>
                                    <MenuItem value="AP">Amapá</MenuItem>
                                    <MenuItem value="AM">Amazonas</MenuItem>
                                    <MenuItem value="BA">Bahia</MenuItem>
                                    <MenuItem value="CE">Ceará</MenuItem>
                                    <MenuItem value="DF">Distrito Federal</MenuItem>
                                    <MenuItem value="ES">Espírito Santo</MenuItem>
                                    <MenuItem value="GO">Goiás</MenuItem>
                                    <MenuItem value="MA">Maranhão</MenuItem>
                                    <MenuItem value="MT">Mato Grosso</MenuItem>
                                    <MenuItem value="MS">Mato Grosso do Sul</MenuItem>
                                    <MenuItem value="MG">Minas Gerais</MenuItem>
                                    <MenuItem value="PA">Pará</MenuItem>
                                    <MenuItem value="PB">Paraíba</MenuItem>
                                    <MenuItem value="PR">Paraná</MenuItem>
                                    <MenuItem value="PE">Pernambuco</MenuItem>
                                    <MenuItem value="PI">Piauí</MenuItem>
                                    <MenuItem value="RJ">Rio de Janeiro</MenuItem>
                                    <MenuItem value="RN">Rio Grande do Norte</MenuItem>
                                    <MenuItem value="RS">Rio Grande do Sul</MenuItem>
                                    <MenuItem value="RO">Rondônia</MenuItem>
                                    <MenuItem value="RR">Roraima</MenuItem>
                                    <MenuItem value="SC">Santa Catarina</MenuItem>
                                    <MenuItem value="SP">São Paulo</MenuItem>
                                    <MenuItem value="SE">Sergipe</MenuItem>
                                    <MenuItem value="TO">Tocantins</MenuItem>
                                </Select>
                            </Box>
                        </Box>

                        <Input
                            id="cep-usuario"
                            label="CEP"
                            defaultValue={cadastroUsuario.cidade}
                            returnValue={(e) => setCadastroUsuario({ ...cadastroUsuario, cep: e })}
                            type='number'
                            inputProps={{ maxLength: 8 }}
                            error={cadastroUsuario.cep.length > 8 ? true : false}
                            helperText={cadastroUsuario.cep.length > 8 ? "Excesso de números para o CEP. Informe o CEP sem o traço (-)." : null}
                        />

                        <Box
                            component="div"
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'right'
                            }}
                        >
                            <Button
                                size="small" variant="contained"
                                color="error"
                                onClick={() => setModal(!modal)}
                            >
                                Cancelar
                            </Button>

                            <Button
                                size="small"
                                variant="contained"
                                sx={{ ...ButtonBuy, width: 'auto', marginLeft: '10px' }}
                                onClick={() => setModal(!modal)}
                            >
                                Cadastrar
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            )}

            <Titulo titulo="Gerenciamento de usuários" />

            <Box component="div" sx={{ display: 'flex', justifyContent: 'right', marginBottom: '8px' }}>
                <Button
                    sx={{ ...ButtonBuy, width: 'auto' }}
                    onClick={() => setModal(!modal)}
                >
                    Cadastrar usuário
                </Button>
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
                                <StyledTableCell align="center">{row.isAdmin ? <CheckIcon sx={{ background: 'green', borderRadius: '3px', color: "#fff" }} /> : <ClearIcon sx={{ background: 'red', borderRadius: '3px', color: '#fff' }} />}</StyledTableCell>
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