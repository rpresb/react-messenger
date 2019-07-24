import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './scenes/Home';
import Login from './scenes/Login';
import Register from './scenes/Register';
import Contacts from './scenes/Contacts';
import { connect } from 'react-redux';
import { loginSuccess } from './actions/AuthAction';
import { appLoaded } from './actions/AppAction';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import { Container } from 'semantic-ui-react';
import firebase from 'firebase/app';

const AppRouter = ({ isAppLoaded, appLoaded, loginSuccess }: any) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      loginSuccess(user);
    }

    appLoaded();
  });

  return (
    <Router>
      <NavBar />
      {isAppLoaded &&
        <Container style={{ paddingTop: '5em', height: '100%' }}>
          <PrivateRoute path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <PrivateRoute path="/contacts" exact component={Contacts} />
        </Container>
      }
    </Router>
  );
};

const mapStateToProps = ({ app }: any) => {
  const { isAppLoaded } = app;
  return { isAppLoaded };
};

export default connect(mapStateToProps, { loginSuccess, appLoaded })(AppRouter);