import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ButtonBuy, Cores } from '../styles';
import Box from '@mui/material/Box';
import Span from './Span'
import { useDispatch } from 'react-redux';
import { AdicionaItemCarrinho } from '../redux/actions/Carrinho';
import api from '../servicos/api';

export default function CardProduto(props) {
  // Envia os dados para o Redux
  const dispatch = useDispatch()

  // Armazena a quantidade do produto
  const [qtdProduto, setQtdProduto] = useState()

  // Consulta a API de produtos a fim de verificar a quantidade
  const consultaApiProduto = async () => {
    const { data } = await api.get(`produto/${props.id}`)
    setQtdProduto(data.qtdProduto)
  }

  useEffect(() => {
    consultaApiProduto()
  }, [])

  return (
    <Card
      sx={{
        minWidth: 255,
        maxWidth: 345,
        height: 432,
        background: Cores.fundoAbaixoConteudo,
        borderRadius: '8px'
      }}
    >
      <CardMedia
        component="img"
        height="240"
        image={props.imagem}
      />

      <CardContent sx={{ height: '115px' }}>
        <Typography gutterBottom variant="h5" component="div" >
          {props.titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary" >
          {props.descricao}
        </Typography>
      </CardContent>

      <Box
        component="div"
        sx={{
          textAlign: 'center',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          height: '24px'
        }}
      >
        {qtdProduto === 1 && (
          <Typography variant="p" component="div" >
            Última unidade!
          </Typography>
        )}
      </Box>

      <Box
        component="div"
        sx={{
          textAlign: 'center',
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Span number={props.preco.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})} />
      </Box>

      <CardActions sx={{ width: '100%', padding: 0 }}>
        <Button
          size="small"
          variant="contained"
          sx={{ ...ButtonBuy, cursor: props.isDisabled || props.qtd < 1 ? 'not-allowed' : 'pointer' }}
          disabled={props.isDisabled || props.qtd < 1}
          onClick={props.isDisabled || props.qtd < 1 ? () => false : () => dispatch(AdicionaItemCarrinho({
            id: props.id,
            titulo: props.titulo,
            descricao: props.descricao,
            preco: props.preco,
            imagem: props.imagem,
            qtd: 1
          }))}
        >
          {props.qtd < 1 ? 'Indisponível' : 'Comprar'}
        </Button>
      </CardActions>
    </Card>
  );
}