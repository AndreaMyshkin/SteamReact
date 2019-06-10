import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navigation from './Components/Navbar'
import SignUpPage from './Components/SignUp'
import SignInPage from './Components/SignIn/index'
import Home from './Views/Home'
import Forum from './Views/Forum'
import Comunity from './Views/Comunity'
import MyProfile from './Views/MyProfile'
import { withFirebase } from './Components/Firebase'

import * as ROUTES from '../src/Constants/routesFirebase'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      authUser: null
    }
  }
  componentDidMount () {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null })
      }
    )
  }
  componentWillUnmount () {
    this.listener()
  }

  render () {
    return (
      <Router>
        <div>
          <Navigation authUser={this.state.authUser} />
          <hr />
          {/* <Route exact path={ROUTES.LANDING} component={LandingPage} /> */}
          <Route path={ROUTES.COMUNITY} component={Comunity} />
          <Route path={ROUTES.FORUM} component={Forum} />
          <Route path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.MYPROFILE} component={MyProfile} />
        </div>
      </Router>
    )
  }
}
export default withFirebase(App)
