import React from "react";
import { Route, Redirect, withRouter } from "react-router";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, user, isAppLoaded, ...rest }: any) => (
  <Route {...rest} render={(props) => (
    isAppLoaded
      ? user
        ? <Component {...props} />
        : <Redirect to='/login' />
      : null
  )} />
);

const mapStateToProps = ({ auth, app }: any, ownProps: any) => {
  const { user } = auth;
  const { isAppLoaded } = app;
  return { ...ownProps, user, isAppLoaded };
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));
