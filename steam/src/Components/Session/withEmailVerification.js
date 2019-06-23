import React from 'react'
import AuthUserContext from './context'
import { withFirebase } from '../Firebase'
import './session.css'

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes('password')

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    constructor(props) {
      super(props)
      this.state = { isSent: false }
    }
    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true }))
    }

    render () {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            needsEmailVerification(authUser) ? (
              <div className='row'>
              
   
  
                {this.state.isSent ? (
                 <div className='col s12 m12 l10 offset-l1'>
                 <div className=' col s10 offset-s1 m10 offset-m1  l4 offset-l4'>
                 <div className=' card-panel password-forget-card'>
                 <h5 className=' center  header-verify-email'>E-Mail confirmation sent</h5>
                    <p className='center'> Check you E-Mails (Spam
                    folder included) for a confirmation E-Mail.
                    Refresh this page once you confirmed your E-Mail.</p>
                   </div></div></div>
                ) : (
                  <div className='col s12 m12 l10 offset-l1'>
                  <div className=' col s10 offset-s1 m10 offset-m1  l4 offset-l4'>
                  <div className=' card-panel password-forget-card'>
                      
                      <h5 className=' center  header-verify-email'>Verify your E-Mail</h5>
                      <p className="center">
                      Check you E-Mails (Spam folder
                      included) for a confirmation E-Mail or send
                      another confirmation E-Mail.</p>
                      <div className="center">
                      <button className="btn-sendConfirmationEmail"
                  type="button"
                  onClick={this.onSendEmailVerification}
                  disabled={this.state.isSent}>
                  Send confirmation E-Mail
                </button></div>
                      
                      </div></div></div>
                  )}
              
             </div>
            ) : (
                <Component {...this.props} />
              )
          }
        </AuthUserContext.Consumer>
      )
    }
  }
  return withFirebase(WithEmailVerification)
}

export default withEmailVerification
