import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './Componentes/Formulario';
import Cita from './Componentes/Cita';

function App() {

  //Citas en Local Storage
  let citasInciales = JSON.parse(localStorage.getItem("citas"));

  if(!citasInciales){
    citasInciales = [];
  }

  //Arreglo de Citas
  const [ citas, guardarCitas ] = useState(citasInciales);

  //Use Effect para realizar ciertas operaciones cuando el state cambia

  useEffect( () => {
      if(citasInciales){
        localStorage.setItem("citas", JSON.stringify(citas));
      }else{
        localStorage.setItem("citas", JSON.stringify([]));
      }
  }, [citas, citasInciales] );

  //Función que tome las citas actuales y agrege la nueva

  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ])
    console.log(citas);
  }

  //Función que elimina una cita por su id

  const eliminarCita = id => {
    const nuevasCitas = citas.filter( cita => cita.id !== id );
    guardarCitas(nuevasCitas);
  }

  //Mensaje condicional
  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus Citas" ;

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita = {crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita 
                key = {cita.id}
                cita = {cita}
                eliminarCita = {eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
