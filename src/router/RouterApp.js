import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { startIsAuthenticated } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const RouterApp = () => {
  const { checking, username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startIsAuthenticated());
  }, [dispatch]);

  if (checking) {
    return <h1>ESPERE...</h1>;
  }

  return (
    <>
      <Router>
        <div>
          <Switch>
            <PublicRoute
              exact
              path='/login'
              component={LoginScreen}
              isAuthenticated={!!username}
            />
            <PrivateRoute
              path='/'
              component={DashboardRoutes}
              isAuthenticated={!!username}
            />

            <Redirect to='/' />
          </Switch>
        </div>
      </Router>
    </>
  );
};
