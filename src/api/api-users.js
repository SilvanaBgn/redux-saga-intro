import axios from 'axios';

export const getUsers = () => {
  return axios.get('/users', {
    params: {
      limit: 1000 // to get all the users possible.
    }
  })
}

export const createUser = ({ firstName, lastName }) => {
  return axios.post('/users', {
    firstName,
    lastName
  })
}

export const deleteUser = (userId) => {
  return axios.delete(`/users/${userId}`);
}
