import React from 'react';

export const Pacientes = ({ paciente, onDeleteClick  }) => {

    return (
      <tr className='data-table'>
        <td>{paciente.nombres}</td>
        <td>{paciente.apellidoPaterno}</td>
        <td>{paciente.apellidoMaterno}</td>
        <td>{paciente.rut}</td>
        <td>{paciente.region}</td>
        <td>{paciente.comuna}</td>
        <td>{paciente.codigoPostal}</td>
        <td><button onClick={ () => onDeleteClick(paciente) }>&times;</button></td>
      </tr>
    );
  };