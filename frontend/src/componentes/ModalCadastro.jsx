import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal';
import Input from './Input'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { ButtonBuy } from '../styles';
import Titulo from './Titulo';
import Button from '@mui/material/Button';
import api from '../servicos/api';
import { useSelector } from 'react-redux';

export default function ModalCadastro(props) {
    // Informações do usuário vinda do Redux
    const { signin } = useSelector(state => state)

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

    // Retorna para o Carrinho/Gerenciamento de Usuários, fechando o modal
    function returnBotaoCancelar() {
        setCadastroUsuario({
            nome: undefined,
            email: undefined,
            senha: undefined,
            endereco: undefined,
            cidade: undefined,
            uf: undefined,
            cep: undefined,
            isAdmin: false
        })
        props.respostaBotaoCancelar()
    }

    // Consulta na API, específica para Atualização Cadastral
    const ConsultaApi = async () => {
        const { data } = await api.get(`/usuario/${props.id}`, {
            headers: {
                Authorization: signin.token
            }
        })
        console.log(data)

        setCadastroUsuario({
            nome: data[0].nomeUsuario,
            email: data[0].emailUsuario,
            senha: data[0].senhaUsuario,
            endereco: data[0].enderecoUsuario,
            cidade: data[0].cidadeUsuario,
            uf: data[0].estadoUsuario,
            cep: data[0].cepUsuario
        })
    }

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
            props.respostaPositiva(`${cadastroUsuario.nome}, seu usuário foi cadastrado em nosso sistema!`)

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

            // Chama para fechar o modal
            //returnBotaoCancelar()

        } catch (e) {
            //alert("Usuário não cadastrado.")
            //console.log(e)
            props.respostaNegativa("Os dados informados estão incorretos.")
        }
    }

    // Atualização cadastral do usuário
    const atualizaUsuario = async () => {
        try {
            await api.put(`/usuario/${props.id}`, {
                idUsuario: props.id,
                emailUsuario: cadastroUsuario.email,
                nomeUsuario: cadastroUsuario.nome,
                senhaUsuario: cadastroUsuario.senha,
                enderecoUsuario: cadastroUsuario.endereco,
                cidadeUsuario: cadastroUsuario.cidade,
                estadoUsuario: cadastroUsuario.uf,
                cepUsuario: cadastroUsuario.cep
            },{
                headers: {
                    Authorization: signin.token
                }
            })

            // Manda o resultado
            props.respostaPositiva(`Os dados de ${cadastroUsuario.nome} foram atualizados em nosso sistema!`)
        } catch (e) {
            props.respostaNegativa("Os dados informados estão incorretos.")
        }
    }

    useEffect(() => {
        if (props.edicao) {
            ConsultaApi()
        }
    }, [])

    return (
        <>
            <Box>
                <Titulo titulo={props.edicao ? "Editar usuário" : "Cadastro de usuário"} />

                <Input
                    id="nome-usuario"
                    label="Nome do usuário"
                    value={cadastroUsuario.nome}
                    returnValue={(e) => setCadastroUsuario({ ...cadastroUsuario, nome: e })}
                    disabled
                />

                <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box component="div" sx={{ width: '48%' }}>
                        <Input
                            id="email-usuario"
                            label="E-mail"
                            value={cadastroUsuario.email}
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
                            //value={undefined}
                            returnValue={(e) => setCadastroUsuario({ ...cadastroUsuario, senha: e })}
                        />
                    </Box>
                </Box>

                <Input
                    id="endereco-usuario"
                    label="Endereço"
                    value={cadastroUsuario.endereco}
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
                            type="text"
                            value={cadastroUsuario.cidade}
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
                    value={cadastroUsuario.cep}
                    returnValue={(e) => setCadastroUsuario({ ...cadastroUsuario, cep: e })}
                    type='number'
                    inputProps={{ maxLength: 8 }}
                    error={cadastroUsuario.cep.length > 8 ? true : false}
                    helperText={cadastroUsuario.cep.length > 8 ? "Informe o CEP com oito dígitos e sem o traço (-)." : null}
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
                        onClick={() => returnBotaoCancelar()}
                    >
                        Cancelar
                    </Button>

                    <Button
                        size="small"
                        variant="contained"
                        sx={{ ...ButtonBuy, width: 'auto', marginLeft: '10px' }}
                        onClick={props.edicao ? () => atualizaUsuario() : () => signUp()}
                    >
                        {props.edicao ? "Alterar dados" : "Cadastrar"}
                    </Button>
                </Box>
            </Box>
        </>
    )
}