import React, { Component } from 'react';

class SendMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      message : '',
     }
  }
  handleChange = (e) => {
    const{name, value} = e.target
    this.setState({
        [name]: value
    })
}

handleSubmit = (e) => {
    e.preventDefault()
    this.props.sendMessage(this.state.message)
    this.setState({
      message : ''
    })
    // console.log(this.state.message)
    /** send off the message */
}
  render() { 
    return ( 
      <form
      onSubmit={this.handleSubmit}
      className="send-message-form">
      <input
          onChange={this.handleChange}
          disabled={this.props.disabled}
          value={this.state.message}
          name="message" 
          placeholder="Type your message and hit ENTER"
          type="text" />
  </form>
     );
  }
}
 
export default SendMessageForm;