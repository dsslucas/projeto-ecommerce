import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import { ButtonBuy, Cores, EstilosConteudo } from '../styles';
import Input from '../componentes/Input'
import Titulo from '../componentes/Titulo';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import PersonOffIcon from '@mui/icons-material/PersonOff';
import api from '../servicos/api';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';

const Usuario = () => {
    // Salva os dados do usuário
    const [atualizaUsuario, setAtualizaUsuario] = useState({
        nome: undefined,
        email: undefined,
        senha: undefined,
        endereco: undefined,
        cidade: undefined,
        uf: undefined,
        cep: undefined
    })

    // Efeito de alerta
    const [msgAlerta, setMsgAlerta] = useState({
        status: false,
        resposta: undefined,
        texto: undefined
    })

    // Botão pressionado
    const [botaoPressionado, setBotaoPressionado] = useState(false)

    // Dados que vem do Redux
    const { signin } = useSelector(estado => estado)

    // Navegação
    const navigate = useNavigate()

    // Consulta do usuário único
    const consultaApi = async () => {
        // Consulta das informações do usuário
        const { data } = await api.get(`/usuario/${signin.id}`, {
            headers: {
                Authorization: signin.token
            }
        })
        setAtualizaUsuario({
            nome: data.nomeUsuario,
            email: data.emailUsuario,
            senha: data.senhaUsuario,
            endereco: data.enderecoUsuario,
            cidade: data.cidadeUsuario,
            uf: data.estadoUsuario,
            cep: data.cepUsuario,
        })
    }

    // Atualiza o cadastro junto ao Banco de Dados
    const atualizaCadastro = async () => {
        setBotaoPressionado(true)
        try {
            // Manda para a API
            await api.put(`/usuario/${signin.id}`, {
                emailUsuario: atualizaUsuario.email,
                nomeUsuario: atualizaUsuario.nome,
                senhaUsuario: atualizaUsuario.senha,
                enderecoUsuario: atualizaUsuario.endereco,
                cidadeUsuario: atualizaUsuario.cidade,
                estadoUsuario: atualizaUsuario.uf,
                cepUsuario: atualizaUsuario.cep
            }, {
                headers: {
                    Authorization: signin.token
                }
            })

            setMsgAlerta({
                status: true,
                resposta: true,
                texto: "Atualização cadastral realizada."
            })
        }
        catch (e) {
            setMsgAlerta({
                status: true,
                resposta: false,
                texto: "A atualização cadastral não foi realizada por falta de dados."
            })
        }
    }

    useEffect(() => {
        if (signin.email !== null) {
            consultaApi()
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setMsgAlerta({
                status: false,
                resposta: undefined,
                texto: undefined
            })
        }, 5000)
    }, [botaoPressionado])

    return (
        <Box
            sx={{
                ...EstilosConteudo,
                //display: 'flex', flexDirection: 'column', justifyContent: 'center'
            }}
        >
            <Titulo titulo="Dados do usuário" />

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

            {signin.email === null && (
                <Box
                    component="div"
                    sx={{
                        height: 'calc(100vh - 222px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
                    }}
                >
                    <PersonOffIcon sx={{ color: Cores.fundoCabecalho, width: "50%", height: "50%" }} />

                    <Typography
                        component="h6"
                        variant="h6"
                        sx={{ textAlign: 'center', color: Cores.fundoCabecalho }}
                    >
                        Você não está logado.
                    </Typography>

                    <Button
                        sx={{ ...ButtonBuy, width: 'auto', marginTop: '5px' }}
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </Button>
                </Box>
            )}

            {signin.email !== null && (
                <Box
                    component="div"
                    sx={{
                        height: 'calc(100vh - 222px)',
                        display: 'flex', justifyContent: 'center', flexDirection: 'column'
                    }}
                >
                    <Input
                        id="nome-usuario"
                        label="Nome do usuário"
                        value={atualizaUsuario.nome}
                        returnValue={(e) => setAtualizaUsuario({ ...atualizaUsuario, nome: e })}
                    />

                    <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box component="div" sx={{ width: '48%' }}>
                            <Input
                                id="email-usuario"
                                label="E-mail"
                                value={atualizaUsuario.email}
                                returnValue={(e) => setAtualizaUsuario({ ...atualizaUsuario, email: e })}
                                error={atualizaUsuario.email !== undefined && (!atualizaUsuario.email.includes('@') || !atualizaUsuario.email.includes('.')) ? true : false}
                                helperText={atualizaUsuario.email !== undefined && (!atualizaUsuario.email.includes('@') || !atualizaUsuario.email.includes('.')) ? "É necessário conter arroba e ponto." : false}
                            />
                        </Box>
                        <Box component="div" sx={{ width: '48%' }}>
                            <Input
                                id="senha-usuario"
                                label="Senha"
                                type="password"
                                //value={'*********'}
                                returnValue={(e) => setAtualizaUsuario({ ...atualizaUsuario, senha: e })}
                            />
                        </Box>
                    </Box>

                    <Input
                        id="endereco-usuario"
                        label="Endereço"
                        value={atualizaUsuario.endereco}
                        returnValue={(e) => setAtualizaUsuario({ ...atualizaUsuario, endereco: e })}
                    />

                    <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <Box component="div"
                            sx={theme => ({
                                width: '30%',
                                [theme.breakpoints.down('sm')]: {
                                    width: '100%'
                                }
                            })}
                        >
                            <Input
                                id="cidade-usuario"
                                label="Cidade"
                                value={atualizaUsuario.cidade}
                                returnValue={(e) => setAtualizaUsuario({ ...atualizaUsuario, cidade: e })}
                            />
                        </Box>

                        <Box component="div"
                            sx={theme => ({
                                width: '30%',
                                [theme.breakpoints.down('sm')]: {
                                    width: '48%'
                                }
                            })}
                        >
                            <InputLabel id="uf-usuario-label" required>UF</InputLabel>
                            <Select
                                labelId="uf-usuario-label"
                                id="uf_usuario"
                                value={atualizaUsuario.uf !== undefined ? `${atualizaUsuario.uf}` : ''}
                                label="Estado"
                                onChange={(e) => setAtualizaUsuario({ ...atualizaUsuario, uf: e.target.value })}
                                sx={{ color: 'black', width: '100%' }}
                                required
                            >
                                <MenuItem value={"AC"}>Acre</MenuItem>
                                <MenuItem value={"AL"}>Alagoas</MenuItem>
                                <MenuItem value={"AP"}>Amapá</MenuItem>
                                <MenuItem value={"AM"}>Amazonas</MenuItem>
                                <MenuItem value={"BA"}>Bahia</MenuItem>
                                <MenuItem value={"CE"}>Ceará</MenuItem>
                                <MenuItem value={"DF"}>Distrito Federal</MenuItem>
                                <MenuItem value={"ES"}>Espírito Santo</MenuItem>
                                <MenuItem value={"GO"}>Goiás</MenuItem>
                                <MenuItem value={"MA"}>Maranhão</MenuItem>
                                <MenuItem value={"MT"}>Mato Grosso</MenuItem>
                                <MenuItem value={"MS"}>Mato Grosso do Sul</MenuItem>
                                <MenuItem value={"MG"}>Minas Gerais</MenuItem>
                                <MenuItem value={"PA"}>Pará</MenuItem>
                                <MenuItem value={"PB"}>Paraíba</MenuItem>
                                <MenuItem value={"PR"}>Paraná</MenuItem>
                                <MenuItem value={"PE"}>Pernambuco</MenuItem>
                                <MenuItem value={"PI"}>Piauí</MenuItem>
                                <MenuItem value={"RJ"}>Rio de Janeiro</MenuItem>
                                <MenuItem value={"RN"}>Rio Grande do Norte</MenuItem>
                                <MenuItem value={"RS"}>Rio Grande do Sul</MenuItem>
                                <MenuItem value={"RO"}>Rondônia</MenuItem>
                                <MenuItem value={"RR"}>Roraima</MenuItem>
                                <MenuItem value={"SC"}>Santa Catarina</MenuItem>
                                <MenuItem value={"SP"}>São Paulo</MenuItem>
                                <MenuItem value={"SE"}>Sergipe</MenuItem>
                                <MenuItem value={"TO"}>Tocantins</MenuItem>
                            </Select>
                        </Box>

                        <Box component="div"
                            sx={theme => ({
                                width: '30%',
                                [theme.breakpoints.down('sm')]: {
                                    width: '48%'
                                }
                            })}
                        >
                            <Input
                                id="cep-usuario"
                                label="CEP"
                                value={atualizaUsuario.cep}
                                returnValue={(e) => setAtualizaUsuario({ ...atualizaUsuario, cep: e })}
                                type='number'
                                inputProps={{ maxLength: 8 }}
                                error={atualizaUsuario.cep !== undefined && atualizaUsuario.cep.length > 8 ? true : false}
                                helperText={atualizaUsuario.cep !== undefined && atualizaUsuario.cep.length > 8 ? "Excesso de números para o CEP. Informe o seu CEP sem o traço (-)." : null}
                            />
                        </Box>
                    </Box>

                    <Box
                        component="div"
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'right',
                            marginTop: '15px'
                        }}
                    >
                        <Button
                            size="small"
                            variant="contained"
                            sx={{ ...ButtonBuy, width: 'auto', marginLeft: '10px' }}
                            onClick={() => atualizaCadastro()}
                        >
                            Atualizar
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default Usuario