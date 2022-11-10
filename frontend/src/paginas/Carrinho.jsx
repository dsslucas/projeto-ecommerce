import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import { ButtonBuy, CommonBox, Cores, EstiloModal, EstilosConteudo, InformacoesCarrinho } from '../styles';
import Grid from '@mui/material/Grid';
import CardCarrinho from '../componentes/CardCarrinho';
import Typography from '@mui/material/Typography';

// Para o login/signup
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

// Imagens
import Image1 from '../assets/IMG-1310.jpg'
//import Image2 from '../assets/IMG-1311.jpg'
// import Image3 from '../assets/IMG-1313.jpg'
// import Image4 from '../assets/IMG-1326.jpg'
// import Image5 from '../assets/IMG-1327.jpg'
// import Image6 from '../assets/IMG-1330.jpg'
// import Image7 from '../assets/IMG-1334.jpg'
// import Image8 from '../assets/IMG-1335.jpg'
import Span from '../componentes/Span';
import Titulo from '../componentes/Titulo';
import ModalCadastro from '../componentes/ModalCadastro';
import ModalLogin from '../componentes/ModalLogin';
import MuiAlert from '@mui/material/Alert';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import api from '../servicos/api';
import { LimpaCarrinho } from '../redux/actions/Carrinho';

const Alerta = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Carrinho = () => {
    // Redux
    const { signin, carrinho } = useSelector(estado => estado)

    // Manda para as Actions
    const dispatch = useDispatch()

    // Navegação do React Router
    const navigate = useNavigate()

    console.log("Dados do login: ", signin)
    console.log("Carrinho:", carrinho)

    // Abertura e fechamento dos modais
    const [modal, setModal] = useState(false)
    const [modalLogin, setModalLogin] = useState(true)
    const [modalCadastro, setModalCadastro] = useState(false)

    // Aviso de compra efetuada
    const [abrirSnackbar, setAbrirSnackbar] = useState(false)

    // Pega os dados que vem dos Modais e renderiza na tela por função
    const [respostaConexao, setRespostaConexao] = useState({ resultado: undefined, texto: undefined })

    // Resposta do Radio
    const [dadosCompra, setDadosCompra] = useState({})

    // Concretiza a compra dos itens no carrinho
    async function realizacaoCompra() {
        // Checa se o usuário está logado
        if (signin.email === null) {
            // Abre o modal para realização de login/cadastro
            setModal(!modal)
        }

        // O usuário está logado
        else {
            // Envia para o backend/BD
            await api.post('/venda', {
                compras: dadosCompra.compras,
                metodoPagamento: dadosCompra.metodoPagamento
            }, {
                headers: {
                    "Authorization": signin.token
                }
            })

            // Abrir o aviso que a compra foi realizada
            setAbrirSnackbar(!abrirSnackbar)

            setTimeout(() => {
                // Transfere para a página de Compras
                navigate('/compras')

                // Limpa o carrinho
                dispatch(LimpaCarrinho())
            }, 10000)
        }
    }

    // Atualiza o componente
    useEffect(() => {
        // Necessário para iterar o estado quando há alteração
        const compras = carrinho.map((item) => {
            return { idProduto: item.id, quantidade: item.qtd }
        })
        setDadosCompra({ ...dadosCompra, compras })
    }, [carrinho])

    return (
        <Box sx={{ ...EstilosConteudo }}>
            <Titulo titulo="Carrinho" />

            {respostaConexao.resultado !== undefined &&
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
                    <Fade in={respostaConexao.resultado !== undefined} timeout={1000}>
                        <Stack
                            sx={{
                                width: 'auto',
                            }}
                            spacing={2}
                        >
                            {respostaConexao.resultado && (
                                <Alert variant="filled" severity="success">
                                    {respostaConexao.texto}
                                </Alert>
                            )}
                            {respostaConexao.resultado !== undefined && !respostaConexao.resultado && (
                                <Alert variant="filled" severity="error">
                                    {respostaConexao.texto}
                                </Alert>
                            )}

                            {setTimeout(() => {
                                setRespostaConexao({ ...respostaConexao, resultado: undefined, texto: undefined })
                            }, 4000)}
                        </Stack>
                    </Fade>
                </Box>
            }

            {modal && (
                <Modal
                    open={modal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={EstiloModal}>
                        {modalLogin && (
                            <ModalLogin
                                respostaPositiva={(e) => {
                                    setRespostaConexao({
                                        resultado: true,
                                        texto: e
                                    })
                                }}
                                respostaNegativa={(e) => {
                                    setRespostaConexao({
                                        resultado: false,
                                        texto: e
                                    })
                                }}
                                respostaBotaoCancelar={() => {
                                    setModal(!modal)
                                }}
                            />
                        )}
                        {modalCadastro && (
                            <ModalCadastro
                                respostaPositiva={(e) => {
                                    setRespostaConexao({
                                        resultado: true,
                                        texto: e
                                    })
                                }}
                                respostaNegativa={(e) => {
                                    setRespostaConexao({
                                        resultado: false,
                                        texto: e
                                    })
                                }}
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
            )}

            {carrinho.length > 0 && (
                <Grid container spacing={0}>
                    <Grid item
                        xs={12} lg={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        {carrinho.map((item) => {
                            return (
                                <CardCarrinho
                                    image={Image1}
                                    titulo={item.titulo}
                                    preco={item.preco}
                                    qtd={item.qtd}
                                    id={item.id}
                                />
                            )
                        })}
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
                                    Método de pagamento:
                                </Typography>

                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue=""
                                    name="radio-buttons-group"
                                    aria-required
                                    onChange={(e) => setDadosCompra({ ...dadosCompra, metodoPagamento: e.target.value })}
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
                                <Button variant="contained" color="error"
                                    onClick={() => dispatch(LimpaCarrinho())}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    sx={{ ...ButtonBuy, marginLeft: '5px', width: '35%' }}
                                    onClick={() => realizacaoCompra()}
                                    disabled={!dadosCompra.metodoPagamento ? true : false}
                                >
                                    Comprar
                                </Button>
                            </Box>
                        </FormControl>
                    </Grid>
                </Grid>
            )}

            {carrinho.length === 0 && (
                <Box
                    component="div"
                    sx={{
                        height: 'calc(100vh - 222px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
                    }}
                >
                    <ProductionQuantityLimitsIcon sx={{color: Cores.fundoCabecalho, width: "50%", height: "50%"}}/>

                    <Typography
                        component="h6"
                        variant="h6"
                        sx={{ textAlign: 'center', color: Cores.fundoCabecalho }}
                    >
                        Seu carrinho está vazio. Faça uma compra conosco.
                    </Typography>
                </Box>
            )}

            <Snackbar open={abrirSnackbar} onClose={() => setAbrirSnackbar(!abrirSnackbar)} autoHideDuration={6000}>
                <Alerta onClose={() => setAbrirSnackbar(!abrirSnackbar)} severity="success" sx={{ width: '50%' }}>
                    Compra realizada com sucesso! Agradecemos pela preferência.
                </Alerta>
            </Snackbar>
        </Box >
    )
}

export default Carrinho