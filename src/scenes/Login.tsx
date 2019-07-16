import React, { useState } from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/AuthAction";
import { withRouter, Redirect } from "react-router";

const Login = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const performLogin = () => {
    props.loginUser(email, password);
  };

  const renderError = () => {
    if (props.error) {
      return <div>{props.error}</div>;
    }

    return null;
  };

  if (props.user) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Login</h1>

      <div>
        <label htmlFor="email">E-mail:</label>
        <input type="text" id="email" value={email} onChange={onEmailChange} />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={onPasswordChange} />
      </div>

      <div>
        <button onClick={performLogin}>Login</button>
      </div>

      {props.loading &&
        <div>Loading...</div>
      }

      {renderError()}
    </div>
  );
};

const mapStateToProps = ({ auth }: any) => {
  return { ...auth };
};

const mapDispatchToProps = {
  loginUser
};

const loginWithRouter = withRouter(Login);

export default connect(mapStateToProps, mapDispatchToProps)(loginWithRouter);