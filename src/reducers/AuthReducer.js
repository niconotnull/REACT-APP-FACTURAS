import { types } from '../types/types';

const initialState = {
  checking: false,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        checking: false,
        ...action.payload,
      };
    case types.authLogout:
      return {
        checking: false,
      };
    default:
      return state;
  }
};
