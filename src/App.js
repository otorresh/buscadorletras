import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Info from './components/Info';

function App() {

  // Definir el state
  const [busquedaletra, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState('');
  const [infoartista, guardarInfoArtista] = useState({});

  useEffect(() => {
    if (Object.keys(busquedaletra).length === 0) return;

    const consultarAPILetra = async () => {
      const { artista, cancion } = busquedaletra;
      const urlLetras = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const urlArtista = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const [letraCancion, infoArtista] = await Promise.all([axios(urlLetras), axios(urlArtista)]);
      guardarLetra(letraCancion.data.lyrics);
      console.log(letraCancion);
      guardarInfoArtista(infoArtista.data.artists[0]);
      console.log(infoArtista.data.artists[0]);
    };
    consultarAPILetra();
  }, [busquedaletra, infoartista]);

  return (
    <Fragment>
      <Formulario
        guardarBusquedaLetra={guardarBusquedaLetra}
      />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info
              infoArtista={infoartista}
            />
          </div>
          <div className="col-md-6">
            <Cancion
              letra={letra}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
