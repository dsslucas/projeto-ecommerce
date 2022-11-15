import React, { useEffect, useState } from 'react'
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

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';

// Icones
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import api from '../servicos/api';
import { useSelector } from 'react-redux';
import ModalProdutos from '../componentes/ModalProdutos';
import ModalDelete from '../componentes/ModalDelete';
import moment from 'moment';

const Estoque = () => {
    // Dados vindo do Redux
    const { signin } = useSelector(state => state)

    const [postModal, setPostModal] = useState({
        exibir: false,
        modoPost: false,
        modoEdit: false,
        modoDelete: false,
        dados: undefined
    })

    const [dadosProduto, setDadosProduto] = useState([])

    // Mensagem de alerta
    const [msgAlerta, setMsgAlerta] = useState({
        status: false,
        resposta: undefined,
        texto: undefined
    })

    // Lista de usuários vinda da API
    const ConsultaApi = async () => {
        // Consulta dos usuários cadastrados
        const { data } = await api.get(`/produto`, {
            headers: {
                Authorization: signin.token
            }
        })
        setDadosProduto(data)
    }

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
    }, [postModal])

    return (
        <Box sx={{ ...EstilosConteudo }}>
            <Titulo titulo="Gerenciamento de Estoque" />

            {postModal.exibir && (
                <Modal
                    open={postModal.exibir}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={EstiloModal}>
                        {(postModal.modoPost || postModal.modoEdit) && (
                            <ModalProdutos
                                modoEdit={postModal.modoEdit}
                                dados={postModal.dados}
                                respostaBotaoCancelar={() => setPostModal({
                                    ...postModal,
                                    exibir: !postModal.exibir,
                                    dados: undefined,
                                    modoPost: false,
                                    modoEdit: false,
                                    modoDelete: false
                                })}
                                respostaPositiva={(e) => {
                                    setPostModal({
                                        ...postModal,
                                        exibir: !postModal.exibir,
                                        dados: undefined,
                                        modoPost: false,
                                        modoEdit: false,
                                        modoDelete: false
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
                        )}

                        {postModal.modoDelete && (
                            <ModalDelete
                                modoDelete={postModal.modoDelete}
                                dados={postModal.dados}
                                respostaBotaoCancelar={() => setPostModal({
                                    ...postModal,
                                    exibir: !postModal.exibir,
                                    dados: undefined,
                                    modoPost: false,
                                    modoEdit: false,
                                    modoDelete: false
                                })}
                                respostaPositiva={(e) => {
                                    setPostModal({
                                        ...postModal,
                                        exibir: !postModal.exibir,
                                        dados: undefined,
                                        modoPost: false,
                                        modoEdit: false,
                                        modoDelete: false
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
                        )}
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

            <Box component="div" sx={{ display: 'flex', justifyContent: 'right', marginBottom: '8px' }}>
                <Button
                    sx={{ ...ButtonBuy, width: 'auto' }}
                    onClick={() => setPostModal({
                        ...postModal,
                        exibir: !postModal.exibir,
                        modoPost: true
                    })}
                >
                    Cadastrar produto
                </Button>
            </Box>


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Nome</StyledTableCell>
                            <StyledTableCell align="center" sx={{ width: '400px' }}>Descrição</StyledTableCell>
                            <StyledTableCell align="center">Quantidade</StyledTableCell>
                            <StyledTableCell align="center">Valor unitário</StyledTableCell>
                            <StyledTableCell align="center">Data de Aquisição</StyledTableCell>
                            <StyledTableCell align="center" sx={{ width: '160px' }}>Ações</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dadosProduto.map((row) => (
                            <StyledTableRow key={row.idProduto}>
                                <StyledTableCell
                                    component="th" scope="row" align="center"
                                >
                                    {row.nomeProduto}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.descProduto}</StyledTableCell>
                                <StyledTableCell align="center">{row.qtdProduto}</StyledTableCell>
                                <StyledTableCell align="center">{row.valorProduto.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</StyledTableCell>
                                <StyledTableCell align="center">{moment(row.dataAquisicaoProduto).format("DD/MM/YYYY HH:mm")}</StyledTableCell>
                                <StyledTableCell align="center" sx={{}}>
                                    <Button
                                        onClick={() => {
                                            setPostModal({
                                                ...postModal,
                                                exibir: !postModal.exibir,
                                                dados: row,
                                                modoEdit: !postModal.modoEdit
                                            })
                                        }}
                                        sx={{ ...ButtonBuy, background: 'yellow', color: Cores.fundoCabecalho, minWidth: '40px', maxWidth: '40px', minHeight: '40px', maxHeight: '40px' }}
                                    >
                                        <EditIcon />
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setPostModal({
                                                ...postModal,
                                                exibir: !postModal.exibir,
                                                dados: row,
                                                modoDelete: !postModal.modoEdit
                                            })
                                        }}
                                        sx={{ ...ButtonBuy, background: 'red', color: Cores.fundoCabecalho, minWidth: '40px', maxWidth: '40px', minHeight: '40px', maxHeight: '40px' }}
                                    >
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