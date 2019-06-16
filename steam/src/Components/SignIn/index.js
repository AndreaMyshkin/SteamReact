import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { SignUpLink } from '../SignUp'
import { withFirebase } from '../Firebase'
import { PasswordForgetLink } from '../PasswordForget'
import * as ROUTES from '../../Constants/routesFirebase'
import LOGO from '../SignIn/LogoLogin'
import './signIn.css'

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential'
const ERROR_MSG_ACCOUNT_EXISTS = `
An account with an E-Mail address to
this social account already exists. Try to login from
this account instead and associate your social accounts on
your personal account page.
`
const SignInPage = () => (
  <div className='row'>
    <div className='white col s10 offset-s1 l4 offset-l4 signIn-card'>
      <h3 className='center welcome grey-text text-darken-2'>Bienvenido a</h3>
      <LOGO />
      <SignInForm />
      <SignInGoogle />
      <SignInFacebook />
      <SignInTwitter />
      <PasswordForgetLink />
      <SignUpLink /></div>
  </div>
)

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
}
/* Login con mail */
class SignInFormBase extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { email, password } = this.state
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)

      .then(() => {
        this.setState({ ...INITIAL_STATE })
        this.props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS
        }
        this.setState({ error })
      })
    event.preventDefault()
  }
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { email, password, error } = this.state
    const isInvalid = password === '' || email === ''
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name='email'
          value={email}
          onChange={this.onChange}
          type='text'
          placeholder='Email Address'
        />
        <input
          name='password'
          value={password}
          onChange={this.onChange}
          type='password'
          placeholder='Password'
        />
        <button disabled={isInvalid} type='submit' id='login100-form-btn' className='btn-small col l12'>
          Entrar
        </button>
        {error && <p>{error.message}</p>}
      </form>
    )

  }
}
/* Login con Google */
class SignInGoogleBase extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            roles: {},
          })
      })
      .then(socialAuthUser => {
        this.setState({ error: null })
        this.props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS
        }
        this.setState({ error })
      })
    event.preventDefault()
  }
  render() {
    const { error } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <button id='auth-google' className='google-button button-social btn-small  col s1 m1 l1' type='submit'><i className="devicon-google-plain"></i></button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}
/* Login con Facebook */
class SignInFacebookBase extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  onSubmit = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.additionalUserInfo.profile.name,
            email: socialAuthUser.additionalUserInfo.profile.email,
            roles: {},
          })
      })
      .then(socialAuthUser => {
        this.setState({ error: null })
        this.props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS
        }
        this.setState({ error })
      })
    event.preventDefault()
  }

  render() {
    const { error } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <button id='auth-facebook' className='facebook-button button-social btn-small col s1 m1 l1' type='submit'><i className="devicon-facebook-plain"></i></button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}
/* Login con Twitter */
class SignInTwitterBase extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  onSubmit = event => {
    this.props.firebase
      .doSignInWithTwitter()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.additionalUserInfo.profile.name,
            email: socialAuthUser.additionalUserInfo.profile.email,
            roles: {}
          })
      })
      .then(socialAuthUser => {
        this.setState({ error: null })
        this.props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        this.setState({ error })
      })
    event.preventDefault()
  }
  render() {
    const { error } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <button type='submit' className='twitter-button button-social btn-small  col s1 m1 l1'><i className="devicon-twitter-plain"></i></button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase)

const SignInFacebook = compose(
  withRouter,
  withFirebase,
)(SignInFacebookBase)

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase)
export default SignInPage

const SignInTwitter = compose(
  withRouter,
  withFirebase,
)(SignInTwitterBase)

export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter }
