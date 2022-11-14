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

import Modal, { getModalUtilityClass, ModalManager } from '@mui/material/Modal';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';

// Icones
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import api from '../servicos/api';
import { useSelector } from 'react-redux';
import ModalProdutos from '../componentes/ModalProdutos';

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
    // Dados vindo do Redux
    const { signin } = useSelector(state => state)

    const [modal, setModal] = useState(false)

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
        //console.log(data)
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
    }, [modal])

    return (
        <Box sx={{ ...EstilosConteudo }}>
            <Titulo titulo="Estoque" />

            {modal && (
                <Modal
                    open={modal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={EstiloModal}>
                        <ModalProdutos
                            respostaBotaoCancelar={() => setModal(!modal)}
                            respostaPositiva={(e) => {
                                setModal(!modal)
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
                                <StyledTableCell align="center">R$ {row.valorProduto}</StyledTableCell>
                                <StyledTableCell align="center">{row.dataAquisicaoProduto}</StyledTableCell>
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