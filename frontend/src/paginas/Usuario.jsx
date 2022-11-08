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
    const [atualizaCadastro, setAtualizaUsuario] = useState({
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
                defaultValue={atualizaCadastro.nome}
                returnValue={(e) => setAtualizaUsuario({ ...atualizaCadastro, nome: e })}
                disabled
            />

            <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box component="div" sx={{ width: '48%' }}>
                    <Input
                        id="email-usuario"
                        label="E-mail"
                        defaultValue={atualizaCadastro.email}
                        returnValue={(e) => setAtualizaUsuario({ ...atualizaCadastro, email: e })}
                    />
                </Box>
                <Box component="div" sx={{ width: '48%' }}>
                    <Input
                        id="senha-usuario"
                        label="Senha"
                        type="password"
                        defaultValue={atualizaCadastro.senha}
                        returnValue={(e) => setAtualizaUsuario({ ...atualizaCadastro, senha: e })}
                    />
                </Box>
            </Box>

            <Input
                id="endereco-usuario"
                label="Endereço"
                defaultValue={atualizaCadastro.endereco}
                returnValue={(e) => setAtualizaUsuario({ ...atualizaCadastro, endereco: e })}
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
                        defaultValue={atualizaCadastro.cidade}
                        returnValue={(e) => setAtualizaUsuario({ ...atualizaCadastro, cidade: e })}
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
                        value={atualizaCadastro.uf}
                        label="Estado"
                        onChange={(e) => setAtualizaUsuario({ ...atualizaCadastro, uf: e.target.value })}
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
                        defaultValue={atualizaCadastro.cep}
                        returnValue={(e) => setAtualizaUsuario({ ...atualizaCadastro, cep: e })}
                        type='number'
                        inputProps={{ maxLength: 8 }}
                        error={atualizaCadastro.cep.length > 8 ? true : false}
                        helperText={atualizaCadastro.cep.length > 8 ? "Excesso de números para o CEP. Informe o seu CEP sem o traço (-)." : null}
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
                    Atualizar
                </Button>
            </Box>

        </Box>
    )
}

export default Usuario