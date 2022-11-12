import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Titulo from '../componentes/Titulo';
import { ButtonBuy, EstilosConteudo, LoginCadastroWrapper } from '../styles';
import Input from '../componentes/Input'
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import api from '../servicos/api';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SignIn } from '../redux/actions/SignIn';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';

const Login = () => {
    // Importante para enviar ao Redux
    const [loginUsuario, setLoginUsuario] = useState({
        email: '',
        senha: '',
        token: ''
    })

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

    const [login, setLogin] = useState(true)
    const [cadastro, setCadastro] = useState(false)

    // Pega as respostas e renderiza na tela por função
    const [respostaConexao, setRespostaConexao] = useState({ resultado: undefined, texto: undefined })

    // Efeito de alerta
    const [msgAlerta, setMsgAlerta] = useState(false)

    // Chamada pro Redux
    const dispatch = useDispatch()

    // Dados que vem do Redux
    const {signin} = useSelector(estado => estado)

    // Navegação para outras rotas
    const navigate = useNavigate()

    // Cadastro do usuário no sistema
    const signUp = async () => {
        try {
            await api.post('/usuario', {
                emailUsuario: cadastroUsuario.email,
                nomeUsuario: cadastroUsuario.nome,
                senhaUsuario: cadastroUsuario.senha,
                enderecoUsuario: cadastroUsuario.endereco,
                cidadeUsuario: cadastroUsuario.cidade,
                estadoUsuario: cadastroUsuario.uf,
                cepUsuario: cadastroUsuario.cep,
                isAdmin: cadastroUsuario.isAdmin
            })

            // Manda o resultado
            setRespostaConexao({
                ...respostaConexao,
                resultado: true,
                texto: `${cadastroUsuario.nome}, seu usuário foi cadastrado em nosso sistema!`
            })

            // Chama o alerta
            setMsgAlerta(!msgAlerta)

            // Zera o estado
            setCadastroUsuario({
                ...cadastroUsuario,
                nome: '',
                email: '',
                senha: '',
                endereco: '',
                cidade: '',
                uf: '',
                cep: '',
                isAdmin: false
            })

            // Volta para o Login
            setCadastro(!cadastro)
            setLogin(!login)
        } catch (e) {
            //alert("Usuário não cadastrado.")
            setRespostaConexao({
                ...respostaConexao,
                resultado: false,
                texto: 'Os dados informados estão incorretos.'
            })

            // Chama o alerta
            setMsgAlerta(!msgAlerta)
        }
    }

    // Login de usuário
    const signIn = async () => {
        try {
            const res = await api.post('/login', {
                emailUsuario: loginUsuario.email,
                senhaUsuario: loginUsuario.senha
            })

            // Token vindo do backend, para segurança
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`

            // Envia para o Redux, por ser importante para as etapas seguintes
            dispatch(SignIn({
                id: res.data.idUsuario,
                email: loginUsuario.email,
                senha: loginUsuario.senha,
                token: `bearer ${res.data.token}`,
                uf: res.data.estadoUsuario,
                isAdmin: res.data.isAdmin
            }))

            setRespostaConexao({
                ...respostaConexao,
                resultado: true,
                texto: `É um prazer lhe receber, ${res.data.nomeUsuario}.`
            })

            // Chama o alerta
            setMsgAlerta(!msgAlerta)

            // Navega para Produtos se o Fade tiver fechado e tiver registro do usuário no Redux
            if(!msgAlerta && signin.email !== undefined) {
                setTimeout(() => {
                    navigate('/produtos')
                }, 6000)
            }
        } catch (e) {
            setRespostaConexao({
                ...respostaConexao,
                resultado: false,
                texto: `Os dados informados não foram encontrados em nosso sistema.`
            })

            // Chama o alerta
            setMsgAlerta(!msgAlerta)
        }
    }

    // Necessário para o Fade exibir ou não.
    useEffect(() => {
        if (respostaConexao.resultado !== undefined) {
            setTimeout(() => {
                setMsgAlerta(!msgAlerta)
                setRespostaConexao({
                    ...respostaConexao,
                    resultado: undefined,
                    texto: undefined
                })
            }, 5000)
        }
    }, [])

    return (
        <Box
            component="div"
            sx={{
                ...EstilosConteudo,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: 'none'
            }}
        >

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
                    <Fade in={msgAlerta} exit={!msgAlerta} timeout={1000}>
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
                            {!respostaConexao.resultado && (
                                <Alert variant="filled" severity="error">
                                    {respostaConexao.texto}
                                </Alert>
                            )}
                        </Stack>
                    </Fade>
                </Box>
            }

            <Box component="div" sx={LoginCadastroWrapper}>
                <Titulo titulo={login ? "Login" : "Cadastro"} barraLogin />

                {login && (
                    <>
                        <Input
                            id="email-usuario"
                            label="E-mail"
                            defaultValue={loginUsuario.email}
                            returnValue={(e) => setLoginUsuario({ ...loginUsuario, email: e })}
                            error={!loginUsuario.email.includes('@') || !loginUsuario.email.includes('.') ? true : false}
                            helperText={!loginUsuario.email.includes('@') || !loginUsuario.email.includes('.') ? "É necessário conter arroba e ponto." : false}
                        />

                        <Input
                            id="senha-usuario"
                            label="Senha"
                            type="password"
                            defaultValue={loginUsuario.senha}
                            returnValue={(e) => setLoginUsuario({ ...loginUsuario, senha: e })}
                        />

                        <Button sx={{ ...ButtonBuy }} onClick={() => signIn()}>Login</Button>
                    </>
                )}

                {cadastro && (
                    <>
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
                                    error={!cadastroUsuario.email.includes('@') || !cadastroUsuario.email.includes('.') ? true : false}
                                    helperText={!cadastroUsuario.email.includes('@') || !cadastroUsuario.email.includes('.') ? "É necessário conter arroba e ponto." : false}
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
                                    defaultValue={cadastroUsuario.uf}
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
                            helperText={cadastroUsuario.cep.length > 8 ? "Informe o CEP com oito dígitos e sem o traço (-)." : null}
                        />

                        <Button sx={{ ...ButtonBuy }} onClick={() => signUp()}>Cadastrar</Button>
                    </>
                )}

                <Button
                    variant="text" sx={{ width: 'auto', marginTop: '10px' }}
                    onClick={() => {
                        setLogin(!login)
                        setCadastro(!cadastro)
                    }}
                >
                    {login ? "Ainda não tenho cadastro" : "Voltar para o Login"}
                </Button>
            </Box>

        </Box>
    )
}

export default Login