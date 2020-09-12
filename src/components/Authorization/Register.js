import React from "react";
import {Grid, Form, Button, Segment, Header, Message, Icon, GridColumn} from "semantic-ui-react";
import{Link} from 'react-router-dom';
import firebase from '../../firebase.js';
import md5 from "md5";


class Register extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            errors: "",
            userRef: firebase.database().ref("users")
                  }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.saveUser = this.saveUser.bind(this)
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

          if (payload.username.trim().length < 1 || payload.password.trim().length < 1 || payload.email.trim().length<1){
            this.setState({errors: "One or more fields are missing"})
          }else if(payload.password.trim()!=payload.passwordConfirmation.trim()){
            this.setState({errors: "The passwords you entered do not match"})
          }else{
            this.setState({ errors: "", loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`
            })
            .then(() => {

              this.saveUser(createdUser).then(() => {
                console.log("user saved");
                this.setState({loading:false})
              });
            })
            .catch(err => {
              console.error(err);
              this.setState({
                errors: err,
                loading: false
              });
            });
        })
        .catch(err => {
          console.error(err);
          this.setState({
            errors: err,
            loading: false
          });
        });
          }}
    saveUser=(createdUser)=>{
      debugger
      return this.state.userRef.child(createdUser.user.uid).set({
        name: createdUser.user.displayName,
        avatart: createdUser.user.photoURL
      });
    }

    render(){
        let errordiv = ""
        debugger
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
                        <Icon icon="cog"name="Slackify" color="green" />
                        Join Slackify!
                    </Header>

                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment>
                            {errordiv}
                            <Form.Input fluid name="username" icon="user outline" iconPosition="left" placeholder="username" onChange={this.handleChange} type="text"></Form.Input>
                            <Form.Input fluid name="email" icon="mail" iconPosition="left" placeholder="email" onChange={this.handleChange} type="text"></Form.Input>
                            <Form.Input fluid name="password" icon="lock" iconPosition="left" placeholder="password" onChange={this.handleChange} type="password"></Form.Input>
                            <Form.Input fluid name="passwordConfirmation" icon="unlock" iconPosition="left" placeholder="password confirmation" onChange={this.handleChange} type="password"></Form.Input>
                            <Button   disabled={this.state.loading} className={this.state.loading ? "loading" : ""}content="Register Now!" color="green" fluid size="large"></Button>
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
