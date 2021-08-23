import Swal from 'sweetalert2';
import { axiosInstance } from '../helpers/axios';
import { clientUpdate } from './client';
import { uiStartProgressUpload } from './ui';

export const uploadStartImage = (file, cliente) => {
  const baseURL = 'http://localhost:8080/api';
  const url = baseURL + '/client/upload/image';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('id', cliente.id);

  return async (dispatch) => {
    if (file) {
      Swal.fire({
        title: 'Uploading...',
        text: 'Please wait...',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        const resp = await fetch(url, { method: 'POST', body: formData });
        const responseServer = await resp.json();

        cliente.urlFoto2 = responseServer.cliente.urlFoto2;
        dispatch(clientUpdate(cliente));
      } catch (error) {
        throw error;
      }

      Swal.close();
    }
  };
};

export const uploadStartImageProgress = (file, cliente) => {
  const formData = new FormData();
  const token = localStorage.getItem('token') || '';

  formData.append('file', file);
  formData.append('id', cliente.id);

  return async (dispatch) => {
    await axiosInstance
      .post('/client/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (data) => {
          dispatch(
            uiStartProgressUpload(Math.round((100 * data.loaded) / data.total))
          );
        },
      })
      .then((response) => {
        cliente.urlFoto2 = response.data.cliente.urlFoto2;
        dispatch(clientUpdate(cliente));
      })
      .catch((error) => {
        Swal.fire('Error', 'No se pudo subir la imagen ' + error, 'error');
      });
  };
};
