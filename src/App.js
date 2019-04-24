// import React from 'react';
import React, { Component } from 'react'

// import logo from './logo.svg';
import './App.css';
// import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import Chatkit from '@pusher/chatkit-client'
import { tokenUrl, instanceLocator } from './config'

import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      roomId:null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
     }
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
        instanceLocator,
        userId: 'MGad',
        tokenProvider: new Chatkit.TokenProvider({
            url: tokenUrl
        })
    })
    
    chatManager.connect()
    .then(currentUser => {
      // adding user to the class
      this.currentUser = currentUser
      //console.log(this.currentUser.rooms[3]) // to see all users in the room
      this.getRooms()
      // this.subscribeToRoom()
  })
  .catch(err => console.log('error on connecting: ', err))
}

getRooms = () => {
  this.currentUser.getJoinableRooms()
  .then(joinableRooms => {
      this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
      })
  })
  .catch(err => console.log('error on joinableRooms: ', err))
}

subscribeToRoom = (roomId) => {
  this.setState({messages: []})
  this.currentUser.subscribeToRoom({
    roomId: roomId,
    // messageLimit: 10,
    hooks: {
        // onNewMessage: message => {
        onMessage: message => {
          // console.log(message)
            console.log('message.text: ', message.text);
            this.setState({
                messages : [...this.state.messages, message]
            })
        },
        // should add new componenet for this
        onUserStartedTyping: user => {
          console.log("User", user.name)
          /** render out the users */
      }
    }
  })
      .then(room => {
        this.setState({
            roomId: room.id
        })
        this.getRooms()
      })
      .catch(err => console.log('error on subscribing to room: ', err))
}

  sendMessage = (text) => {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    })
  }

  createRoom = (name) => {
    this.currentUser.createRoom({
      name
  })
    .then(room => this.subscribeToRoom(room.id))
    .catch(err => console.log('error with createRoom: ', err))
  }

  render() { 
    console.log(this.state.messages)
    return ( 
      <div className="app">
        <RoomList
            roomId={this.state.roomId} 
            subscribeToRoom={this.subscribeToRoom} 
            rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} 
        />
        <MessageList 
            messages={this.state.messages}
            roomId={this.state.roomId}
        />
        <SendMessageForm 
            sendMessage={this.sendMessage}
            disabled={!this.state.roomId}
        />
        <NewRoomForm  createRoom={this.createRoom}/>
    </div>
     );
  }
}
 
export default App;


// UI AVATARS  // TO GET avatars from Initials
// Add online users componenet to show who is online //console.log(this.currentUser.rooms[3].userIds)
//TYping indicators // to specify who is typing => on documntation {onUserStartTyping} {onUserStopTyping} =>
//////////////////// https://pusher.com/docs/chatkit/reference/javascript#room-subscription-hooks



