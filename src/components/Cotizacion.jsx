import React from 'react'
import styled from '@emotion/styled';

const ResultadoDiv = styled.div`
color: #fff;
font-family: Arial, Helvetica, sans-serif;

`;

const Info = styled.p`

font-size: 18px;

span{
    font-weight: bold;
}


`

const Precio = styled.p`
font-size: 30px;

span{
    font-weight: bold;
}
`

export const Cotizacion = ({ resultado }) => {

    if (Object.keys(resultado).length === 0) return null;

    console.log(resultado)

    return (
        <ResultadoDiv>
            <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>Precio más alto del dia: <span>{resultado.HIGHDAY}</span></Info>
            <Info>Precio más bajo del dia: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variación ultimas 24 horas: <span>{resultado.CHANGE24HOUR}</span></Info>
            <Info>Última actualización: <span>{resultado.LASTUPDATE}</span></Info>
        </ResultadoDiv>
    )
}
