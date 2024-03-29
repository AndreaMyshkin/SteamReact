import React, { Component } from 'react'
import { withFirebase } from '../Firebase'
import './passwordChange.css'

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null
}

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props)
        this.state = { ...INITIAL_STATE }
    }

    onSubmit = event => {
        const { passwordOne } = this.state
        this.props.firebase
            .doPasswordUpdate(passwordOne)
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
        const { passwordOne, passwordTwo, error } = this.state
        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === ''
        return (<div className='row'><div className='col s10 offset-s1 l6 offset-l1'><p className='center change-password-text'> Want to change your password? </p></div>
            <form onSubmit={this.onSubmit}>
                <input className='col s10 offset-s1 l6 offset-l1 input-text'
                    name='passwordOne'
                    value={passwordOne}
                    onChange={this.onChange}
                    type='password'
                    placeholder='New password'
                />
                <input className='col s10 offset-s1 l6 offset-l1 input-password'
                    name='passwordTwo'
                    value={passwordTwo}
                    onChange={this.onChange}
                    type='password'
                    placeholder='Confirm password'
                />
                <button disabled={isInvalid} type='submit' className='col s6 offset-s3 l3 offset-l1 btn-changePassword btn-small waves-effect waves-light white'>
                    Change 
                </button>
                {error && <p>{error.message}</p>}
            </form></div>
        )
    }
}

export default withFirebase(PasswordChangeForm)
