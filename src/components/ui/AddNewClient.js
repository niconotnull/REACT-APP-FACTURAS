import React from 'react';
import { useDispatch } from 'react-redux';
import { uiStartOpenModal } from '../../actions/ui';

export const AddNewClient = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(uiStartOpenModal());
  };

  return (
    <button className='btn btn-primary  fab' onClick={handleOpenModal}>
      <i className='fas fa-plus'></i>
    </button>
  );
};
