import { useEffect } from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import {
  clientsActive,
  clientsStartDelete,
  clientsStartLoaded,
} from '../../actions/client';
import { uiStartOpenModal, uiStartOpenModalCliente } from '../../actions/ui';
import { useParams } from 'react-router-dom';
import { Paginator } from '../ui/Paginator';
import icono from '../../assets/images/usuario-upload.jpg';
import { ClienteSpaceModal } from './ClienteSpaceModal';

export const CustomerTable = () => {
  const dispatch = useDispatch();
  const { paginator } = useSelector((state) => state.ui);

  const { page } = useParams();

  const { clients } = useSelector((state) => state.client);

  useEffect(() => {
    dispatch(clientsStartLoaded(page));
  }, [dispatch, page]);

  useEffect(() => {
    if (clients.length === 0 && paginator.pages) {
      console.log('Esta es la pagina0 ', page);
      if (paginator.pages !== 0 && paginator.number !== 0) {
        console.log('Esta es la pagina1 ', page);
        dispatch(clientsStartLoaded(page - 1));
      }
      if (paginator.pages !== 0 && paginator.number === 0) {
        console.log('Esta es la pagina2 ', page);
        dispatch(clientsStartLoaded(page));
      }
    }
  }, [clients, paginator, dispatch, page]);

  const handleUpdate = (c) => {
    console.log('Actualizar cliente', c);
    dispatch(clientsActive(c));
    dispatch(uiStartOpenModal());
  };

  const handleDelete = (id) => {
    console.log('Delete client', id);
    Swal.fire({
      title: '¿Está seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar cliente!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clientsStartDelete(id));
        Swal.fire('Eliminado!', 'El cliente ha sido eliminado.', 'success');
      }
    });
  };

  const handleOpenModal = (c) => {
    dispatch(uiStartOpenModalCliente());
    dispatch(clientsActive(c));
  };

  return (
    <>
      {clients.length === 0 ? (
        <div className='alert alert-info'>No hay clientes disponibles</div>
      ) : (
        <>
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>id</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => {
                const noteDate = moment(c.createAt);
                return (
                  <tr key={c.id}>
                    <td>
                      <img
                        src={c.urlFoto !== null ? c.urlFoto : icono}
                        className='pointer img-thumbanail mg-circle-table float-sm-right  '
                        alt='imagen'
                        onClick={() => handleOpenModal(c)}
                      />
                    </td>
                    <td>{c.nombre}</td>
                    <td>{c.apellido}</td>
                    <td>{c.email}</td>
                    <td>{noteDate.format('MMMM Do YYYY, h:mm:ss a')}</td>
                    <td>
                      <button
                        className='btn btn-primary '
                        type='button'
                        onClick={() => handleUpdate(c)}>
                        Editar
                      </button>
                    </td>
                    <td>
                      <button
                        className='btn btn-danger  ml-2'
                        type='button'
                        onClick={() => handleDelete(c.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className='d-flex justify-content-center'>
            <Paginator />
          </div>
          <ClienteSpaceModal />
        </>
      )}
    </>
  );
};
