import React from 'react';
import { AddNewClient } from '../ui/AddNewClient';
import { ClienteModal } from './ClienteModal';
import { CustomerTable } from './CustomerTable';

export const ClientesScreeen = () => {
  return (
    <div className='container'>
      <div className=' card border-primary mb-3 card-withd'>
        <div className='card-body text-primary'>
          <h5 className='card-title'>Listado de Clientess</h5>
          <CustomerTable />
        </div>

        <AddNewClient />
      </div>
      <ClienteModal />
    </div>
  );
};
