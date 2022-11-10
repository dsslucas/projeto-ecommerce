import * as React from 'react';
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
// import { useSelector } from 'react-redux';

// Redux
// const {signin} = useSelector(state => state)
// console.log("Na lista: ", signin)

export const listaOpcoesGerais = (
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
);

export const listaOpcoesAdmin = (
    <React.Fragment>
        <ListSubheader
            component="div" inset
            sx={{ background: Cores.fundoCabecalho, color: Cores.textoOpcoes, textAlign: 'center' }}
        >
            Área Administrativa
        </ListSubheader>

        <Link style={{ color: Cores.textoOpcoes, textDecoration: 'none' }} to="/admin/relatorio">
            <ListItemButton>
                <ListItemIcon sx={{ color: Cores.textoOpcoes }}>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Relatório de Vendas" />
            </ListItemButton>
        </Link>

        <Link style={{ color: Cores.textoOpcoes, textDecoration: 'none' }} to="/admin/usuarios">
            <ListItemButton>
                <ListItemIcon sx={{ color: Cores.textoOpcoes }}>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Usuários" />
            </ListItemButton>
        </Link>

        <Link style={{ color: Cores.textoOpcoes, textDecoration: 'none' }} to="/admin/estoque">
            <ListItemButton>
                <ListItemIcon sx={{ color: Cores.textoOpcoes }}>
                    <WarehouseIcon />
                </ListItemIcon>
                <ListItemText primary="Estoque" />
            </ListItemButton>
        </Link>

    </React.Fragment>
);