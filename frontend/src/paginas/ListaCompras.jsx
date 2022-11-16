import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { Cores, EstilosConteudo } from '../styles';
import CardListaCompras from '../componentes/CardListaCompras';
import Titulo from '../componentes/Titulo';

import { useSelector } from 'react-redux';
import api from '../servicos/api';

import Typography from '@mui/material/Typography';
import InventoryIcon from '@mui/icons-material/Inventory';

const ListaCompras = () => {
    const { signin } = useSelector(state => state)

    const [dadosApiVenda, setDadosApiVenda] = useState([])

    const consultaApi = async () => {
        // Consulta das compras realizadas pelo usuário
        const { data } = await api.get(`/venda/usuario/${signin.id}`, {
            headers: {
                Authorization: signin.token
            }
        })
        setDadosApiVenda(data.sort((a, b) => b.idVenda - a.idVenda))
    }

    useEffect(() => {
        if (signin.email !== null) consultaApi()
    }, [])

    return (
        <Box sx={EstilosConteudo}>
            <Titulo titulo="Lista de Compras" />

            {dadosApiVenda.map((item, key) => {
                return (
                    <CardListaCompras
                        key={item.id}
                        dataVenda={item.dataVenda}
                        idVenda={item.idVenda}
                        valorTotal={item.valorTotal}
                        titulo="Conjunto X"
                        status={item.statusEntrega}
                    />
                )
            })}

            {dadosApiVenda.length === 0 && (
                <Box
                    component="div"
                    sx={{
                        height: 'calc(100vh - 222px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
                    }}
                >
                    <InventoryIcon sx={{ color: Cores.fundoCabecalho, width: "50%", height: "50%" }} />

                    <Typography
                        component="h6"
                        variant="h6"
                        sx={{ textAlign: 'center', color: Cores.fundoCabecalho }}
                    >
                        Nenhuma compra foi localizada. Faça o login e realize uma compra conosco!
                    </Typography>
                </Box>
            )}

        </Box>
    )
}


export default ListaCompras