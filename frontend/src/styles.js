import { makeStyles } from "@material-ui/core/styles";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

// Largura do Menu
const drawerWidth = 240;

const Cores = {
    // roxo: {
    //     1000: "#543851",
    //     900: "#63425f",
    //     800: "#734c6f",
    //     700: "#82577e",
    //     600: "#92628e",
    //     500: "#9f6f9a",
    //     400: "#aa7fa6",
    //     300: "#b58fb1",
    //     200: "#bf9fbc",
    //     100: "#caadc7",
    //     050: "#d4bfd2",
    // },
    fundoCabecalho: "#543851",
    textoCabecalho: "#ab906d",

    fundoAbaixoConteudo: "#dfcfdd",
    textoTitulo: "#ab906d",
    textoOpcoes: "#ab906d",
}

// Estilização do menu
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            background: Cores.fundoCabecalho,
            overflowX: 'hidden',
            color: Cores.textoOpcoes,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(0),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(8)
                },
            }),
        },
    }),
);

// Estilização da barra
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    background: Cores.fundoCabecalho,
    color: Cores.tituloPagina,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const EstilosConteudo = {
    background: '#ffffff',
    height: 'calc(100vh - 128px)',
    borderRadius: '10px',
    padding: "20px",
    overflow: 'auto'
}

export { Drawer, AppBar, Cores, EstilosConteudo }
