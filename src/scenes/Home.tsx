import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Home = (props: any) => {
  return (
    <div>
      <h1>Home</h1>
      {!props.user && props.isAppLoaded && 
        <Fragment>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </Fragment>
      }
    </div>

  );
};

const mapStateToProps = ({ auth, app }: any) => {
  const { user } = auth;
  const { isAppLoaded } = app;
  return { user, isAppLoaded };
};

export default connect(mapStateToProps)(Home);