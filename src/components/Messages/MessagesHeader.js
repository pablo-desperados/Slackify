import React from 'react'
import {Segment, Header, Input, Icon} from 'semantic-ui-react'

class MessagesHeader extends React.Component{
    render(){
        return(
            <Segment clearing>

                <Header fluid="true" as="h2" floated="left" style={{marginBottom:0}}>
                    <span>
                        #{this.props.channelName}
                    <Icon name={"star outline"} color="black"></Icon> 
                    </span>
                    <Header.Subheader>{this.props.numUniqueUsers}</Header.Subheader>
                </Header>
                <Header floated="right">
                    <Input onChange={this.props.handleSearchChange} size="mini" icon="search" name="searchTerm" placeholder="Find Meassages"/>
                </Header>
            </Segment>
        )
    }
}

export default MessagesHeader