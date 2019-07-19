import React, { FormEvent, useState, ChangeEvent } from "react";
import { connect } from "react-redux";
import { Grid, Container, Table, Icon, Form, InputOnChangeData, Button } from "semantic-ui-react";

const Contacts = () => {

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

  return (
    <Container>
      <Form onSubmit={handleSubmit} unstackable>
        <Form.Group>
          <Form.Input placeholder='Name' name='name' value={form['name']} onChange={handleChange} error={formError['name']} />
          <Form.Input placeholder='Email' name='email' value={form['email']} onChange={handleChange} error={formError['email']} />
          <Form.Button content='Add Contact' primary />
        </Form.Group>
      </Form>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>E-mail</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>Email</Table.Cell>
            <Table.Cell collapsing>
              <Button negative>Delete</Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
};

const mapStateToProps = ({ }: any) => {
  return {};
};

export default connect(mapStateToProps)(Contacts);