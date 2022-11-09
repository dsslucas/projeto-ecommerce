import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import Input from './Input'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { ButtonBuy, EstiloModal } from '../styles';
import Titulo from './Titulo';
import Button from '@mui/material/Button';

export default function ModalLogin(props) {
    const [loginUsuario, setLoginUsuario] = useState({
        email: '',
        senha: '',
    })

    const [modal, setModal] = useState(false)

    function returnBotaoCancelar() {
        props.respostaBotaoCancelar()
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
                />

                <Input
                    id="senha-usuario"
                    label="Senha"
                    type="password"
                    defaultValue={loginUsuario.senha}
                    returnValue={(e) => setLoginUsuario({ ...loginUsuario, senha: e })}
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
                        onClick={() => setModal(!modal)}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </>
    )
}