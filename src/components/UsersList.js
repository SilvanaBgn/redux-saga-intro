import React from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

const UsersList = ({users}) => {
  return (
    <ListGroup>
      {users.map((user)=>{
        return (
          <ListGroupItem key={user.id}>
            <section style={{display:'flex'}}>
              <div style={{flexGrow:1, margin:'auto 0'}}>
                {user.lastName} {user.firstName}
              </div>
              {/* <div> */}
                <Button outline color="danger">
                  Delete
                </Button>
              {/* </div> */}
            </section>
          </ListGroupItem>
        )
      })}
    </ListGroup>
  )
}

export default UsersList