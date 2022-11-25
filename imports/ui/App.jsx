import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Pacientes } from './Pacientes';
import { PacientesCollection } from '/imports/api/PacientesCollection';
import { PacientesForm } from './PacientesForm';

const toggleChecked = ({ _id, isChecked }) => {
  PacientesCollection.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
};

export const App = () => {
  const pacientes = useTracker(() => PacientesCollection.find({}, { sort: { createdAt: -1 } }).fetch());
  const deleteTask = ({ _id }) => PacientesCollection.remove(_id);

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>📝️  Registrar Paciente</h1>
          </div>
        </div>
      </header>

      <div className="main">
        <PacientesForm />
        <div className="list-title">
          <h2>📄  Listado de Pacientes</h2>
        </div>

        <table className='table'>
          <tr>
              <th>Nombres</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Rut</th>
              <th>Región</th>
              <th>Comuna</th>
              <th>Código Postal</th>
              <th>Eliminar</th>
            </tr>
              {pacientes.map(paciente => (
              <Pacientes
                key={paciente._id}
                paciente={paciente}
                onCheckboxClick={toggleChecked}
                onDeleteClick={deleteTask}
              />
              ))}
        </table>
      </div>
    </div>
      
  );
};
