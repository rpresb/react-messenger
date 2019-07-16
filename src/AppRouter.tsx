import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './scenes/Home';
import Login from './scenes/Login';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { loginSuccess } from './actions/AuthAction';
import { appLoaded } from './actions/AppAction';

const AppRouter = (props: any) => {
  firebase.auth().onAuthStateChanged((user) => {
    props.appLoaded();

    if (user) {
      props.loginSuccess(user);
    }
  });

  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
    </Router>
  );
};

export default connect(undefined, { loginSuccess, appLoaded })(AppRouter);