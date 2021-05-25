import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptoMoneda from '../hooks/useCriptoMoneda';
import axios from 'axios';
import { Error } from './Error';



const Boton = styled.input`
margin-top: 20px;
font-weight: bold;
font-size: 20px;
padding: 10px;
background-color:#66a2fe;
border: none;
border-radius: 10px;
width: 100%;
color:#fff;
transition: background-color .3s ease;

&:hover{
    background-color:#326ac0;
    cursor:pointer;
}

`;

export const Formulario = ({guardarMoneda,guardarCriptoMoneda}) => {
    //LISTADO CRIPTO
    const [listacripto, guardarCriptoMonedas] = useState([]);

    const MONEDA = [
        { codigo: "USD", nombre: "Dolar de Estados Unidos" },
        { codigo: "MXN", nombre: "Peso Mexicano" },
        { codigo: "EUR", nombre: "Euro" },
        { codigo: "GBP", nombre: "Libra Esterlina" },
        { codigo: "COD", nombre: "Peso colombiano" },
    ];
    //USE MOMENDA
    const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDA);
    const [criptoMoneda, SelectCripto] = useCriptoMoneda('Elige tu criptomoneda', '', listacripto);
    const [error, guardarError] = useState(false);

    useEffect(() => {
        const consultarApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptoMonedas(resultado.data.Data);
           
        }

        consultarApi();
    }, []);

    const cotizar = e => {
        e.preventDefault();

        if (moneda === '' || criptoMoneda === '') {
            guardarError(true);
            return;

        }

        guardarError(false);

        guardarMoneda(moneda);
        guardarCriptoMoneda(criptoMoneda);


    }
    return (


        <form onSubmit={cotizar}>
            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}
            <SelectMonedas />
            <SelectCripto />

            <Boton
                type="submit"
                value="calcular"
            />

        </form>
    )
}
