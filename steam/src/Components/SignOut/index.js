import React from 'react'
import { withFirebase } from '../Firebase'
import './signOut.css'
const SignOutButton = ({ firebase }) => (

  <button type='button' className=' font-nav btn-small btn-signOut white' onClick={firebase.doSignOut}>
Sign Out
  </button>
)

export default withFirebase(SignOutButton)
