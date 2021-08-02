
import React, { Component } from "react"
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@ronuse/react-ui/core/buttons'
import { Panel } from "@ronuse/react-ui/core/panels/Panel";
import { Scheme, Alignment, Position } from "@ronuse/react-ui/core/variables";
import { InputText } from '@ronuse/react-ui/core/form';
import { Navbar, Portal } from '@ronuse/react-ui/core/overlay';
import { Tag } from '@ronuse/react-ui/core/misc'
import { ObjUtils, DOMUtils, BoolUtils } from "@ronuse/react-ui/utils"
import { CSSTransition } from 'react-transition-group';

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

        this.props_ = {
            children: [
                <h3>Hello WOrld</h3>
            ]
        }
        this.state_ = {
            id: "tmp-id-1",
            visible: true
        }
    }

    renderElement() {
        let className = classNames('r-r-popup r-r-popup-tmp', this.props_.className);

        return (
            <CSSTransition nodeRef={this.elementRef} classNames="r-r-popup" timeout={{ enter: 130, exit: 110 }} in={this.state_.visible} options={this.props_.transitionOptions}
                unmountOnExit onEnter={this.onEnter} onEntered={this.onEntered} onExited={this.onExited}>
                <div ref={this.elementRef} id={this.state_.id} className={className} style={this.props_.style}
                    role="dialog" aria-labelledby={this.state_.id + '-header'} aria-describedby={this.state_.id + '-content'} aria-modal={this.props_.modal}>
                    {this.props_.children}
                </div>
            </CSSTransition>
        )
    }

    render() {
        const element = this.renderElement();
        return ReactDOM.createPortal(element, document.body);
        return <Portal child={element} container={this.props_.container} visible/>;
    }

    render__() {
        var icon = this.state.buttonIcon ? this.state.buttonIcon : "fa fa-plus";

        return (
            <React.Fragment>
                <div className="r-r-showcase-component-page" style={{background: "white"}}>
                    <h1>Construct A Component Here <i className="fas fa-bars" style={{float: "right", display: "none"}}></i></h1> 
                    <textarea disabled className="r-r-textarea r-r-primary-border-hover r-r-primary-border-1px-focus r-r-primary-border-3px-focus-box-shadow r-r-disabled" placeholder="Yahoo">Wose</textarea>
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
}
