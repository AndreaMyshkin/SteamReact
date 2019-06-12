import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { SignUpLink } from '../SignUp'
import { withFirebase } from '../Firebase'
import { PasswordForgetLink } from '../PasswordForget'
import * as ROUTES from '../../Constants/routesFirebase'
import './signIn.css'

const SignInPage = () => (
  <div className='row'>
    <div className='white col s10 offset-s1 l4 offset-l4 signIn-card'>
      <h1 className='center grey-text text-darken-2'>SignIn</h1>
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
        <button disabled={isInvalid} type='submit' className='btn-small blue col l12'>
          Sign In
</button>
        {error && <p>{error.message}</p>}
      </form>
    )

  }
}

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
        this.setState({ error })
      })
    event.preventDefault()
  }
  render() {
    const { error } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <button id='auth-google' className='btn-small blue col l12' type='submit'>Sign In with Google</button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

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
        this.setState({ error })
      })
    event.preventDefault()
  }

  render() {
    const { error } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <button id='auth-facebook' className='btn-small blue col l12' type='submit'>Sign In with Facebook</button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

class SignInTwitterBase extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  onSubmit = event => {
    this.props.firebase
      .doSignInWithTwitter()
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
        <button type="submit">Sign In with Twitter</button>
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
