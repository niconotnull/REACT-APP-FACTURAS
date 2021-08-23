import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import Swal from 'sweetalert2';
import { types } from '../types/types';
import {
  uiStartCloseModal,
  uiStartPaginatorPages,
  uiStartRemoveImage,
} from './ui';
import { uploadFile } from '../helpers/uploadFile';

export const clientsStartLoaded = (page = 0) => {
  return async (dispatch) => {
    try {
      const response = await fetchSinToken(`clients/page/${page}`);
      const body = await response.json();
      if (response.ok) {
        dispatch(clientsLoaded(body.content));
        dispatch(uiStartPaginatorPages(body.totalPages, body.number));
      } else {
        Swal.fire('Error', body.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const clientStartSave = (cliente) => {
  return async (dispatch, getState) => {
    const { file } = getState().ui.files;
    const { username } = getState().auth;

    const response = await fetchConToken('client', cliente, 'POST');
    const body = await response.json();

    if (response.status === 401) {
      return Swal.fire(
        'Error',
        'No tiene autorización para guardar un cliente.',
        'error'
      );
    }

    if (response.status === 403) {
      return Swal.fire(
        'Error',
        `Hola ${username} no tienes autorización sobre este recurso.`,
        'warning'
      );
    }

    if (response.ok) {
      dispatch(startUploading(file, body));
      dispatch(clientsStartLoaded(0));
      dispatch(uiStartCloseModal());
      dispatch(clientsActive());
    } else if (body.errors) {
      let message = '';
      body.errors.map((m) => (message += m + '<br>'));

      Swal.fire('Error', message, 'error');
    } else {
      Swal.fire('Error', body.message, 'error');
    }
  };
};

export const clientStartUpdate = (cliente) => {
  return async (dispatch, getState) => {
    try {
      const { file } = getState().ui.files;
      const response = await fetchConToken(
        `client/${cliente.id}`,
        cliente,
        'PUT'
      );

      const body = await response.json();

      if (response.status === 401) {
        return Swal.fire(
          'Error',
          'No tiene autorización para actualizar un cliente.',
          'error'
        );
      }

      if (response.ok) {
        if (file) {
          dispatch(clientStartUpdateUpload(file, body));
        } else {
          dispatch(clientUpdate(body));
          dispatch(clientsActive());
          dispatch(uiStartCloseModal());
        }
      } else {
        Swal.fire('Error', body.message, 'error');
      }
    } catch (error) {
      Swal.fire('Error', error, 'error');
    }
  };
};

const clientStartUpdateUpload = (file, cliente) => {
  return async (dispatch, getState) => {
    const fileUrl = await uploadFile(file);
    cliente.urlFoto = fileUrl;
    console.log('Cliente actualizar', cliente);
    await fetchConToken(`client/${cliente.id}`, cliente, 'PUT');
    dispatch(clientUpdate(cliente));
    dispatch(clientsActive());
    dispatch(uiStartRemoveImage());
    dispatch(uiStartCloseModal());
  };
};

export const clientsStartDelete = (id) => {
  return async (dispatch, getState) => {
    console.log(getState().client);
    const response = await fetchConToken(`client/${id}`, id, 'DELETE');

    if (response.status === 401 || response.status === 403) {
      return Swal.fire(
        'Error',
        'No tiene autorización para eliminar un cliente.',
        'error'
      );
    }

    if (response.ok) {
      dispatch(clientDelete(id));
    } else {
      const body = await response.json();
      Swal.fire('Error', body.message, 'error');
    }
  };
};

export const startUploading = (file, cliente) => {
  return async (dispatch, getState) => {
    if (file) {
      // Swal.fire({
      //   title: 'Uploading...',
      //   text: 'Please wait...',
      //   allowOutsideClick: false,
      //   showConfirmButton: false,
      //   willOpen: () => {
      //     Swal.showLoading();
      //   },
      // });

      const fileUrl = await uploadFile(file);
      cliente.urlFoto = fileUrl;
      console.log('Cliente actualizar', cliente);

      // const fileUpload = {
      //   file,
      //   url: fileUrl,
      // };
      // dispatch(clientStartUpdate(cliente));
      //dispatch(uiStartUploadImage(fileUpload));
      dispatch(uiStartRemoveImage());

      dispatch(clientStartUpdate(cliente));
      //Swal.close();
    }
  };
};

export const clientsActive = (cliente) => ({
  type: types.clientsActive,
  payload: cliente,
});

const clientsLoaded = (clients) => ({
  type: types.clientsLoaded,
  payload: clients,
});

const clientDelete = (id) => ({
  type: types.clientsDelete,
  payload: id,
});

export const clientUpdate = (cliente) => ({
  type: types.clientsUpdate,
  payload: cliente,
});
