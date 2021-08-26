import { types } from '../types/types';

const initialState = {
  checking: true,
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
    case types.authCheckingFinish:
      return {
        ...state,
        checking: false,
      };
    default:
      return state;
  }
};
