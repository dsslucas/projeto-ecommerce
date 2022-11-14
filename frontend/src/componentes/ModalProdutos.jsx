import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Titulo from './Titulo';
import Button from '@mui/material/Button';
import { ButtonBuy, Cores } from '../styles';
import Typography from '@mui/material/Typography';
import api from '../servicos/api';
import { useSelector } from 'react-redux';
import Input from '../componentes/Input'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const ModalProdutos = (props) => {
      // Dados vindo do Redux
      const { signin } = useSelector(state => state)

      const [cadastroProduto, setCadastroProduto] = useState({
            nome: '',
            descricao: '',
            qtd: 0,
            valor: 0.0,
            imagem: '',
            dataAquisicao: null
      })

      function returnBotaoCancelar() {
            props.respostaBotaoCancelar()
      }

      const AddProduto = async () => {
            try {
                  await api.post('/produto', {
                        nomeProduto: cadastroProduto.nome,
                        descProduto: cadastroProduto.descricao,
                        qtdProduto: cadastroProduto.qtd,
                        valorProduto: cadastroProduto.valor,
                        imagemProduto: cadastroProduto.imagem,
                        dataAquisicaoProduto: new Date()
                  }, {
                        headers: {
                              Authorization: signin.token
                        }
                  })

                  props.respostaPositiva(`O produto foi cadastrado em nosso sistema.`)
                  returnBotaoCancelar()
            } catch (e) {
                  props.respostaNegativa("Os dados do produto estão incompletos.")
            }
      }

      return (
            <>
                  <Titulo titulo="Cadastrar produto" barraLogin />

                  <Input
                        id="nome-produto"
                        label="Nome do produto"
                        defaultValue={cadastroProduto.nome}
                        returnValue={(e) => setCadastroProduto({ ...cadastroProduto, nome: e })}
                        disabled
                  />

                  <Input
                        id="descricao-produto"
                        label="Descrição"
                        defaultValue={cadastroProduto.descricao}
                        returnValue={(e) => setCadastroProduto({ ...cadastroProduto, descricao: e })}
                        maxRows={2}
                        multiline
                        inputProps={{ maxLength: 70 }}
                        error={cadastroProduto.descricao.length >= 70 ? true : false}
                        helperText={cadastroProduto.descricao.length >= 70 ? "Você excedeu o limite de 70 caracteres na descrição do produto." : null}
                  />

                  <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box component="div" sx={{ display: 'flex', width: '50%' }}>
                              <Input
                                    id="qtd-produto"
                                    label="Quantidade"
                                    defaultValue={cadastroProduto.qtd}
                                    returnValue={(e) => setCadastroProduto({ ...cadastroProduto, qtd: e })}
                                    type='number'
                              />
                        </Box>

                        <Box component="div" sx={{ display: 'flex', width: '40%' }}>
                              <Input
                                    id="valor-produto"
                                    label="Valor (R$)"
                                    defaultValue={cadastroProduto.valor}
                                    returnValue={(e) => setCadastroProduto({ ...cadastroProduto, valor: e })}
                                    type='number'
                              />
                        </Box>
                  </Box>

                  <Input
                        id="imagem-produto"
                        label="Imagem (por URL)"
                        defaultValue={cadastroProduto.imagem}
                        returnValue={(e) => setCadastroProduto({ ...cadastroProduto, imagem: e })}
                        type='text'
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
                              onClick={() => AddProduto()}
                        >
                              Cadastrar
                        </Button>
                  </Box>
            </>
      )
}

export default ModalProdutos