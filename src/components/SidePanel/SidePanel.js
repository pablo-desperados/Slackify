import React from 'react'
import { Menu } from 'semantic-ui-react'
import UserPanel from './userPanel'
class SidePanel extends React.Component{
    constructor(props){
        super(props)
        this.state={
           currentUser: this.props.currentUser
                  }
      
    }
    render(){
        return(
            <Menu size="large" inverted fixed='left' vertical style={{background: '#006d77', fontsize:'1.2rem'}}>
                <UserPanel currentUser={this.state.currentUser}/>
            </Menu>
        )
    }
}

export default SidePanel