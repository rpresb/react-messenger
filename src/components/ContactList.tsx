import React from "react";
import { List, Label } from 'semantic-ui-react'
import { connect } from "react-redux";

const ContactList = () => {
  return (
    <List selection verticalAlign='middle'>
      <List.Item>
        <Label image circular color="violet">H</Label>
        <List.Content>
          <List.Header>Helen</List.Header>
        </List.Content>
      </List.Item>
      <List.Item>
        <Label image circular color="violet">C</Label>
        <List.Content>
          <List.Header>Christian</List.Header>
        </List.Content>
      </List.Item>
      <List.Item>
        <Label image circular color="violet">D</Label>
        <List.Content>
          <List.Header>Daniel</List.Header>
        </List.Content>
      </List.Item>
    </List>
  );
};

const mapStateToProps = ({ contact }: any) => {
  const { loading, error } = contact;
  return { loading, error };
};

export default connect(mapStateToProps)(ContactList);