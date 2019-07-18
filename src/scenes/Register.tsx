import React, { useState } from "react";
import { connect } from "react-redux";
import { registerUser } from "../actions/RegisterAction";
import { withRouter, Redirect } from "react-router";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link } from "react-router-dom";

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
          <Image src='/logo.png' /> Sign-up to your account
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
              value={password}
              onChange={onPasswordChange}
            />

            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password confirmation'
              type='password'
              value={repeatPassword}
              onChange={onRepeatPasswordChange}
            />

            <Button color='teal' fluid size='large' onClick={performRegistration} loading={props.loading}>
              Sign up
            </Button>

            {renderError()}

          </Segment>
        </Form>
        <Message>
          Already have an account? <Link to="/login">Sign In</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = ({ register, auth }: any) => {
  return { ...register, user: auth.user };
};

const registerWithRouter = withRouter(Register);

export default connect(mapStateToProps, { registerUser })(registerWithRouter);