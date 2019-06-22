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
  constructor () {
    app.initializeApp(config)
    this.emailAuthProvider = app.auth.EmailAuthProvider
    this.serverValue = app.database.ServerValue
    this.auth = app.auth()
    this.db = app.database()
    this.googleProvider = new app.auth.GoogleAuthProvider()
    this.facebookProvider = new app.auth.FacebookAuthProvider()
    this.twitterProvider = new app.auth.TwitterAuthProvider()
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
  /*   Autenticación con Twitter */
  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider)

  doSignOut = () => this.auth.signOut()

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  // Email Verification
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password)
  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: 'https://steamreact.firebaseapp.com',
    })

  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
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
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser
            }
            next(authUser)
          })
      } else {
        fallback ()
      }
    })
  // Users
  user = uid => this.db.ref(`users/${uid}`)
  users = () => this.db.ref('users')
  message = uid => this.db.ref(`messages/${uid}`)
  messages = () => this.db.ref('messages')

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
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
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              photoURL: authUser.photoURL,
              ...dbUser,
            }
            next(authUser)
          })
      }
      else {
        fallback ()
      }
    })
}

export default Firebase
