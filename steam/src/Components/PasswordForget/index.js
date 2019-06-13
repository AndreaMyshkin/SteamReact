import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../Constants/routesFirebase';
import './password-forget.css'



const PasswordForgetPage = () => (
<div>
<h1>PasswordForget</h1>
<PasswordForgetForm />
</div>
);
const INITIAL_STATE = {
email: '',
error: null,
};



class PasswordForgetFormBase extends Component {
constructor(props) {
super(props);
this.state = { ...INITIAL_STATE };
}
onSubmit = event => {
const { email } = this.state;
this.props.firebase
.doPasswordReset(email)
.then(() => {
this.setState({ ...INITIAL_STATE });
})
.catch(error => {
    this.setState({ error });
});
event.preventDefault();
};
onChange = event => {
this.setState({ [event.target.name]: event.target.value });
};
render() {
const { email, error } = this.state;
const isInvalid = email === '';
return (<div className="row"><div className="col l6 offset-l1"><p className="text-password-forget center">¿Deseas restablecer tu contraseña?</p></div>
<form onSubmit={this.onSubmit}  className="row">
<input
className="col l6 offset-l1 input-text"
name="email"
value={this.state.email}
onChange={this.onChange}
type="text"
placeholder="Correo electrónico"
/>
<button disabled={isInvalid} type="submit" className="col l3 offset-l1 btn-sendEmail btn-small waves-effect waves-light">
Enviar correo
</button >
{error && <p>{error.message}</p>}
</form></div>
);
}
}
const PasswordForgetLink = () => (
<p>
<Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
</p>
);
export default PasswordForgetPage;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export { PasswordForgetForm, PasswordForgetLink };