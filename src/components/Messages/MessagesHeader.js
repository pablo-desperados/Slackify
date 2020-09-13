import React from 'react'
import {Segment, Header, Input, Icon} from 'semantic-ui-react'

class MessagesHeader extends React.Component{
    render(){
        return(
            <Segment clearing>

                <Header fluid="true" as="h2" floated="left" style={{marginBottom:0}}>
                    <span>
                       Channel
                    <Icon name={"star outline"} color="black"></Icon> 
                    </span>
                    <Header.Subheader>2 users</Header.Subheader>
                </Header>
                <Header floated="right">
                    <Input size="mini" icon="search" name="searchTerm" placeholder="Find Meassages"/>
                </Header>
            </Segment>
        )
    }
}

export default MessagesHeader