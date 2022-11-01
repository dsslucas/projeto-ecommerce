import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Compra from './paginas/Compra';
import Estoque from './paginas/Estoque';
import ListaCompras from './paginas/ListaCompras';
import Produtos from './paginas/Produtos';
import Relatorio from './paginas/Relatorio';
import Usuario from './paginas/Usuario';

export default function Router() {
    return (
        <Routes>
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/carrinho" element={<Compra />} />
            <Route path="/compras" element={<ListaCompras />} />
            <Route path="/usuario" element={<Usuario />} />
            <Route path="/admin">
                <Route path='/admin/relatorio' element={<Relatorio />} />
                <Route path='/admin/usuarios' element={<Usuario />} />
                <Route path='/admin/estoque' element={<Estoque />} />
            </Route>
            <Route path="*" element={<Navigate to="/produtos" replace />} />
        </Routes>
    )
}