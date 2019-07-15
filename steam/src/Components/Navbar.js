import { Link } from 'react-router-dom'
import React from 'react'
import SignOutButton from './SignOut'
import M from 'materialize-css'
import * as ROUTES from '../Constants/routesFirebase'
import { AuthUserContext } from './Session'
// import 'materialize-css/dist/css/materialize.min.css'
import * as ROLES from '../Constants/roles'
import './navbar.css'

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          null
        )
      }
    </AuthUserContext.Consumer>
  </div>
)

class NavigationAuth extends React.Component {
  componentDidMount () {
    var elem = document.querySelector('.sidenav')
    var instance = M.Sidenav.init(elem, {
      edge: 'left',
      inDuration: 300

    })
    console.log(instance)
  }
  render () {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className='row '>
            <nav>
              <div className='nav-wrapper nav-mobile white  '>
                <a href='#' data-target='slide-out' class='sidenav-trigger'><i className='material-icons hamburguer-menu'>menu</i></a>
                <a href='#' className='brand-logo'><Link className='grey-text text-darken-3 font-nav-logo' to={ROUTES.HOME}> STEAM</Link></a>
                <ul className='right hide-on-med-and-down'>
                  <li> <Link className='grey-text text-darken-3 font-nav' to={ROUTES.HOME}>Home</Link></li>
                  <li> <Link className='grey-text text-darken-3 font-nav' to={ROUTES.EVENTS}>Events</Link></li>
                  <li><Link className='grey-text text-darken-3 font-nav' to={ROUTES.ACCOUNT}>My Account</Link></li>

                  {!!authUser.roles[ROLES.ADMIN] && (
                    <li>
                      <Link className='grey-text text-darken-3' to={ROUTES.ADMIN}>Admin</Link>
                    </li>
                  )}
                  <li className='font-nav'><SignOutButton /></li>
                </ul>
              </div>
            </nav>
            <ul id='slide-out' class='sidenav'>
              <li><div class='user-view'>
                <div class='background' />
                <div className='photo-box'> <img class='circle' src={authUser ? authUser.photoURL : null} className='photo-profile-on-side-nav' /></div>
                <h6 className='center user-name-on-side-nav'>{authUser ? authUser.username : null}</h6>
              </div></li>
              <div className='options-on-side-nav'>
                <li> <Link className='grey-text text-darken-3 font-nav-mobile' to={ROUTES.HOME}>Home</Link></li>
                <li><div class='divider' /></li>
                <li> <Link className='grey-text text-darken-3 font-nav-mobile' to={ROUTES.EVENTS}>Events</Link></li>
                <li><div class='divider' /></li>
                <li><Link className='grey-text text-darken-3 font-nav-mobile' to={ROUTES.ACCOUNT}>My Account</Link></li>
                <li><div class='divider' /></li>
                {!!authUser.roles[ROLES.ADMIN] && (
          <>
            <li>
              <Link className='grey-text text-darken-3 font-nav-mobile' to={ROUTES.ADMIN}>Admin</Link>
            </li>
            <li><div class='divider' /></li></>
                )}

                <li className='center  sign-out-mobile font-nav-mobile'><SignOutButton /></li></div>
            </ul>

          </div>

        )}
      </AuthUserContext.Consumer>
    )
  }
}

// const NavigationNonAuth = () => (
//   <nav>
//     <div className='nav-wrapper white'>
//       <ul className='right hide-on-med-and-down'>
//         <li><Link className='grey-text text-darken-3 font-nav' to={ROUTES.SIGN_IN}>Sign In</Link></li>
//       </ul>
//     </div>
//   </nav>
// )

export default Navigation
