import { NavLink } from 'react-router-dom'
import React, { Component } from 'react'

class Navbar extends Component {


    render() {
        return (
   <> <nav><div class='nav-wrapper'>
           <ul id="nav-mobile" class="right hide-on-med-and-down">
           <li><NavLink to="/comunity">Comunidad Steam</NavLink></li>
           <li> <NavLink to="/forum">Foro</NavLink></li>
           <li> <NavLink  to="/home">Home</NavLink></li>
           <li><NavLink to="/login">Login</NavLink></li>
           <li><NavLink to="/myProfile">Mi Perfil</NavLink></li>
      </ul>
   </div>
  </nav>
</>
        );
    }
  }

export default Navbar;

