import React, { Component } from 'react'
import { compose } from 'recompose'
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from '../Session'
import { withFirebase } from '../Firebase'
import PasswordChangeForm from '../PasswordChange'
import './account.css'


const SIGN_IN_METHODS = [
  {
    id: 'password',
    provider: null,
  },
  {
    id: 'google.com',
    provider: 'googleProvider',
  },
  {
    id: 'facebook.com',
    provider: 'facebookProvider',
  },
  {
    id: 'twitter.com',
    provider: 'twitterProvider',
  }
]

const AccountPage = () => (

  <AuthUserContext.Consumer>

    {authUser => (
      <div className='row'>
        <div className='card panel col s10 offset-s1  col l2 offset-l1 white account-card-profile '>
     
          <div className='photo-box'> <img src={authUser ? authUser.photoURL : null } className='photo-profile' alt="" /></div>
          <h6 className='center user-account'>{authUser ? authUser.username : null}</h6>
         <h6 className='center email-account'>{authUser ? authUser.email : null}</h6>
    </div>
          
          <div className="card panel col l7 col s10 offset-s1 offset-l1 account-card">
             
          <PasswordChangeForm />
          <div className="buttons_social">
          <LoginManagement authUser={authUser} /></div>
        </div>
        
        
        </div>
    )}
  </AuthUserContext.Consumer>
)

class LoginManagementBase extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeSignInMethods: [],
      error: null
    }
  }

  componentDidMount () {
    this.fetchSignInMethods()
  }

  fetchSignInMethods = () => {
    this.props.firebase.auth
      .fetchSignInMethodsForEmail(this.props.authUser.email)
      .then(activeSignInMethods =>
        this.setState({ activeSignInMethods, error: null }),
      )
      .catch(error => this.setState({ error }))
  }

  onSocialLoginLink = provider => {
    this.props.firebase.auth.currentUser
      .linkWithPopup(this.props.firebase[provider])
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }))
  }

  onDefaultLoginLink = password => {
    const credential = this.props.firebase.emailAuthProvider.credential(
      this.props.authUser.email,
      password,
    )

    this.props.firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }))
  }

  onUnlink = providerId => {
    this.props.firebase.auth.currentUser
      .unlink(providerId)
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }))
  }

  render () {
    const { activeSignInMethods, error } = this.state

    return (
      <div>
        <div className="center methods-text">
          Sign In Methods:
        </div>
        <ul className="buttons_social">
          {SIGN_IN_METHODS.map(signInMethod => {
            const onlyOneLeft = activeSignInMethods.length === 1
            const isEnabled = activeSignInMethods.includes(
              signInMethod.id,
            )

            return (
              <li key={signInMethod.id}>
                {signInMethod.id === 'password' ? (
                  <DefaultLoginToggle
                    onlyOneLeft={onlyOneLeft}
                    isEnabled={isEnabled}
                    signInMethod={signInMethod}
                    onLink={this.onDefaultLoginLink}
                    onUnlink={this.onUnlink}
                  />
                ) : (
                    <SocialLoginToggle
                      onlyOneLeft={onlyOneLeft}
                      isEnabled={isEnabled}
                      signInMethod={signInMethod}
                      onLink={this.onSocialLoginLink}
                      onUnlink={this.onUnlink}
                    />
                  )}
              </li>
            )
          })}
        </ul>
        {error && error.message}
      </div>
    )
  }
}

const SocialLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink,
}) =>
  isEnabled ? (
    <button
      className='social-toogle'
      type='button'
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}
    >
      Deactivate {signInMethod.id}
    </button>
  ) : (
      <button
        className='social-toogle'
        type='button'
        onClick={() => onLink(signInMethod.provider)}
      >
        Link {signInMethod.id}
      </button>
    )

class DefaultLoginToggle extends Component {
  constructor(props) {
    super(props)

    this.state = { passwordOne: '', passwordTwo: '' }
  }

  onSubmit = event => {
    event.preventDefault()

    this.props.onLink(this.state.passwordOne)
    this.setState({ passwordOne: '', passwordTwo: '' })
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    const {
      onlyOneLeft,
      isEnabled,
      signInMethod,
      onUnlink,
    } = this.props

    const { passwordOne, passwordTwo } = this.state

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === ''

    return isEnabled ? (
      <button
        className='social-toogle'
        type='button'
        onClick={() => onUnlink(signInMethod.id)}
        disabled={onlyOneLeft}
      >
        Deactivate {signInMethod.id}
      </button>
    ) : (
        <button disabled={isInvalid} className='social-toogle' type='submit'>
          Link {signInMethod.id}
        </button>

      )
  }
}

const LoginManagement = withFirebase(LoginManagementBase)

const condition = authUser => !!authUser

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage)
