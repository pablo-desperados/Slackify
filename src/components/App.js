import React from 'react';
import './App.css';
import {Grid, GridColumn} from 'semantic-ui-react'
import ColorPanel from "./ColorPanel/ColorPanel"
import SidePanel from './SidePanel/SidePanel'
import Messages from './Messages/Messages'
import MetaPanel from './MetaPanel/MetaPanel'
import{connect} from 'react-redux'


const App=({currentUser,currentChannel, isPrivateChannel,userPosts})=>(

  <Grid columns="equal" className="app" style={{background:'#eee'}}>
    <ColorPanel/>
    <SidePanel key={currentUser && currentUser.uid} currentUser={currentUser}/>
    <Grid.Column style={{marginLeft:320}}>
      <Messages key={currentChannel && currentChannel.id} currentChannel={currentChannel} currentUser={currentUser} isPrivateChannel={isPrivateChannel}/>
    </Grid.Column>
    <Grid.Column width={4}>
      <MetaPanel key={currentChannel && currentChannel.id} userPosts={userPosts} currentChannel={currentChannel} isPrivateChannel={isPrivateChannel}/>
    </Grid.Column>
    
  </Grid>
)


const mapStateToProps=state=>(

  {
  currentUser: state.userReducer.currentUser,
  currentChannel: state.channel_reducer.currentChannel,
  isPrivateChannel: state.channel_reducer.isPrivateChannel,
  userPosts: state.channel_reducer.userPosts
})

export default connect(mapStateToProps)(App);
