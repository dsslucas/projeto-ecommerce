import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { listaOpcoesAdmin, listaOpcoesGerais } from './componentes/Lista';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

// Rotas
import Rotas from './Routes'

// Estilização
import {Drawer, AppBar, Cores} from './styles'

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
              color: Cores.textoTitulo
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, textAlign: 'center' }}
            >
              Marama Lingeries
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open} 
          onMouseOver={!open ? toggleDrawer : null}
          onMouseLeave={open ? toggleDrawer : null}
        >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1]
            }}
          >
            <IconButton onClick={toggleDrawer} sx={{color: Cores.textoOpcoes}}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>

          <Divider />
          <List component="nav">
            {listaOpcoesGerais}
            <Divider sx={{ my: 1 }} />
            {listaOpcoesAdmin}
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: Cores.fundoAbaixoConteudo,
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />

          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Rotas />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
