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

const Usuario = () => {
    const [atualizaUsuario, setAtualizaUsuario] = useState({})

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
            nome: data[0].nomeUsuario,
            email: data[0].emailUsuario,
            senha: data[0].senhaUsuario,
            endereco: data[0].enderecoUsuario,
            cidade: data[0].cidadeUsuario,
            uf: data[0].estadoUsuario,
            cep: data[0].cepUsuario,
        })
    }

    // Atualiza o cadastro junto ao Banco de Dados
    const atualizaCadastro = async () => {

        try {
            console.log("ESTADO AQUI: ", atualizaUsuario)
            // Manda para a API
            const res = await api.put(`/usuario/${signin.id}`, {
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

            console.log("Deu bão!", res)
        }
        catch (e) {
            console.log("Deu ruim")
        }
        
    }

    useEffect(() => {
        if (signin.email !== null) consultaApi()
    }, [])

    return (
        <Box
            sx={{
                ...EstilosConteudo,
                //display: 'flex', flexDirection: 'column', justifyContent: 'center'
            }}
        >
            <Titulo titulo="Dados do usuário" />

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
                            />
                        </Box>
                        <Box component="div" sx={{ width: '48%' }}>
                            <Input
                                id="senha-usuario"
                                label="Senha"
                                type="password"
                                value={'*********'}
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