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

// Icones
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckIcon from '@mui/icons-material/CheckBox';
import ClearIcon from '@mui/icons-material/Clear';
import api from '../servicos/api';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import ModalCadastro from '../componentes/ModalCadastro';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';
import ModalDelete from '../componentes/ModalDelete';

const GerenciaUsuario = () => {
    // Dados vindo do Redux
    const { signin } = useSelector(state => state)

    // Lista de usuários vinda da API
    const ConsultaApi = async () => {
        // Consulta dos usuários cadastrados
        const { data } = await api.get(`/usuario`, {
            headers: {
                Authorization: signin.token
            }
        })
        //console.log(data)
        setInfoUsuario(data)
    }
    
    // Armazena os dados do usuário
    const [infoUsuario, setInfoUsuario] = useState([])

    const [modalEdit, setModalEdit] = useState({
        exibir: false,
        id: undefined
    })
    const [modalDelete, setModalDelete] = useState({
        exibir: false,
        id: undefined
    })

    // Mensagem de alerta
    const [msgAlerta, setMsgAlerta] = useState({
        status: false,
        resposta: undefined,
        texto: undefined
    })

    useEffect(() => {
        ConsultaApi()
    }, [])

    useEffect(() => {
        ConsultaApi()
        setTimeout(() => {
            setMsgAlerta({
                status: false,
                resposta: undefined,
                texto: undefined
            })
        }, 5000)
    }, [modalEdit, modalDelete, infoUsuario])


    // Altera APENAS a permissão de admin
    const alteraAdmin = async (dados) => {
        try {
            await api.put(`/usuario/${dados.idUsuario}`, {
                idUsuario: dados.idUsuario,
                emailUsuario: dados.emailUsuario,
                nomeUsuario: dados.nomeUsuario,
                senhaUsuario: dados.senhaUsuario,
                enderecoUsuario: dados.enderecoUsuario,
                cidadeUsuario: dados.cidadeUsuario,
                estadoUsuario: dados.estadoUsuario,
                cepUsuario: dados.cepUsuario,
                isAdmin: !dados.isAdmin
            }, {
                headers: {
                    Authorization: signin.token
                }
            })
            // Atualiza a lista
            ConsultaApi()
        } catch (e) {
            console.log("Deu ruim: ", e)
        }
    }

    return (
        <Box sx={{ ...EstilosConteudo,  }}>
            <Titulo titulo="Gerenciamento de usuários" />

            {modalEdit.exibir && (
                <Modal
                    open={modalEdit.exibir}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={EstiloModal}>
                        <ModalCadastro
                            edicao
                            id={modalEdit.id}
                            respostaBotaoCancelar={() => setModalEdit({
                                ...modalEdit,
                                exibir: !modalEdit.exibir,
                                id: undefined
                            })}
                            respostaPositiva={(e) => {
                                setModalEdit({
                                    ...modalEdit,
                                    exibir: !modalEdit.exibir
                                })
                                setMsgAlerta({
                                    ...msgAlerta,
                                    status: true,
                                    resposta: true,
                                    texto: e
                                })
                            }}
                            respostaNegativa={(e) => {
                                setMsgAlerta({
                                    ...msgAlerta,
                                    status: true,
                                    resposta: false,
                                    texto: e
                                })
                            }}
                        />
                    </Box>

                </Modal>
            )}

            {msgAlerta.status && (
                <Box component="div"
                    sx={{
                        width: '50%',
                        zIndex: 2000,
                        display: 'flex',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: 5,
                        left: '25%',
                        right: '25%',
                    }}
                >
                    <Fade in={msgAlerta.status} exit={!msgAlerta.status} timeout={1000}>
                        <Stack
                            sx={{
                                width: 'auto',
                            }}
                            spacing={2}
                        >
                            {msgAlerta.resposta && (
                                <Alert variant="filled" severity="success">
                                    {msgAlerta.texto}
                                </Alert>
                            )}
                            {!msgAlerta.resposta && (
                                <Alert variant="filled" severity="error">
                                    {msgAlerta.texto}
                                </Alert>
                            )}
                        </Stack>
                    </Fade>
                </Box>
            )}

            {modalDelete.exibir && (
                <Modal
                    open={modalDelete.exibir}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={EstiloModal}>
                        <ModalDelete
                            id={modalDelete.id}
                            respostaBotaoCancelar={() => setModalDelete({
                                ...modalDelete,
                                exibir: !modalDelete.exibir,
                                id: undefined
                            })}
                            respostaPositiva={(e) => {
                                setModalDelete({
                                    ...modalEdit,
                                    exibir: !modalEdit.exibir
                                })
                                setMsgAlerta({
                                    ...msgAlerta,
                                    status: true,
                                    resposta: true,
                                    texto: e
                                })
                            }}
                            respostaNegativa={(e) => {
                                setMsgAlerta({
                                    ...msgAlerta,
                                    status: true,
                                    resposta: false,
                                    texto: e
                                })
                            }}
                        />
                    </Box>
                </Modal>
            )}

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center" sx={{ width: '200px' }}>Nome</StyledTableCell>
                            <StyledTableCell align="center" sx={{ width: '150px' }}>E-mail</StyledTableCell>
                            <StyledTableCell align="center" sx={{ width: '200px' }}>Endereço</StyledTableCell>
                            <StyledTableCell align="center" sx={{ width: '40px' }}>UF</StyledTableCell>
                            <StyledTableCell align="center" sx={{ width: '100px' }}>Administrador</StyledTableCell>
                            <StyledTableCell align="center" sx={{ width: '100px' }}>Ações</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {infoUsuario.map((row) => {
                            return (
                                <StyledTableRow key={row.idUsuario}>
                                    <StyledTableCell component="th" scope="row" align="center">{row.nomeUsuario}</StyledTableCell>
                                    <StyledTableCell align="center">{row.emailUsuario}</StyledTableCell>
                                    <StyledTableCell align="center">{row.enderecoUsuario}</StyledTableCell>
                                    <StyledTableCell align="center">{row.estadoUsuario}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button
                                            onClick={() => alteraAdmin(row)}
                                            sx={{ ...ButtonBuy, background: 'none', color: 'none', minWidth: '40px', maxWidth: '40px', minHeight: '40px', maxHeight: '40px' }}
                                        >
                                            {row.isAdmin
                                                ? <CheckIcon sx={{ background: 'green', borderRadius: '3px', color: "#fff" }} />
                                                : <ClearIcon sx={{ background: 'red', borderRadius: '3px', color: '#fff' }} />}
                                        </Button>
                                    </StyledTableCell>
                                    <StyledTableCell align="center" sx={{}}>
                                        <Button
                                            onClick={() => setModalEdit({
                                                ...modalEdit,
                                                exibir: !modalEdit.exibir,
                                                id: row.idUsuario
                                            })}
                                            sx={{ ...ButtonBuy, background: 'yellow', color: Cores.fundoCabecalho, minWidth: '40px', maxWidth: '40px', minHeight: '40px', maxHeight: '40px' }}>
                                            <EditIcon />
                                        </Button>
                                        <Button
                                            onClick={() => setModalDelete({
                                                ...modalDelete,
                                                exibir: !modalDelete.exibir,
                                                id: row.idUsuario
                                            })}
                                            sx={{ ...ButtonBuy, background: 'red', color: Cores.fundoCabecalho, minWidth: '40px', maxWidth: '40px', minHeight: '40px', maxHeight: '40px' }}
                                        >
                                            <DeleteForeverIcon />
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default GerenciaUsuario