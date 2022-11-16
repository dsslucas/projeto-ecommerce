import React, { useState } from 'react'
import Input from './Input'
import Box from '@mui/material/Box';
import { ButtonBuy } from '../styles';
import Titulo from './Titulo';
import Button from '@mui/material/Button';
import api from '../servicos/api';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { SignIn } from '../redux/actions/SignIn';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function ModalLogin(props) {
    // Conexão com o Redux
    const dispatch = useDispatch()

    const [loginUsuario, setLoginUsuario] = useState({
        email: '',
        senha: '',
        token: ''
    })

    // Retorna para o Carrinho fechando o modal
    function returnBotaoCancelar() {
        props.respostaBotaoCancelar()
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

            //console.log("TOKEN: ", res.data.token)
            //setLoginUsuario({ ...loginUsuario, token: 'analise' })

            //alert("Seja bem vindo(a)!")

            // Envia para o Redux, por ser importante para as etapas seguintes
            dispatch(SignIn({
                id: res.data.idUsuario,
                email: loginUsuario.email,
                senha: loginUsuario.senha,
                token: `bearer ${res.data.token}`,
                uf: res.data.estadoUsuario,
                isAdmin: res.data.isAdmin
            }))

            props.respostaPositiva(`É um prazer lhe receber, ${res.data.nomeUsuario}.`)
            returnBotaoCancelar()

        } catch (e) {
            //alert("Os dados informados não estão presentes em nosso banco de dados.", e)
            console.error(e)
            props.respostaNegativa("Os dados informados não foram encontrados em nosso sistema.")
            //returnBotaoCancelar()
        }
    }

    return (
        <>
            <Box>
                
                <Titulo titulo="Login" />

                <Input
                    id="email-usuario"
                    label="E-mail"
                    defaultValue={loginUsuario.email}
                    returnValue={(e) => setLoginUsuario({ ...loginUsuario, email: e })}
                    error={!loginUsuario.email.includes('@') || !loginUsuario.email.includes('.') ? true : false}
                    helperText={!loginUsuario.email.includes('@') || !loginUsuario.email.includes('.') ? "É necessário conter arroba e ponto." : false}
                    enterPressionado={() => signIn()}
                />

                <Input
                    id="senha-usuario"
                    label="Senha"
                    type="password"
                    defaultValue={loginUsuario.senha}
                    returnValue={(e) => setLoginUsuario({ ...loginUsuario, senha: e })}
                    enterPressionado={() => signIn()}
                />

                <Box
                    component="div"
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'right',
                        marginTop: '10px'
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
                        onClick={() => signIn()}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </>
    )
}