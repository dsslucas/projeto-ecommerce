import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { ButtonBuy, CommonBox, EstiloModal, EstilosConteudo, InformacoesCarrinho } from '../styles';
import Grid from '@mui/material/Grid';
import CardCarrinho from '../componentes/CardCarrinho';
import Typography from '@mui/material/Typography';

// Para o login/signup
import Modal, { modalClasses } from '@mui/material/Modal';
import Input from '../componentes/Input'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

// Imagens
import Image1 from '../assets/IMG-1310.jpg'
import Image2 from '../assets/IMG-1311.jpg'
// import Image3 from '../assets/IMG-1313.jpg'
// import Image4 from '../assets/IMG-1326.jpg'
// import Image5 from '../assets/IMG-1327.jpg'
// import Image6 from '../assets/IMG-1330.jpg'
// import Image7 from '../assets/IMG-1334.jpg'
// import Image8 from '../assets/IMG-1335.jpg'
import Span from '../componentes/Span';
import Titulo from '../componentes/Titulo';
import ModalCadastro from '../componentes/ModalCadastro';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import ModalLogin from '../componentes/ModalLogin';

// Redux
import { useSelector } from 'react-redux'
import { useEffect } from 'react';

const Carrinho = () => {
    // Redux
    const { signin, carrinho } = useSelector(estado => estado)

    //console.log(signin)

    // Necessário para o Select
    //const [selectValue, setSelectValue] = useState('')

    const [modal, setModal] = useState(false)
    const [modalLogin, setModalLogin] = useState(true)
    const [modalCadastro, setModalCadastro] = useState(false)

    // // Registro de usuário logado
    // const [dadosUsuarioLogado, setDadosUsuarioLogado] = useState({})

    // useEffect(() => {
    //     // Salva os dados do usuário logado
    //     setDadosUsuarioLogado(signin)
    // }, [])

    return (
        <Box sx={{ ...EstilosConteudo }}>
            <Titulo titulo="Carrinho" />

            {modal && (

                <Modal
                    open={modal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={EstiloModal}>
                        {modalLogin && (
                            <ModalLogin
                                respostaBotaoCancelar={() => {
                                    setModal(!modal)
                                }}
                            />
                        )}
                        {modalCadastro && (
                            <ModalCadastro
                                respostaBotaoCancelar={() => {
                                    setModal(!modal)
                                    setModalLogin(!modalLogin)
                                    setModalCadastro(!modalCadastro)
                                }}
                            />
                        )}

                        <Button
                            variant="text" sx={{ width: '100%', marginTop: '10px' }}
                            onClick={() => {
                                setModalLogin(!modalLogin)
                                setModalCadastro(!modalCadastro)
                            }}
                        >
                            {!modalCadastro ? "Ainda não tenho cadastro" : "Voltar para o Login"}
                        </Button>
                    </Box>
                </Modal>
            )
            }

            <Grid container spacing={0}>
                <Grid item
                    xs={12} lg={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <CardCarrinho
                        image={Image1}
                        titulo="Conjunto X"
                        preco={149.99}
                    />
                    <CardCarrinho
                        image={Image2}
                        titulo="Conjunto Y"
                        preco={10.99}
                    />
                </Grid>

                <Grid item
                    xs={12} lg={6}
                    sx={InformacoesCarrinho}
                >
                    <FormControl>
                        <Typography
                            gutterBottom
                            variant="h6" component="div"
                            sx={{ marginLeft: '10px', marginRight: '10px', textAlign: 'center' }}
                        >
                            Informações sobre seu pedido
                        </Typography>

                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderRadius: '8px',
                                alignItems: 'center'
                            }}
                        >
                            <Typography
                                gutterBottom
                                variant="h6" component="div"
                                sx={{ marginLeft: '10px', marginRight: '10px', width: '50%' }}
                            >
                                Selecione um método de pagamento:
                            </Typography>

                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue=""
                                name="radio-buttons-group"
                                aria-required
                            >
                                <FormControlLabel value="PIX" control={<Radio color="secondary" />} label="PIX" />
                                <FormControlLabel value="BOLETO" control={<Radio color="secondary" />} label="Boleto bancário" />
                            </RadioGroup>
                        </Box>

                        <Box
                            component="div"
                            sx={CommonBox}
                        >
                            <Typography
                                gutterBottom
                                variant="h6" component="div"
                                sx={{ marginLeft: '10px', marginRight: '10px' }}
                            >
                                Valor dos produtos
                            </Typography>

                            <Span number={`R$ ${450.20}`} />
                        </Box>

                        <Box
                            component="div"
                            sx={CommonBox}
                        >
                            <Typography
                                gutterBottom
                                variant="h6" component="div"
                                sx={{ marginLeft: '10px', marginRight: '10px' }}
                            >
                                Frete
                            </Typography>

                            <Span number={`R$ ${25.28}`} />
                        </Box>

                        <Box
                            component="div"
                            sx={CommonBox}
                        >
                            <Typography
                                gutterBottom
                                variant="h6" component="div"
                                sx={{ marginLeft: '10px', marginRight: '10px' }}
                            >
                                Valor total:
                            </Typography>

                            <Span number={`R$ ${25.28}`} />
                        </Box>

                        <Typography
                            gutterBottom
                            variant="h6" component="div"
                            sx={{ marginLeft: '10px', marginRight: '10px' }}
                        >
                            Prazo de entrega:

                            10 dias úteis
                        </Typography>

                        <Box
                            component="div"
                            sx={{ ...CommonBox, justifyContent: 'right' }}
                        >
                            <Button variant="contained" color="error">Cancelar</Button>
                            <Button
                                sx={{ ...ButtonBuy, marginLeft: '5px', width: '35%' }}
                                onClick={() => signin ? setModal(!modal) : null}
                            >
                                Comprar
                            </Button>
                        </Box>
                    </FormControl>
                </Grid>

            </Grid>
        </Box >
    )
}

export default Carrinho