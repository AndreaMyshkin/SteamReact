import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navigation from './Components/Navbar'
import SignUpPage from './Components/SignUp'
import SignInPage from './Components/SignIn/index'
import HomePage from './Views/Home'
import Forum from './Views/Forum'
import Comunity from './Views/Comunity'
import MyProfile from './Views/MyProfile'
import AccountPage from './Components/Account'
import { withAuthentication } from './Components/Session'
import * as ROUTES from '../src/Constants/routesFirebase'
import PasswordForgetPage from './Components/PasswordForget'

const App = () => (
  <Router>
    <div>
      <Navigation />
      <hr />
      {/* <Route exact path={ROUTES.LANDING} component={LandingPage} /> */}
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.COMUNITY} component={Comunity} />
      <Route path={ROUTES.FORUM} component={Forum} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.MYPROFILE} component={MyProfile} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
    </div>
  </Router>
)

export default withAuthentication(App)
