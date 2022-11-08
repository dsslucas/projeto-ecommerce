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

function createData(id, nome, descricao, qtd, valor, dataAquisicao) {
    return { id, nome, descricao, qtd, valor, dataAquisicao };
}

const rows = [
    createData(1, 'Lingerie 1', "Eu não sei pra onde vou. Pode até não dar em nada... Minha vida segue o sol, no horizonte desta estrada...", 6.0, 24, "24-05-2022"),
    createData(2, 'Lingerie 2', "Eu nem sei mesmo quem eu sou, nesta falta de carinho. Por não ter um grande amor, aprendi a ser sozinho...", 237, 9.0, "24-05-2022"),
    createData(3, 'Lingerie 3', "E onde o vento me levar, vou abrir meu coração... Pode ser que no caminho, num atalho, num sorriso, aconteça uma paixão...", 16.0, 24, "24-05-2022"),
    createData(4, 'Lingerie 4', "E vou a-achar, num toque do destino, um brilho de um olhar, sem medo de amar...", 305, 3.7, 67, "24-05-2022"),
    createData(5, 'Lingerie 5', "Não vou dei-xar, de ser um sonhador, pois sei que vou encontrar, no fundo dos meus sonhos, o meu grande amor...", 356, 16.0, 49, "24-05-2022"),
];

const Estoque = () => {
    const [modal, setModal] = useState(false)

    const [cadastroProduto, setCadastroProduto] = useState({
        nome: '',
        descricao: '',
        qtd: 0,
        valor: 0.0,
        dataAquisicao: null
    })

    return (
        <Box sx={{ ...EstilosConteudo, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Titulo titulo="Estoque" />

            {modal && (
                <Modal
                    open={modal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={EstiloModal}>
                        <Titulo titulo="Cadastro de Produto" />

                        <Input
                            id="nome-produto"
                            label="Nome do produto"
                            defaultValue={cadastroProduto.nome}
                            returnValue={(e) => setCadastroProduto({ ...cadastroProduto, nome: e })}
                            disabled
                        />

                        <Input
                            id="descricao-produto"
                            label="Descrição"
                            defaultValue={cadastroProduto.descricao}
                            returnValue={(e) => setCadastroProduto({ ...cadastroProduto, descricao: e })}
                            maxRows={2}
                            multiline
                            inputProps={{ maxLength: 70 }}
                            error={cadastroProduto.descricao.length >= 70 ? true : false}
                            helperText={cadastroProduto.descricao.length >= 70 ? "Você excedeu o limite de 70 caracteres na descrição do produto." : null}
                        />

                        <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box component="div" sx={{ display: 'flex', width: '50%' }}>
                                <Input
                                    id="qtd-produto"
                                    label="Quantidade"
                                    defaultValue={cadastroProduto.qtd}
                                    returnValue={(e) => setCadastroProduto({ ...cadastroProduto, qtd: e })}
                                    type='number'
                                />
                            </Box>

                            <Box component="div" sx={{ display: 'flex', width: '40%' }}>
                                <Input
                                    id="valor-produto"
                                    label="Valor (R$)"
                                    defaultValue={cadastroProduto.valor}
                                    returnValue={(e) => setCadastroProduto({ ...cadastroProduto, valor: e })}
                                    type='number'
                                />
                            </Box>
                        </Box>

                        <Button
                            variant="contained"
                            component="label"
                            sx={{...ButtonBuy, marginBottom: '10px'}}
                        >
                            Imagem
                            <input
                                type="file"
                                hidden
                                required
                            />
                        </Button>

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

            <Box component="div" sx={{ display: 'flex', justifyContent: 'right', marginBottom: '8px' }}>
                <Button
                    sx={{ ...ButtonBuy, width: 'auto' }}
                    onClick={() => setModal(!modal)}
                >
                    Cadastrar produto
                </Button>
            </Box>


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="center">Nome</StyledTableCell>
                            <StyledTableCell align="center" sx={{ width: '400px' }}>Descrição</StyledTableCell>
                            <StyledTableCell align="center">Quantidade</StyledTableCell>
                            <StyledTableCell align="center">Valor unitário</StyledTableCell>
                            <StyledTableCell align="center">Data de Aquisição</StyledTableCell>
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
                                <StyledTableCell align="center">{row.descricao}</StyledTableCell>
                                <StyledTableCell align="center">{row.qtd}</StyledTableCell>
                                <StyledTableCell align="center">R$ {row.valor}</StyledTableCell>
                                <StyledTableCell align="center">{row.dataAquisicao}</StyledTableCell>
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

export default Estoque