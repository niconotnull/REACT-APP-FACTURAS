import moment from 'moment';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const FacturaDetalle = () => {
  const { idcliente } = useParams();
  const { facturas } = useSelector((state) => state.factura);
  const { clientActive } = useSelector((state) => state.client);

  const facturaSelected = facturas.find(
    (e) => e.id === parseInt(idcliente) && e
  );

  const billDate = moment(facturaSelected.createAt);

  return (
    <div className='card bg-light'>
      <div className='card-header'>Titulo: {facturaSelected.descripcion}</div>
      <div className='card-body'>
        {/* <h4 className='card-title'></h4> */}

        <ul className='list-group my-2'>
          <li className='list-group-item list-group-item-primary'>
            Datos del Cliente
          </li>
          <li className='list-group-item'>
            {clientActive.nombre} {clientActive.apellido}
          </li>
          <li className='list-group-item'>{clientActive.email}</li>
        </ul>

        <ul className='list-group my-2'>
          <li className='list-group-item list-group-item-primary'>
            Datos de la Factura
          </li>
          <li className='list-group-item'>
            <b>Folio:</b> {facturaSelected.id}
          </li>
          <li className='list-group-item'>
            <b>Descripción:</b> {facturaSelected.descripcion}
          </li>
          <li className='list-group-item'>
            <b> Fecha:</b> {billDate.format('MMMM Do YYYY, h:mm:ss a')}
          </li>
        </ul>

        {facturaSelected.items.length === 0 ? (
          <div className='alert alert-info'>
            No cuenta con productos esta factura.
          </div>
        ) : (
          <>
            <table className='table  table-striped table-hover table-bordered my-3'>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {facturaSelected.items.map((e) => {
                  return (
                    <tr key={e.id}>
                      <td>{e.producto.nombre}</td>
                      <td>{e.producto.precio}</td>
                      <td>{e.cantidad}</td>
                      <td>{e.importe}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <h5 className='float-right'>
              <span>Gran Total</span>:{' '}
              <span className='badge badge-secondary'>
                {facturaSelected.total}
              </span>{' '}
            </h5>
            <div
              className='card border-info mb-4'
              style={{ maxWidth: '850px' }}>
              <div className='card card-header'>Observaciones</div>
              <div className='card card-body'>
                {facturaSelected.observacion ? (
                  <p>{facturaSelected.observacion}</p>
                ) : (
                  <div className='alert alert-info'>Sin observaciones</div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
