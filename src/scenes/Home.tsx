import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import ContactList from "../components/ContactList";
import { Redirect } from "react-router";

const Home = (props: any) => {

  if (!props.user && props.isAppLoaded) {
    return (
      <Redirect to="/login" />
    );
  }

  return (
    <Grid divided>
      <Grid.Column width={4}>
        <ContactList />
      </Grid.Column>
      <Grid.Column width={8}>
        Message here
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = ({ auth, app }: any) => {
  const { user } = auth;
  const { isAppLoaded } = app;
  return { user, isAppLoaded };
};

export default connect(mapStateToProps)(Home);