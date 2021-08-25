import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ClientesScreeen } from '../components/clientes/ClientesScreeen';
import { FacturaDetalle } from '../components/facturas/FacturaDetalle';
import { FacturaNueva } from '../components/facturas/FacturaNueva';
import { Navbar } from '../components/ui/Navbar';

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />
      <div className='container mt-2'>
        <Switch>
          <Route
            exact
            path='/clientes/page/:page'
            component={ClientesScreeen}
          />

          <Route
            exact
            path='/factura/client/:idcliente'
            component={FacturaDetalle}
          />

          <Route exact path='/factura/nueva' component={FacturaNueva} />

          <Redirect to='/clientes/page/0' />
        </Switch>
      </div>
    </>
  );
};
