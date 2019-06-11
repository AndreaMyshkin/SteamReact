import app from 'firebase/app'
import 'firebase/auth'
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
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)


  doSignOut = () => {
    this.auth.signOut()
    alert('vuelve pronto')

  }

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password)
}

export default Firebase
