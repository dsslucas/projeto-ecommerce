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
                  console.log("Deu bão")
                  props.respostaPositiva("O usuário foi removido do sistema.")
                  returnBotaoCancelar()
            } catch (e) {
                  props.respostaNegativa("O usuário não pôde ser removido do sistema por problemas internos. Tente novamente mais tarde.")
                  returnBotaoCancelar()
            }
      }

      return (
            <>
                  <Box component="div">
                        <Titulo titulo="Deletar usuário" barraLogin />

                        <Typography
                              component="h6"
                              variant="h6"
                              sx={{ textAlign: 'center', color: Cores.fundoCabecalho, marginTop: '20px', marginBottom: '20px' }}
                        >
                              Você confirma a exclusão do usuário?
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
                                    onClick={() => deletaUsuario()}
                              >
                                    Deletar
                              </Button>
                        </Box>
                  </Box>
            </>
      )
}

export default ModalDelete