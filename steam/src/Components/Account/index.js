import React from 'react'
import { PasswordForgetForm } from '../PasswordForget'
import PasswordChangeForm from '../PasswordChange'

const AccountPage = () => (
<div className="row">
<div className="col l4 offset-l4 white">
<h1>Account Page</h1>
<PasswordForgetForm />
<PasswordChangeForm /></div>
</div>
)
export default AccountPage
