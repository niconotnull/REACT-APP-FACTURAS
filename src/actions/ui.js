import { types } from '../types/types';

export const uiStartOpenModal = () => ({
  type: types.uiOpenModal,
});

export const uiStartCloseModal = () => ({
  type: types.uiCloseModal,
});

export const uiStartOpenModalCliente = () => ({
  type: types.uiOpenModalCliente,
});

export const uiStartCloseModalCliente = () => ({
  type: types.uiCloseModalCliente,
});

export const uiStartPaginatorPages = (pages, number) => ({
  type: types.uiPaginatorPages,
  payload: { pages, number },
});

export const uiStartUploadImage = (file) => {
  return {
    type: types.uiImageUpload,
    payload: file,
  };
};

export const uiStartRemoveImage = () => ({
  type: types.uiImageRemove,
});

export const uiStartProgressUpload = (value) => ({
  type: types.uiProgressUpload,
  payload: value,
});
