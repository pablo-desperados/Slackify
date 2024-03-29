import React from "react";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import firebase from '../../firebase.js'
import {connect} from 'react-redux'
class UserPanel extends React.Component {
  state={
    user:this.props.currentUser
  }

  componentDidMount(){
    this.setState({user:this.props.currentUser})
  }
    Options = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{this.state.user.displayName}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "signout",
      text: <span onClick={this.handleSignout}>Sign Out</span>
    }
  ];

  handleSignout=()=>{
      firebase
      .auth()
      .signOut()
      .then(()=>
      console.log("User signedout")
      )
  }

  render() {

    return (
      <Grid style={{ background: "#006d77" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>

            <Header inverted floated="left" as="h2">
              <Icon name="comment alternate outline icon"/>
              <Header.Content>Slackify</Header.Content>
            </Header>
            <Header style={{ padding: "0.25em" }} as="h4" inverted>
            <Dropdown
              trigger={<span>
                <Image spaced='right' avatar src={this.state.user.photoURL}/>
                {
                this.state.user.displayName
                }</span>}
              options={this.Options()}
            />
          </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}
const mapStateToProps=state=>({
  currentUser: state.userReducer.currentUser
})
export default connect(mapStateToProps)(UserPanel);
