import { Link } from 'react-router-dom'
import React from 'react'
import SignOutButton from './SignOut'
import * as ROUTES from '../Constants/routesFirebase'
import { AuthUserContext } from './Session'
import * as ROLES from '../Constants/roles'
import './navbar.css'
const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  </div>
)

const NavigationAuth = ({ authUser }) => (
  <nav>
    <div className='nav-wrapper nav-mobile white  '>
      <a href="#" className="brand-logo"><Link className='grey-text text-darken-3 font-nav-logo' to={ROUTES.HOME}> STEAM</Link></a>
      <ul className='right hide-on-med-and-down'>
        <li><Link className='grey-text text-darken-3 font-nav' to={ROUTES.COMUNITY}>Comunidad Steam</Link></li>
        <li> <Link className='grey-text text-darken-3 font-nav' to={ROUTES.FORUM}>Foro</Link></li>
        <li> <Link className='grey-text text-darken-3 font-nav' to={ROUTES.HOME}>Home</Link></li>
        <li><Link className='grey-text text-darken-3 font-nav' to={ROUTES.MYPROFILE}>Mi Perfil</Link></li>
        <li><Link className='grey-text text-darken-3 font-nav' to={ROUTES.ACCOUNT}>Account</Link></li>
        {!!authUser.roles[ROLES.ADMIN] && (
          <li>
            <Link className='grey-text text-darken-3' to={ROUTES.ADMIN}>Admin</Link>
          </li>
        )}
        <li><SignOutButton /></li>
      </ul>
    </div>
  </nav>
)

const NavigationNonAuth = () => (
  <nav>
    <div className='nav-wrapper white'>
      <ul className='right hide-on-med-and-down'>
        <li><Link className='grey-text text-darken-3 font-nav' to={ROUTES.LANDING}>Landing</Link> </li>
        <li><Link className='grey-text text-darken-3 font-nav' to={ROUTES.SIGN_IN}>Sign In</Link></li>
      </ul>
    </div>
  </nav>
)

export default Navigation
