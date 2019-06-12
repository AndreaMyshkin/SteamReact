import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
// import * as ROUTES from '../../Constants/routesFirebase'

const config = {
  apiKey: 'AIzaSyDcxv6ZSQj09RBkfsP9PXzj47PiDhmB2o8',
  authDomain: 'steamreact.firebaseapp.com',
  databaseURL: 'https://steamreact.firebaseio.com',
  projectId: 'steamreact',
  storageBucket: 'steamreact.appspot.com',
  messagingSenderId: '618661317660',
  appId: '1:618661317660:web:7e9dcc5cecd7244f'
}

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.db = app.database()
    this.googleProvider = new app.auth.GoogleAuthProvider()
    this.facebookProvider = new app.auth.FacebookAuthProvider()
  }
/* Autenticación con Firebase - email */
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)
 
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)
/*   Autenticación con Gmail */
  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider)
 /*   Autenticación con Facebook */ 
  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider)

  doSignOut = () => this.auth.signOut()

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password)

  // *** User API ***
  user = uid => this.db.ref(`users/${uid}`)
  users = () => this.db.ref('users')

}

export default Firebase
