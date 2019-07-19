import React, { Fragment } from "react";
import { Menu, Container, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { logoutUser } from "../actions/AuthAction";
import { withRouter } from "react-router-dom";

const NavBar = (props: any) => {
  const onSignOut = () => {
    props.logoutUser();
  };

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as='a' header onClick={() => props.history.push('/')}>
          <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
          React Messenger
        </Menu.Item>

        {!props.user && props.isAppLoaded &&
          <Menu.Menu position='right'>
            <Menu.Item as='a' onClick={() => props.history.push('/login')}>Login</Menu.Item>
            <Menu.Item as='a' onClick={() => props.history.push('/register')}>Register</Menu.Item>
          </Menu.Menu>
        }

        {props.user && props.isAppLoaded &&
          <Fragment>
            <Menu.Item as='a' onClick={() => props.history.push('/contacts')}>Contacts</Menu.Item>
            <Menu.Item position="right" as='a' onClick={onSignOut}>Sign Out</Menu.Item>
          </Fragment>
        }
      </Container>
    </Menu>
  );
};

const mapStateToProps = ({ auth, app }: any) => {
  const { user } = auth;
  const { isAppLoaded } = app;
  return { user, isAppLoaded };
};

export default connect(mapStateToProps, { logoutUser })(withRouter(NavBar));