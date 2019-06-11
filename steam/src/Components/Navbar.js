import { Link } from 'react-router-dom'
import React from 'react'
import SignOutButton from './SignOut'
import * as ROUTES from '../Constants/routesFirebase'

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
)

const NavigationAuth = () => (
<nav>
    <div class="nav-wrapper black">
  <ul  class="right hide-on-med-and-down">
    <li><Link to={ROUTES.COMUNITY}>Comunidad Steam</Link></li>
    <li> <Link to={ROUTES.FORUM}>Foro</Link></li>
    <li> <Link to={ROUTES.HOME}>Home</Link></li>
    <li><Link to={ROUTES.MYPROFILE}>Mi Perfil</Link></li>
    <li><SignOutButton /></li>
  </ul>
  </div>
  </nav>
)
const NavigationNonAuth = () => (
<nav>
    <div class="nav-wrapper black">
  <ul  class="right hide-on-med-and-down">
    <li><Link to={ROUTES.LANDING}>Landing</Link> </li>
    <li><Link to={ROUTES.SIGN_IN}>Sign In</Link></li>
  </ul>
  </div>
  </nav>
)
export default Navigation