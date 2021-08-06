
import React, { Component } from "react"
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@ronuse/react-ui/core/buttons'
import { Panel } from "@ronuse/react-ui/core/panels/Panel";
import { Scheme, Alignment, Position } from "@ronuse/react-ui/core/variables";
import { InputText } from '@ronuse/react-ui/core/form';
import { Popover } from '@ronuse/react-ui/core/overlay';
import { Tag } from '@ronuse/react-ui/core/misc'
import { ObjUtils, DOMUtils, BoolUtils } from "@ronuse/react-ui/utils"

export class ScratchPage extends React.Component {

    state = {
        username: ""
    }
    
    constructor(props) {
        super(props);    
    }

    render() {
        var icon = this.state.buttonIcon ? this.state.buttonIcon : "fa fa-plus";

        return (
            <React.Fragment>
                <div className="r-r-showcase-component-page">
                    <h1>Construct A Component Here <i className="fas fa-bars" style={{float: "right", display: "none"}}></i></h1>
                    <div>
                        
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
