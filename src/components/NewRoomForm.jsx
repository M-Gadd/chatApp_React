import React, { Component } from 'react';


class NewRoomForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      roomName: ''
     }
  }

  handleChange = (e) => {
    this.setState({roomName : e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createRoom(this.state.roomName)
    this.setState({roomName : ''})
  }


  render() { 
    return ( 
      <div className="new-room-form">
            <form onSubmit={this.handleSubmit}>
                <input
                    onChange={this.handleChange}
                    value={this.state.roomName}
                    type="text" 
                    placeholder="Create New Room" 
                    required />
                <button id="create-room-btn" type="submit">+</button>
              </form>
      </div>
     );
  }
}
 
export default NewRoomForm;