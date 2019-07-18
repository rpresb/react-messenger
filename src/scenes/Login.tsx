import React, { useState } from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/AuthAction";
import { withRouter, Redirect } from "react-router";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link } from "react-router-dom";

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
      return (
        <Message negative>
          <Message.Header>{props.error}</Message.Header>
        </Message>
      );
    }

    return null;
  };

  if (props.user) {
    return <Redirect to="/" />;
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/logo.png' /> Log-in to your account
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              value={email}
              onChange={onEmailChange}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              value={password} onChange={onPasswordChange}
            />

            <Button color='teal' fluid size='large' onClick={performLogin} loading={props.loading}>
              Login
            </Button>

            {renderError()}

          </Segment>
        </Form>
        <Message>
          New to us? <Link to="/register">Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
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