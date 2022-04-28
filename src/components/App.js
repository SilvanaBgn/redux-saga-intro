import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsersRequest, createUserRequest, deleteUserRequest, usersError } from '../actions/users';

import NewUserForm from './NewUserForm';
import UsersList from './UsersList';
import { Alert } from 'reactstrap';

const App = (props) => {
  useEffect(()=> {
    props.getUsersRequest();
  }, []);

  const handleSubmit = ({firstName, lastName}) => {
    console.log('App.js - handleSubmit', firstName, lastName);
    props.createUserRequest({firstName, lastName});
  }

  const handleDeleteUserClick = (userId) => {
    props.deleteUserRequest(userId);
  }

  const handleCloseAlert = () => {
    props.usersError({
      error: ''
    })
  }

  const users = props.users;
  console.log('users',users);
  return (
    <div style={{margin: '0 auto', padding: '20px', maxWidth: '600px'}}>
      <Alert color='danger' isOpen={!!props.users.error} toggle={handleCloseAlert}>
        {props.users.error}
      </Alert>
      <NewUserForm onSubmit={handleSubmit}  />
      <UsersList users={users.items} onDeleteUser={handleDeleteUserClick} />
    </div>
  );
}

const mapStateToProps = ({users}) => {
  return ({users});
}

export default connect(mapStateToProps, {
  getUsersRequest,
  createUserRequest,
  deleteUserRequest,
  usersError
})(App);
