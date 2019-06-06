import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Comunity from './Views/Comunity'
import Forum from './Views/Forum'
import Home from './Views/Home'
import Login from './Views/Login'
import MyProfile from './Views/MyProfile'
import Navbar from './Components/Navbar'

class Routes extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className='App'>
          <Navbar title='Steam' />
          <Route path='/comunity' component={Comunity} />
          <Route path='/forum' component={Forum} />
          <Route path='/home' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/myProfile' component={MyProfile} />
        </div>
      </BrowserRouter>)
  }
}

export default Routes
