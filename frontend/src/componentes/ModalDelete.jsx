import React from 'react'
import Box from '@mui/material/Box';
import Titulo from './Titulo';
import Button from '@mui/material/Button';
import { ButtonBuy, Cores } from '../styles';
import Typography from '@mui/material/Typography';
import api from '../servicos/api';
import { useSelector } from 'react-redux';

const ModalDelete = (props) => {
      // Dados vindo do Redux
      const { signin } = useSelector(state => state)

      function returnBotaoCancelar() {
            props.respostaBotaoCancelar()
      }

      const deletaUsuario = async () => {
            try {
                  await api.delete(`/usuario/${props.id}`, {
                        headers: {
                              Authorization: signin.token
                        }
                  })
                  props.respostaPositiva("O usuário foi removido do sistema.")
                  returnBotaoCancelar()
            } catch (e) {
                  props.respostaNegativa("O usuário não pôde ser removido do sistema por problemas internos. Tente novamente mais tarde.")
                  returnBotaoCancelar()
            }
      }

      const deletaProduto = async () => {
            try {
                  await api.delete(`/produto/${props.dados.idProduto}`, {
                        headers: {
                              Authorization: signin.token
                        }
                  })
                  props.respostaPositiva("O produto foi removido do sistema.")
                  returnBotaoCancelar()
            } catch (e) {
                  props.respostaNegativa("O produto não pôde ser removido do sistema por problemas internos. Tente novamente mais tarde.")
                  returnBotaoCancelar()
            }
      }

      return (
            <>
                  <Box component="div">
                        <Titulo titulo={props.modoDelete ? "Deletar produto" : "Deletar usuário"} barraLogin />

                        <Typography
                              component="h6"
                              variant="h6"
                              sx={{ textAlign: 'center', color: Cores.fundoCabecalho, marginTop: '20px', marginBottom: '20px' }}
                        >
                              {props.modoDelete ? "Você confirma a exclusão do produto?" : "Você confirma a exclusão do usuário?"}
                        </Typography>

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
                                    onClick={props.modoDelete ? () => deletaProduto() : () => deletaUsuario()}
                              >
                                    Deletar
                              </Button>
                        </Box>
                  </Box>
            </>
      )
}

export default ModalDelete