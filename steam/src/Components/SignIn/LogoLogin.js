import React, { Component } from 'react'
import LOGO from '../../assets/Logo.png'
import './signIn.css'

class Logo extends Component {
  render () {
    return (
      <article id='log'>
        <img className='logo-img' src={LOGO} alt='Logo' />
      </article>
    )
  }
}

export default Logo
