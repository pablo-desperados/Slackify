import React from 'react'
import {Sidebar,Menu,Divider,Button} from 'semantic-ui-react'

class ColorPanel extends React.Component{
    state={

    }

    render(){
        return(
            <Sidebar as={Menu} icon="labeled" inverted vertical visible width="very thin" color="1C1C1D">
                <Divider/>
                <Button icon="add" color="blue" />

            </Sidebar>
        )
    }
}

export default ColorPanel