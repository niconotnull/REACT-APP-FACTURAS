import { types } from '../types/types';

const initialState = {
  modalOpen: false,
  modalOpenCliente: false,
  paginator: { pages: 0, number: 0 },
  progress: 0,
  files: {
    file: null,
    url: '',
  },
};

export const UIReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiOpenModal:
      return {
        ...state,
        modalOpen: true,
      };
    case types.uiCloseModal:
      return {
        ...state,
        modalOpen: false,
      };
    case types.uiOpenModalCliente:
      return {
        ...state,
        modalOpenCliente: true,
      };
    case types.uiCloseModalCliente:
      return {
        ...state,
        modalOpenCliente: false,
      };
    case types.uiPaginatorPages:
      return {
        ...state,
        paginator: {
          pages: action.payload.pages,
          number: action.payload.number,
        },
      };
    case types.uiImageUpload:
      return {
        ...state,
        files: action.payload,
      };
    case types.uiImageRemove:
      return {
        ...state,
        files: {
          file: null,
          url: '',
        },
      };
    case types.uiProgressUpload:
      return {
        ...state,
        progress: action.payload,
      };
    default:
      return state;
  }
};
