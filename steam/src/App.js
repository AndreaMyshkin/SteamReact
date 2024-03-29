import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navigation from './Components/Navbar'
import SignUpPage from './Components/SignUp'
import SignInPage from './Components/SignIn'
import HomePage from './Views/Home'
import Events from './Views/Events'
import Comunity from './Views/Comunity'
import AccountPage from './Components/Account'
import AdminPage from './Components/Admin'
import { withAuthentication } from './Components/Session'
import * as ROUTES from '../src/Constants/routesFirebase'
import PasswordForgetPage from './Components/PasswordForget'

const App = () => (
  <Router>
    <div>
      <Navigation />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.COMUNITY} component={Comunity} />
      <Route path={ROUTES.EVENTS} component={Events} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} exact component={SignInPage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </div>
  </Router>
)

export default withAuthentication(App)
