import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './scenes/Home';
import Login from './scenes/Login';
import Register from './scenes/Register';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { loginSuccess } from './actions/AuthAction';
import { appLoaded } from './actions/AppAction';
import NavBar from './components/NavBar';
import { Container } from 'semantic-ui-react';

const AppRouter = (props: any) => {
  firebase.auth().onAuthStateChanged((user) => {
    props.appLoaded();

    if (user) {
      props.loginSuccess(user);
    }
  });

  return (
    <Router>
      <NavBar />
      <Container style={{ paddingTop: '5em', height: '100%' }}>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Container>
    </Router>
  );
};

export default connect(undefined, { loginSuccess, appLoaded })(AppRouter);