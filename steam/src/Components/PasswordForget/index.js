import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../Constants/routesFirebase'
import './password-forget.css'



const PasswordForgetPage = () => (
    <div className='row  '>
        <div className=' card-content offset-s1 l3 offset-l4 '>
        <p className='card-title'>¿Deseas reestablecer tu contraseña?</p>
            <PasswordForgetForm />
        </div>
    </div>
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
        return (<div className='row'><div className=' text-password-forget col l6 offset-l1'></div>
            <form onSubmit={this.onSubmit} className='row'>
                <input
                    className='col l6 offset-l1 input-text'
                    name='email'
                    value={this.state.email}
                    onChange={this.onChange}
                    type='text'
                    placeholder='email'
                />
                <button disabled={isInvalid} type='submit' className='col l3 offset-l1 btn-sendEmail btn-small waves-effect waves-light'>
                    Send Email
                </button >
                {error && <p>{error.message}</p>}
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
