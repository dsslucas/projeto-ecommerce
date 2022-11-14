import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Carrinho from './paginas/Carrinho';
import Estoque from './paginas/Estoque';
import ListaCompras from './paginas/ListaCompras';
import Produtos from './paginas/Produtos';
import Relatorio from './paginas/Relatorio';
import Usuario from './paginas/Usuario';
import GerenciaUsuario from './paginas/GerenciaUsuario'
import Login from './paginas/Login';
import Vendas from './paginas/Vendas';

export default function Router() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/compras" element={<ListaCompras />} />
            <Route path="/usuario" element={<Usuario />} />
            <Route path="/admin">
                <Route path='/admin/relatorio' element={<Relatorio />} />
                <Route path='/admin/usuarios' element={<GerenciaUsuario />} />
                <Route path='/admin/estoque' element={<Estoque />} />
                <Route path='/admin/vendas' element={<Vendas />} />
            </Route>
            <Route path="*" element={<Navigate to="/produtos" replace />} />
        </Routes>
    )
}