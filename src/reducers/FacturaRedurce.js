import { types } from '../types/types';

const initialState = {
  facturas: [],
};

export const FacturaReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.billReadBills:
      return {
        ...state,
        facturas: action.payload,
      };
    case types.billClearBills:
      return {
        facturas: [],
      };
    case types.billDeleteBill:
      return {
        ...state,
        facturas: state.facturas.filter((e) => e.id !== action.payload),
      };
    default:
      return state;
  }
};
