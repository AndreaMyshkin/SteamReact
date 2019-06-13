import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import * as ROUTES from '../../Constants/routesFirebase'
import { withFirebase } from '../Firebase'
import './signUp.css'

const SignUpPage = () => (

    <div className='row'>
    <div className='col s12 m5 l10 offset-l1'>
    <div className='col s12 m5 l4 offset-l4'>
        <div className=' card-panel signUp-card'>
            <h4 className=' center  header-singUp'>Crea tu cuenta</h4>
            <SignUpForm />
        </div></div></div></div>
)

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
}

class SignUpFormBase extends Component {
    constructor(props) {
        super(props)
        this.state = { ...INITIAL_STATE }
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = event => {
        const { username, email, passwordOne } = this.state
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                return this.props.firebase
                .user(authUser.user.uid)
                .set({
                username,
                email,
                });
                })
            .then((authUser) => {
                this.setState({ ...INITIAL_STATE })
                this.props.history.push(ROUTES.FORUM)
            })
            .catch(error => {
                this.setState({ error })
            })
        event.preventDefault()
    }

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === ''

        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <input className='input-text'

                        placeholder='Usuario'
                        name='username'
                        value={username}
                        onChange={this.onChange}
                        type='text'


                    />

                    <input
                        className='input-text'
                        name='email'
                        value={email}
                        onChange={this.onChange}
                        type='text'
                        placeholder='Correo Electrónico'
                    />
                    <input
                        className='input-password'
                        name='passwordOne'
                        value={passwordOne}
                        onChange={this.onChange}
                        type='password'
                        placeholder='Contraseña'
                    />
                    <input
                        className='input-password'
                        name='passwordTwo'
                        value={passwordTwo}
                        onChange={this.onChange}
                        type='password'
                        placeholder='Confirmar contraseña'
                    /> </div>
               <button disabled={isInvalid} type='submit' className='col s12 btn-small waves-effect waves-light btn-signUp'>Sign Up</button>
                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

const SignUpLink = () => (
    <div className='create-acount'>
    <p > ¿No tienes una cuenta STEAM? <Link to={ROUTES.SIGN_UP}> Únete</Link>
    </p>
    </div>
)
const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase)

export default SignUpPage

export { SignUpForm, SignUpLink, SignUpPage }
