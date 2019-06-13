import React, { Component } from 'react'
import { withFirebase } from '../Firebase'
import './passwordChange.css'

const INITIAL_STATE = {
passwordOne: '',
passwordTwo: '',
error: null,
}

class PasswordChangeForm extends Component {
constructor(props) {
super(props);
this.state = { ...INITIAL_STATE };
}

onSubmit = event => {
const { passwordOne } = this.state;
this.props.firebase
.doPasswordUpdate(passwordOne)
.then(() => {
this.setState({ ...INITIAL_STATE });
})
.catch(error => {
this.setState({ error });
})
event.preventDefault();
}

onChange = event => {
this.setState({ [event.target.name]: event.target.value })
}

render() {
const { passwordOne, passwordTwo, error } = this.state;
const isInvalid =
passwordOne !== passwordTwo || passwordOne === '';
return (<div className="row"><div className="col l6 offset-l1"><p className="center">¿Quieres cambiar tu contraseña? </p></div>
<form onSubmit={this.onSubmit}>
<input  className="col l6 offset-l1"
name="passwordOne"
value={passwordOne}
onChange={this.onChange}
type="password"
placeholder="Contraseña nueva"
/>
<input  className="col l6 offset-l1"
name="passwordTwo"
value={passwordTwo}
onChange={this.onChange}
type="password"
placeholder="Confirmar contraseña"
/>
<button disabled={isInvalid} type="submit" className="col l3 offset-l1 btn-changePassword btn-small waves-effect waves-light">
Cambiar contraseña
</button>
{error && <p>{error.message}</p>}
</form></div>
);
}
}
export default withFirebase(PasswordChangeForm)