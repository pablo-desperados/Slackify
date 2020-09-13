import React from "react";
import { Segment, Comment, MessageHeader } from "semantic-ui-react";
import firebase from '../../firebase'
import Message from './Message'
import MessagesHeader from "./MessagesHeader";
import MessagesForm from "./MessagesForm";
import {connect} from 'react-redux'
import {setUserPosts} from '../../modules/channelReducer'

class Messages extends React.Component {
    state={
        privateChannel: this.props.isPrivateChannel,
        messagesRef: firebase.database().ref("messages"),
        privateMessagesRef: firebase.database().ref("privatemessages"),
        channel: this.props.currentChannel,
        user:this.props.currentUser,
        messages:[],
        messagesLoading:false,
        numUniqueUsers:'',
        searchTerm:'',
        searchLoading:false,
        searchResults:[]

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
    const ref = this.getMessagesRef()
    ref.child(channelId).on("child_added", snap=>{
      loadedMessages.push(snap.val())
      console.log(loadedMessages)
      this.setState({messages: loadedMessages, messagesLoading:false})

      this.countUniqueUsers(loadedMessages)
      this.countUserPosts(loadedMessages)
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


  countUserPosts =(messages)=>{
    let userPost = messages.reduce((acc,message)=>{
      if(message.user.name in acc){
        acc[message.user.name].count+=1
      }else{
        acc[message.user.name]={
          avatar: message.user.avatar,
          count:1
        }
      }
      return acc
    },{})
    this.props.setUserPosts(userPost)
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

    componentDidUpdate(prevProps, prevState) {
      Object.entries(this.props).forEach(([key, val]) =>
        prevProps[key] !== val && console.log(`Prop '${key}' changed`)
      );
      if (this.state) {
        Object.entries(this.state).forEach(([key, val]) =>
          prevState[key] !== val && console.log(`State '${key}' changed`)
        );
      }
    }

  displayChannelNames= (channel)=> {

    return channel ?`${this.state.isPrivateChannel ? '@':'#'}${channel.name}`:''
  }


  handleSearchMessages=()=>{
    const channelMessages = [...this.state.messages]
    const regex = new RegExp(this.state.searchTerm,'gi')
    const searchResults= channelMessages.reduce((acc, message)=>{
      if(message.content && message.content.match(regex) || message.user.name.match(regex)){
        acc.push(message)
      }
      return acc
    },[])
    this.setState({searchResults})
  }

  getMessagesRef = ()=>{
    const {messagesRef, privateMessagesRef, privateChannel}=this.state
    return privateChannel ? privateMessagesRef: messagesRef
  }

  handleSearchChange=(event)=>{
    this.setState({
      searchTerm: event.target.value,
      searchLoading:true
    },()=>this.handleSearchMessages())
  }
  render() {

    
    return (
      <React.Fragment>
        <MessagesHeader channelName={this.displayChannelNames(this.state.channel)}  numUniqueUsers={this.state.numUniqueUsers} handleSearchChange={this.handleSearchChange} privateChannel={this.state.privateChannel} />

        <Segment>
          <Comment.Group className="messages">
          {this.state.searchTerm ? this.displayMessages(this.state.searchResults): this.displayMessages(this.state.messages)}
          </Comment.Group>
        </Segment>

        <MessagesForm messagesRef={this.state.messagesRef} currentChannel={this.state.channel} currentUser={this.state.user} isPrivateChannel={this.state.privateChannel} 
        getMessagesRef={this.getMessagesRef}/>
      </React.Fragment>
    );
  }
}

export default connect(null,{setUserPosts})(Messages);
