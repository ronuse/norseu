
import React from "react"
import { Button } from '@ronuse/react-ui/core/buttons'
import { Panel } from "@ronuse/react-ui/core/panels/Panel";
import { Scheme, Alignment } from "@ronuse/react-ui/core/variables";
import { InputText } from '@ronuse/react-ui/core/form';
import { Tag } from '@ronuse/react-ui/core/misc'

export class ScratchPage extends React.Component {

    state = {
        username: "",
        usernameScheme: Scheme.PRIMARY,
        usernameBorderClass: "",
        helpLabel: null
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
            <div className="r-r-showcase-component-page">
                <h1>Construct A Component Here</h1>

                Username: <span>{this.state.username}</span>
                <br/><br/>
                <InputText scheme={this.state.usernameScheme} className={this.state.usernameBorderClass}
                    value={this.state.username}
                    placeholder="Username" helpLabel={this.state.helpLabel} onChange={(e) => {
                        this.setState({
                            username: e.target.value,
                            usernameScheme: Scheme.PRIMARY,
                            usernameBorderClass: "",
                            helpLabel: null
                        })
                    }} />
                <br/><br/>
                <Button text="Sign in" scheme={Scheme.PRIMARY} onClick={(e) => {
                    if (this.state.username === "") {
                        this.setState({
                            usernameScheme: Scheme.SUCCESS,
                            usernameBorderClass: "r-r-success-border-1px",
                            helpLabel: <small className="r-r-success-text">username is required</small>
                        })
                    } else {
                        console.log(this.state.username);
                        this.setState({
                            username: e.target.value})
                    }
                }}/>
                <br/><br/>
                <br/><br/>

                <div className="r-r-linear-layout r-r-layout-horizontal">
                    <span style={{backgroundColor: "purple", flex: 0.5}}>Hello Hollo Hollo Hollo Hollo</span>
                    <span style={{backgroundColor: "blue", flex: 1}}>Hello Hollo Hollo Hollo Hollo</span>
                    <span style={{backgroundColor: "blue", flex: 0.5}}>Hello Hollo Hollo Hollo Hollo</span>
                </div>
                <br/>

                <div className="r-r-linear-layout r-r-layout-horizontal" style={{backgroundColor: "blue"}}>
                    <div style={{height: "100px", width: "150px", backgroundColor: "grey"}}> </div>
                    <div className="r-r-linear-layout r-r-layout-vertical" style={{backgroundColor: "yellow"}}>
                        <div style={{height: "100px", width: "150px", backgroundColor: "green"}}> </div>
                        <div style={{height: "100px", width: "150px", backgroundColor: "green"}}> </div>
                        <div style={{height: "100px", width: "150px", backgroundColor: "green"}}> </div>
                    </div>
                    <div style={{height: "100px", width: "150px", backgroundColor: "grey"}}> </div>
                    <div style={{height: "100px", width: "150px", backgroundColor: "grey"}}> </div>
                    <div style={{height: "100px", width: "150px", backgroundColor: "grey"}}> </div>
                    <div style={{height: "100px", width: "150px", backgroundColor: "grey"}}> </div>
                    <div style={{height: "100px", width: "150px", backgroundColor: "grey"}}> </div>
                    <div style={{height: "100px", width: "150px", backgroundColor: "grey"}}> </div>
                    <div style={{height: "100px", width: "150px", backgroundColor: "grey"}}> </div>
                    <div style={{height: "100px", width: "150px", backgroundColor: "grey"}}> </div>
                    <div style={{height: "100px", width: "150px", backgroundColor: "grey"}}> </div>
                    <div style={{height: "100px", width: "150px", backgroundColor: "grey"}}> </div>
                </div>

                <br/>
                <div className="r-r-linear-layout r-r-layout-vertical">
                    <div style={{height: "100px", width: "150px", backgroundColor: "grey"}}> </div>
                    <div style={{height: "100px", width: "150px", backgroundColor: "grey"}}> </div>
                    <div style={{height: "100px", width: "150px", backgroundColor: "grey"}}> </div>
                </div>
                
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div onClick={()=>{}} style={{position:"relative",backgroundColor:"black",margin:"20px",color:"white",width:"220px",height:"120px"}}>
                    <span onClick={(e)=>this.animateRipple(e)} className="r-r-ripple r-r-noselect"/>
                </div>
            </div>
        )
    }
}
