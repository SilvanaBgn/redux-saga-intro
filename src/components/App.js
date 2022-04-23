import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {getUsersRequest} from '../actions/users';
import NewUserForm from './NewUserForm';

import UsersList from './UsersList';


function App(props) {
  useEffect(()=> {
    props.getUsersRequest();
  }, []);

  const handleSubmit = ({firstName, lastName}) => {
    console.log('App.js - handleSubmit', firstName, lastName)
  }

  const users = props.users;
  console.log('users',users);
  return (
    <div style={{margin: '0 auto', padding: '20px', maxWidth: '600px'}}>
      <NewUserForm onSubmit={handleSubmit}  />
      <UsersList users={users.items} />
    </div>
  );
}

const mapStateToProps = ({users}) => {
  // console.log('mapStateToProps - state',state);
  return ({users});
}

export default connect(mapStateToProps, {
  getUsersRequest
})(App);
