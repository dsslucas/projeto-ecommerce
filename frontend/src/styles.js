import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

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

// Parte onde é exibida os conteúdos
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
        gridTemplateRows: '432px',
        flexWrap: 'wrap'
    },

    [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(3, 2fr)',
    },

    [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: 'repeat(4, 2fr)',
    },
})

// Exibição do login
const LoginCadastroWrapper = theme => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: '#fff',
    padding: '10px',
    borderRadius: '8px',
    width: '100%',

    [theme.breakpoints.up('sm')]: {
        width: '50%',
    },
})

// Botão de compras
const ButtonBuy = {
    width: '100%',
    background: Cores.fundoCabecalho,
    color: Cores.textoCabecalho,
    '&:hover': {
        background: Cores.fundoBotaoHover,
        color: Cores.textoTitulo
    },
}

// Display para o Carrinho
const WrapperCarrinho = theme => ({
    display: 'flex',
    height: 'auto',
    marginBottom: '8px',
    borderRadius: '8px',
    paddingTop: 0,
    width: '100%',

    [theme.breakpoints.down('sm')]: {
        flexDirection: 'row',
        flexWrap: 'wrap',
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

// Botão de excluir item do carrinho
const DeletarProdutoCarrinho = theme => ({
    //background: Cores.fundoCabecalho,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    top: 0,
    left: 0,

    [theme.breakpoints.down('sm')]: {
        width: '100%'
    },
})

const CommonBox = {
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '8px',
    width: '100%',
    paddingRight: '5px'
}

// Card da Lista de Compras
const CardListaComprasWrapper = theme => ({
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    background: Cores.fundoAbaixoConteudo,
    borderRadius: '8px',
    marginBottom: '8px',

    [theme.breakpoints.down('sm')]: {
        flexDirection: 'row',
        maxWidth: '350',
        flexWrap: 'wrap'
    },
})

const CardListaComprasContent = theme => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'flex-start',

    [theme.breakpoints.up('sm')]: {
        flexDirection: 'column',
    },
    [theme.breakpoints.up('lg')]: {
        flexDirection: 'row',
        //minHeight: '130px',
    }
})

const CardListaDivider = theme => ({
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
        width: '100%',
        //flexDirection: 'column',
    },
    [theme.breakpoints.up('lg')]: {
        width: '80%',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%/3, max(64px, 100%/5)), 1fr))',
    }
})

const CardGridLista = theme => ({
    [theme.breakpoints.up('sm')]: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%/2, max(64px, 100%/2)), 1fr))',
        //gridTemplateRows: '220px',
    },

    [theme.breakpoints.up('lg')]: {
        width: '100%',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%/3, max(64px, 100%/5)), 1fr))',
    }
})

const CardListaInformacao = theme => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
        width: '100%',
        marginTop: '16px'
    },
    [theme.breakpoints.up('lg')]: {
        width: '20%'
    }
})

const CardListaComprasImage = theme => ({
    display: 'flex',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: '250px',
        height: '250px'
        // height: '50%'
    },
    [theme.breakpoints.up('lg')]: {
        width: '200px',
        height: '200px'
        // height: '50%'
    },
})

const CardListaComprasContentColumn = theme => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '320px',   

    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        textAlign: 'center',
        minHeight: 'auto'
    },
})

const CardListaComprasButtons = theme => ({
    display: 'flex',
    textAlign: 'center',
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'right',

    [theme.breakpoints.down('sm')]: {
        // width: '50%'
    },
})

// Estilos das tabelas, que é compartilhada
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: Cores.fundoCabecalho,
        color: Cores.textoCabecalho,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: Cores.fundoAbaixoConteudo,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// Estilização do modal, válido para cadastro e edição de produtos e usuários
const EstiloModal = theme => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 25,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: '8px',

    [theme.breakpoints.down('sm')]: {
        width: '90%',
    },
});

export { Drawer, AppBar, Cores, EstilosConteudo, GridWrapperItems, ButtonBuy, WrapperCarrinho, ConteudoCardCarrinho, ImageCardCarrinho, QtdPrecoCardCarrinho, InformacoesCarrinho, CommonBox, CardListaComprasWrapper, CardListaComprasImage, CardListaInformacao, CardListaDivider, CardListaComprasContent, CardGridLista, CardListaComprasButtons, CardListaComprasContentColumn, StyledTableCell, StyledTableRow, EstiloModal, DeletarProdutoCarrinho, LoginCadastroWrapper }
