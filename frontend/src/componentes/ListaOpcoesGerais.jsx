import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import LayersIcon from '@mui/icons-material/Layers';
// import AssignmentIcon from '@mui/icons-material/Assignment';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { Link } from 'react-router-dom';
import { Cores } from '../styles';
import { listaOpcoesGerais } from './Lista';
// import { useSelector } from 'react-redux';

const ListaOpcoesGerais = () => {
    return (
        <React.Fragment>
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

            <Link style={{ color: Cores.textoOpcoes, textDecoration: 'none' }} to="/compras">
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