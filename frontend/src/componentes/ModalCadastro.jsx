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
import api from '../servicos/api';

export default function ModalCadastro(props) {
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

    // Retorna para o Carrinho, fechando o modal
    function returnBotaoCancelar() {
        props.respostaBotaoCancelar()
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

    return (
        <>
            <Box>
                <Titulo titulo="Cadastro de usuário" />

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
                        onClick={() => signUp()}
                    >
                        Cadastrar
                    </Button>
                </Box>
            </Box>
        </>
    )
}