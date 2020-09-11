import React from "react"
import {Grid, Form, Button, Segment, Header, Message, Icon, GridColumn} from "semantic-ui-react"
import{Link} from 'react-router-dom'
class Register extends React.Component{
    constructor(props){
        super(props)
        this.state={
            
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(){

    }
    render(){
        return(
        <div>
             <Grid textAlign='center'  verticalAlign='middle' className="app">
                 <Grid.Column style={{maxWidth:450}}>
                    <Header as="h2" icon color="green" textAlign="center">
                        <Icon icon="cog"name="Slackify" color="green" />
                        Join Slackify!
                    </Header>
                    <Form size="large">
                        <Segment>
                            <Form.Input fluid name="Username" icon="user outline" iconPosition="left" placeholder="username" onChange={this.handleChange} type="text"></Form.Input>
                            <Form.Input fluid name="Email" icon="mail" iconPosition="left" placeholder="email" onChange={this.handleChange} type="text"></Form.Input>
                            <Form.Input fluid name="Password" icon="lock" iconPosition="left" placeholder="password" onChange={this.handleChange} type="password"></Form.Input>
                            <Form.Input fluid name="PasswordConfirmation" icon="unlock" iconPosition="left" placeholder="password confirmation" onChange={this.handleChange} type="password"></Form.Input>
                            <Button content="Register Now!" color="green" fluid size="large"></Button>
                        </Segment>
                        <Message>Already a user? Log In! <Link to="/login"></Link></Message>
                    </Form>
                 </Grid.Column>

             </Grid>
        </div>
        )
    }
}

export default Register