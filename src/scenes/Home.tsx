import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import ContactList from "../components/ContactList";

const Home = (props: any) => {
  return (
    <Grid divided>
      <Grid.Column width={4}>
        <ContactList />
      </Grid.Column>
      <Grid.Column width={12}>
        Message here
      </Grid.Column>
    </Grid>
  );
};

export default connect()(Home);