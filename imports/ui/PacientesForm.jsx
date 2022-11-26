import React from 'react';
import { useForm } from 'react-hook-form';
import { PacientesCollection } from '/imports/api/PacientesCollection';
import { validateRut } from 'rutlib';
import { getLastDigitOfRut } from 'rutlib';

import regCol from '/imports/api/regCol.json'

const regiones = regCol.regiones.map(a => a.region);
let comunas = [];


export const PacientesForm = () => {
  const { register, handleSubmit, reset, formState: { errors }} = useForm(); 

  // Enviando informacion a la base de datos
  const onSubmit = (data) => {

    // Capturando RUT
    var info = [];
    for(clave in data){
      info.push(data[clave]);
    }

    // Viendo los datos que se reciben del formulario
    //console.log(info);

    // Verificando si el rut es valido
    if(validateRut(info[3]) && getLastDigitOfRut(info[3])){

      // Comparando rut ingresado con los ya registrados
      dataInDB = PacientesCollection.find({}, { sort: { createdAt: -1 } }).fetch();

      for(i in dataInDB){

        // Si el rut existe, envia alerta
        if(info[3] == dataInDB[i]['rut']){
          alert("Paciente ya cuenta con registro en el sistema");
          info = [];
          return {
            error: true
          }
        }
      }
      // Si el rut no existe, crea el registro
      // Enviando informacion a MongoDB
      const datos = data;
      PacientesCollection.insert(datos);
      
      // Limpiando campos del formulario
      reset();
      // Alerta de registro
      alert("Datos ingresados en el sistema")
    
    }else{
      alert("El rut ingresado no es valido");
    }
  }

  // Capturando dato del select-Region
  const handleRegion=(e)=>{
    //console.log(e.target.value);
    regionIndex = regiones.indexOf(e.target.value);
    comunas = regCol.regiones.map(a => a.comunas)[regionIndex];

    // Limpiando datos en Select-Comuna
    const select = document.querySelector("#comunas");
    select.innerHTML= "";

    // Iterando datos en Option-Comuna
    comunas.forEach(dataCom => {
      const option = document.createRange().createContextualFragment(/*html*/`
        <option value=${dataCom}>${dataCom}</option>
        `);
        const select = document.querySelector("#comunas");
        select.append(option);
    });
  }

  return (
    <form className="task-form" onSubmit={handleSubmit(onSubmit)}>

      <label>Nombres:</label>
      {errors.nombres && <p role="alert">{errors.nombres?.message}</p>}
      <input 
        type="text" 
        placeholder="Nombres" 
        {...register('nombres', { required: "Campo requerido" })}
        aria-invalid={errors.nombres ? "true" : "false"}
        />
      
      <label>Apellido Paterno:</label>
      {errors.apellidoPaterno && <p role="alert">{errors.apellidoPaterno?.message}</p>}
      <input 
        type="text" 
        placeholder="Apellido paterno" 
        {...register('apellidoPaterno', { required: "Campo requerido" })}
        aria-invalid={errors.apellidoPaterno ? "true" : "false"}
        />

      <label>Apellido Materno:</label>
      {errors.apellidoMaterno && <p role="alert">{errors.apellidoMaterno?.message}</p>}
      <input 
        type="text" 
        placeholder="Apellido materno" 
        {...register('apellidoMaterno', { required: "Campo requerido" })}
        aria-invalid={errors.apellidoMaterno ? "true" : "false"}
        />
      
      <label>Rut:</label>
      {errors.rut && <p role="alert">{errors.rut?.message}</p>}
      <input 
        pattern="[A-Za-z0-9]{1,15}"
        type="text"
        placeholder="Rut" 
        {...register('rut', { required: "Campo requerido (sin puntos ni guión)" })}
        aria-invalid={errors.rut ? "true" : "false"}        
        />

      <label>Región:</label><br/>
      {errors.region && <p role="alert">{errors.region?.message}</p>}
      <select className="select-task" id='region' onChangeCapture={(e)=>handleRegion(e)} {...register('region', { required: "Campo requerido" })}>
        {
          // Iterando Regiones
          regiones.map( (region, index) => (
            <option value={region} key={index}>{region}</option>
          ))
        }
      </select>

      <br />

      <label>Comuna:</label><br/>
      {errors.comuna && <p role="alert">{errors.comuna?.message}</p>}
      <select className="select-task" id='comunas' {...register('comuna', { required: "Campo requerido" })}>
      </select>

      <br /><br />
      <label>Código Postal:</label>
      {errors.codigoPostal && <p role="alert">{errors.codigoPostal?.message}</p>}
      <input 
        type="number" 
        placeholder="Código postal" 
        {...register('codigoPostal', { required: "Campo requerido" })}
        aria-invalid={errors.codigoPostal ? "true" : "false"} 
        />
      
      <br /><br />
      <input 
        type="submit" 
        className='submitBtn'
        />

    </form>
  );
}