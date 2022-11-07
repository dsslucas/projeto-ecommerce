import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { ButtonBuy, EstilosConteudo } from '../styles';
import Input from '../componentes/Input'
import Titulo from '../componentes/Titulo';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

const Usuario = () => {
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

    return (
        <Box sx={{...EstilosConteudo, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Titulo titulo="Dados do usuário" />

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
                        width: '30%',
                        [theme.breakpoints.down('sm')]: {
                            width: '100%'
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
                        defaultValue={cadastroUsuario.cidade}
                        returnValue={(e) => setCadastroUsuario({ ...cadastroUsuario, cep: e })}
                    />
                </Box>
            </Box>

            <Box
                component="div"
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'right'
                }}
            >
                <Button size="small" variant="contained" color="error">Cancelar</Button>

                <Button
                    size="small"
                    variant="contained"
                    sx={{ ...ButtonBuy, width: 'auto', marginLeft: '10px' }}
                >
                    Cadastrar
                </Button>
            </Box>

        </Box>
    )
}

export default Usuario