import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { SignUpLink } from '../SignUp'
import { withFirebase } from '../Firebase'
import { PasswordForgetLink } from '../PasswordForget'
import * as ROUTES from '../../Constants/routesFirebase'
// import LOGO from '../SignIn/LogoLogin'
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
      <h4 className='center welcome grey-text text-darken-3'>Welcome to </h4>
      <h3 className="logo-steam center">STEAM</h3>

      <SignInForm />
      <div className="col l12 s12"> <div id="social-signIn-buttons"> <SignInGoogle /> <SignInFacebook /> <SignInTwitter /></div></div>
      <div className="password-sign col s12 center">
      <PasswordForgetLink />
      <SignUpLink /></div>
      
      </div>
  </div>
)
const SignInLink = () => (
  <div className='already-acount'>
  <p > Already have an account?  <Link to={ROUTES.SIGN_IN}> Sign in</Link>
  </p>
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
          className='input-text'
          name='email'
          value={email}
          onChange={this.onChange}
          type='text'
          placeholder='Email Address'
        />
        <input
          className='input-password'
          name='password'
          value={password}
          onChange={this.onChange}
          type='password'
          placeholder='Password'
        />
        <button disabled={isInvalid} type='submit' id= 'login100-form-btn' className= 'btn-small col l12'>
         Sign in
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
  clickGoogle = event => {
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
      <div>
       <a  id="auth-google"   onClick={this.clickGoogle} class="btn-floating btn-large waves-effect waves-light red"><i className="devicon-google-plain"></i></a>
        {error && <p>{error.message}</p>}
      </div>
  
    )
  }
}
/* Login con Facebook */
class SignInFacebookBase extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  clickFacebook= event => {
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
      <div>
      <a  id='auth-facebook'   onClick={this.clickFacebook} class="btn-floating btn-large waves-effect waves-light  light-blue darken-4"><i className="devicon-facebook-plain"></i></a>
       {error && <p>{error.message}</p>}
     </div>
     
    )
  }
}
/* Login con Twitter */
class SignInTwitterBase extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  clickTwitter = event => {
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
      <div>
      <a  onClick={this.clickTwitter} class="btn-floating btn-large waves-effect waves-light  light-blue darken-1"><i className="devicon-twitter-plain"></i></a>
       {error && <p>{error.message}</p>}
     </div>
    
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

export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter, SignInLink }
