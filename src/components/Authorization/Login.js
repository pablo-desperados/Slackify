import React from "react";
import {Grid, Form, Button, Segment, Header, Message, Icon, GridColumn} from "semantic-ui-react";
import{Link} from 'react-router-dom';
import firebase from '../../firebase.js';



class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email: "",
            password: "",
            errors: "",
            loading: false
                  }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        
        let state = event.target.name
        this.setState({[state]: event.target.value, errors:""})
    }

    handleSubmit(event){
        event.preventDefault();
        let payload = {
            username: this.state.username,
            password: this.state.password,
            passwordConfirmation: this.state.passwordConfirmation,
            email: this.state.email,
            error:"",
            loading: false
          }

          if (payload.password.trim().length < 1 || payload.email.trim().length<1){
            this.setState({errors: "One or more fields are missing"})
          }else{
            this.setState({ errors: "", loading: true });
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email,this.state.password)
            .then(signedInuser=>{
                console.log(signedInuser)
                this.setState({loading:false})
            })
            .catch(error=>{
                
                console.log(error)
                this.setState({errors:error.message,loading:false })
            })
          }
        }
  

    render(){
        let errordiv = ""

        if (this.state.errors.trim().length > 1) {
          errordiv = <Message negative>
            <Message.Header>An Error Has Ocurred</Message.Header>
            <p>{this.state.errors}</p>
        </Message>
        }
        return(
        <div>
             <Grid textAlign='center'  verticalAlign='middle' className="app">
                 <Grid.Column style={{maxWidth:450}}>
                    <Header as="h2" icon color="green" textAlign="center">
                        <Icon name="cog" color="green" />
                        Login to Slackify!
                    </Header>

                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment>
                            {errordiv}
                            <Form.Input fluid name="email" icon="mail" iconPosition="left" placeholder="email" onChange={this.handleChange} type="text"></Form.Input>
                            <Form.Input fluid name="password" icon="lock" iconPosition="left" placeholder="password" onChange={this.handleChange} type="password"></Form.Input>
                            <Button   disabled={this.state.loading} className={this.state.loading ? "loading" : ""}content="Login Now!" color="green" fluid size="large"></Button>
                        </Segment>
                        <Message><Link to="/register">First time using Slackify? Register!</Link></Message>
                    </Form>
                 </Grid.Column>
             </Grid>
        </div>
        )
    }
}

export default Login

