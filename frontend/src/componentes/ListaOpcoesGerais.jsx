import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { Cores } from '../styles';
import LoginIcon from '@mui/icons-material/Login';

const ListaOpcoesGerais = () => {
    return (
        <React.Fragment>
            <Link style={{ color: Cores.textoOpcoes, textDecoration: 'none' }} to="/login">
                <ListItemButton>
                    <ListItemIcon sx={{ color: Cores.textoOpcoes }}>
                        <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                </ListItemButton>
            </Link>

            <Link style={{ color: Cores.textoOpcoes, textDecoration: 'none' }} to="/produtos">
                <ListItemButton>
                    <ListItemIcon sx={{ color: Cores.textoOpcoes }}>
                        <LocalMallIcon />
                    </ListItemIcon>
                    <ListItemText primary="Produtos" />
                </ListItemButton>
            </Link>

            <Link style={{ color: Cores.textoOpcoes, textDecoration: 'none' }} to="/carrinho">
                <ListItemButton>
                    <ListItemIcon sx={{ color: Cores.textoOpcoes }}>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Carrinho" />
                </ListItemButton>
            </Link>

            <Link style={{ color: Cores.textoOpcoes, textDecoration: 'none', cursor: 'not-allowed' }} to="/compras">
                <ListItemButton>
                    <ListItemIcon sx={{ color: Cores.textoOpcoes }}>
                        <InventoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Compras" />
                </ListItemButton>
            </Link>

            <Link style={{ color: Cores.textoOpcoes, textDecoration: 'none' }} to="/usuario">
                <ListItemButton>
                    <ListItemIcon sx={{ color: Cores.textoOpcoes }}>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Usuário" />
                </ListItemButton>
            </Link>

        </React.Fragment>
    )
}

export default ListaOpcoesGerais