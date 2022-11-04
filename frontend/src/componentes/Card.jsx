import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Imagem1 from '../assets/IMG-1310.jpg'
import { ButtonBuy, Cores } from '../styles';

export default function ImgMediaCard() {
  return (
    <Card 
        sx={{ 
            maxWidth: 345, 
            maxHeight: 410, 
            background: Cores.fundoAbaixoConteudo,
            borderRadius: '8px' 
        }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="240"
        image={Imagem1}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" >
          Conjunto X
        </Typography>
        <Typography variant="body2" color="text.secondary" >
          Descrição. Entendo tão bem do assunto quanto tocar uma viola 10 cordas.
        </Typography>
      </CardContent>
      <CardActions sx={{width: '100%', paddingLeft: 0, paddingRight: 0, paddingBottom: 0}}>
        <Button 
            size="small" 
            variant="contained" 
            sx={ButtonBuy}
        >
            Comprar
        </Button>
      </CardActions>
    </Card>
  );
}
