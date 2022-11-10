import * as React from 'react';
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

export default function CardProduto(props) {
  // Envia os dados para o Redux
  const dispatch = useDispatch()

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: 410,
        background: Cores.fundoAbaixoConteudo,
        borderRadius: '8px'
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="240"
        image={props.image}
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
          justifyContent: 'center'
        }}
      >
        <Span number={`R$ ${(Math.round(props.preco * 100) / 100).toLocaleString('pt-br')}`} />
      </Box>

      <CardActions sx={{ width: '100%', padding: 0 }}>
        <Button
          size="small"
          variant="contained"
          sx={ButtonBuy}
          onClick={() => dispatch(AdicionaItemCarrinho({
            id: props.id,
            titulo: props.titulo,
            descricao: props.descricao,
            preco: props.preco,
            qtd: 1
          }))}
        >
          Comprar
        </Button>
      </CardActions>
    </Card>
  );
}
