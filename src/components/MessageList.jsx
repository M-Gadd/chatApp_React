import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Message from './Message'

// const DUMMY_DATA = [
//   {
//       senderId: 'perborgen',
//       text: 'Hey, how is it going?'
//   },
//   {
//       senderId: 'janedoe',
//       text: 'Great! How about you?'
//   },
//   {
//       senderId: 'perborgen',
//       text: 'Good to hear! I am great as well'
//   }
// ]

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  //  To prevent going to the bottom directly if you're reading older messages at the top
  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this)
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
}

//  To go to the bottom eveytime there is a new message sent
  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
        const node = ReactDOM.findDOMNode(this)
        node.scrollTop = node.scrollHeight   
    }
}
  render() { 
    if (!this.props.roomId) {
      return (
          <div className="message-list">
              <div className="join-room">
                  &larr; Join a room!
              </div>
          </div>
      )
  }
    return ( 
      <div className="message-list">
      {this.props.messages.map((message, index) => {
        return (
          <Message key={index} username={message.senderId} text={message.text} /> 
        )
      })}
      </div>
     );
  }
}
 
export default MessageList;