
import React, { Component } from "react"
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@ronuse/react-ui/core/buttons'
import { Panel } from "@ronuse/react-ui/core/panels/Panel";
import { Scheme, Alignment, Position } from "@ronuse/react-ui/core/variables";
import { InputText } from '@ronuse/react-ui/core/form';
import { Navbar } from '@ronuse/react-ui/core/overlay';
import { Tag } from '@ronuse/react-ui/core/misc'
import { ObjUtils, DOMUtils, BoolUtils } from "@ronuse/react-ui/utils"

export class ScratchPage extends React.Component {

    state = {
        username: "",
        usernameScheme: Scheme.PRIMARY,
        usernameBorderClass: "",
        helpLabel: null,
        dVisible: false
    }
    
    constructor(props) {
        super(props);
        this.cancelButton = React.createRef();
        this.recButton = React.createRef();
        this.dialogRef = React.createRef();
        
    }

    removeRippleStylesAndEffect(element) {
        element.style["border-radius"] = '0';
        element.style["background"] = 'rgba(255, 255, 255, 0.0)';
        element.style["top"] = '0px';
        element.style["left"] = '0px';
        element.style["width"] = "100%";
        element.style["height"] = "100%";
        element.classList.remove("r-r-ripple-effect");
    }

    animateRipple(event) {
        let target = event.target;
        let targetParent = event.target.parentNode;

        var positionInfo = target.getBoundingClientRect();
        var posX = positionInfo.left;
        var posY = positionInfo.top;
        var buttonWidth = positionInfo.width;
        var buttonHeight =  positionInfo.height;

        if(buttonWidth >= buttonHeight) {
            buttonHeight = buttonWidth;
        }
        
        var x = event.pageX - posX - buttonWidth / 2;
        var y = event.pageY - posY - buttonHeight / 2;
        
        this.removeRippleStylesAndEffect(target);
        target.style["border-radius"] = '50%';
        target.style["background"] = 'rgba(255, 255, 255, 0.4)';
        console.log(x + "-" + y);
        target.style["width"] = "100px";
        target.style["height"] = "100px";
        target.style["top"] = y + 'px';
        target.style["left"] = x + 'px';
        target.classList.add("r-r-ripple-effect");
        setTimeout(function(remFunc) {
            remFunc(target);
        }, 500, this.removeRippleStylesAndEffect);
    }

    render() {
        var icon = this.state.buttonIcon ? this.state.buttonIcon : "fa fa-plus";

        return (
            <React.Fragment>
                <div className="r-r-showcase-component-page">
                    <h1>Construct A Component Here <i className="fas fa-bars" style={{float: "right", display: "none"}}></i></h1> 
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>

                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <div onClick={()=>{}} style={{position:"relative",backgroundColor:"black",margin:"20px",color:"white",width:"220px",height:"120px"}}>
                        <span onClick={(e)=>this.animateRipple(e)} className="r-r-ripple r-r-noselect"/>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
