import React, { FormEvent, useState, ChangeEvent, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Table, Form, InputOnChangeData, Button, Message, Segment, Dimmer, Loader, Header } from "semantic-ui-react";
import Contact from "../models/Contact";
import { contactsLoad } from "../actions/ContactsAction";

type Props = {
  contacts?: Contact[],
  loading: boolean,
  error?: string,
  user?: firebase.User,
  contactsLoad: (userId: string) => void
};

const Contacts = ({ contacts, error, loading, contactsLoad, user }: Props) => {

  const [form, setForm] = useState<{ [key: string]: string }>({});
  const [formError, setFormError] = useState<{ [key: string]: string }>({});

  const handleChange = (e: ChangeEvent, { name, value }: InputOnChangeData) => {
    setForm({ ...form, [name]: value });
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const errors = [];

    if (!form['name']) {
      errors.push({ name: 'Required' });
    }

    if (!form['email']) {
      errors.push({ email: 'Required' });
    }

    if (errors.length) {
      setFormError(errors.reduce((accum, current) => {
        return {
          ...accum,
          ...current
        }
      }, {}));
    }
  };

  useEffect(() => {
    if (!contacts && user) {
      contactsLoad(user.uid);
    }
  }, [user, contacts]);

  const renderError = () => {
    if (error) {
      return (
        <Message negative>
          <Message.Header>{error}</Message.Header>
        </Message>
      );
    }

    return null;
  };

  return (
    <Container>

      <Segment vertical>
        <Header as='h3'>Create new contact</Header>

        <Form onSubmit={handleSubmit} unstackable>
          <Form.Group>
            <Form.Input placeholder='Name' name='name' value={form['name']} onChange={handleChange} error={formError['name']} />
            <Form.Input placeholder='Email' name='email' value={form['email']} onChange={handleChange} error={formError['email']} />
            <Form.Button content='Add Contact' primary loading={loading} />
          </Form.Group>
        </Form>
      </Segment>

      {renderError()}

      <Segment vertical>
        {loading &&
          <Dimmer active>
            <Loader>Loading</Loader>
          </Dimmer>
        }

        {contacts && contacts.length > 0 &&
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>E-mail</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {contacts.map(contact => (
                <Table.Row>
                  <Table.Cell>Name</Table.Cell>
                  <Table.Cell>Email</Table.Cell>
                  <Table.Cell collapsing>
                    <Button negative>Delete</Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        }
      </Segment>
    </Container>
  );
};

const mapStateToProps = ({ contact, auth }: any) => {
  const { loading, error, contacts } = contact;
  const { user } = auth;
  return { loading, error, contacts, user };
};

export default connect(mapStateToProps, { contactsLoad })(Contacts);