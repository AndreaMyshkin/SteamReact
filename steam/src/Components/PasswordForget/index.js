import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import { SignInLinkOnPasswordChange } from '../SignIn';
import * as ROUTES from '../../Constants/routesFirebase'
import './password-forget.css'



const PasswordForgetPage = () => (



    <div className='row'>
    <div className='col s12 m12 l10 offset-l1'>
    <div className=' col s10 offset-s1 m10 offset-m1  l4 offset-l4'>
        <div className=' card-panel signUp-card'>
            <h4 className=' center  header-singUp'>Forgot your password?</h4>
            <p className='center'>Enter your e-mail and we'll send you a password reset link to get back into your account.</p>
              <PasswordForgetForm />
              <div className="center grey-text text-lighten-1 option-on-password-reset">OR</div>
              <SignInLinkOnPasswordChange/>
        </div></div></div></div>
   
)
const INITIAL_STATE = {
    email: '',
    error: null
}

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props)
        this.state = { ...INITIAL_STATE }
    }
    onSubmit = event => {
        const { email } = this.state
        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE })
            })
            .catch(error => {
                this.setState({ error })
            })
        event.preventDefault()
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
    render () {
        const { email, error } = this.state
        const isInvalid = email === ''
        return (<div className='row'><div className=' text-password-forget col s10 offset-s1 m12  l10 offset-l2'></div>
            <form onSubmit={this.onSubmit} className='row'>
                <input
                    className='input-text col s10 offset-s1 m10 offset-m1 l8 offset-l2'
                    name='email'
                    value={this.state.email}
                    onChange={this.onChange}
                    type='text'
                    placeholder='Email Address'
                />
                <button disabled={isInvalid} type='submit' className='col l10 btn-sendEmail btn-small waves-effect waves-light'>
                    Send Email
                </button >
                {error && <p className=" col l12 center error-message-reset-pass">{error.message}</p>}
            </form></div>
        )
    }
}

const PasswordForgetLink = () => (
    <div id='pass-forget'>
      <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot password?</Link>
      </p>
    </div>
)
export default PasswordForgetPage

const PasswordForgetForm = withFirebase(PasswordForgetFormBase)

export { PasswordForgetForm, PasswordForgetLink }
