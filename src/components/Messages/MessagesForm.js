import React from 'react'
import firebase from '../../firebase'
import uuidv4 from 'uuid/v4'
import {Segment, Button, Input, ButtonGroup, Message} from 'semantic-ui-react'
import FileModal from './FileModal'
import ProgressBar from './ProgressBar'


class MessagesForm extends React.Component{
    state={
        message:"",
        uploadState:'',
        uploadTask:null,
        percentUploaded: 0,
        storageRef: firebase.storage().ref(),
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

    createMessage=(fileURL=null)=>{
        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user:{
                id: this.state.user.uid,
                name: this.state.user.displayName,
                avatar: this.state.user.photoURL
            },

        }
        if(fileURL!== null){
            message['image'] = fileURL

        }else{
            message['content']=this.state.message
        }
        return message
    }

    sendMessage=()=>{

        const {message, channel}=this.state
        const messageRef= this.props.messagesRef

        if (message){
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

    uploadFile=(file,metadata)=>{
        const pathToUpload = this.state.channel.id
        const ref= this.props.messagesRef
        const filePath = `chat/public/${uuidv4()}.jpg`

        this.setState({uploadState: 'uploading', uploadTask: this.state.storageRef.child(filePath).put(file,metadata)},
        ()=>{
            this.state.uploadTask.on('state_changed',snap=>{
                const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
                this.setState({percentUploaded:percentUploaded})
            },
            err=>{
               console.log(err)
               this.setState({errors: this.state.errors.concat(err), uploadState:'error', uploadTask: null}) 
            },
            ()=>{
                this.state.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL=>{
                    this.sendFileMessage(downloadURL, ref, pathToUpload)
                })
                .catch(err=>{
                    console.log(err)
               this.setState({errors: this.state.errors.concat(err), uploadState:'error', uploadTask: null}) 
                })
            }
            )
        }
        )
    }


    sendFileMessage =(fileURL,ref,pathToUpload)=>{
        ref.child(pathToUpload)
        .push()
        .set(this.createMessage(fileURL))
        .then(()=>{
            this.setState({uploadState:'done',})
        })
        .cath(err=>{
            console.log(err)
            this.setState({errors: this.state.errors.concat(err)}) 
             })
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
                    disabled={this.state.uploadState=="uploading"}
                    labelPosition="right"
                    onClick={this.openModal}
                    />    
                </ButtonGroup>
                <FileModal modal={this.state.modal} closeModal={this.closeModal} uploadFile={this.uploadFile}/>
                <ProgressBar uploadState={this.state.uploadState} percentUploaded={this.state.percentUploaded}/>
            </Segment>
        )
    }
}

export default MessagesForm