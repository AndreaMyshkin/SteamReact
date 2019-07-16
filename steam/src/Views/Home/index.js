import React from 'react'
import { compose } from 'recompose'
import { withFirebase } from '../../Components/Firebase'
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../../Components/Session'
import './home.css'
import Modal from 'react-responsive-modal'
import EventOnForum from '../../Components/Event-On-Forum'


const HomePage = () => (
  <div>
    <Messages />
  </div>
)

class MessagesBase extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      loading: false,
      messages: [],
      limit: 5
    }
  }

  onChangeText = event => {
    this.setState({ text: event.target.value })
  }
  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages().push({
      text: this.state.text,
      userPhoto: authUser.photoURL,
      userId: authUser.uid,
      nameUser: authUser.username,
      createdAt: this.props.firebase.serverValue.TIMESTAMP
    })
    this.setState({ text: '' })
    this.setState({ counter: 0 })
    event.preventDefault()
  }

  onRemoveMessage = uid => {
    this.props.firebase.message(uid).remove()
  }
  onEditMessage = (message, text) => {
    const { uid, ...messageSnapshot } = message
    this.props.firebase.message(message.uid).set({
      ...messageSnapshot,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP
    })
  }

  componentDidMount() {
    this.onListenForMessages()
  }

  onListenForMessages() {
    this.setState({ loading: true })
    this.props.firebase.messages()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', snapshot => {
        const messageObject = snapshot.val()
        if (messageObject) {
          const messageList = Object.keys(messageObject).map(key => ({
            ...messageObject[key],
            uid: key
          }))

          const orderedMessages = Array.from(messageList).reverse()

          this.setState({
            messages: orderedMessages,
            loading: false
          })
        } else {
          this.setState({ messages: null, loading: false })
        }
      })
  }

  componentWillUnmount() {
    this.props.firebase.messages().off()
  }

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForMessages,
    )
  }

  render() {
    const { text, messages, loading } = this.state
    const isInvalid = text === ''

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="hola">
            {!loading && messages && (
            <div className="container">
              <div className="row prueba2">
                
                <div className="col s12 l8">
              <div className='input_text_post col s12 m12 l12'>
              <img src={authUser ? authUser.photoURL : null } className='center photo-on-post' alt="" />
                <form className='container input-text col s12 m12 l12 ' onSubmit={event => this.onCreateMessage(event, authUser)}>
                  <textarea  id='text-input'
                    type='text'
                    value={text}
                    onChange={this.onChangeText}
                    className="col  s12 m10 l11 "
                  />
                  <button className='send_button waves-effect waves-light btn' disabled={isInvalid} type='submit'><i class='material-icons'>near_me</i> </ button>
                </form>
              </div>
         
              </div>
              <div className ="col l3 offset-l1 news_card"><EventOnForum /></div>
              </div></div>
         
            )}
            {messages ? (
              <MessageList
                authUser={authUser}
                messages={messages}
                onEditMessage={this.onEditMessage}
                onRemoveMessage={this.onRemoveMessage} />
            ) : (
                <div>There are no messages ...</div>
              )}
              <div className="container">
              <div class="row prueba2">
                <div class="col s12 m12 l8  center ">
              <button className='more_button waves-effect waves-light btn-sm' type='button' onClick={this.onNextPage}>
                More
           </button>
            </div></div></div>
          </div>
        )}
      </AuthUserContext.Consumer>
    )
  }
}


const MessageList = ({
  authUser,
  messages,
  onEditMessage,
  onRemoveMessage,
}) => (
    <ul className="all-messages-on-forum">
      {messages.map(message => (
        <MessageItem
          authUser={authUser}
          key={message.uid}
          message={message}
          onEditMessage={onEditMessage}
          onRemoveMessage={onRemoveMessage}
        />
      ))}
    </ul>
  )
class MessageItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false,
      editText: this.props.message.text,
      likeCounter: parseInt(this.props.message.counter),
      open: false
    }
  }

  onOpenModal = () => {
    this.setState({ open: true })
  }

  onCloseModal = () => {
    this.setState({ open: false })
  }

  onChangeEditText = event => {
    this.setState({ editText: event.target.value })
  }

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText)
    this.setState({ editMode: false })
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text,
    }))
  }

  render() {
    const { open } = this.state
    const { authUser, message, onRemoveMessage } = this.props
    const { editMode, editText } = this.state
    return (
   
      <li className="all-messages">
        {editMode ? (
            <div className="container">
            <div className='row prueba2'> 
            
            <div className='col s12 m12 l8  '>
            
            <textarea
              id='input_edit'
              type='textarea-edit'
              value={editText}
              onChange={this.onChangeEditText}
            /></div>
            </div></div>
        
        ) : (
             <div className="container">
              <div class="row prueba2">
                
                <div class="col s12 m12 l8 ">
                  <div class="card small white card-content black-text card-on-home">
                  
                      <span class="title-on-card"><img src={message.userPhoto} className='center photo-post' alt=""></img>  <span className="name_on_message">{message.nameUser}</span></span>
                      <p class='message-on-forum'> {message.text}</p>
                      <p class='message-on-forum'> {message.editedAt && <span>(Edited)</span>}</p>
                    </div>
                   
                  </div> 
             
                </div></div>
             
          
          )}
        {authUser.uid === message.userId && (
          <span>
            {editMode ? (
              <div className="container">
              <div class="row prueba2">
              <div class="col s12 m12 l6 offset-l1 center ">
                <button className='save_button waves-effect waves-light btn' onClick={this.onSaveEditText}>Save</button>
                <button className='reset_button waves-effect waves-light btn' onClick={this.onToggleEditMode}>Reset</button>
              </div></div></div>
           
            ) : (
            
            
              <div className="container">
              <div class="row prueba2">
                <div class="col s12 m12 l6 offset-l1 center ">
              <button className='edit_button waves-effect waves-light btn' onClick={this.onToggleEditMode}> <i class='material-icons'>create</i></button>
             
             <button className='delete_button waves-effect waves-light btn' onClick={this.onOpenModal}><i class='material-icons'>delete</i></button>
           </div> </div></div>
              )}
            {!editMode && (
              <div id='modal'>
                <Modal open={open} onClose={this.onCloseModal}>
                  <h5>Are you sure?</h5>
                  <div>
                    <button
                      type='button' className=' waves-effect waves-light btn confirm_button'
                      onClick={() => onRemoveMessage(message.uid)}
                    > Yes</button>
                  </div>
                </Modal>
              </div>
            )}
          </span>
        )}
      </li>
      
    )
  }
}

const Messages = withFirebase(MessagesBase)
const condition = authUser => !!authUser
export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage)
