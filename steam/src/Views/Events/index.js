import React from 'react'
import Language from '../../assets/language.png'
import Tense from '../../assets/photo-1516491575772-bab9f75948c0-e1560193406381.jpg'
import Nights from '../../assets/Nights.png'
import './events.css'
import { compose } from 'recompose'
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from '../../Components/Session'
import { withFirebase } from '../../Components/Firebase'



const Events = () => (

  <div>
    <div className='row'>
      <div className='col s12 m4'>
        <div className='card'>
          <div className='card-image'>
            <img src={Tense} />
            <span className=' title-on-event center'>
           Tense & Dense: Science nights for adults</span>
          </div>

          <div className='card-content card_one'>

            <p className='center-align'>Learn about density and surface tension through various experiments and how it is possible to create a bubble inside another bubble, inside another bubble, inside another bubble ...</p>
            <p className='center-align'>
           Date : 20:30 h, July 31. Available quota: 50 adults.</p>
          </div>
          <div className='center'>
            <a className='link_to_article'href='http://ccemx.org/ciencia-y-tecnologia/tense-dense'>More information</a>
          </div>
        </div>

      </div>
      <div className='col s12 m4'>
        <div className='card'>
          <div className='card-image'>
            <img src={Nights} />
            <span className='title-on-event center'>
          Night of museums:
          Dance, lyrics, science and jazz</span>
          </div>

          <div className='card-content card_two'>
            <p className='center-align'>
          As is tradition, the last Wednesday of each month we prepare a series of activities for our Night of Museums: scientific experimentation, a graphic tour through the history of Mexico and a peaceful night of jazz. </p>
            <p className='center-align'>We wait for you! Free admission.</p>
            <p className='center'> Date: 19 to 23 hours, July 31.  </p>

          </div>
          <div className='center'>
            <a className='link_to_article'href='http://ccemx.org/exposiciones/noche-de-museos-julio'>More information</a>
          </div>
        </div>

      </div>
      <div className='col s12 m4'>
        <div className='card'>
          <div className='card-image'>
            <img src={Language} />
            <span className='title-on-event center'>

Spanish in seven accents</span>
          </div>

          <div className='card-content card_three'>
            <h6 className='center'>An encounter in which the word and the imagination are the protagonists.</h6>
            <p className='center-align'>

 A space for the dissemination of oral narrative and literature in which stories, myths, legends and anecdotes will fill the public's imagination.

The main interest of this event is to sensitize new audiences to the appreciation and enjoyment of the spoken word and literature through the millenary art of telling stories.</p>
            <p className='center'>
Date : 19 to 21 hours, July 17.</p>

          </div>
          <div className='center'>
            <a className='link_to_article'href='http://ccemx.org/letras/cuentalee-mexico'>More information</a>
          </div>
        </div>

      </div>
    </div>
  </div>

)


// const LoginManagement = withFirebase(LoginManagementBase)

const condition = authUser => !!authUser

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(Events)
