import { fetchAuthLogin } from '../helpers/fetch';
import Swal from 'sweetalert2';
import { types } from '../types/types';

export const startLogin = (username, password) => {
  return async (dispatch) => {
    const response = await fetchAuthLogin(
      'oauth/token',
      { username, password },
      'POST'
    );
    const body = await response.json();

    if (response.status === 400 || response.status === 401) {
      Swal.fire(
        'Error',
        'No ha sido posible inciar seción verifique su correo o su password',
        'error'
      );
    }

    if (body.access_token) {
      const payload = JSON.parse(
        Buffer.from(body.access_token.split('.')[1], 'base64')
      );

      Swal.fire(
        'Login',
        `Hola ${payload.user_name} , has iniciado seción con éxito!`,
        'success'
      );

      const user = {
        username: payload.user_name,
        nombre: payload.nombre,
        apellido: payload.apellido,
        roles: payload.authorities,
      };
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', body.access_token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(login(user));
    }
  };
};

export const startIsAuthenticated = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64'));

      if (payload && payload.user_name && payload.user_name.length > 0) {
        const user = {
          username: payload.user_name,
          nombre: payload.nombre,
          apellido: payload.apellido,
          roles: payload.authorities,
        };
        dispatch(login(user));
        Swal.fire(
          'Login',
          `Hola ${payload.user_name} , ya estás autenticado!`,
          'info'
        );
      }
    }
  };
};

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

const logout = () => ({
  type: types.authLogout,
});
