import React from "react";
import { List, Label } from 'semantic-ui-react'
import { connect } from "react-redux";
import Contact from "../models/Contact";

const ContactList = ({ contacts }: any) => {
  return (
    <List selection verticalAlign='middle'>
      {contacts.map((contact: Contact) => (
        <List.Item key={contact.id!}>
          <Label image circular color={contact.exists ? 'violet' : 'grey'}>{contact.name.substr(0, 1).toUpperCase()}</Label>
          <List.Content>
            <List.Header>{contact.name}</List.Header>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

const mapStateToProps = ({ contact }: any) => {
  const { loading, error, contacts = [] } = contact;
  return { loading, error, contacts };
};

export default connect(mapStateToProps)(ContactList);