import React, { Component } from 'react'
import { withFirebase } from '../../Components/Firebase'


class ComunityPage extends Component {
constructor(props) {
super(props)
this.state = {
loading: false,
users: [],
}
}
componentDidMount() {
  this.setState({ loading: true });
  this.props.firebase.users().on('value', snapshot => {
  const usersObject = snapshot.val();
  const usersList = Object.keys(usersObject).map(key => ({
  ...usersObject[key],
  uid: key,
  }));
  this.setState({
  users: usersList,
  loading: false,
  });
  });
}

componentWillUnmount() {
  this.props.firebase.users().off();
  }
render() {
  const { users, loading } = this.state;
return (
<div>
<h1 className="center">STEAM Comunity</h1>
{loading && <div>Loading ...</div>}
<UserList users={users} />
</div>
)
}
}


const UserList = ({ users }) => (
  <div className="row">

  <div className="col l10 offset-l1 ">
  {users.map(user => (
  <div className="card col l3 offset-l1" key={user.uid}>
  <p className="center">
   <strong>Username:</strong> {user.username}
  
  </p>
  <p className="center">
 <strong>E-Mail:</strong> {user.email}
  </p>
  </div>
  ))}
  </div>
  </div>

  );
export default withFirebase(ComunityPage)
