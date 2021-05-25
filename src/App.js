import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { Formulario } from "./components/Formulario";
import imagen from './cryptomonedas.png';
import axios from "axios";
import { Cotizacion } from "./components/Cotizacion";
import { Spiner } from "./components/Spiner";

const Contenedor = styled.div`
max-width: 900px;
margin: 0 auto;
@media(min-width: 992px){
  display:grid;
  grid-template-columns:repeat(2,1fr);
 
}

`;

const Heading = styled.h1`
font-family: 'Bebas Neue',cursive;
color:#fff;
text-align:left;
font-weight:700;
font-size:50px;
margin-bottom:50px;
margin-top:80px;


&::after{
  content: '';
  height: 6px;
  width:100px;
  background-color:#66a2fe;
  display:block;
}

`


const Imagen = styled.img`
max-width: 100%;
margin-top: 5rem;

`;
function App() {
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptoMoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);


  useEffect(() => {
    const cotizarCriptoMoneda = async () => {
      if (moneda === '') return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);
      //MOSTRAR SPINER
      guardarCargando(true);

      setTimeout(() => {
        guardarCargando(false);
        //GUARDAR COTIZACIÓN
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000);

    }

    cotizarCriptoMoneda();

  }, [moneda, criptomoneda]);
  //MOSTRAR SPINER

  const componente = (cargando) ? <Spiner /> : <Cotizacion resultado={resultado}/>
  return (
    <Contenedor>
      <div>
        <Imagen
          src={imagen}
          alt="Imagen cripto"
        />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptoMoneda={guardarCriptoMoneda}
        />

        {componente}

      </div>
    </Contenedor>
  );
}

export default App;
