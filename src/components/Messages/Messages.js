import React from "react";
import { Segment, Comment, MessageHeader } from "semantic-ui-react";
import firebase from '../../firebase'
import Message from './Message'
import MessagesHeader from "./MessagesHeader";
import MessagesForm from "./MessagesForm";

class Messages extends React.Component {
    state={
        messagesRef: firebase.database().ref("messages"),
        channel: this.props.currentChannel,
        user:this.props.currentUser,
        messages:[],
        messagesLoading:false,
        numUniqueUsers:''

    }


    componentDidMount(){
      const{channel,user}=this.state
      if(channel && user){
          this.addListener(channel.id)
      }
  }

  addListener=channelId=>{
      this.addMessageListener(channelId)
  }

  addMessageListener=channelId=>{
    let loadedMessages=[]
    this.state.messagesRef.child(channelId).on("child_added", snap=>{
      loadedMessages.push(snap.val())
      console.log(loadedMessages)
      this.setState({messages: loadedMessages, messagesLoading:false})

      this.countUniqueUsers(loadedMessages)
    })
  }

  countUniqueUsers=(messages)=>{
    const uniqueUsers = messages.reduce((acc, message)=>{
      if(!acc.includes(message.user.name)){
        acc.push(message.user.name)
      }

      return acc
    },[]
    
    )

    const numUniqueUsers =`${uniqueUsers.length} users`
    this.setState({numUniqueUsers})
  }
  displayMessages=messages=>(
    messages.length > 0 && messages.map(message=>(
    <Message
    key={message.timestamp}
    message={message}
    user={this.state.user}
    />

    ))

    )

  displayChannelNames= (channel)=> channel ? `${channel.name}`:''

  render() {


    return (
      <React.Fragment>
        <MessagesHeader channelName={this.displayChannelNames(this.state.channel)}  numUniqueUsers={this.state.numUniqueUsers}  />

        <Segment>
          <Comment.Group className="messages">
          {this.displayMessages(this.state.messages)}
          </Comment.Group>
        </Segment>

        <MessagesForm messagesRef={this.state.messagesRef} currentChannel={this.state.channel} currentUser={this.state.user}/>
      </React.Fragment>
    );
  }
}

export default Messages;
