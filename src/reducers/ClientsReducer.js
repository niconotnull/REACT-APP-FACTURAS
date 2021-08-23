import { types } from '../types/types';

const initialState = {
  clientActive: null,
  clients: [],
};

export const ClientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.clientsLoaded:
      return {
        ...state,
        clients: action.payload,
      };
    case types.clientsSave:
      return {
        ...state,
        clients: [action.payload, ...state.clients],
      };
    case types.clientsActive:
      return {
        ...state,
        clientActive: action.payload,
      };
    case types.clientsDelete:
      return {
        ...state,
        clients: state.clients.filter((c) => c.id !== action.payload),
      };
    case types.clientsUpdate:
      return {
        ...state,
        clients: state.clients.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };

    default:
      return state;
  }
};
