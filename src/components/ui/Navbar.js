import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { startLogout } from '../../actions/auth';

export const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
      <Link className='navbar-brand' to='/'>
        Asociaciones
      </Link>

      <div className='navbar-collapse'>
        <div className='navbar-nav'>
          <NavLink
            activeClassName='active'
            className='nav-item nav-link'
            exact
            to='/clientes/page/0'>
            Clientes
          </NavLink>

          <NavLink
            activeClassName='active'
            className='nav-item nav-link'
            exact
            to='/'>
            Search
          </NavLink>
        </div>
      </div>

      <div className='navbar-collapse collapse w-100 order-3 dual-collapse2'>
        <ul className='navbar-nav ml-auto'>
          <span className='nav-item nav-link text-info'></span>
          <button className='nav-item nav-link btn' onClick={handleLogout}>
            Logout
          </button>
        </ul>
      </div>
    </nav>
  );
};
