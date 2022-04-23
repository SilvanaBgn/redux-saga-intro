import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

const NewUserForm = (props) => {
  const INICIAL_USER = {firstName: '', lastName:''};
  const [user, setUser] = useState(INICIAL_USER);

  const handleFirstNameChange = (e) => {
    setUser({ ...user, firstName: e.target.value });
  }

  const handleLastNameChange = (e) => {
    setUser({ ...user, lastName: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const {firstName, lastName} = user;
    props.onSubmit({
      firstName,
      lastName
    });

    setUser(INICIAL_USER);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>First Name</Label>
        <Input required placeholder='First name' onChange={handleFirstNameChange} value={user.firstName}></Input>

        <Label>Last Name</Label>
        <Input required placeholder='Last name' onChange={handleLastNameChange} value={user.lastName}></Input>

      </FormGroup>
      <FormGroup>
        <Button block outline type="submit" color="primary">
          Create
        </Button>
      </FormGroup>
    </Form>
  )
}

export default NewUserForm; 
