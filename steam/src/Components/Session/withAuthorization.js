import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../Constants/routesFirebase'
import AuthUserContext from './context'

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount () {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          if (authUser) {
            this.props.firebase
              .user(authUser.uid)
              .once('value')
              .then(snapshot => {
                const dbUser = snapshot.val()
                // default empty roles
                if (!dbUser.roles) {
                  dbUser.roles = {}
                }
                // merge auth and db user
                authUser = {
                  uid: authUser.uid,
                  email: authUser.email,
                  ...dbUser
                }
                if (!condition(authUser)) {
                  this.props.history.push(ROUTES.SIGN_IN)
                }
              })
          } else {
            this.props.history.push(ROUTES.SIGN_IN)
          }
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN)
          }
        },
        () => this.props.history.push(ROUTES.SIGN_IN)
      )
    }

    componentWillUnmount () {
      this.listener()
    }

    render () {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      )
    }
  }

  return compose(
    withRouter,
    withFirebase
  )(WithAuthorization)
}

export default withAuthorization
