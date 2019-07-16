import React from 'react'
import Astronomy from '../../assets/070619_scivis_feat.jpg'
import './event_on_forum.css'
const EventOnForum = () => (
  <div className='card'>
    <div className='card-image'>
      <img src={Astronomy} />
      <span className='card-title '>Article of the day</span>
    </div>

    <div className='card-content'>
      <h6 className='title-of-article'>See how visualizations of the moon have changed over time</h6>
      <p className='content-of-article'>Look up at the moon and you’ll see roughly the same patterns of light and shadow that Plato saw about 2,500 years ago. But humankind’s understanding of Earth’s nearest neighbor has changed considerably since then, and so have the ways that scientists and others have visualized the moon.</p>
    </div>
    <div className='center'>
      <a className='link_to_article'href='https://www.sciencenews.org/article/see-how-visualizations-moon-have-changed-over-time'>Read full article</a>
    </div>
  </div>

)

export default EventOnForum
