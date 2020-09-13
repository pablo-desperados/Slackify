import React from 'react'
import firebase from '../../firebase'
import {Segment, Button, Input, ButtonGroup, Message} from 'semantic-ui-react'

class MessagesForm extends React.Component{
    state={
        message:"",
        loading:false,
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        errors:[],
        modal:false
    }
    
    openModal=()=> this.setState({modal:true})

    closeModal=()=> this.setState({modal:false})
    handleChange=event=>{
        this.setState({[event.target.name]:event.target.value})
    }

    createMessage=()=>{
        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user:{
                id: this.state.user.uid,
                name: this.state.user.displayName,
                avatar: this.state.user.photoURL
            },
            content: this.state.message
        }
        return message
    }

    sendMessage=()=>{

        const {message, channel}=this.state
        const messageRef= this.props.messagesRef

        if (message){
            console.log("hello")
            this.setState({loading:true})
            messageRef
            .child(channel.id)
            .push()
            .set(this.createMessage())
            .then(()=>{
                this.setState({loading:false, message:'',errors:[]})
            })
            .catch(err=>{
                console.log(err)
                this.setState({loading:false, errors: this.state.errors.concat(err)})
            })
        }else{
            this.setState({errors: this.state.errors.concat({message: 'Add a message'}) })
        }
    }


    render(){

        return(

            <Segment className="message__form">
                <Input onChange={this.handleChange} fluid name="message" sytle={{marginBottom: '0.7em'}}
                label={<Button icon={'add'}/>}
                labelPosition='left'
                value={this.state.message}
                placeholder="Type your message here..."
                className={this.state.errors.some(error => error.message.includes("message"))
                ? "error"
                : ""}
                />
                <ButtonGroup icon widths="2">
                    <Button onClick={this.sendMessage} disable={this.state.message} color="green" content="Add Message" labelPosition="left" icon="arrow alternate circle up out line"/>
                    <Button 
                    color="red"
                    content="Upload Media"
                    icon="cloud"
                    labelPosition="right"
                    onClick={this.openModal}
                    />
                    <FileModal modal={this.state.modal} closeModal={this.closeModal}/>
                </ButtonGroup>
            </Segment>
        )
    }
}

export default MessagesForm