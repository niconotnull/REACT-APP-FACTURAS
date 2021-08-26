import moment from 'moment';
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startBillDelete } from '../../actions/factura';

export const FacturasScreen = () => {
  const { facturas } = useSelector((state) => state.factura);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar factura!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startBillDelete(id));
        Swal.fire('Eliminado!', 'La factura ha sido eliminada.', 'success');
      }
    });
  };

  return (
    <>
      {facturas.length === 0 ? (
        <div className='alert alert-info'>No cuenta con facturas.</div>
      ) : (
        <table className='table table-bordered table-striped '>
          <thead>
            <tr>
              <th>Folio</th>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((e) => {
              const billDate = moment(e.createAt);
              return (
                <tr key={e.id}>
                  <td>
                    <Link to={`/factura/client/${e.id}`}>
                      <button className='btn btn-success  btn-sm'>
                        {e.id}
                      </button>{' '}
                    </Link>
                  </td>
                  <td>{e.descripcion}</td>
                  <td>{billDate.format('MMMM Do YYYY, h:mm:ss a')}</td>
                  <td>{e.total}</td>
                  <td>
                    <button
                      className='btn btn-danger btn-sm'
                      onClick={() => handleDelete(e.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
