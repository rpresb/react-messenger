import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/AuthActions";

const Login = (props: any) => {
  const performLogin = () => {
    props.loginUser();
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={performLogin}>Login</button>

      {props.loading &&
        <div>Loading...</div>
      }
    </div>
  );
};

const mapStateToProps = ({ auth }: any) => {
  return { ...auth };
};

const mapDispatchToProps = {
  loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login); // HOC component