import React, { useState } from "react";
import { connect } from "react-redux";
import { registerUser } from "../actions/RegisterAction";
import { withRouter, Redirect } from "react-router";

const Register = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const onRepeatPasswordChange = (e: any) => {
    setRepeatPassword(e.target.value);
  };

  const performRegistration = () => {
    props.registerUser(email, password, repeatPassword);
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
      <h1>Registration</h1>

      <div>
        <label htmlFor="email">E-mail:</label>
        <input type="text" id="email" value={email} onChange={onEmailChange} />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={onPasswordChange} />
      </div>

      <div>
        <label htmlFor="repeat_password">Repeat Password:</label>
        <input type="password" id="repeat_password" value={repeatPassword} onChange={onRepeatPasswordChange} />
      </div>

      <div>
        <button onClick={performRegistration}>Submit</button>
      </div>

      {props.loading &&
        <div>Loading...</div>
      }

      {renderError()}
    </div>
  );
};

const mapStateToProps = ({ register, auth }: any) => {
  return { ...register, user: auth.user };
};

const registerWithRouter = withRouter(Register);

export default connect(mapStateToProps, {registerUser})(registerWithRouter);