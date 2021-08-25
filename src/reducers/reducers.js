import { combineReducers } from 'redux';
import { AuthReducer } from './AuthReducer';
import { ClientsReducer } from './ClientsReducer';
import { FacturaReducer } from './FacturaRedurce';
import { UIReducer } from './UIReducer';
import { UploadReducer } from './UploadReducer';

export const reducers = combineReducers({
  client: ClientsReducer,
  ui: UIReducer,
  upload: UploadReducer,
  auth: AuthReducer,
  factura: FacturaReducer,
});
