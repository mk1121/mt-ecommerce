import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              const redirect = encodeURIComponent(props.location.pathname);
              return (
                <Redirect
                  to={{
                    pathname: '/login',
                    search: `?redirect=${redirect}`,
                    state: { notice: 'Login first to access this resource.' },
                  }}
                />
              );
            }

            if (isAdmin === true && user && user.role !== 'admin') {
              return <Redirect to="/" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
