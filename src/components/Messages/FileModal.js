import React from 'react'
import mime from 'mime-types'
import{Modal,Input,Button,Icon } from 'semantic-ui-react'

class FileModal extends React.Component{
    state={
        file: null,
        authorized:['image/jpeg','image/png']
    }

    addFile=(event)=>{
        const file = event.target.files[0]
        console.log(file)
        if(file){
            this.setState({file:file})
        }
    }
    clearFile=()=>this.setState({file:null})

    sendFile=()=>{
        debugger
        if(this.state.file !==null){
            if(this.isAuthorized(this.state.file.name)){
                debugger
                const metadata = {contentType: mime.lookup(this.state.file.name)}
                this.props.uploadFile(this.state.file, metadata)
                
                this.props.closeModal()
                this.clearFile()
            }
        }
    }

    isAuthorized = filename => this.state.authorized.includes(mime.lookup(filename))

    
    render(){
        return(
            <Modal basic open={this.props.modal} onClose={this.props.closeModal}>
                <Modal.Header>Please select a file to upload</Modal.Header>
                <Modal.Content>
                    <Input onChange={this.addFile} fluid label="File types: JPG, PNG" type='file'/>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                    onClick={this.sendFile}
                    color="green"
                    inverted
                    />
                        <Icon name="checkmark"/> Send
                        <Button
                    color="black"
                    inverted
                    onClick={this.props.closeModal}
                    />
                        <Icon name="remove"/> Cancel
                </Modal.Actions>

            </Modal>
        )
    }
}
export default FileModal