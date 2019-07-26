import React from "react";
import { connect } from "react-redux";
import { Grid, Segment, Header, Icon, Button } from "semantic-ui-react";
import ContactList from "../components/ContactList";
import { withRouter } from "react-router";

const Home = ({ contacts, history }: any) => {
  if (!contacts) {
    return null;
  }

  if (!contacts.length) {
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name='user plus' />
          No contacts found.
      </Header>
        <Button primary onClick={() => history.push('/contacts')}>Add Contact</Button>
      </Segment>);
  }

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

const mapStateToProps = ({ contact }: any) => {
  const { contacts } = contact;
  return { contacts };
};

export default connect(mapStateToProps)(withRouter(Home));