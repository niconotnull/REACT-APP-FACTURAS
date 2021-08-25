import React from 'react';
import { useSelector } from 'react-redux';

export const FacturaNueva = () => {
  const { clientActive } = useSelector((state) => state.client);
  return (
    <div className='card bg-light'>
      <div className='card-header'>Titulo: Nueva factura</div>
      <div className='card-body'></div>
      <form>
        <div className='form-group row'>
          <label for='cliente' className='col-sm-2  col-fomr-label'>
            Cliente
          </label>
          <div className='col-sm-6'>
            <input
              type='text'
              name='cliente'
              value={`${clientActive.nombre} ${clientActive.apellido}`}
              className='form-control'
              disabled
            />
          </div>
        </div>
        <div className='form-group row'>
          <label for='descripcion' className='col-sm-2  col-fomr-label'>
            Descripción
          </label>
          <div className='col-sm-6'>
            <input type='text' name='descripcion' className='form-control' />
          </div>
        </div>

        <div className='form-group row'>
          <label for='observacion' className='col-sm-2  col-fomr-label'>
            Observacion
          </label>
          <div className='col-sm-6'>
            <textarea name='observacion' className='form-control'></textarea>
          </div>
        </div>

        <div className='form-group row'>
          <div className='col-sm-6'>
            <button type='submit' className='btn btn-secondary'>
              Crear Factura
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
