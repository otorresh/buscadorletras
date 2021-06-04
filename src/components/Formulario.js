import React, { useState } from 'react';
import Error from './Error'

const Formulario = ({ guardarBusquedaLetra }) => {

  const [busqueda, guardarBusqueda] = useState({
    artista: '',
    cancion: ''
  });

  const [error, guardarError] = useState(false);

  const { artista, cancion } = busqueda;

  // Funcion a cada input para leer su contenido
  const actualizarState = e => {
    guardarBusqueda({
      ...busqueda,
      [e.target.name] : e.target.value
    });
  };

  // Consultar las API
  const buscarInformacion = e => {
    e.preventDefault();

    if (artista.trim() === '' || cancion.trim() === '') {
      guardarError(true);
      return;
    }

    guardarError(false);

    // Todo bien, pasar al componente principal
    guardarBusquedaLetra(busqueda);
  };

  return (
    <div className="bg-info">
      { error ? <Error mensaje="Todos los campos son obligatorios" /> : null }
      <div className="container">
        <form
          onSubmit={buscarInformacion}
          className="col card text-white bg-transparent mb-5 pt-5 pb-2"
        >
          <fieldset>
            <legend className="text-center">Buscador de Letras de Canciones</legend>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="artista">Artista</label>
                  <input
                    id="artista"
                    type="text"
                    className="form-control"
                    name="artista"
                    placeholder="Nombre Artista"
                    onChange={actualizarState}
                    value={artista}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="cancion">Canción</label>
                  <input
                    id="cancion"
                    type="text"
                    className="form-control"
                    name="cancion"
                    placeholder="Nombre Canción"
                    onChange={actualizarState}
                    value={cancion}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary float-right"
            >Buscar</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Formulario;