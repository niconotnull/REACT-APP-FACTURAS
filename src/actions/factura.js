import { fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';

export const startBillRead = (id = 0) => {
  return async (dispatch) => {
    try {
      const response = await fetchConToken(`client/${id}`);
      const body = await response.json();

      if (response.ok) {
        console.log(body);
        dispatch(readBills(body.facturas));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const startBillDelete = (id) => {
  return async (dispatch) => {
    const response = await fetchConToken(`factura/${id}`, id, 'DELETE');
    dispatch(deleteBill(id));
  };
};

export const startBillClear = () => ({
  type: types.billClearBills,
});

const readBills = (facturas) => ({
  type: types.billReadBills,
  payload: facturas,
});

export const deleteBill = (id) => ({
  type: types.billDeleteBill,
  payload: id,
});
