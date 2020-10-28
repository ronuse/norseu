
import React from "react"
import { Button } from 'ronuse-react-ui/core/buttons'
import { Panel } from "ronuse-react-ui/core/panels/Panel";
import { Scheme } from "ronuse-react-ui/core/variables";

export class ScratchPage extends React.Component {

    state = {

    }

    render() {
        var icon = this.state.buttonIcon ? this.state.buttonIcon : "fa fa-plus";
        return (
            <div style={{margin:"20px"}}>
                <span borderless style={{position:"relative",width:"max-content",padding:"0px"}}>
                    <span className="numberCircle">99+</span>
                    <Button style={{margin:"0px"}} scheme={Scheme.STATELESS} icon="fa fa-bell" outlined/>
                </span>
                
                <br/>
                <br/>
                <br/>
                <h2>Panel Flex Box</h2>

                
            </div>
        )
    }
}
