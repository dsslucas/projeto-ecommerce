import { makeStyles } from "@material-ui/core/styles";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

// Largura do Menu
const drawerWidth = 240;

const Cores = {
    fundoCabecalho: "#543851",
    textoCabecalho: "#ab906d",
    fundoAbaixoConteudo: "#dfcfdd",
    textoTitulo: "#ab906d",
    textoOpcoes: "#ab906d",

    fundoBotao: "#543851",
    fundoBotaoHover: "#382436"
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
    minHeight: 'calc(100vh - 128px)',
    borderRadius: '10px',
    padding: "20px",
    overflow: 'auto'
}

// Cartões para os produtos
const GridWrapperItems = theme => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gridGap: '15px',

    [theme.breakpoints.up('sm')]: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 2fr)',
        gridTemplateRows: '420px',
        flexWrap: 'wrap'
    },

    [theme.breakpoints.up('md')]: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 2fr)',
        gridTemplateRows: '420px',
        flexWrap: 'wrap'
    },
})

// Botão de compras
const ButtonBuy = {
    width: '100%',
    background: Cores.fundoCabecalho,
    color: Cores.textoCabecalho,
    '&:hover': {
        background: Cores.fundoBotaoHover,
    },
}

// Display para o Carrinho
const WrapperCarrinho = theme => ({
    display: 'flex',
    height: 330,
    marginBottom: '8px',
    borderRadius: '8px',
    paddingTop: 0,
    width: '100%',

    [theme.breakpoints.up('sm')]: {
        height: 130,
    },

    [theme.breakpoints.up('lg')]: {
        width: '95%'
    },
})

// Conteúdo do Card
const ConteudoCardCarrinho = theme => ({
    display: 'flex',
    background: Cores.fundoAbaixoConteudo,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',

    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

// Imagem do card de Carrinho
const ImageCardCarrinho = theme => ({
    width: 200,
    height: 200,
    [theme.breakpoints.up('sm')]: {
        width: 90,
        height: 90
    }
})

// Quantidade e preço do item
const QtdPrecoCardCarrinho = theme => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    alignContent: 'center'
})

// Coluna das informações da compra
const InformacoesCarrinho = theme => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: Cores.fundoAbaixoConteudo,
    borderRadius: '8px',
    justifyContent: 'center',
    height: 'auto',

    [theme.breakpoints.up('lg')]: {
        height: 'calc(100vh - 260px)',
    }
})

const CommonBox = {
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '8px',
    width: '100%',
    paddingRight: '5px'
}

export { Drawer, AppBar, Cores, EstilosConteudo, GridWrapperItems, ButtonBuy, WrapperCarrinho, ConteudoCardCarrinho, ImageCardCarrinho, QtdPrecoCardCarrinho, InformacoesCarrinho, CommonBox }
