import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { EstilosConteudo } from '../styles';
import CardListaCompras from '../componentes/CardListaCompras';

// Imagens (temporárias)
import Image1 from '../assets/IMG-1310.jpg'
// import Image2 from '../assets/IMG-1311.jpg'
// import Image3 from '../assets/IMG-1313.jpg'
// import Image4 from '../assets/IMG-1326.jpg'
// import Image5 from '../assets/IMG-1327.jpg'
// import Image6 from '../assets/IMG-1330.jpg'
// import Image7 from '../assets/IMG-1334.jpg'
// import Image8 from '../assets/IMG-1335.jpg'
import Titulo from '../componentes/Titulo';

import { useSelector } from 'react-redux';
import api from '../servicos/api';

const ListaCompras = () => {

    const consultaApi = async () => {
        // Consulta das compras realizadas pelo usuário
        const { data } = await api.get(`/venda/usuario/${signin.id}`, {
            headers: {
                Authorization: signin.token
            }
        })
        // setApiContent(data.products)
        console.log(data)
        setDadosApiVenda(data)
    }

    const { signin } = useSelector(state => state)

    const [dadosApiVenda, setDadosApiVenda] = useState()

    useEffect(() => {
        console.log("Carreguei a página")
        consultaApi()
    }, [])



    return (
        <Box sx={EstilosConteudo}>
            <Titulo titulo="Lista de Compras" />

            {/* {dadosApiVenda.map((item) => {
                return (
                    <CardListaCompras
                        key={item.id}
                        dataVenda={item.dataVenda}
                        idVenda={item.idVenda}
                        valorTotal={item.valorTotal}
                        titulo="Conjunto X"
                        preco={149.99}
                        image={Image1}
                        status={item.statusEntrega}
                    />
                )
            })} */}


            {/* <CardListaCompras
                titulo="Conjunto X"
                preco={149.99}
                image={Image1}
                status="Em trânsito"
            /> */}

            {/* <CardListaCompras
                titulo="Conjunto X"
                preco={149.99}
                image={Image1}
                status="Em trânsito"
            /> */}

        </Box>
    )
}


export default ListaCompras