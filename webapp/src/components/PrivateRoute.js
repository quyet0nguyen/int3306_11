import React, {Component, Fragment} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth';

function PrivateRoute({...rest }) {
  const {authTokens} = useAuth();

  return (
    <Fragment>

      <Route 
          {...rest} 
          render={(props) => 
            authTokens ? (
              <Route path={rest.path} exact={rest.exact} render={rest.render}/>
              ) : (
              <Redirect to="/login" />
            )
          }
      />
    </Fragment>

  );
}

export default PrivateRoute;