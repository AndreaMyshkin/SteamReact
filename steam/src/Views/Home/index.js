import React from 'react'
import { compose } from 'recompose'
import { withFirebase } from '../../Components/Firebase'
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
  } from '../../Components/Session';
import './home.css'
const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
    <Messages />
  </div>
)
class MessagesBase extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      loading: false,
      messages: [], 
      limit: 5
    }
  }
  onChangeText = event => {
    this.setState({ text: event.target.value });
    };
    onCreateMessage = (event, authUser) => {
      this.props.firebase.messages().push({
      text: this.state.text,
      userPhoto: authUser.photoURL,
      userId: authUser.uid,
      nameUser : authUser.username,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
      });
    this.setState({ text: '' });
    event.preventDefault();
    };
  
    onRemoveMessage = uid => {
      this.props.firebase.message(uid).remove();
      };
      onEditMessage = (message, text) => {
        const { uid, ...messageSnapshot } = message;
        this.props.firebase.message(message.uid).set({
        ...messageSnapshot,
        text,
        editedAt: this.props.firebase.serverValue.TIMESTAMP,
        });
        };
      
        componentDidMount() {
          this.onListenForMessages();
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

  componentWillUnmount () {
    this.props.firebase.messages().off()
  }
  
  onNextPage = () => {
    this.setState(
    state => ({ limit: state.limit + 5 }),
    this.onListenForMessages,
    );
    };
    
  render () {
    const { text, messages, loading } = this.state;
    return (
      <AuthUserContext.Consumer>
{authUser => (
<div>
{!loading && messages && (
  <button type="button" onClick={this.onNextPage}>
  More
  </button>
  )}
{messages ? (
<MessageList
authUser={authUser}
messages={messages} 
onEditMessage={this.onEditMessage}
onRemoveMessage={this.onRemoveMessage}/>
) : (
<div>There are no messages ...</div>
)}
<form onSubmit={event => this.onCreateMessage(event, authUser)}>
<input
type="text"
value={text}
onChange={this.onChangeText}
/>
<button type="submit">Send</button>
</form>
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
  );
  class MessageItem extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
    editMode: false,
    editText: this.props.message.text,
    };
    }
    
    onChangeEditText = event => {
      this.setState({ editText: event.target.value });
      };
      
      onSaveEditText = () => {
        this.props.onEditMessage(this.props.message, this.state.editText);
        this.setState({ editMode: false });
        };
    onToggleEditMode = () => {
      this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text,
      }));
      };
      render() {
        const { authUser, message, onRemoveMessage } = this.props;
        const { editMode, editText } = this.state;
        return (
        <li>
        {editMode ? (
<input
type="text"
value={editText}
onChange={this.onChangeEditText}
/>
) : (
  <div>
  <div> <img src = {message.userPhoto} className="center photo-post"></img></div>
  <div>
  <span>
  <strong>{message.nameUser}</strong>
  <span>{message.text}</span>
  
  {message.editedAt && <span>(Edited)</span>}
 
  </span></div>
  </div> 
  )}
  
  
{authUser.uid === message.userId && (
  <span>
  {editMode ? (
  <span>
  <button onClick={this.onSaveEditText}>Save</button>
  <button onClick={this.onToggleEditMode}>Reset</button>
  </span>
  ) : (
    <button onClick={this.onToggleEditMode}>Edit</button>
    )}
    {!editMode && (
    <button
    type="button"
    onClick={() => onRemoveMessage(message.uid)}
    >
    Delete
    </button>
    )}
    </span>
    )}
    </li>
    );
    }
    }
  
  
  
const Messages = withFirebase(MessagesBase)
const condition = authUser => !!authUser
export default compose(
withEmailVerification,
  withAuthorization(condition)
)(HomePage)
