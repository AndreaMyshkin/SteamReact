import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// import Routes from './Routes'
import * as serviceWorker from './serviceWorker'

// ReactDOM.render(<Routes />, document.getElementById('root'))

// serviceWorker.unregister()
import Firebase, { FirebaseContext } from './Components/Firebase'
ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
)
serviceWorker.unregister()
