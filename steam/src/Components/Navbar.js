import { Link } from 'react-router-dom'
import React from 'react'
import SignOutButton from './SignOut'
import * as ROUTES from '../Constants/routesFirebase'
import { AuthUserContext } from './Session'
import * as ROLES from '../Constants/roles'

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
    <div className='nav-wrapper  nav-mobile black'>
      <ul className='right hide-on-med-and-down'>
        <li><Link to={ROUTES.COMUNITY}>Steam Community</Link></li>
        <li> <Link to={ROUTES.HOME}>Home</Link></li>
        <li><Link to={ROUTES.ACCOUNT}>My Account</Link></li>
        {!!authUser.roles[ROLES.ADMIN] && (
          <li>
            <Link to={ROUTES.ADMIN}>Admin</Link>
          </li>
        )}
        <li><SignOutButton /></li>
      </ul>
    </div>
  </nav>
)

const NavigationNonAuth = () => (
  <nav>
    <div className='nav-wrapper black'>
      <ul className='right hide-on-med-and-down'>
        <li><Link to={ROUTES.LANDING}>Landing</Link> </li>
        <li><Link to={ROUTES.SIGN_IN}>Sign In</Link></li>
      </ul>
    </div>
  </nav>
)

export default Navigation
