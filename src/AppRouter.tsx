import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './scenes/Home';
import Login from './scenes/Login';

const AppRouter = () => {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
    </Router>
  );
};

export default AppRouter;