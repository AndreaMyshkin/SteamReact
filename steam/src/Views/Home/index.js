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
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    })
    this.setState({ text: '' })
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
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
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
          <div>
            {!loading && messages && (
              <form className='container input-text' onSubmit={event => this.onCreateMessage(event, authUser)}>
                <input
                  type='text'
                  value={text}
                  onChange={this.onChangeText}
                />
                <button disabled={isInvalid} type='submit'><i class="material-icons">near_me</i> Send</ button>
              </form>
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
            <button type='button' onClick={this.onNextPage}>
              More
           </button>
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
    <ul>
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
      <li>
        {editMode ? (
          <input
            type='text'
            value={editText}
            onChange={this.onChangeEditText}
          />
        ) : (
            <div className='container'>
              <div className='card'>
                <div className=''>
                  <img src={message.userPhoto} className='center photo-post'></img></div>
                <div>
                  <span>
                    <strong>{message.nameUser}</strong>
                    <span>    {message.text}</span>
                    {message.editedAt && <span>(Edited)</span>}
                  </span>
                </div>
              </div>
            </div>
          )}

        {authUser.uid === message.userId && (
          <span>
            {editMode ? (
              <span>
                <button onClick={this.onSaveEditText}>Save</button>
                <button onClick={this.onToggleEditMode}>Reset</button>
              </span>
            ) : (<span>
              <button onClick={this.onToggleEditMode}> <i class="material-icons">create</i></button>
            </span>
              )}
            {!editMode && (
              <div>
                <button onClick={this.onOpenModal}><i class="material-icons">delete</i></button>
                <Modal open={open} onClose={this.onCloseModal}>
                  <h3>Are you sure?</h3>
                  <div>
                    <button
                      type='button'
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
